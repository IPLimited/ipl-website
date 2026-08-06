/* ==========================================================================
   IPL — логика сайта
   Обычный скрипт (не ES-модуль): так страница работает и с сервера,
   и при открытии index.html двойным кликом с диска (протокол file://).
   ========================================================================== */
(function () {
  "use strict";

  var DICT = window.IPL_I18N || {};
  var SUPPORTED = ["ru", "en", "zh"];
  var STORAGE_KEY = "ipl-lang";

  /* --------------------------------------------------- выбор языка ----- */

  function detectLanguage() {
    var saved;
    try {
      saved = window.localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      saved = null;
    }
    if (saved && SUPPORTED.indexOf(saved) !== -1) {
      return saved;
    }

    var list = navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || "en"];

    for (var i = 0; i < list.length; i++) {
      var tag = String(list[i]).toLowerCase();
      if (tag.indexOf("ru") === 0) return "ru";
      if (tag.indexOf("zh") === 0) return "zh";
      if (tag.indexOf("en") === 0) return "en";
    }
    // Языки без своей версии сайта ведём на английскую.
    return "en";
  }

  var currentLang = detectLanguage();

  function t(key) {
    var pack = DICT[currentLang] || DICT.ru || {};
    return pack[key] !== undefined ? pack[key] : (DICT.ru && DICT.ru[key]) || "";
  }

  function pack() {
    return DICT[currentLang] || DICT.ru || {};
  }

  var HTML_LANG = { ru: "ru", en: "en", zh: "zh-Hant" };
  var NUM_LOCALE = { ru: "ru-RU", en: "en-GB", zh: "zh-Hant-HK" };

  /* -------------------------------------------- применение переводов --- */

  function applyTranslations() {
    document.documentElement.setAttribute("lang", HTML_LANG[currentLang] || "ru");

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var value = t(el.getAttribute("data-i18n"));
      if (value) el.textContent = value;
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var value = t(el.getAttribute("data-i18n-html"));
      if (value) el.innerHTML = value;
    });

    // data-i18n-attr="alt:mission.alt" или "alt:a.b, title:c.d"
    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      el.getAttribute("data-i18n-attr").split(",").forEach(function (pair) {
        var parts = pair.split(":");
        if (parts.length !== 2) return;
        var value = t(parts[1].trim());
        if (value) el.setAttribute(parts[0].trim(), value);
      });
    });

    var title = t("meta.title");
    if (title) document.title = title;

    var label = document.querySelector("[data-lang-current]");
    if (label) label.textContent = t("lang.label");

    document.querySelectorAll("[data-set-lang]").forEach(function (link) {
      var isActive = link.getAttribute("data-set-lang") === currentLang;
      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function setLanguage(lang) {
    if (SUPPORTED.indexOf(lang) === -1 || lang === currentLang) return;
    currentLang = lang;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* приватный режим — просто не запоминаем выбор */
    }
    applyTranslations();
    setProgram(activeProgramIndex);
    setCatalogSlide(activeCatalogIndex);
    renderQuotes();
  }

  document.querySelectorAll("[data-set-lang]").forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      setLanguage(link.getAttribute("data-set-lang"));
      var box = document.getElementById("langSwitch");
      if (box) box.removeAttribute("open");
    });
  });

  /* ------------------------------------------- строка котировок -------- */

  var QUOTE_FORMAT = {
    usdkzt: { digits: 2, prefix: "", suffixKey: "" },
    gold: { digits: 2, prefix: "$", suffixKey: "quotes.oz" },
    copper: { digits: 0, prefix: "$", suffixKey: "quotes.tonne" },
  };

  function formatNumber(value, digits) {
    try {
      return new Intl.NumberFormat(NUM_LOCALE[currentLang] || "ru-RU", {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
      }).format(value);
    } catch (e) {
      return value.toFixed(digits);
    }
  }

  function formatDate(iso) {
    var parts = String(iso).split("-");
    if (parts.length !== 3) return String(iso);
    try {
      return new Intl.DateTimeFormat(NUM_LOCALE[currentLang] || "ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(new Date(Date.UTC(+parts[0], +parts[1] - 1, +parts[2])));
    } catch (e) {
      return String(iso);
    }
  }

  function renderQuotes() {
    var data = window.IPL_RATES;
    var root = document.getElementById("quotes");
    if (!root) return;

    if (!data || !data.items) {
      root.classList.add("is-empty");
      return;
    }

    root.classList.remove("is-empty");

    Object.keys(QUOTE_FORMAT).forEach(function (key) {
      var node = root.querySelector('[data-quote="' + key + '"]');
      var item = data.items[key];
      if (!node) return;

      if (!item || typeof item.value !== "number") {
        node.classList.add("is-missing");
        return;
      }
      node.classList.remove("is-missing");

      var conf = QUOTE_FORMAT[key];
      var suffix = conf.suffixKey ? "/" + t(conf.suffixKey) : "";
      node.querySelector("[data-quote-value]").textContent =
        conf.prefix + formatNumber(item.value, conf.digits) + suffix;

      var deltaNode = node.querySelector("[data-quote-delta]");
      if (typeof item.changePct === "number" && isFinite(item.changePct)) {
        var up = item.changePct > 0;
        var flat = Math.abs(item.changePct) < 0.005;
        deltaNode.textContent =
          (flat ? "→ " : up ? "▲ " : "▼ ") +
          formatNumber(Math.abs(item.changePct), 2) +
          "%";
        deltaNode.className =
          "quote__delta " +
          (flat ? "is-flat" : up ? "is-up" : "is-down");
      } else {
        deltaNode.textContent = "";
        deltaNode.className = "quote__delta";
      }
    });

    // Показываем дату самих котировок, а не дату запуска сборщика:
    // биржи в выходные закрыты, и цена пятницы не должна выглядеть
    // как цена понедельника. У каждой котировки своя дата — в подсказке.
    var dates = [];
    Object.keys(QUOTE_FORMAT).forEach(function (key) {
      var item = data.items[key];
      if (!item || !item.date) return;
      dates.push(item.date);

      var node = root.querySelector('[data-quote="' + key + '"]');
      if (node) {
        node.setAttribute(
          "title",
          t("quotes.asOf") + " " + formatDate(item.date) + " · " + item.source
        );
      }
    });

    var dateNode = document.getElementById("quotesDate");
    if (dateNode) {
      dates.sort();
      var shown = dates.length ? dates[dates.length - 1] : data.date;
      dateNode.textContent = shown ? formatDate(shown) : "";
    }
  }

  /* ------------------------------------------------ блок «Услуги» ------ */

  var PROGRAM_MEDIA = [
    { video: "./assets/videos/2-1S.mp4", variant: "program" },
    { video: "./assets/videos/2-2S.mp4", variant: "reman" },
    { video: "./assets/videos/2-3S.mp4", variant: "exchange" },
  ];

  var programTabs = document.querySelectorAll(".program-tab");
  var heroProgramLinks = document.querySelectorAll("[data-hero-program]");
  var programTitle = document.getElementById("programTitle");
  var programLead = document.getElementById("programLead");
  var programCopy = document.getElementById("programCopy");
  var programVisual = document.getElementById("programVisual");
  var programMedia = document.getElementById("programMedia");
  var activeProgramIndex = 0;
  var programMediaCanLoad = !(programMedia && programMedia.dataset.lazyVideo);

  function playVideo(video) {
    var playback = video.play();
    if (playback && playback.catch) playback.catch(function () {});
  }

  function updateProgramMedia(media) {
    if (!programMedia) return;

    if (!programMediaCanLoad) {
      programMedia.dataset.src = media.video;
      return;
    }

    if (programMedia.getAttribute("src") !== media.video) {
      programMedia.src = media.video;
      programMedia.load();
    }
    playVideo(programMedia);
  }

  function setProgram(index) {
    var items = pack().programs || [];
    var item = items[index];
    var media = PROGRAM_MEDIA[index];
    if (!item || !media) return;

    programTabs.forEach(function (tab) {
      tab.classList.toggle("is-active", Number(tab.dataset.program) === index);
    });

    activeProgramIndex = index;
    if (programTitle) programTitle.textContent = item.title;
    if (programLead) programLead.textContent = item.lead;
    if (programCopy) programCopy.textContent = item.copy;
    updateProgramMedia(media);

    if (programVisual) programVisual.dataset.variant = media.variant;
  }

  function setHeroTabActive(activeLink) {
    heroProgramLinks.forEach(function (link) {
      link.classList.toggle("hero-tab--active", link === activeLink);
    });
  }

  programTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      setProgram(Number(tab.dataset.program));
    });
  });

  heroProgramLinks.forEach(function (link) {
    var index = Number(link.dataset.heroProgram);

    link.addEventListener("mouseenter", function () {
      setHeroTabActive(link);
      setProgram(index);
    });
    link.addEventListener("mouseleave", function () {
      setHeroTabActive(null);
    });
    link.addEventListener("focus", function () {
      setHeroTabActive(link);
      setProgram(index);
    });
    link.addEventListener("blur", function () {
      setHeroTabActive(null);
    });
    link.addEventListener("click", function () {
      setProgram(index);
    });
  });

  /* ----------------------------------------------- блок «Техника» ------ */

  var catalogStage = document.querySelector("[data-catalog-stage]");
  var catalogMachine = document.querySelector("[data-catalog-machine]");
  var catalogCopy = document.querySelector("[data-catalog-copy]");
  var catalogTabs = document.querySelectorAll("[data-catalog-tab]");
  var activeCatalogIndex = 0;

  function setCatalogSlide(index) {
    var items = pack().machinery || [];
    var item = items[index];
    if (!item || !catalogStage || !catalogMachine) return;

    activeCatalogIndex = index;
    catalogStage.dataset.catalogSlide = String(index);
    catalogMachine.setAttribute("aria-label", item.alt);

    if (catalogCopy && item.copy) catalogCopy.textContent = item.copy;

    catalogTabs.forEach(function (tab) {
      var isActive = Number(tab.dataset.catalogTab) === index;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-pressed", String(isActive));
    });
  }

  catalogTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      setCatalogSlide(Number(tab.dataset.catalogTab));
    });
  });

  /* ------------------------------------ появление блоков при скролле --- */

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.18 }
  );

  document.querySelectorAll(".reveal").forEach(function (item) {
    observer.observe(item);
  });

  /* ------------------------------------- отложенная загрузка медиа ----- */

  function loadLazyImage(image) {
    var src = image.dataset.src;
    if (!src) return;
    image.src = src;
    image.removeAttribute("data-src");
  }

  function initLazyImages() {
    var images = document.querySelectorAll("img[data-src]");
    if (!images.length) return;

    if (!("IntersectionObserver" in window)) {
      images.forEach(loadLazyImage);
      return;
    }

    var imageObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          loadLazyImage(entry.target);
          imageObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "240px 0px", threshold: 0.01 }
    );

    images.forEach(function (image) {
      imageObserver.observe(image);
    });
  }

  function loadLazyVideo(video) {
    if (video.dataset.lazyLoaded === "true") return;

    if (video === programMedia) {
      programMediaCanLoad = true;
      updateProgramMedia(PROGRAM_MEDIA[activeProgramIndex] || PROGRAM_MEDIA[0]);
    } else if (video.dataset.src) {
      video.src = video.dataset.src;
      video.load();
      playVideo(video);
    }

    video.dataset.lazyLoaded = "true";
    video.removeAttribute("data-src");
  }

  function initLazyVideos() {
    var videos = document.querySelectorAll("video[data-lazy-video]");
    if (!videos.length) return;

    if (!("IntersectionObserver" in window)) {
      videos.forEach(loadLazyVideo);
      return;
    }

    var videoObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var video = entry.target;

          if (entry.isIntersecting) {
            loadLazyVideo(video);
            if (video.autoplay && video.dataset.lazyLoaded === "true") {
              playVideo(video);
            }
            return;
          }

          if (video.dataset.lazyLoaded === "true" && !video.paused) {
            video.pause();
          }
        });
      },
      { rootMargin: "220px 0px", threshold: 0.01 }
    );

    videos.forEach(function (video) {
      videoObserver.observe(video);
    });
  }

  /* ----------------------------------------------------------- старт --- */

  applyTranslations();
  setProgram(0);
  setCatalogSlide(0);
  // Строка котировок второстепенна: её сбой не должен мешать
  // отрисовке страницы и загрузке медиа.
  try {
    renderQuotes();
  } catch (error) {
    console.warn("Строка котировок не отрисована:", error);
  }
  initLazyImages();
  initLazyVideos();
})();
