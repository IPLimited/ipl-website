/* ==========================================================================
   IPL — словари интерфейса
   Языки: ru (русский), en (английский), zh (традиционный китайский, Гонконг)
   --------------------------------------------------------------------------
   Как добавить/поправить текст:
   1. Найдите ключ в блоке ru — рядом в en и zh лежит тот же ключ.
   2. Ключ в HTML привязывается атрибутом data-i18n="ключ".
      data-i18n-html="ключ"          — вставляет разметку (переносы <br>)
      data-i18n-attr="alt:ключ"      — подставляет значение в атрибут
   ========================================================================== */

window.IPL_I18N = {
  /* ------------------------------------------------------------------ RU */
  ru: {
    "lang.label": "RUS",
    "meta.title": "IPL — Industrial Partners Limited",
    "meta.description":
      "Industrial Partners Limited — управление жизненным циклом горно-шахтной и карьерной техники в Центральной Азии.",

    "quotes.region": "Курсы валют и котировки металлов",
    "quotes.usdkzt": "USD/KZT",
    "quotes.gold": "Золото",
    "quotes.copper": "Медь",
    "quotes.sources": "НБ РК · LBMA · LME",
    "quotes.oz": "унц.",
    "quotes.tonne": "т",
    "quotes.asOf": "на",

    "nav.region": "Основная навигация",
    "nav.services": "Услуги",
    "nav.catalog": "Каталог",
    "nav.partner": "Партнерство",
    "nav.facility": "Производство",
    "nav.about": "О нас",
    "nav.contacts": "Контакты",
    "lang.switch": "Сменить язык",
    "lang.choose": "Выбор языка",

    "hero.title":
      "Управление жизненным<br />циклом горно&#8209;шахтной<br />и карьерной техники<br />в Центральной Азии",
    "hero.subtitle": "Central Asia — Industrial Partners",

    "tab.rebuilt": "Программа восстановления техники и компонентов + обменные программы",
    "tab.partsto": "Интегрированные поставки оригинальных запчастей от ведущих производителей",
    "tab.proservice": "Техническое сопровождение, ремонт и сервисная поддержка",
    "tab.machinery": "Собственная линейка погрузочно-доставочных машин",

    "mark.about": "01 / Обращение",
    "mission.alt": "Силовой агрегат IPL",
    "mission.quote":
      "«Мы верим, что местное восстановление техники – не только экономически оправданное решение, но и важный шаг в развитии локальной индустрии, снижении зависимости от импорта и более ответственном использовании промышленного оборудования.",
    "mission.signature": "Руководство IPL",
    "mission.note":
      "Наше главное преимущество – сочетание современной производственной базы с сильной командой инженеров и опытных технических специалистов-практиков»",

    "mark.services": "02 / УСЛУГИ",
    "programs.region": "Программы",
    "cta.consult": "Получить консультацию",

    "mark.advantages": "03 / ПРЕИМУЩЕСТВА",
    "rest.title": "Осуществляем восстановление",
    "rest.lede":
      "Техники и компонентов для оборудования Caterpillar, Epiroc, Sandvik и других производителей",
    "rest.copy1":
      "Через международное партнерство, центры ремануфактуринга по всему миру и собственные обменные программы IPL обеспечивает доступ к новым и восстановленным узлам.",
    "rest.copy2":
      "Это сокращает сроки поставок, снижает простои и даёт экономически обоснованную альтернативу заводским каналам, что особенно важно для условий горнодобывающей отрасли Центральной Азии.",
    "rest.accent": "IPL ближе и доступнее.",
    "brands.region": "Партнерские бренды",

    "mark.machinery": "04 / ТЕХНИКА",
    "cta.catalog": "Весь каталог",
    "catalog.intro":
      "Флагманское направление компании IPL, производственно-логистическая платформа с офисом в Гонконге и инженерными мощностями в Азии",
    "cta.request": "Оставить заявку",
    "models.region": "Модели техники",
    "cap.5": "Грузоподъёмность 5 тонн",
    "cap.7": "Грузоподъёмность 7 тонн",
    "cap.10": "Грузоподъёмность 10 тонн",

    "mark.partner": "05 / ПАРТНЕРСТВО",
    "partner.title": "IPL Machinery также является официальным дилером брендов",
    "partner.copy":
      "IPL обеспечивает доступ не только к новым и восстановленным узлам, но и к новой технике передовых компаний.",

    "facility.label": "МЕСТОНАХОЖДЕНИЕ",
    "facility.copy":
      "Совместно с казахстанским партнером организовали сервисный центр в городе Караганда на 6057,5 квадратных метров",

    "footer.about": "О сайте",
    "footer.catalogs": "Каталоги",
    "footer.cat1": "Оригинальные запасные части",
    "footer.cat2": "Восстановленные компоненты",
    "footer.cat3": "Запчасти",
    "footer.cat4": "Обменный фонд",
    "footer.address": "Адрес:",
    "footer.phone": "Телефон:",
    "footer.email": "E-mail:",
    "footer.engineAlt": "Двигатель IPL",
    "footer.copyright": "© 2026 IPL / Все права защищены.",
    "footer.returns": "Условия возврата",
    "footer.privacy": "Политика конфиденциальности",

    programs: [
      {
        title: "RE:BUILT",
        lead: "Программа восстановления техники и компонентов + обменные программы",
        copy: "Комплексное восстановление с возвратом оригинальных технических характеристик, глубокая инженерная работа с узлами. Обновление до последних заводских параметров с контролем допусков и остаточного ресурса.",
      },
      {
        title: "PARTS:TO",
        lead: "Интегрированные поставки оригинальных запчастей от ведущих производителей",
        copy: "Устойчивая система снабжения критически важными оригинальными частями и компонентами.",
      },
      {
        title: "PRO:SERVICE",
        lead: "Техническое сопровождение, ремонт и сервисная поддержка",
        copy: "Предлагаем разные варианты сотрудничества: от аварийных выездов до долгосрочного сопровождения техники компании и её обслуживания.",
      },
    ],

    machinery: [
      {
        alt: "IPL Machinery CM L5D",
        copy: "Погрузочно-доставочная машина (ПДМ) грузоподъёмностью 5 тонн, разработанная для подземных работ и широкого спектра задач: проходка, добыча и строительство тоннелей сечением от 3.0 × 3.0 м. Машина оснащена двигателем Cummins 5.9 с максимальным крутящим моментом 650 Н·м.\n\nТрансмиссия на базе компонентов Dana (коробка передач и гидротрансформатор) обеспечивает стабильную работу и высокую эффективность эксплуатации.",
      },
      {
        alt: "IPL Machinery CM L7D",
        copy: "Погрузочно-доставочная машина (ПДМ) грузоподъёмностью 7 тонн, предназначенная для подземных работ различного назначения: добыча, проходка и тоннелестроение при сечении выработок от 3.5 × 3.5 м.\n\nМодель обеспечивает оптимальный баланс мощности и габаритов для эффективной работы в условиях среднего класса сложности.",
      },
      {
        alt: "IPL Machinery CM L10D",
        copy: "Погрузочно-доставочная машина (ПДМ) грузоподъёмностью 10 тонн, разработанная для интенсивной подземной эксплуатации в условиях добычи и тоннелестроения.\n\nПодходит для выработок сечением от 3.8 × 3.8 м и адаптирована к работе в сложной подземной среде. Обеспечивает высокую производительность при сохранении надёжности и устойчивости в тяжёлых условиях эксплуатации.",
      },
    ],
  },

  /* ------------------------------------------------------------------ EN */
  en: {
    "lang.label": "ENG",
    "meta.title": "IPL — Industrial Partners Limited",
    "meta.description":
      "Industrial Partners Limited — lifecycle management of underground and open-pit mining machinery in Central Asia.",

    "quotes.region": "Exchange rates and metal prices",
    "quotes.usdkzt": "USD/KZT",
    "quotes.gold": "Gold",
    "quotes.copper": "Copper",
    "quotes.sources": "NBK · LBMA · LME",
    "quotes.oz": "oz",
    "quotes.tonne": "t",
    "quotes.asOf": "as of",

    "nav.region": "Main navigation",
    "nav.services": "Services",
    "nav.catalog": "Catalogue",
    "nav.partner": "Partnership",
    "nav.facility": "Facility",
    "nav.about": "About us",
    "nav.contacts": "Contacts",
    "lang.switch": "Change language",
    "lang.choose": "Language selection",

    "hero.title":
      "Lifecycle management<br />of underground and<br />open&#8209;pit mining machinery<br />in Central Asia",
    "hero.subtitle": "Central Asia — Industrial Partners",

    "tab.rebuilt": "Machinery and component rebuild program + exchange programs",
    "tab.partsto": "Integrated supply of genuine parts from leading manufacturers",
    "tab.proservice": "Technical support, repair and service maintenance",
    "tab.machinery": "Our own line of load-haul-dump machines",

    "mark.about": "01 / Statement",
    "mission.alt": "IPL power unit",
    "mission.quote":
      "“We believe that local machinery restoration is not merely an economically sound decision, but also an important step towards developing local industry, reducing dependence on imports and using industrial equipment more responsibly.",
    "mission.signature": "IPL Management",
    "mission.note":
      "Our principal advantage is the combination of a modern production base with a strong team of engineers and experienced hands-on technical specialists”",

    "mark.services": "02 / SERVICES",
    "programs.region": "Programs",
    "cta.consult": "Request a consultation",

    "mark.advantages": "03 / ADVANTAGES",
    "rest.title": "We carry out restoration",
    "rest.lede":
      "Of machinery and components for Caterpillar, Epiroc, Sandvik and other manufacturers' equipment",
    "rest.copy1":
      "Through international partnerships, remanufacturing centres worldwide and its own exchange programs, IPL provides access to new and restored assemblies.",
    "rest.copy2":
      "This shortens delivery times, reduces downtime and offers an economically sound alternative to factory channels — which matters especially in the conditions of the Central Asian mining industry.",
    "rest.accent": "IPL is closer and more accessible.",
    "brands.region": "Partner brands",

    "mark.machinery": "04 / MACHINERY",
    "cta.catalog": "Full catalogue",
    "catalog.intro":
      "The flagship division of IPL — a production and logistics platform with an office in Hong Kong and engineering capacity across Asia",
    "cta.request": "Submit a request",
    "models.region": "Machinery models",
    "cap.5": "Payload 5 tonnes",
    "cap.7": "Payload 7 tonnes",
    "cap.10": "Payload 10 tonnes",

    "mark.partner": "05 / PARTNERSHIP",
    "partner.title": "IPL Machinery is also an official dealer for the brands",
    "partner.copy":
      "IPL provides access not only to new and restored assemblies, but also to new machinery from leading companies.",

    "facility.label": "LOCATION",
    "facility.copy":
      "Together with our Kazakh partner we have established a service centre in the city of Karaganda covering 6,057.5 square metres",

    "footer.about": "About the site",
    "footer.catalogs": "Catalogues",
    "footer.cat1": "Genuine spare parts",
    "footer.cat2": "Restored components",
    "footer.cat3": "Spare parts",
    "footer.cat4": "Exchange pool",
    "footer.address": "Address:",
    "footer.phone": "Phone:",
    "footer.email": "E-mail:",
    "footer.engineAlt": "IPL engine",
    "footer.copyright": "© 2026 IPL / All rights reserved.",
    "footer.returns": "Return policy",
    "footer.privacy": "Privacy policy",

    programs: [
      {
        title: "RE:BUILT",
        lead: "Machinery Rebuild Program and Component Restoration + Exchange Programs",
        copy: "Complete restoration of machines to their original technical specifications, in-depth engineering work with assemblies. Update to the latest factory parameters with tolerance and residual life control.",
      },
      {
        title: "PARTS:TO",
        lead: "Integrated supply of genuine parts from leading manufacturers",
        copy: "A reliable supply system for mission-critical genuine parts and components.",
      },
      {
        title: "PRO:SERVICE",
        lead: "Technical support, repair and service maintenance",
        copy: "We offer various cooperation models: from emergency callouts to long-term fleet support and maintenance.",
      },
    ],

    machinery: [
      {
        alt: "IPL Machinery CM L5D",
        copy: "Load-haul-dump machine (LHD) with a 5-tonne payload, designed for underground operations across a wide range of tasks: development, production, and tunnel construction from 3.0 × 3.0 m cross-sections. Equipped with a Cummins 5.9 engine with a maximum torque of 650 Nm.\n\nDana drivetrain components (gearbox and torque converter) ensure stable performance and high operational efficiency.",
      },
      {
        alt: "IPL Machinery CM L7D",
        copy: "Load-haul-dump machine (LHD) with a 7-tonne payload, designed for underground operations: production, development, and tunnel construction from 3.5 × 3.5 m cross-sections.\n\nThe model delivers an optimal balance of power and dimensions for efficient operation in medium-class conditions.",
      },
      {
        alt: "IPL Machinery CM L10D",
        copy: "Load-haul-dump machine (LHD) with a 10-tonne payload, designed for intensive underground mining and tunnelling operations.\n\nSuitable for drifts from 3.8 × 3.8 m and adapted to demanding underground environments. Delivers high productivity while maintaining reliability and stability in heavy-duty conditions.",
      },
    ],
  },

  /* ------------------------------------- ZH-HANT (традиционный, Гонконг) */
  zh: {
    "lang.label": "繁中",
    "meta.title": "IPL — Industrial Partners Limited",
    "meta.description":
      "Industrial Partners Limited — 中亞地區地下與露天礦業機械的全生命週期管理。",

    "quotes.region": "匯率與金屬報價",
    "quotes.usdkzt": "美元/堅戈",
    "quotes.gold": "黃金",
    "quotes.copper": "銅",
    "quotes.sources": "哈薩克國家銀行 · LBMA · LME",
    "quotes.oz": "盎司",
    "quotes.tonne": "噸",
    "quotes.asOf": "截至",

    "nav.region": "主導覽",
    "nav.services": "服務",
    "nav.catalog": "產品目錄",
    "nav.partner": "合作夥伴",
    "nav.facility": "生產基地",
    "nav.about": "關於我們",
    "nav.contacts": "聯絡我們",
    "lang.switch": "切換語言",
    "lang.choose": "選擇語言",

    "hero.title":
      "中亞地區地下與露天<br />礦業機械的<br />全生命週期管理",
    "hero.subtitle": "Central Asia — Industrial Partners",

    "tab.rebuilt": "機械及部件再製造計劃 + 以舊換新計劃",
    "tab.partsto": "整合供應領先製造商的原廠零部件",
    "tab.proservice": "技術支援、維修及售後服務",
    "tab.machinery": "自有系列鏟運機",

    "mark.about": "01 / 致辭",
    "mission.alt": "IPL 動力總成",
    "mission.quote":
      "「我們相信，設備的本地化修復不僅是具經濟效益的方案，更是發展本地工業、降低進口依賴，以及更負責任地使用工業設備的重要一步。",
    "mission.signature": "IPL 管理層",
    "mission.note":
      "我們的核心優勢，在於現代化的生產基地與一支實力雄厚的工程師及資深技術實務專家團隊的結合」",

    "mark.services": "02 / 服務",
    "programs.region": "服務計劃",
    "cta.consult": "獲取諮詢",

    "mark.advantages": "03 / 優勢",
    "rest.title": "我們提供設備修復",
    "rest.lede":
      "適用於 Caterpillar、Epiroc、Sandvik 及其他製造商設備的機械與部件",
    "rest.copy1":
      "透過國際合作、遍佈全球的再製造中心以及自有的以舊換新計劃，IPL 為客戶提供全新及再製造總成。",
    "rest.copy2":
      "此舉縮短交付周期、減少停機時間，並提供較原廠渠道更具經濟合理性的替代方案；這一點對中亞採礦業的作業條件而言尤為重要。",
    "rest.accent": "IPL 更貼近，更易觸及。",
    "brands.region": "合作品牌",

    "mark.machinery": "04 / 設備",
    "cta.catalog": "全部目錄",
    "catalog.intro":
      "IPL 的旗艦業務板塊 — 設有香港辦事處並具備亞洲工程能力的生產物流平台",
    "cta.request": "提交查詢",
    "models.region": "設備型號",
    "cap.5": "載重 5 噸",
    "cap.7": "載重 7 噸",
    "cap.10": "載重 10 噸",

    "mark.partner": "05 / 合作夥伴",
    "partner.title": "IPL Machinery 亦為下列品牌的官方經銷商",
    "partner.copy":
      "IPL 不僅提供全新及再製造總成，亦提供領先企業的全新設備。",

    "facility.label": "所在地",
    "facility.copy":
      "我們與哈薩克合作夥伴共同於卡拉干達市設立了佔地 6,057.5 平方米的服務中心",

    "footer.about": "關於本網站",
    "footer.catalogs": "產品目錄",
    "footer.cat1": "原廠零部件",
    "footer.cat2": "再製造部件",
    "footer.cat3": "零配件",
    "footer.cat4": "以舊換新庫存",
    "footer.address": "地址：",
    "footer.phone": "電話：",
    "footer.email": "電子郵件：",
    "footer.engineAlt": "IPL 發動機",
    "footer.copyright": "© 2026 IPL / 版權所有。",
    "footer.returns": "退貨條款",
    "footer.privacy": "私隱政策",

    programs: [
      {
        title: "RE:BUILT",
        lead: "機械及部件再製造計劃 + 以舊換新計劃",
        copy: "全面修復並恢復原廠技術規格，對各總成進行深度工程處理。按最新原廠參數更新，並嚴格控制公差與剩餘壽命。",
      },
      {
        title: "PARTS:TO",
        lead: "整合供應領先製造商的原廠零部件",
        copy: "為關鍵原廠零件及部件提供穩定可靠的供應體系。",
      },
      {
        title: "PRO:SERVICE",
        lead: "技術支援、維修及售後服務",
        copy: "我們提供多種合作模式：由緊急上門維修，以至長期的設備支援與保養。",
      },
    ],

    machinery: [
      {
        alt: "IPL Machinery CM L5D",
        copy: "載重 5 噸的鏟運機（LHD），專為地下作業而設計，適用於多種工況：掘進、開採及斷面 3.0 × 3.0 米以上的隧道施工。配備 Cummins 5.9 發動機，最大扭矩 650 牛·米。\n\n採用 Dana 部件的傳動系統（變速箱及液力變矩器），確保運行穩定並具備高使用效率。",
      },
      {
        alt: "IPL Machinery CM L7D",
        copy: "載重 7 噸的鏟運機（LHD），適用於各類地下作業：開採、掘進，以及斷面 3.5 × 3.5 米以上的隧道施工。\n\n該型號在功率與外形尺寸之間取得最佳平衡，適合中等複雜程度工況下的高效作業。",
      },
      {
        alt: "IPL Machinery CM L10D",
        copy: "載重 10 噸的鏟運機（LHD），專為開採及隧道施工條件下的高強度地下作業而設計。\n\n適用於斷面 3.8 × 3.8 米以上的巷道，並針對複雜地下環境作出優化。在重載工況下兼顧高生產效率與可靠穩定的表現。",
      },
    ],
  },
};
