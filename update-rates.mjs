#!/usr/bin/env node
/* ==========================================================================
   IPL — сборщик котировок для строки в шапке сайта
   --------------------------------------------------------------------------
   Источники:
     USD/KZT  — Национальный банк РК, официальный RSS
     Золото   — LBMA, дневной аукцион Gold PM (USD за тройскую унцию)
     Медь     — LME Copper Cash-Settlement (USD за тонну), публикация Westmetall

   Запуск:  node update-rates.mjs
   Результат: data/rates.json (машинный) и data/rates.js (для страницы)

   Скрипт устойчив к сбоям: если источник недоступен, прошлое значение
   по нему сохраняется, а остальные обновляются. Сайт никогда не остаётся
   с пустой строкой из-за одного упавшего источника.
   ========================================================================== */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(ROOT, "data");
const JSON_PATH = join(DATA_DIR, "rates.json");
const JS_PATH = join(DATA_DIR, "rates.js");

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/126.0 Safari/537.36";

const TIMEOUT_MS = 30000;

async function get(url, { asText = true } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": UA, Accept: "*/*" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return asText ? await res.text() : await res.json();
  } finally {
    clearTimeout(timer);
  }
}

const pct = (now, prev) =>
  Number.isFinite(now) && Number.isFinite(prev) && prev !== 0
    ? Number((((now - prev) / prev) * 100).toFixed(2))
    : null;

/* ------------------------------------------------ USD/KZT — НБ РК ------ */

async function fetchUsdKzt() {
  const xml = await get("https://nationalbank.kz/rss/rates_all.xml");

  const block = xml.match(
    /<item>\s*<title>\s*USD\s*<\/title>[\s\S]*?<\/item>/i
  );
  if (!block) throw new Error("в RSS Нацбанка не найден блок USD");

  const pick = (tag) => {
    const m = block[0].match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, "i"));
    return m ? m[1].trim() : "";
  };

  const value = Number.parseFloat(pick("description"));
  if (!Number.isFinite(value)) throw new Error("не разобран курс USD");

  // <change> — абсолютное изменение к предыдущему торговому дню, в тенге.
  const change = Number.parseFloat(pick("change"));
  const prev = Number.isFinite(change) ? value - change : NaN;

  // pubDate приходит как ДД.ММ.ГГГГ
  const [d, m, y] = pick("pubDate").split(".");

  return {
    value: Number(value.toFixed(2)),
    changePct: pct(value, prev),
    date: y && m && d ? `${y}-${m}-${d}` : null,
    source: "Национальный банк РК",
  };
}

/* ------------------------------------------------- Золото — LBMA ------ */

async function fetchGold() {
  const rows = await get("https://prices.lbma.org.uk/json/gold_pm.json", {
    asText: false,
  });
  if (!Array.isArray(rows) || rows.length < 2)
    throw new Error("LBMA вернула неожиданный формат");

  // Записи идут по возрастанию даты; берём две последние с ценой в USD.
  const usable = rows.filter(
    (r) => r && Array.isArray(r.v) && Number.isFinite(Number(r.v[0]))
  );
  if (usable.length < 2) throw new Error("в данных LBMA нет цен в USD");

  const last = usable[usable.length - 1];
  const prev = usable[usable.length - 2];
  const value = Number(last.v[0]);

  return {
    value: Number(value.toFixed(2)),
    changePct: pct(value, Number(prev.v[0])),
    date: last.d || null,
    source: "LBMA Gold Price PM",
  };
}

/* --------------------------------------------------- Медь — LME ------- */

const MONTHS = {
  january: "01", february: "02", march: "03", april: "04",
  may: "05", june: "06", july: "07", august: "08",
  september: "09", october: "10", november: "11", december: "12",
};

async function fetchCopper() {
  const html = await get(
    "https://www.westmetall.com/en/markdaten.php?action=table&field=LME_Cu_cash"
  );

  // Строки вида: <td>24. July 2026</td><td>13,617.00</td>...
  const rowRe =
    /<tr>\s*<td[^>]*>\s*(\d{1,2})\.\s*([A-Za-z]+)\s*(\d{4})\s*<\/td>\s*<td[^>]*>\s*([\d.,]+)\s*<\/td>/g;

  const rows = [];
  let m;
  while ((m = rowRe.exec(html)) !== null) {
    const value = Number.parseFloat(m[4].replace(/,/g, ""));
    const month = MONTHS[m[2].toLowerCase()];
    if (!Number.isFinite(value) || !month) continue;
    rows.push({ value, date: `${m[3]}-${month}-${m[1].padStart(2, "0")}` });
    if (rows.length === 2) break;
  }

  if (rows.length < 2) throw new Error("не разобрана таблица LME на Westmetall");

  return {
    value: Number(rows[0].value.toFixed(2)),
    changePct: pct(rows[0].value, rows[1].value),
    date: rows[0].date,
    source: "LME Copper Cash-Settlement",
  };
}

/* ------------------------------------------------------------ сборка -- */

async function readPrevious() {
  try {
    return JSON.parse(await readFile(JSON_PATH, "utf8"));
  } catch {
    return null;
  }
}

async function main() {
  const previous = await readPrevious();
  const items = previous?.items ? { ...previous.items } : {};
  const jobs = [
    ["usdkzt", "USD/KZT (Нацбанк РК)", fetchUsdKzt],
    ["gold", "Золото (LBMA)", fetchGold],
    ["copper", "Медь (LME / Westmetall)", fetchCopper],
  ];

  const failures = [];

  const results = await Promise.allSettled(jobs.map(([, , fn]) => fn()));

  results.forEach((result, i) => {
    const [key, label] = jobs[i];
    if (result.status === "fulfilled") {
      items[key] = result.value;
      const delta =
        result.value.changePct === null
          ? "—"
          : `${result.value.changePct > 0 ? "+" : ""}${result.value.changePct}%`;
      console.log(`  OK   ${label}: ${result.value.value} (${delta})`);
    } else {
      failures.push(label);
      const kept = items[key] ? " — оставлено прошлое значение" : "";
      console.warn(`  СБОЙ ${label}: ${result.reason?.message || result.reason}${kept}`);
    }
  });

  if (!Object.keys(items).length) {
    console.error("\nНи один источник не ответил. Файлы не перезаписаны.");
    process.exitCode = 1;
    return;
  }

  const payload = {
    date: new Date().toISOString().slice(0, 10),
    updatedAt: new Date().toISOString(),
    items,
  };

  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(JSON_PATH, JSON.stringify(payload, null, 2) + "\n", "utf8");
  await writeFile(
    JS_PATH,
    "/* Создаётся автоматически: node update-rates.mjs — вручную не править. */\n" +
      "window.IPL_RATES = " +
      JSON.stringify(payload, null, 2) +
      ";\n",
    "utf8"
  );

  console.log(
    `\nГотово: data/rates.js обновлён (${payload.date}).` +
      (failures.length ? ` Не обновились: ${failures.join(", ")}.` : "")
  );
}

main().catch((error) => {
  console.error("Непредвиденная ошибка:", error);
  process.exitCode = 1;
});
