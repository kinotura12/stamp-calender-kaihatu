/* role: app logic (moved from index.html) */

(() => {
  const YEAR = 2026;
  const MIN_MONTH = 1;
  const MAX_MONTH = 12;
  const APP_VERSION = "1.4.0";
  const APP_SCHEMA_VERSION = 1;

  // ===== Theme =====
  const STAMP_MOODS = ["mood_1","mood_2","mood_3","mood_4","mood_5"];
  const STAMP_THEME_SUPPORTED_VERSIONS = [1];
  const UI_THEME_SUPPORTED_VERSIONS = [1];
  const STAMP_THEMES = {
    default_dots: {
      id: "default_dots",
      name: "Color Dots",
      schemaVersion: 1,
      basePath: "",
      hash: "",
      stamps: [
        { mood: "mood_1", label: "Mood 1", className: "pink", color: "#ff6fae" },
        { mood: "mood_2", label: "Mood 2", className: "orange", color: "#ff9a4a" },
        { mood: "mood_3", label: "Mood 3", className: "yellow", color: "#ffd55a" },
        { mood: "mood_4", label: "Mood 4", className: "green", color: "#6ee38b" },
        { mood: "mood_5", label: "Mood 5", className: "blue", color: "#62c7ff" },
      ]
    },
    dark_moods: {
      id: "dark_moods",
      name: "Dark Moods",
      schemaVersion: 1,
      basePath: "",
      hash: "",
      stamps: [
        { mood: "mood_1", label: "最高", color: "#6ad0f5", className: "mood-dark-1" },
        { mood: "mood_2", label: "良い", color: "#4b7bec", className: "mood-dark-2" },
        { mood: "mood_3", label: "普通", color: "#7c5be7", className: "mood-dark-3" },
        { mood: "mood_4", label: "低め", color: "#cc5f9e", className: "mood-dark-4" },
        { mood: "mood_5", label: "最低", color: "#7a8ba0", className: "mood-dark-5" },
      ]
    },
    tenki_png: {
      id: "tenki_png",
      name: "Weather Stamps",
      schemaVersion: 1,
      basePath: "./assets/stamps/tenki/",
      hash: "",
      stamps: [
        { mood: "mood_1", label: "天気 1", asset: "tenki_1.png", renderMode: "img-tag" },
        { mood: "mood_2", label: "天気 2", asset: "tenki_2.png", renderMode: "img-tag" },
        { mood: "mood_3", label: "天気 3", asset: "tenki_3.png", renderMode: "img-tag" },
        { mood: "mood_4", label: "天気 4", asset: "tenki_4.png", renderMode: "img-tag" },
        { mood: "mood_5", label: "天気 5", asset: "tenki_5.png", renderMode: "img-tag" },
      ]
    }
    // 将来: ネコ系/季節系など追加
  };
  const UI_ASSET_KEYS = ["headerBg","footerBg","bgPattern","iconSet"];

  const UI_THEMES = {
    ui_dark_default: {
      id: "ui_dark_default",
      name: "Default Dark",
      schemaVersion: 1,
      basePath: "",
      hash: "",
      cssVars: {
        "--bg":"#0f1115",
        "--surface-1":"#171a21",
        "--surface-2":"#1c2028",
        "--surface-3":"rgba(255,255,255,.03)",
        "--border-subtle":"rgba(255,255,255,.06)",
        "--border-strong":"rgba(255,255,255,.12)",
        "--text":"#e8ecf3",
        "--muted":"#a9b2c3",
        "--text-strong":"#e8ecf3",
        "--text-normal":"#d8dde6",
        "--text-muted":"#a9b2c3",
        "--text-mini":"#8f9ab1",
        "--shadow-sm":"0 4px 10px rgba(0,0,0,.25)",
        "--shadow-md":"0 12px 30px rgba(0,0,0,.35)",
        "--shadow-lg":"0 18px 44px rgba(0,0,0,.5)",
        "--shadow-card":"0 12px 30px rgba(0,0,0,.35)",
        "--shadow-popover":"0 18px 44px rgba(0,0,0,.5)",
        "--input-bg":"rgba(0,0,0,.18)",
        "--input-border":"rgba(255,255,255,.10)",
        "--input-shadow":"0 4px 10px rgba(0,0,0,.25)",
        "--box-bg":"rgba(0,0,0,.18)",
        "--box-border":"rgba(255,255,255,.10)",
        "--box-shadow":"0 4px 10px rgba(0,0,0,.25)",
        "--btn-bg":"rgba(255,255,255,.06)",
        "--btn-fg":"#e8ecf3",
        "--btn-border":"rgba(255,255,255,.12)",
        "--btn-shadow":"0 4px 10px rgba(0,0,0,.25)",
        "--btn-danger-bg":"rgba(255,120,120,.12)",
        "--btn-danger-border":"rgba(255,140,140,.25)",
        "--btn-danger-fg":"#ffc8c8",
        "--btn-danger-shadow":"0 4px 10px rgba(0,0,0,.25)",
        "--pill-bg":"rgba(255,255,255,.06)",
        "--pill-border":"rgba(255,255,255,.12)",
        "--pill-fg":"rgba(232,236,243,.85)",
        "--accent":"#62c7ff",
        "--accent-2":"#ff6fae",
        "--success":"#6ee38b",
        "--warning":"#ffd55a",
        "--danger":"#ff6b6b",
        "--info":"#4a9ded",
        "--link":"#4a9ded",
        "--ring":"rgba(255,255,255,.16)",
        "--pink":"#ff6fae",
        "--orange":"#ff9a4a",
        "--yellow":"#ffd55a",
        "--green":"#6ee38b",
        "--blue":"#62c7ff",
        "--panel":"#171a21",
        "--card":"#1c2028",
        "--card2":"rgba(255,255,255,.03)",
        "--card-border":"rgba(255,255,255,.06)",
        "--card-shadow":"0 12px 30px rgba(0,0,0,.35)"
      }
    },
    ui_light_default: {
      id: "ui_light_default",
      name: "Default Light",
      schemaVersion: 1,
      basePath: "",
      hash: "",
      cssVars: {
        "--bg":"#f5f6fb",
        "--surface-1":"#ffffff",
        "--surface-2":"#ffffff",
        "--surface-3":"rgba(0,0,0,.02)",
        "--border-subtle":"rgba(0,0,0,.08)",
        "--border-strong":"rgba(0,0,0,.15)",
        "--text":"#1d2433",
        "--muted":"#63708a",
        "--text-strong":"#1d2433",
        "--text-normal":"#2d3342",
        "--text-muted":"#63708a",
        "--text-mini":"#7a869c",
        "--shadow-sm":"0 4px 10px rgba(0,0,0,.08)",
        "--shadow-md":"0 8px 20px rgba(0,0,0,.08)",
        "--shadow-lg":"0 12px 26px rgba(0,0,0,.14)",
        "--shadow-card":"0 8px 20px rgba(0,0,0,.08)",
        "--shadow-popover":"0 12px 26px rgba(0,0,0,.14)",
        "--input-bg":"#ffffff",
        "--input-border":"rgba(0,0,0,.08)",
        "--input-shadow":"0 4px 10px rgba(0,0,0,.08)",
        "--box-bg":"#ffffff",
        "--box-border":"rgba(0,0,0,.08)",
        "--box-shadow":"0 4px 10px rgba(0,0,0,.08)",
        "--btn-bg":"#f3f7fb",
        "--btn-fg":"#3a4558",
        "--btn-border":"rgba(0,0,0,.08)",
        "--btn-shadow":"0 4px 10px rgba(0,0,0,.08)",
        "--btn-danger-bg":"#ffe8e8",
        "--btn-danger-border":"rgba(220,70,70,.25)",
        "--btn-danger-fg":"#b03030",
        "--btn-danger-shadow":"0 4px 10px rgba(0,0,0,.12)",
        "--pill-bg":"rgba(58,69,88,.06)",
        "--pill-border":"rgba(58,69,88,.15)",
        "--pill-fg":"rgba(58,69,88,.85)",
        "--accent":"#4a9ded",
        "--accent-2":"#e0569c",
        "--success":"#46b86f",
        "--warning":"#e9ba3c",
        "--danger":"#e06b6b",
        "--info":"#4a9ded",
        "--link":"#4a9ded",
        "--ring":"rgba(0,0,0,.08)",
        "--pink":"#e0569c",
        "--orange":"#ff8a3c",
        "--yellow":"#e9ba3c",
        "--green":"#46b86f",
        "--blue":"#4a9ded",
        "--panel":"#ffffff",
        "--card":"#ffffff",
        "--card2":"rgba(0,0,0,.02)",
        "--card-border":"rgba(0,0,0,.08)",
        "--card-shadow":"0 8px 20px rgba(0,0,0,.08)"
      }
    }
    // 将来: ui_light_default, ui_pastel など追加
  };

  const DEFAULT_STAMP_THEME_ID = "default_dots";
  const DEFAULT_UI_THEME_ID = "ui_dark_default";
  // UI theme token registry (fixed list; values change per theme)
  const UI_TOKEN_KEYS = [
    "--bg","--surface-1","--surface-2","--surface-3","--border-subtle","--border-strong",
    "--text-strong","--text-normal","--text-muted","--text-mini","--text","--muted",
    "--shadow-sm","--shadow-md","--shadow-lg","--shadow-card","--shadow-popover",
    "--input-bg","--input-border","--input-shadow","--box-bg","--box-border","--box-shadow",
    "--btn-bg","--btn-fg","--btn-border","--btn-shadow","--btn-danger-bg","--btn-danger-border","--btn-danger-fg","--btn-danger-shadow",
    "--pill-bg","--pill-border","--pill-fg",
    "--accent","--accent-2","--success","--warning","--danger","--info","--link",
    "--ring",
    "--pink","--orange","--yellow","--green","--blue",
    "--panel","--card","--card2","--card-border","--card-shadow",
  ];
  const UI_TOKEN_SET = new Set(UI_TOKEN_KEYS);

  // -- Public --
  function validStampThemeId(themeId){
    return STAMP_THEMES[themeId] ? themeId : DEFAULT_STAMP_THEME_ID;
  }
  function validUiThemeId(themeId){
    return UI_THEMES[themeId] ? themeId : DEFAULT_UI_THEME_ID;
  }

  function resolveStampTheme(themeId){
    const base = normalizeThemeStampDef(STAMP_THEMES[DEFAULT_STAMP_THEME_ID]);
    const raw = STAMP_THEMES[themeId] || base;
    const normalized = normalizeThemeStampDef(raw);
    return {
      id: normalized.id || DEFAULT_STAMP_THEME_ID,
      basePath: normalized.basePath || "",
      hash: normalized.hash || "",
      byMood: normalized.byMood
    };
  }

  function resolveUiTheme(themeId){
    const raw = UI_THEMES[themeId];
    const base = normalizeThemeUiDef(UI_THEMES[DEFAULT_UI_THEME_ID]);
    const targetId = (raw && UI_THEME_SUPPORTED_VERSIONS.includes(raw.schemaVersion || 1)) ? themeId : DEFAULT_UI_THEME_ID;
    const chain = [];
    const visited = new Set();
    let curId = UI_THEMES[targetId] ? targetId : DEFAULT_UI_THEME_ID;
    while (curId && UI_THEMES[curId] && !visited.has(curId)){
      const t = normalizeThemeUiDef(UI_THEMES[curId]);
      chain.unshift(t); // 親を前にしたくて unshift
      visited.add(curId);
      if (UI_THEMES[curId]?.extends && UI_THEMES[UI_THEMES[curId].extends]){
        curId = UI_THEMES[curId].extends;
      } else {
        break;
      }
    }

    let tokens = { ...base.tokens };
    let assets = { ...base.assets };
    let basePath = base.basePath || "";
    for (const t of chain){
      tokens = sanitizeThemeVars(t.tokens || {}, tokens);
      assets = { ...assets, ...(t.assets || {}) };
      if (t.basePath) basePath = t.basePath;
    }

    const resolvedId = targetId || DEFAULT_UI_THEME_ID;
    return { id: resolvedId, tokens, assets, basePath, hash: chain[chain.length-1]?.hash || "" };
  }

  function getStampDef(theme, moodId){
    if (!theme || !moodId) return null;
    return theme.byMood.get(moodId);
  }
  function buildStampIndex(theme){
    const map = new Map();
    for (const mood of STAMP_MOODS){
      const entry = getStampDef(theme, mood);
      if (entry) map.set(mood, entry);
    }
    return map;
  }

  // -- Private --
  function resolveAssetUrl(basePath = "", assetUrl = ""){
    if (!assetUrl) return "";
    try{
      const base = basePath ? new URL(basePath, window.location.href) : new URL(window.location.href);
      return new URL(assetUrl, base).toString();
    } catch {
      if (!basePath) return assetUrl;
      const needsSlash = !basePath.endsWith("/") && !assetUrl.startsWith("/");
      return `${basePath}${needsSlash ? "/" : ""}${assetUrl}`;
    }
  }

  function sanitizeThemeVars(rawVars = {}, fallback = {}){
    const out = { ...fallback };
    if (!rawVars || typeof rawVars !== "object") return out;
    for (const [k,v] of Object.entries(rawVars)){
      if (UI_TOKEN_SET.has(k)){
        out[k] = v;
      }
    }
    return out;
  }

  function normalizeThemeStampDef(def){
    const base = STAMP_THEMES[DEFAULT_STAMP_THEME_ID];
    const schema = def?.schemaVersion;
    if (!STAMP_THEME_SUPPORTED_VERSIONS.includes(schema || 1)){
      return { ...base, id: base.id, name: base.name, schemaVersion: base.schemaVersion, basePath: base.basePath };
    }
    const byMood = new Map();
    const entries = Array.isArray(def?.stamps) ? def.stamps : [];
    for (const mood of STAMP_MOODS){
      const fromDef = entries.find(s => s?.mood === mood) || {};
      const fromBase = (base.stamps || []).find(s => s.mood === mood) || {};
      byMood.set(mood, {
        mood,
        label: fromDef.label || fromBase.label || mood,
        className: fromDef.className || fromBase.className || null,
        color: fromDef.color || fromBase.color || null,
        asset: fromDef.asset || fromBase.asset || null,
        renderMode: fromDef.renderMode || fromBase.renderMode || "color",
        shape: fromDef.shape || fromBase.shape || "circle"
      });
    }
    return {
      id: def?.id || base.id,
      name: def?.name || base.name,
      schemaVersion: def?.schemaVersion || base.schemaVersion || 1,
      basePath: typeof def?.basePath === "string" ? def.basePath : base.basePath || "",
      hash: typeof def?.hash === "string" ? def.hash : (base.hash || ""),
      byMood
    };
  }

  function normalizeThemeUiDef(raw){
    const base = UI_THEMES[DEFAULT_UI_THEME_ID];
    const schema = raw?.schemaVersion || 1;
    if (!raw || !UI_THEME_SUPPORTED_VERSIONS.includes(schema)) return { id: DEFAULT_UI_THEME_ID, tokens: base.cssVars || {}, assets: {}, basePath: "" };
    const tokens = sanitizeThemeVars(raw.cssVars || {}, base.cssVars || {});
    const assets = {};
    for (const k of UI_ASSET_KEYS){
      if (raw.assets && typeof raw.assets[k] === "string") assets[k] = raw.assets[k];
    }
    const basePath = typeof raw.basePath === "string" ? raw.basePath : "";
    const hash = typeof raw.hash === "string" ? raw.hash : "";
    return { id: raw.id || DEFAULT_UI_THEME_ID, tokens, assets, basePath, hash };
  }

  // ===== Domain =====
  // -- Public --
  const LEGACY_STAMP_ID_MAP = {
    dot_pink: "mood_1",
    dot_orange: "mood_2",
    dot_yellow: "mood_3",
    dot_green: "mood_4",
    dot_blue: "mood_5",
    pink: "mood_1",
    orange: "mood_2",
    yellow: "mood_3",
    green: "mood_4",
    blue: "mood_5"
  };

  // Diary Blocks: templates (今は骨格)
  // “instanceId” を持つ設計にして、将来同種ブロック複数に対応できる形にしておく。
  const BLOCK_TEMPLATES = {
    mood: { type:"mood",  defaultName:"今日の気分は？", lockOrder: true,  lockName: true },
    goal: { type:"goal",  defaultName:"今日の目標",     lockOrder: true,  lockName: false },
    todo: { type:"todo",  defaultName:"TODOリスト",     lockOrder: false, lockName: false },
    memo: { type:"memo",  defaultName:"自由メモ",       lockOrder: false, lockName: false },
  };

  // ①mood(固定) ②goal(固定) ③todo ④memo
  function defaultDiaryLayout(){
    return [
      { instanceId: "blk_mood_fixed", type:"mood", name: BLOCK_TEMPLATES.mood.defaultName, visible:true },
      { instanceId: "blk_goal_fixed", type:"goal", name: BLOCK_TEMPLATES.goal.defaultName, visible:true },
      { instanceId: "blk_todo_1",     type:"todo", name: BLOCK_TEMPLATES.todo.defaultName, visible:true },
      { instanceId: "blk_memo_1",     type:"memo", name: BLOCK_TEMPLATES.memo.defaultName, visible:true },
    ];
  }

  function normalizeStampId(stampId){
    if (!stampId) return null;
    if (STAMP_MOODS.includes(stampId)) return stampId;
    if (LEGACY_STAMP_ID_MAP[stampId]) return LEGACY_STAMP_ID_MAP[stampId];
    return null;
  }

  function daysInMonthOf(month){
    return new Date(YEAR, month, 0).getDate();
  }
  function ymd(month, day){
    return `${YEAR}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
  }


  // -- Private --
  function uid(){
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`;
  }

  // ===== App Wiring =====
  // -- State & Elements --
  // elements
  const headerTitleEl = document.getElementById("headerTitle");
  const headerSubEl = document.getElementById("headerSub");
  const prevMonthBtn = document.getElementById("prevMonth");
  const nextMonthBtn = document.getElementById("nextMonth");

  const dowRow = document.getElementById("dowRow");
  const calendarPanel = document.getElementById("calendarPanel");
  const daysEl = document.getElementById("days");

  const diaryWrap = document.getElementById("diaryWrap");
  const slider = document.getElementById("slider");
  const diaryPanel = document.getElementById("diaryPanel");
  const customPanel = document.getElementById("customPanel");

  const diaryDateEl = document.getElementById("diaryDate");
  const diaryStampEl = document.getElementById("diaryStamp");
  const deleteDayBtn = document.getElementById("deleteDay");
  const openCustomizeBtn = document.getElementById("openCustomize");
  const closeCustomizeBtn = document.getElementById("closeCustomize");
  const cancelCustomizeBtn = document.getElementById("cancelCustomize");
  const saveCustomizeBtn = document.getElementById("saveCustomize");

  const diaryBlocksEl = document.getElementById("diaryBlocks");
  const blockListEl = document.getElementById("blockList");

  const inlineConfirm = document.getElementById("inlineConfirm");
  const inlineYes = document.getElementById("inlineYes");
  const inlineNo = document.getElementById("inlineNo");

  const listEl = document.getElementById("list");
  const listBodyEl = document.getElementById("listBody");
  const listBadgeEl = document.getElementById("listBadge");

  const dataEl = document.getElementById("data");
  const yearTotalEl = document.getElementById("yearTotal");
  const toggleBreakdownBtn = document.getElementById("toggleBreakdown");
  const monthBreakdownEl = document.getElementById("monthBreakdown");

  const bulkFrom = document.getElementById("bulkFrom");
  const bulkTo = document.getElementById("bulkTo");
  const bulkExportBtn = document.getElementById("bulkExportBtn");
  const bulkImportFile = document.getElementById("bulkImportFile");
  const bulkImportBtn = document.getElementById("bulkImportBtn");
  const resetAllBtn = document.getElementById("resetAllBtn");
  const resetAppBtn = document.getElementById("resetAppBtn");

  const pickerEl = document.getElementById("picker");
  const caretEl = document.getElementById("caret");

  // theme picker
  const themeOverlay = document.getElementById("themeOverlay");
  const themePanel = document.getElementById("themePanel");
  const themeGrid = document.getElementById("themeGrid");
  const openThemePickerBtn = document.getElementById("openThemePicker");
  const closeThemePickerBtn = document.getElementById("closeThemePicker");
  const applyThemeBtn = document.getElementById("applyThemeBtn");
  let selectedUiThemeId = null;
  let selectedStampThemeId = null;

  const hamburgerBtn = document.getElementById("hamburger");
  const menuOverlay = document.getElementById("menuOverlay");
  const menuSheet = document.getElementById("menuSheet");
  const menuCalendarBtn = document.getElementById("menuCalendar");
  const menuListBtn = document.getElementById("menuList");
  const menuDataBtn = document.getElementById("menuData");

  // ===== Storage =====
  // -- Private --
  function sanitizeMonthData(raw){
    const out = {};
    if (!raw || typeof raw !== "object") return out;
    for (const [k,v] of Object.entries(raw)){
      if (!v || typeof v !== "object") continue;
      const day = { ...v };
      day.stampId = normalizeStampId(day.stampId);
      if (day.stamp !== undefined && day.stampId === undefined){
        day.stampId = normalizeStampId(day.stamp);
        delete day.stamp;
      }
      if (!day.diary || typeof day.diary !== "object"){
        day.diary = { goal:"", todos:[], memo:"" };
      }
      out[k] = day;
    }
    return out;
  }
  function migrateMonthData(raw){
    // 追加項目が出たときはここで変換/補完を行う。現状は sanitize のみ。
    return sanitizeMonthData(raw);
  }
  function migrateSettings(obj){
    // 追加フィールドや形式変更があればここで補正する。
    return {
      stampThemeId: (obj && typeof obj.stampThemeId === "string") ? obj.stampThemeId : DEFAULT_STAMP_THEME_ID,
      uiThemeId: (obj && typeof obj.uiThemeId === "string") ? obj.uiThemeId : DEFAULT_UI_THEME_ID,
      ownedThemeIds: (obj && Array.isArray(obj.ownedThemeIds)) ? obj.ownedThemeIds : [DEFAULT_STAMP_THEME_ID],
      themeByMonth: (obj && typeof obj.themeByMonth === "object" && obj.themeByMonth !== null) ? obj.themeByMonth : {},
      diaryLayout: sanitizeLayout(obj && Array.isArray(obj.diaryLayout) ? obj.diaryLayout : defaultDiaryLayout()),
      schemaVersion: obj?.schemaVersion || APP_SCHEMA_VERSION
    };
  }

  // -- Public --
  function loadStateForMonth(month){
    const raw = window.storageApi.loadMonthData(month) || {};
    return sanitizeMonthData(raw);
  }
  function saveStateForMonth(month, obj){
    window.storageApi.saveMonthData(month, obj);
  }

  // state
  let currentMonth = 1;
  let state = loadStateForMonth(currentMonth);
  let selectedDate = null;
  let pickerDate = null;
  let pickerSource = null;
  let viewMode = "calendar"; // calendar | list | data
  let breakdownOpen = false;

  // settings (theme + diary layout)

  function loadSettings(){
    try {
      const s = window.storageApi.loadSettings();
      const stampThemeId = (typeof s.stampThemeId === "string") ? s.stampThemeId : DEFAULT_STAMP_THEME_ID;
      const uiThemeId = (typeof s.uiThemeId === "string") ? s.uiThemeId : DEFAULT_UI_THEME_ID;
      const ownedThemeIds = Array.isArray(s.ownedThemeIds) ? s.ownedThemeIds : [DEFAULT_STAMP_THEME_ID];
      const themeByMonth = (s && typeof s.themeByMonth === "object" && s.themeByMonth !== null) ? s.themeByMonth : {};
      const diaryLayout = sanitizeLayout(Array.isArray(s.diaryLayout) ? s.diaryLayout : defaultDiaryLayout());
      return { stampThemeId, uiThemeId, ownedThemeIds, themeByMonth, diaryLayout, schemaVersion: APP_SCHEMA_VERSION };
    } catch {
      return {
        stampThemeId: DEFAULT_STAMP_THEME_ID,
        uiThemeId: DEFAULT_UI_THEME_ID,
        ownedThemeIds: [DEFAULT_STAMP_THEME_ID],
        themeByMonth: {},
        diaryLayout: defaultDiaryLayout(),
        schemaVersion: APP_SCHEMA_VERSION
      };
    }
  }
  function saveSettings(obj){
    const payload = {
      stampThemeId: (obj && typeof obj.stampThemeId === "string") ? obj.stampThemeId : DEFAULT_STAMP_THEME_ID,
      uiThemeId: (obj && typeof obj.uiThemeId === "string") ? obj.uiThemeId : DEFAULT_UI_THEME_ID,
      ownedThemeIds: (obj && Array.isArray(obj.ownedThemeIds)) ? obj.ownedThemeIds : [DEFAULT_STAMP_THEME_ID],
      themeByMonth: (obj && typeof obj.themeByMonth === "object" && obj.themeByMonth !== null) ? obj.themeByMonth : {},
      diaryLayout: sanitizeLayout(obj && Array.isArray(obj.diaryLayout) ? obj.diaryLayout : defaultDiaryLayout()),
      schemaVersion: APP_SCHEMA_VERSION
    };
    window.storageApi.saveSettings(payload);
  }
  let settings = loadSettings();
  let resolvedStampTheme = resolveStampTheme(settings.stampThemeId);

  // customize draft (cancelできるように)
  let customizeDraft = null;

  function ensureDiaryLayout(){
    settings.diaryLayout = sanitizeLayout(settings.diaryLayout || defaultDiaryLayout());
    return settings.diaryLayout;
  }

  function getStampThemeIdForMonth(yyyyMm){
    const byMonth = settings.themeByMonth || {};
    if (byMonth && typeof byMonth[yyyyMm] === "string") return byMonth[yyyyMm];
    return settings.stampThemeId || DEFAULT_STAMP_THEME_ID;
  }

  function applyStampTheme(themeId){
    const { id, byMood, basePath } = resolveStampTheme(themeId || settings.stampThemeId);
    settings.stampThemeId = id;
    resolvedStampTheme = { id, byMood, basePath };
    renderStampPickerButtons();
  }

  function applyThemeTokens(themeId, targetEl = document.documentElement, options = {}){
    const { setDataAttr = (targetEl === document.documentElement) } = options;
    const { id, tokens } = resolveUiTheme(themeId);
    for (const key of UI_TOKEN_KEYS){
      if (Object.prototype.hasOwnProperty.call(tokens, key)){
        targetEl.style.setProperty(key, tokens[key]);
      } else {
        targetEl.style.removeProperty(key);
      }
    }
    if (setDataAttr && targetEl === document.documentElement){
      targetEl.setAttribute("data-ui-theme", id);
    }
    return { id, tokens };
  }

  function applyUiTheme(themeId){
    const { id } = applyThemeTokens(themeId || settings.uiThemeId);
    settings.uiThemeId = id;
  }

  function ensureDay(dateKey){
    if (!state[dateKey]) state[dateKey] = { stampId: null, diary: { goal:"", todos: [], memo:"" } };

    if (state[dateKey].stamp !== undefined && state[dateKey].stampId === undefined){
      const legacy = state[dateKey].stamp;
      state[dateKey].stampId = normalizeStampId(legacy);
      delete state[dateKey].stamp;
    }
    if (state[dateKey].stampId !== undefined){
      state[dateKey].stampId = normalizeStampId(state[dateKey].stampId);
    } else {
      state[dateKey].stampId = null;
    }

    if (!state[dateKey].diary) state[dateKey].diary = { goal:"", todos: [], memo:"" };

    const d = state[dateKey].diary;
    if (typeof d.goal !== "string") d.goal = "";
    if (!Array.isArray(d.todos)) d.todos = [];
    if (typeof d.memo !== "string") d.memo = "";

    if (d.todos.length === 0){
      d.todos = [
        { id: uid(), done:false, text:"" },
        { id: uid(), done:false, text:"" },
        { id: uid(), done:false, text:"" },
      ];
    } else {
      d.todos = d.todos.map(t => ({
        id: (t && typeof t.id === "string") ? t.id : uid(),
        done: !!(t && t.done),
        text: (t && typeof t.text === "string") ? t.text : ""
      }));
    }
  }
  function persist(){
    saveStateForMonth(currentMonth, state);
  }

  function resolveStampEntryForId(stampId){
    const moodId = normalizeStampId(stampId);
    return moodId ? getStampDef(resolvedStampTheme, moodId) : null;
  }

  // goal preview condition
  function shouldShowGoalPreview(){
    return window.matchMedia("(min-width: 760px)").matches;
  }
  window.addEventListener("resize", () => renderCalendar());

  function goalPreviewText(goal){
    const s = (goal || "").trim();
    return s || "";
  }

  // -- Private --
  // header by view
  function updateHeader(){
    if (viewMode === "data"){
      headerTitleEl.textContent = "データ管理";
      headerSubEl.textContent = "書き出し・読み込み・リセット";
      prevMonthBtn.classList.add("hidden");
      nextMonthBtn.classList.add("hidden");
    } else if (viewMode === "list"){
      headerTitleEl.textContent = `${YEAR}年${currentMonth}月 日記一覧`;
      headerSubEl.textContent = "1日〜月末";
      prevMonthBtn.classList.remove("hidden");
      nextMonthBtn.classList.remove("hidden");
    } else {
      headerTitleEl.textContent = `${YEAR}年${currentMonth}月`;
      headerSubEl.textContent = "丸タップでスタンプ / 日付タップで日記";
      prevMonthBtn.classList.remove("hidden");
      nextMonthBtn.classList.remove("hidden");
    }

    prevMonthBtn.disabled = currentMonth <= MIN_MONTH;
    nextMonthBtn.disabled = currentMonth >= MAX_MONTH;
  }

  // -- Public --
  function setView(mode){
    viewMode = mode;
    hidePicker();
    hideInlineConfirm();
    closeCustomize(false);

    const calendarVisible = (mode !== "data");
    dowRow.classList.toggle("hidden", !calendarVisible);
    calendarPanel.classList.toggle("hidden", !calendarVisible);

    listEl.classList.remove("show");
    dataEl.classList.remove("show");

    // diaryWrap visibility (calendar or list only when diary opened)
    if (mode === "calendar"){
      if (selectedDate){
        diaryWrap.style.display = "";
        diaryPanel.classList.add("show");
        customPanel.classList.remove("show"); // 普段は出さない
      } else {
        diaryWrap.style.display = "none";
      }
    } else {
      diaryWrap.style.display = "none";
    }

    if (mode === "list"){
      listEl.classList.add("show");
      renderList();
    } else if (mode === "data"){
      dataEl.classList.add("show");
      bulkFrom.value = String(currentMonth);
      bulkTo.value = String(currentMonth);
      renderYearStats();
    }

    updateHeader();
  }

  // month
  function changeMonth(nextMonth){
    if (nextMonth < MIN_MONTH || nextMonth > MAX_MONTH) return;

    hidePicker();
    hideInlineConfirm();
    closeCustomize(false);

    selectedDate = null;
    viewMode = "calendar";

    currentMonth = nextMonth;
    state = loadStateForMonth(currentMonth);

    applyStampTheme(getStampThemeIdForMonth(`${YEAR}-${String(currentMonth).padStart(2,'0')}`));
    renderCalendar();
    setView("calendar");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  prevMonthBtn.addEventListener("click", () => changeMonth(currentMonth - 1));
  nextMonthBtn.addEventListener("click", () => changeMonth(currentMonth + 1));

  // menu
  function closeMenu(){
    menuOverlay.classList.remove("show");
    menuSheet.classList.remove("show");
  }
  function openMenu(){
    menuOverlay.classList.add("show");
    menuSheet.classList.add("show");
  }
  hamburgerBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (menuSheet.classList.contains("show")) closeMenu();
    else openMenu();
  });
  menuOverlay.addEventListener("click", closeMenu);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });

  menuCalendarBtn.addEventListener("click", () => { closeMenu(); setView("calendar"); });
  menuListBtn.addEventListener("click", () => { closeMenu(); setView("list"); });
  menuDataBtn.addEventListener("click", () => { closeMenu(); setView("data"); });

  // picker
  function hidePicker(){
    pickerEl.classList.remove("show");
    caretEl.classList.remove("show");
    pickerDate = null;
    pickerSource = null;
  }

  function showPickerNear(el, dateKey, source){
    pickerDate = dateKey;
    pickerSource = source;

    pickerEl.classList.add("show");
    caretEl.classList.add("show");

    const r = el.getBoundingClientRect();
    const pr = pickerEl.getBoundingClientRect();
    const caretSize = 10;

    let left = r.left + r.width/2 - pr.width/2;
    left = Math.max(8, Math.min(left, window.innerWidth - pr.width - 8));

    let top = r.top - pr.height - 12;
    let caretTop = r.top - caretSize/2 - 6;

    if (top < 8){
      top = r.bottom + 12;
      caretTop = r.bottom + 6;
    }

    pickerEl.style.left = `${left}px`;
    pickerEl.style.top = `${top}px`;

    const caretLeft = r.left + r.width/2 - caretSize/2;
    caretEl.style.left = `${caretLeft}px`;
    caretEl.style.top = `${caretTop}px`;
  }

  // ===== Render =====
  // -- Public --
  function renderStampPickerButtons(){
    const row = pickerEl.querySelector(".pickerRow");
    const miniDot = pickerEl.querySelector(".pickerTitle .miniDot");
    if (!row) return;
    row.innerHTML = "";
    const map = buildStampIndex(resolvedStampTheme);
    for (const mood of STAMP_MOODS){
      const entry = map.get(mood) || null;
      const b = document.createElement("button");
      b.type = "button";
      b.dataset.stamp = mood;
      b.setAttribute("aria-label", entry?.label || mood);
      renderStamp(b, entry, { baseClass: "pick", basePath: resolvedStampTheme.basePath });
      row.appendChild(b);
    }
    if (miniDot){
      const first = map.get(STAMP_MOODS[0]);
      renderStamp(miniDot, first || null, { baseClass: "miniDot", basePath: resolvedStampTheme.basePath });
    }
  }

  // entry is resolved by caller; this stays entry-only.
  function renderStamp(el, entry, ctx = {}){
    const { baseClass = "", basePath = "" } = ctx;
    el.className = baseClass;
    el.style.backgroundColor = "";
    el.style.backgroundImage = "";
    el.style.backgroundSize = "";
    el.style.backgroundRepeat = "";
    el.style.backgroundPosition = "";
    // remove existing img-tag if any
    const oldImg = el.querySelector(".stampImg");
    if (oldImg) oldImg.remove();
    if (!entry) return;

    const cls = entry.className;
    const col = entry.color;
    const shape = entry.shape || "circle";
    const assetUrl = entry.asset ? resolveAssetUrl(basePath, entry.asset) : "";
    const mode = entry.renderMode || "color";

    if (cls) el.classList.add(cls);
    if (shape) el.classList.add(`shape-${shape}`);

    if (mode === "img-tag" && assetUrl){
      const img = document.createElement("img");
      img.className = "stampImg";
      img.decoding = "async";
      img.loading = "lazy";
      img.src = assetUrl;
      el.appendChild(img);
      el.classList.add("filled");
      return;
    }

    if (mode === "image-bg" && assetUrl){
      el.style.backgroundImage = `url("${assetUrl}")`;
      el.style.backgroundSize = "contain";
      el.style.backgroundRepeat = "no-repeat";
      el.style.backgroundPosition = "center";
      el.classList.add("filled");
      return;
    }

    // fallback: color
    if (col){
      el.style.backgroundColor = col;
      el.classList.add("filled");
    } else if (cls){
      el.classList.add("filled");
    }
  }

  function applyStamp(dateKey, stampIdOrNull){
    ensureDay(dateKey);
    state[dateKey].stampId = normalizeStampId(stampIdOrNull);
    persist();

    renderCalendar();
    if (selectedDate === dateKey){
      setDiaryStampFromDate(dateKey);
      renderDiaryBlocks(); // mood widget + any preview sync
    }
    if (viewMode === "list") renderList();
    if (viewMode === "data") renderYearStats();
  }

  pickerEl.addEventListener("click", (e) => {
    const b = e.target.closest("button[data-stamp]");
    if (!b || !pickerDate) return;

    const dateKey = pickerDate;
    const stampId = b.getAttribute("data-stamp");

    ensureDay(dateKey);
    const next = (state[dateKey].stampId === stampId) ? null : stampId;

    hidePicker();
    applyStamp(dateKey, next);
  });

  document.addEventListener("pointerdown", (e) => {
    const inPicker = e.target.closest("#picker");
    const isDot = e.target.closest(".dot") || e.target.closest("#diaryStamp");
    if (!inPicker && !isDot) hidePicker();
  });

  function setDiaryStampFromDate(dateKey){
    ensureDay(dateKey);
    const stampId = state[dateKey].stampId;
    const entry = resolveStampEntryForId(stampId);
    renderStamp(diaryStampEl, entry, { baseClass: "diaryStamp", basePath: resolvedStampTheme.basePath });
  }
  function setMiniStampClass(el, stampId){
    const entry = resolveStampEntryForId(stampId);
    renderStamp(el, entry, { baseClass: "miniStamp", basePath: resolvedStampTheme.basePath });
  }

  // render calendar (dynamic weeks)
  function renderCalendar(){
    daysEl.innerHTML = "";

    const first = new Date(YEAR, currentMonth - 1, 1);
    const dim = daysInMonthOf(currentMonth);
    const firstDow = first.getDay();

    const cellsNeeded = firstDow + dim;
    const weeks = Math.ceil(cellsNeeded / 7);
    const totalCells = weeks * 7;

    const showGoal = shouldShowGoalPreview();

    for (let i=0; i<totalCells; i++){
      const day = i - firstDow + 1;
      const inMonth = day >= 1 && day <= dim;

      const cell = document.createElement("div");
      cell.className = "cell" + (inMonth ? "" : " empty");

      const num = document.createElement("div");
      num.className = "daynum";
      num.textContent = inMonth ? String(day) : "";
      cell.appendChild(num);

      if (inMonth){
        const key = ymd(currentMonth, day);
        ensureDay(key);

        if (key === selectedDate) cell.classList.add("selected");

        if (showGoal){
          const g = (state[key].diary && typeof state[key].diary.goal === "string") ? state[key].diary.goal : "";
          const pv = goalPreviewText(g);
          const pvEl = document.createElement("div");
          pvEl.className = "goalPreview show" + (pv ? "" : " empty");
          pvEl.textContent = pv || "—";
          cell.appendChild(pvEl);
        }

        cell.addEventListener("click", () => {
          hidePicker();
          openDiary(key);
        });

        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "dot";
        dot.setAttribute("aria-label", `${key} スタンプ`);

        const entry = resolveStampEntryForId(state[key].stampId);
        renderStamp(dot, entry, { baseClass: "dot", basePath: resolvedStampTheme.basePath });

        dot.addEventListener("click", (e) => {
          e.stopPropagation();
          if (pickerEl.classList.contains("show") && pickerDate === key && pickerSource === "calendar"){
            hidePicker();
          } else {
            showPickerNear(dot, key, "calendar");
          }
        });

        cell.appendChild(dot);
      }

      daysEl.appendChild(cell);
    }
  }

  // diary open
  function openDiary(dateKey){
    selectedDate = dateKey;
    ensureDay(dateKey);
    persist();

    diaryWrap.style.display = "";
    diaryPanel.classList.add("show");
　　customPanel.classList.remove("show"); // 普段は出さない

    slider.classList.remove("customize");

    setView("calendar");
    diaryDateEl.textContent = dateKey;
    setDiaryStampFromDate(dateKey);

    renderDiaryBlocks();
    renderCalendar();

    if (window.matchMedia("(max-width: 640px)").matches){
      const rect = diaryWrap.getBoundingClientRect();
      if (rect.top > window.innerHeight * 0.75){
        window.scrollTo({ top: window.scrollY + (rect.top - window.innerHeight * 0.55), behavior: "smooth" });
      }
    }
  }

  // ===== Diary Blocks Rendering (based on settings.diaryLayout) =====
  function renderDiaryBlocks(){
    if (!selectedDate) return;
    ensureDay(selectedDate);
    ensureDiaryLayout();

    diaryBlocksEl.innerHTML = "";

    const layout = settings.diaryLayout || [];
    for (const blk of layout){
      if (!blk || !blk.visible) continue;

      if (blk.type === "mood"){
        diaryBlocksEl.appendChild(renderMoodBlock(blk));
      } else if (blk.type === "goal"){
        diaryBlocksEl.appendChild(renderGoalBlock(blk));
      } else if (blk.type === "todo"){
        diaryBlocksEl.appendChild(renderTodoBlock(blk));
      } else if (blk.type === "memo"){
        diaryBlocksEl.appendChild(renderMemoBlock(blk));
      }
    }
  }

  // -- Private --
  function renderMoodBlock(blk){
    const wrap = document.createElement("div");
    wrap.className = "moodWidget";

    const title = document.createElement("div");
    title.className = "moodTitle";
    title.textContent = "今日の気分は？";
    wrap.appendChild(title);

    const row = document.createElement("div");
    row.className = "moodRow";

    const current = state[selectedDate].stampId;

    if (current) row.classList.add("hasSelection");

    for (const mood of STAMP_MOODS){
      const entry = getStampDef(resolvedStampTheme, mood) || { label: mood };
      const b = document.createElement("button");
      b.type = "button";
      renderStamp(b, entry, { baseClass: "moodPick", basePath: resolvedStampTheme.basePath });
      b.setAttribute("aria-label", entry.label || mood);

      if (current && current === mood){
        b.classList.add("isSelected");
      }

      b.addEventListener("click", () => {
        const next = (state[selectedDate].stampId === mood) ? null : mood;
        applyStamp(selectedDate, next);
      });

      row.appendChild(b);
    }

    wrap.appendChild(row);
    return wrap;
  }

  function renderGoalBlock(blk){
    const section = document.createElement("div");
    section.className = "section";

    const head = document.createElement("div");
    head.className = "sectionHead";

    const left = document.createElement("div");
    left.className = "sectionTitle";
    left.innerHTML = `② ${escapeHtml(blk.name || "今日の目標")} <span class="chip">固定</span>`;
    head.appendChild(left);

    section.appendChild(head);

    const input = document.createElement("input");
    input.className = "goal";
    input.type = "text";
    input.placeholder = "1行で入力（自動保存）";
    input.value = state[selectedDate].diary.goal || "";

    input.addEventListener("input", () => {
      ensureDay(selectedDate);
      state[selectedDate].diary.goal = input.value || "";
      persist();
      renderCalendar();
      if (viewMode === "list") renderList();
      if (viewMode === "data") renderYearStats();
    });

    section.appendChild(input);
    return section;
  }

  function renderTodoBlock(blk){
    const section = document.createElement("div");
    section.className = "section";

    const head = document.createElement("div");
    head.className = "sectionHead";

    const title = document.createElement("div");
    title.className = "sectionTitle";
    title.textContent = `③ ${blk.name || "TODOリスト"}`;
    head.appendChild(title);

    const addBtn = document.createElement("button");
    addBtn.className = "btn";
    addBtn.type = "button";
    addBtn.textContent = "＋";
    addBtn.style.padding = "8px 10px";
    addBtn.style.borderRadius = "12px";
    head.appendChild(addBtn);

    section.appendChild(head);

    const list = document.createElement("div");
    list.className = "todoList";
    section.appendChild(list);

    function renderTodos(){
      ensureDay(selectedDate);
      const todos = state[selectedDate].diary.todos;
      list.innerHTML = "";

      for (const t of todos){
        const row = document.createElement("div");
        row.className = "todoRow";

        const chk = document.createElement("input");
        chk.type = "checkbox";
        chk.checked = !!t.done;

        const txt = document.createElement("input");
        txt.type = "text";
        txt.className = "todoText";
        txt.value = t.text || "";
        txt.placeholder = "TODO";

        const del = document.createElement("button");
        del.type = "button";
        del.className = "todoDel";
        del.textContent = "－";
        del.setAttribute("aria-label", "この行を削除");

        txt.addEventListener("focus", () => row.classList.add("showDel"));
        txt.addEventListener("blur", () => setTimeout(() => row.classList.remove("showDel"), 120));

        chk.addEventListener("change", () => {
          ensureDay(selectedDate);
          const dd = state[selectedDate].diary;
          const item = dd.todos.find(x => x.id === t.id);
          if (!item) return;
          item.done = chk.checked;
          persist();
          if (viewMode === "list") renderList();
        });

        txt.addEventListener("input", () => {
          ensureDay(selectedDate);
          const dd = state[selectedDate].diary;
          const item = dd.todos.find(x => x.id === t.id);
          if (!item) return;
          item.text = txt.value || "";
          persist();
          if (viewMode === "list") renderList();
        });

        del.addEventListener("click", () => {
          ensureDay(selectedDate);
          const dd = state[selectedDate].diary;
          dd.todos = dd.todos.filter(x => x.id !== t.id);
          if (dd.todos.length === 0){
            dd.todos = [{ id: uid(), done:false, text:"" }];
          }
          persist();
          renderTodos();
          if (viewMode === "list") renderList();
        });

        row.appendChild(chk);
        row.appendChild(txt);
        row.appendChild(del);
        list.appendChild(row);
      }
    }

    addBtn.addEventListener("click", () => {
      ensureDay(selectedDate);
      state[selectedDate].diary.todos.push({ id: uid(), done:false, text:"" });
      persist();
      renderTodos();
      if (viewMode === "list") renderList();
      list.lastElementChild?.querySelector("input.todoText")?.focus();
    });

    renderTodos();
    return section;
  }

  function renderMemoBlock(blk){
    const section = document.createElement("div");
    section.className = "section";

    const head = document.createElement("div");
    head.className = "sectionHead";

    const title = document.createElement("div");
    title.className = "sectionTitle";
    title.textContent = `④ ${blk.name || "自由メモ"}`;
    head.appendChild(title);

    section.appendChild(head);

    const ta = document.createElement("textarea");
    ta.className = "memo";
    ta.placeholder = "数行メモ（自動保存）";
    ta.value = state[selectedDate].diary.memo || "";

    ta.addEventListener("input", () => {
      ensureDay(selectedDate);
      state[selectedDate].diary.memo = ta.value || "";
      persist();
      if (viewMode === "list") renderList();
      if (viewMode === "data") renderYearStats();
    });

    section.appendChild(ta);
    return section;
  }

  function escapeHtml(s){
    return String(s || "")
      .replaceAll("&","&amp;")
      .replaceAll("<","&lt;")
      .replaceAll(">","&gt;")
      .replaceAll('"',"&quot;")
      .replaceAll("'","&#039;");
  }

  // diary stamp dot picker (small dot in header)
  diaryStampEl.addEventListener("click", (e) => {
    if (!selectedDate) return;
    e.stopPropagation();
    if (pickerEl.classList.contains("show") && pickerDate === selectedDate && pickerSource === "diaryDot"){
      hidePicker();
    } else {
      showPickerNear(diaryStampEl, selectedDate, "diaryDot");
    }
  });

  // inline confirm delete-day
  function showInlineConfirm(){ inlineConfirm.classList.add("show"); }
  function hideInlineConfirm(){ inlineConfirm.classList.remove("show"); }

  deleteDayBtn.addEventListener("click", () => {
    if (!selectedDate) return;
    if (inlineConfirm.classList.contains("show")) hideInlineConfirm();
    else showInlineConfirm();
  });
  inlineNo.addEventListener("click", hideInlineConfirm);
  inlineYes.addEventListener("click", () => {
    if (!selectedDate) return;
    const key = selectedDate;
    delete state[key];
    persist();
    selectedDate = null;
    diaryWrap.style.display = "none";
    hideInlineConfirm();
    renderCalendar();
    if (viewMode === "list") renderList();
    if (viewMode === "data") renderYearStats();
  });

  // ===== Customize Panel (骨格) =====
  function openCustomize(){
    if (!selectedDate) return;
    customizeDraft = JSON.parse(JSON.stringify(ensureDiaryLayout()));
    renderCustomizeList();
    slider.classList.add("customize");
  }
  function closeCustomize(commit){
    if (!customizeDraft) {
      slider.classList.remove("customize");
      return;
    }
    if (commit){
      settings.diaryLayout = sanitizeLayout(customizeDraft);
      saveSettings(settings);
      renderDiaryBlocks();
    }
    customizeDraft = null;
    slider.classList.remove("customize");
  }

  function sanitizeLayout(layout){
    // mood must be 1st, goal must be 2nd
    const safe = Array.isArray(layout) ? layout.filter(Boolean) : [];
    const mood = safe.find(b => b.type === "mood") || { instanceId:"blk_mood_fixed", type:"mood", name:BLOCK_TEMPLATES.mood.defaultName, visible:true };
    const goal = safe.find(b => b.type === "goal") || { instanceId:"blk_goal_fixed", type:"goal", name:BLOCK_TEMPLATES.goal.defaultName, visible:true };

    // remove duplicates of mood/goal (keep first)
    const rest = safe.filter(b => b.type !== "mood" && b.type !== "goal");

    // normalize fields
    function norm(b){
      const t = BLOCK_TEMPLATES[b.type];
      return {
        instanceId: (typeof b.instanceId === "string") ? b.instanceId : uid(),
        type: b.type,
        name: (typeof b.name === "string" && b.name.trim()) ? b.name.trim() : (t?.defaultName || b.type),
        visible: (b.visible !== false)
      };
    }

    const out = [norm(mood), norm(goal), ...rest.map(norm)];

    // enforce lockName for mood
    out[0].name = BLOCK_TEMPLATES.mood.defaultName;

    return out;
  }

  function renderCustomizeList(){
    if (!customizeDraft) return;
    blockListEl.innerHTML = "";

    // ensure lock positions in UI as well
    customizeDraft = sanitizeLayout(customizeDraft);

    for (let i=0; i<customizeDraft.length; i++){
      const blk = customizeDraft[i];
      const tpl = BLOCK_TEMPLATES[blk.type];

      const card = document.createElement("div");
      card.className = "blockCard";

      const top = document.createElement("div");
      top.className = "blockTop";

      const name = document.createElement("div");
      name.className = "blockName";

      const title = document.createElement("strong");
      title.textContent = blk.name || tpl?.defaultName || blk.type;

      name.appendChild(title);

      if (tpl?.lockOrder){
        const lock = document.createElement("span");
        lock.className = "lockTag";
        lock.textContent = "固定";
        name.appendChild(lock);
      }

      top.appendChild(name);

      const actions = document.createElement("div");
      actions.className = "blockActions";

      // rename (pencil) - mood不可
      const renameBtn = document.createElement("button");
      renameBtn.className = "tinyBtn";
      renameBtn.type = "button";
      renameBtn.title = "名前を編集";
      renameBtn.innerHTML = "✎";
      renameBtn.disabled = !!tpl?.lockName;

      // up/down (mood+goal fixed)
      const upBtn = document.createElement("button");
      upBtn.className = "tinyBtn";
      upBtn.type = "button";
      upBtn.title = "上へ";
      upBtn.textContent = "↑";
      upBtn.disabled = (i <= 2); // 0 mood,1 goal fixed, index2 is first movable
      if (tpl?.lockOrder) upBtn.disabled = true;

      const downBtn = document.createElement("button");
      downBtn.className = "tinyBtn";
      downBtn.type = "button";
      downBtn.title = "下へ";
      downBtn.textContent = "↓";
      downBtn.disabled = (i >= customizeDraft.length - 1);
      if (tpl?.lockOrder) downBtn.disabled = true;

      actions.appendChild(renameBtn);
      actions.appendChild(upBtn);
      actions.appendChild(downBtn);

      top.appendChild(actions);
      card.appendChild(top);

      const bottom = document.createElement("div");
      bottom.className = "blockBottom";

      const sw = document.createElement("label");
      sw.className = "switch";
      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.checked = blk.visible !== false;
      cb.disabled = (blk.type === "mood" || blk.type === "goal"); // 仕様：削除不可・固定表示（まずは）
      const span = document.createElement("span");
      span.textContent = cb.disabled ? "表示（固定）" : "表示";
      sw.appendChild(cb);
      sw.appendChild(span);

      bottom.appendChild(sw);
      card.appendChild(bottom);

      const renameRow = document.createElement("div");
      renameRow.className = "renameRow";

      const renameInput = document.createElement("input");
      renameInput.type = "text";
      renameInput.value = blk.name || "";
      renameInput.placeholder = "ブロック名";

      const renameOk = document.createElement("button");
      renameOk.className = "btn";
      renameOk.type = "button";
      renameOk.textContent = "保存";
      renameOk.style.minWidth = "90px";

      renameRow.appendChild(renameInput);
      renameRow.appendChild(renameOk);

      card.appendChild(renameRow);

      // events
      renameBtn.addEventListener("click", () => {
        renameRow.classList.toggle("show");
        if (renameRow.classList.contains("show")) renameInput.focus();
      });

      renameOk.addEventListener("click", () => {
        blk.name = (renameInput.value || "").trim() || (tpl?.defaultName || blk.type);
        // mood name lock
        if (blk.type === "mood") blk.name = BLOCK_TEMPLATES.mood.defaultName;
        renderCustomizeList();
      });

      upBtn.addEventListener("click", () => {
        if (i <= 2) return;
        const tmp = customizeDraft[i-1];
        customizeDraft[i-1] = customizeDraft[i];
        customizeDraft[i] = tmp;
        renderCustomizeList();
      });

      downBtn.addEventListener("click", () => {
        if (i >= customizeDraft.length - 1) return;
        const tmp = customizeDraft[i+1];
        customizeDraft[i+1] = customizeDraft[i];
        customizeDraft[i] = tmp;
        renderCustomizeList();
      });

      cb.addEventListener("change", () => {
        blk.visible = cb.checked;
      });

      blockListEl.appendChild(card);
    }
  }

  openCustomizeBtn.addEventListener("click", () => {
    if (!selectedDate) return;

    calendarPanel.classList.add("hidden");
    dowRow.classList.add("hidden");

    customPanel.classList.add("show");
    openCustomize();
  });

  function exitCustomizeAndShowCalendar(){
  calendarPanel.classList.remove("hidden");
  dowRow.classList.remove("hidden");
  customPanel.classList.remove("show"); // ←追加
}

  closeCustomizeBtn.addEventListener("click", () => {
    closeCustomize(false);
    exitCustomizeAndShowCalendar();
  });
  cancelCustomizeBtn.addEventListener("click", () => {
    closeCustomize(false);
    exitCustomizeAndShowCalendar();
  });
  saveCustomizeBtn.addEventListener("click", () => {
    closeCustomize(true);
    ensureDiaryLayout();
    exitCustomizeAndShowCalendar();
  });

  // ===== UI Theme Picker =====
  function showThemePicker(){
    selectedUiThemeId = null;
    selectedStampThemeId = null;
    renderThemeGrid();
    themeOverlay.classList.add("show");
    themePanel.classList.add("show");
    applyThemeBtn.classList.remove("themeApplyActive");
  }
  function hideThemePicker(){
    themeOverlay.classList.remove("show");
    themePanel.classList.remove("show");
  }

  function renderThemeGrid(){
    themeGrid.innerHTML = "";
    const uiTitle = document.createElement("div");
    uiTitle.className = "themeSectionTitle";
    uiTitle.textContent = "デフォルトデザインテーマ";
    themeGrid.appendChild(uiTitle);

    const uiEntries = Object.values(UI_THEMES);
    for (const t of uiEntries){
      const card = document.createElement("div");
      card.className = "themeCard" + (t.id === selectedUiThemeId ? " selected" : "");

      // カードのルートにテーマトークンを注入（サムネ内部だけそのテーマ色で描画）
      applyThemeTokens(t.id, card, { setDataAttr: false });

      const thumb = document.createElement("div");
      thumb.className = "themeThumb";

      const header = document.createElement("div");
      header.className = "thumbHeader";
      const prevBtn = document.createElement("div");
      prevBtn.className = "thumbHeaderBtn";
      prevBtn.textContent = "<";
      const headerTitle = document.createElement("div");
      headerTitle.className = "thumbHeaderTitle";
      headerTitle.textContent = `${YEAR}年${String(currentMonth).padStart(2,"0")}月`;
      const nextBtn = document.createElement("div");
      nextBtn.className = "thumbHeaderBtn";
      nextBtn.textContent = ">";
      header.appendChild(prevBtn);
      header.appendChild(headerTitle);
      header.appendChild(nextBtn);

      const body = document.createElement("div");
      body.className = "thumbBody";

      // calendar side
      const cal = document.createElement("div");
      cal.className = "thumbCalendar";
      const calRow = document.createElement("div");
      calRow.className = "thumbCalRow";
      for (let i=0;i<8;i++){
        const day = document.createElement("div");
        day.className = "thumbDay" + (i===2 ? " selected" : "");
        const dayDate = document.createElement("div");
        dayDate.className = "thumbDayDate";
        dayDate.textContent = String(24 + i);
        day.appendChild(dayDate);
        if (i===2){
          const dayStamp = document.createElement("div");
          dayStamp.className = "thumbDayStamp";
          day.appendChild(dayStamp);
        }
        calRow.appendChild(day);
      }
      cal.appendChild(calRow);

      // diary side
      const content = document.createElement("div");
      content.className = "thumbContent";
      const diaryCard = document.createElement("div");
      diaryCard.className = "thumbDiaryCard";

      const diaryTop = document.createElement("div");
      diaryTop.className = "thumbDiaryTop";
      const diaryStamp = document.createElement("div");
      diaryStamp.className = "thumbDiaryStamp";
      const diaryDate = document.createElement("div");
      diaryDate.textContent = `${YEAR}-${String(currentMonth).padStart(2,"0")}-26`;
      diaryTop.appendChild(diaryStamp);
      diaryTop.appendChild(diaryDate);

      const moodRow = document.createElement("div");
      moodRow.className = "thumbMoodRow";
      STAMP_MOODS.forEach((mood) => {
        const dot = document.createElement("div");
        const entry = getStampDef(resolvedStampTheme, mood);
        renderStamp(dot, entry, { baseClass: "thumbMoodDot", basePath: resolvedStampTheme.basePath });
        moodRow.appendChild(dot);
      });

      const goalField = document.createElement("div");
      goalField.className = "thumbField";
      goalField.textContent = "今日の目標";

      const todoList = document.createElement("div");
      todoList.className = "thumbTodoList";
      const todoData = [
        { text: "TODO", done: true },
        { text: "TODO", done: false },
        { text: "TODO", done: false }
      ];
      todoData.forEach(item => {
        const row = document.createElement("div");
        row.className = "thumbTodoRow";
        const cb = document.createElement("div");
        cb.className = "thumbTodoCheck" + (item.done ? " checked" : "");
        const todo = document.createElement("div");
        todo.className = "thumbTodo";
        todo.textContent = item.text;
        row.appendChild(cb);
        row.appendChild(todo);
        todoList.appendChild(row);
      });

      const memoField = document.createElement("div");
      memoField.className = "thumbMemo";
      memoField.textContent = "メモ（自動保存）";

      diaryCard.appendChild(diaryTop);
      diaryCard.appendChild(moodRow);
      diaryCard.appendChild(goalField);
      diaryCard.appendChild(todoList);
      diaryCard.appendChild(memoField);

      content.appendChild(diaryCard);

      body.appendChild(cal);
      body.appendChild(content);

      thumb.appendChild(header);
      thumb.appendChild(body);

      const name = document.createElement("div");
      name.className = "themeName";
      name.textContent = t.name || t.id;

      card.appendChild(thumb);
      card.appendChild(name);

      card.addEventListener("click", () => {
        selectedUiThemeId = t.id;
        applyThemeBtn.classList.toggle("themeApplyActive", !!(selectedUiThemeId || selectedStampThemeId));
        renderThemeGrid();
      });

      themeGrid.appendChild(card);
    }

    // stamp themes
    const stampTitle = document.createElement("div");
    stampTitle.className = "themeSectionTitle";
    stampTitle.textContent = "デフォルトスタンプテーマ";
    themeGrid.appendChild(stampTitle);

    const stampEntries = Object.values(STAMP_THEMES);
    for (const t of stampEntries){
      const card = document.createElement("div");
      card.className = "stampCard" + (t.id === selectedStampThemeId ? " selected" : "");

      const thumb = document.createElement("div");
      thumb.className = "stampThumb";

      const dotsRow = document.createElement("div");
      dotsRow.className = "stampDotsRow";
      const normalized = normalizeThemeStampDef(t);
      STAMP_MOODS.forEach((mood) => {
        const dot = document.createElement("div");
        const entry = normalized.byMood.get(mood);
        renderStamp(dot, entry, { baseClass: "stampPreviewDot", basePath: normalized.basePath });
        dotsRow.appendChild(dot);
      });
      thumb.appendChild(dotsRow);

      const name = document.createElement("div");
      name.className = "themeName";
      name.textContent = t.name || t.id;

      card.appendChild(thumb);
      card.appendChild(name);

      card.addEventListener("click", () => {
        selectedStampThemeId = t.id;
        applyThemeBtn.classList.toggle("themeApplyActive", !!(selectedUiThemeId || selectedStampThemeId));
        renderThemeGrid();
      });

      themeGrid.appendChild(card);
    }

    applyThemeBtn.classList.toggle("themeApplyActive", !!(selectedUiThemeId || selectedStampThemeId));
  }

  openThemePickerBtn.addEventListener("click", () => {
    hidePicker();
    hideInlineConfirm();
    showThemePicker();
  });
  closeThemePickerBtn.addEventListener("click", hideThemePicker);
  applyThemeBtn.addEventListener("click", () => {
    if (!selectedUiThemeId && !selectedStampThemeId) return;
    if (selectedUiThemeId){
      settings.uiThemeId = validUiThemeId(selectedUiThemeId);
      applyUiTheme(settings.uiThemeId);
    }
    if (selectedStampThemeId){
      settings.stampThemeId = validStampThemeId(selectedStampThemeId);
      if (!settings.themeByMonth || typeof settings.themeByMonth !== "object") settings.themeByMonth = {};
      const monthKey = `${YEAR}-${String(currentMonth).padStart(2,"0")}`;
      settings.themeByMonth[monthKey] = settings.stampThemeId;
      applyStampTheme(settings.stampThemeId);
    }
    saveSettings(settings);
    renderCalendar();
    if (selectedDate){
      renderDiaryBlocks();
      setDiaryStampFromDate(selectedDate);
    }
    if (viewMode === "list") renderList();
    if (viewMode === "data") renderYearStats();
    hideThemePicker();
  });

  // list
  function escapePreview(s){ return (s || "").slice(0, 160); }

  function renderList(){
    const dim = daysInMonthOf(currentMonth);
    let filledCount = 0;
    listBodyEl.innerHTML = "";

    for (let day=1; day<=dim; day++){
      const key = ymd(currentMonth, day);
      ensureDay(key);

      const item = document.createElement("div");
      item.className = "listItem";

      const head = document.createElement("div");
      head.className = "listItemHead";

      const left = document.createElement("div");
      left.className = "listLeft";

      const stamp = document.createElement("div");
      setMiniStampClass(stamp, state[key].stampId);

      const date = document.createElement("div");
      date.className = "listDate";
      date.textContent = key;

      left.appendChild(stamp);
      left.appendChild(date);

      const editBtn = document.createElement("button");
      editBtn.className = "btn";
      editBtn.type = "button";
      editBtn.textContent = "編集";
      editBtn.addEventListener("click", () => {
        openDiary(key);
        setView("calendar");
        window.scrollTo({ top: 0, behavior: "smooth" });
      });

      head.appendChild(left);
      head.appendChild(editBtn);

      const preview = document.createElement("div");
      const d = state[key].diary;

      const hasAny =
        (state[key].stampId) ||
        (d.goal && d.goal.trim()) ||
        (d.memo && d.memo.trim()) ||
        (d.todos && d.todos.some(t => (t.text||"").trim() || t.done));

      if (hasAny) filledCount++;

      const todoLines = (d.todos || [])
        .filter(t => (t.text||"").trim() || t.done)
        .map(t => {
          const cls = t.done ? "done" : "todo";
          const label = escapeHtml(escapePreview((t.text || "").trim()));
          return `<span class="checkIcon ${cls}"></span>${label}`;
        })
        .join("<br>");

      const parts = [];
      if (d.goal && d.goal.trim()) parts.push(`目標：${escapeHtml(escapePreview(d.goal.trim()))}`);
      if (todoLines) parts.push(todoLines);
      if (d.memo && d.memo.trim()) parts.push(escapeHtml(escapePreview(d.memo.trim())));

      preview.className = "preview" + (parts.length ? "" : " muted");
      preview.innerHTML = parts.length ? parts.join("<br>") : "（未記入）";

      item.appendChild(head);
      item.appendChild(preview);
      listBodyEl.appendChild(item);
    }

    listBadgeEl.textContent = `${filledCount}/${dim} 日 記入あり`;
  }

  // stats
  function monthState(month){
    return (month === currentMonth) ? state : loadStateForMonth(month);
  }
  function countRecordedDaysForMonth(month){
    const dim = daysInMonthOf(month);
    const st = monthState(month);
    let used = 0;
    for (let day=1; day<=dim; day++){
      const key = ymd(month, day);
      const it = st[key];
      if (!it) continue;
      const d = it.diary || {};
      const hasAny =
        (it.stampId) ||
        (d.goal && d.goal.trim()) ||
        (d.memo && d.memo.trim()) ||
        (Array.isArray(d.todos) && d.todos.some(t => (t.text||"").trim() || t.done));
      if (hasAny) used++;
    }
    return { used, dim };
  }

  function renderYearStats(){
    let total = 0;
    const monthLines = [];
    for (let m=MIN_MONTH; m<=MAX_MONTH; m++){
      const { used } = countRecordedDaysForMonth(m);
      total += used;
      monthLines.push({ m, used });
    }

    yearTotalEl.textContent = `${total}日`;

    monthBreakdownEl.innerHTML = "";
    for (const x of monthLines){
      const line = document.createElement("div");
      line.className = "monthLine";
      const left = document.createElement("span");
      left.textContent = `${x.m}月`;
      const right = document.createElement("span");
      right.textContent = `${x.used}日`;
      line.appendChild(left);
      line.appendChild(right);
      monthBreakdownEl.appendChild(line);
    }

    monthBreakdownEl.classList.toggle("show", breakdownOpen);
  }

  toggleBreakdownBtn.addEventListener("click", () => {
    breakdownOpen = !breakdownOpen;
    toggleBreakdownBtn.textContent = breakdownOpen ? "▲詳細を閉じる" : "▼詳細表示";
    renderYearStats();
  });

  // bulk export/import
  function clampRange(a,b){
    const from = Math.max(MIN_MONTH, Math.min(MAX_MONTH, a));
    const to = Math.max(MIN_MONTH, Math.min(MAX_MONTH, b));
    return (from <= to) ? { from, to } : { from: to, to: from };
  }

  bulkExportBtn.addEventListener("click", () => {
    const r = clampRange(Number(bulkFrom.value), Number(bulkTo.value));
    const months = {};
    for (let m=r.from; m<=r.to; m++){
      months[String(m).padStart(2,'0')] = loadStateForMonth(m);
    }

    const payload = {
      app: "StickerCalendar",
      version: APP_VERSION,
      appSchemaVersion: APP_SCHEMA_VERSION,
      settingsSchemaVersion: settings.schemaVersion || APP_SCHEMA_VERSION,
      exportScope: "fullSettings",
      themeBasePaths: {
        ui: resolveUiTheme(settings.uiThemeId).basePath || "",
        stamp: resolvedStampTheme.basePath || ""
      },
      type: "bulk",
      year: YEAR,
      fromMonth: r.from,
      toMonth: r.to,
      exportedAt: new Date().toISOString(),
      settings,
      months
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `sticker-calendar-${YEAR}-${String(r.from).padStart(2,'0')}-${String(r.to).padStart(2,'0')}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(url);
  });

  bulkImportBtn.addEventListener("click", async () => {
    const file = bulkImportFile.files && bulkImportFile.files[0];
    if (!file){
      window.alert("読み込みファイルを選択してください。");
      return;
    }

    let text = "";
    try { text = await file.text(); } catch {
      window.alert("ファイルの読み取りに失敗しました。");
      return;
    }

    let payload = null;
    try { payload = JSON.parse(text); } catch {
      window.alert("JSONの解析に失敗しました。");
      return;
    }

    const incomingAppSchema = payload?.appSchemaVersion || 1;
    if (incomingAppSchema > APP_SCHEMA_VERSION){
      window.alert("このエクスポートは新しいバージョンのアプリで作成されています。最新バージョンで読み込みを行ってください。");
      return;
    }

    const monthsObj = payload?.months && typeof payload.months === "object" ? payload.months : null;
    if (!monthsObj){
      window.alert("有効な月データが含まれていません。");
      return;
    }

    const ok = window.confirm("データ読み込みを実行しますか？\n（データがある月のみ上書きされます）");
    if (!ok) return;

    const incomingSettings = (payload?.settings && typeof payload.settings === "object") ? payload.settings : {};
    const incomingSettingsVersion = incomingSettings.schemaVersion || payload?.settingsSchemaVersion || payload?.appSchemaVersion || 1;
    if (incomingSettingsVersion > APP_SCHEMA_VERSION){
      window.alert("このエクスポートは新しいバージョンのアプリで作成されています。最新バージョンで読み込みを行ってください。");
      return;
    }
    const incomingTheme = typeof incomingSettings.stampThemeId === "string" ? incomingSettings.stampThemeId
                        : (typeof payload?.stampThemeId === "string" ? payload.stampThemeId : null);
    const incomingUi = typeof incomingSettings.uiThemeId === "string" ? incomingSettings.uiThemeId
                     : (typeof payload?.uiThemeId === "string" ? payload.uiThemeId : null);
    const incomingOwned = Array.isArray(incomingSettings.ownedThemeIds) ? incomingSettings.ownedThemeIds : null;
    const incomingThemeByMonth = (incomingSettings.themeByMonth && typeof incomingSettings.themeByMonth === "object") ? incomingSettings.themeByMonth : null;

    const migratedSettings = migrateSettings({
      stampThemeId: incomingTheme || settings.stampThemeId,
      uiThemeId: incomingUi || settings.uiThemeId,
      ownedThemeIds: incomingOwned || settings.ownedThemeIds,
      themeByMonth: incomingThemeByMonth || settings.themeByMonth,
      diaryLayout: incomingSettings.diaryLayout || settings.diaryLayout,
      schemaVersion: incomingSettingsVersion
    });
    settings = migratedSettings;
    applyStampTheme(settings.stampThemeId);
    applyUiTheme(settings.uiThemeId);
    saveSettings(settings);

    for (let m=MIN_MONTH; m<=MAX_MONTH; m++){
      const key = String(m).padStart(2,'0');
      if (Object.prototype.hasOwnProperty.call(monthsObj, key)){
        const incoming = monthsObj[key];
        if (incoming && typeof incoming === "object"){
          const migrated = migrateMonthData(incoming);
          saveStateForMonth(m, migrated);
        }
      }
    }

    state = loadStateForMonth(currentMonth);
    selectedDate = null;
    diaryWrap.style.display = "none";
    hidePicker();
    hideInlineConfirm();
    renderCalendar();
    if (viewMode === "list") renderList();
    if (viewMode === "data") renderYearStats();
    window.alert("データの読み込みが完了しました。");
  });

  resetAllBtn.addEventListener("click", () => {
    const ok = window.confirm("本当に削除しますか？\n（全ての月データが削除されます。）");
    if (!ok) return;

    window.storageApi.clearAllMonths();

    state = loadStateForMonth(currentMonth);
    selectedDate = null;
    diaryWrap.style.display = "none";
    hidePicker();
    hideInlineConfirm();
    renderCalendar();
    if (viewMode === "list") renderList();
    if (viewMode === "data") renderYearStats();
  });

  resetAppBtn.addEventListener("click", () => {
    const ok = window.confirm("アプリを初期化しますか？\n（全ての月データと設定が削除されます。）");
    if (!ok) return;

    window.storageApi.resetAll();

    state = loadStateForMonth(currentMonth);
    settings = loadSettings();
    applyUiTheme(settings.uiThemeId);
    selectedDate = null;
    diaryWrap.style.display = "none";
    hidePicker();
    hideInlineConfirm();
    renderCalendar();
    if (viewMode === "list") renderList();
    if (viewMode === "data") renderYearStats();
  });

  // hide picker when clicking outside
  document.addEventListener("pointerdown", (e) => {
    const inPicker = e.target.closest("#picker");
    const isDot = e.target.closest(".dot") || e.target.closest("#diaryStamp");
    if (!inPicker && !isDot) hidePicker();
  });

  // calendar dot popup
  function showDotPickerFor(key, el){
    if (pickerEl.classList.contains("show") && pickerDate === key && pickerSource === "calendar"){
      hidePicker();
    } else {
      showPickerNear(el, key, "calendar");
    }
  }

  // calendar click handlers already set in renderCalendar

  // close menu on Esc already

  // init
  applyUiTheme(settings.uiThemeId);
  applyStampTheme(getStampThemeIdForMonth(`${YEAR}-${String(currentMonth).padStart(2,'0')}`));
  renderCalendar();
  setView("calendar");

})();
