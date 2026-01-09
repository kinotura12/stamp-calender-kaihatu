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
  const DEFAULT_UI_THEME_IDS = ["ui_dark_default","ui_light_default"];
  const DEFAULT_STAMP_THEME_IDS = ["default_dots","dark_moods","tenki_png"];
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
        { mood: "mood_1", label: "最高", color: "#8f2a36", className: "mood-dark-1" },
        { mood: "mood_2", label: "良い", color: "#7d3459", className: "mood-dark-2" },
        { mood: "mood_3", label: "普通", color: "#14605d", className: "mood-dark-3" },
        { mood: "mood_4", label: "低め", color: "#2a3c6a", className: "mood-dark-4" },
        { mood: "mood_5", label: "最低", color: "#6a6f77", className: "mood-dark-5" },
      ]
    },
    tenki_png: {
      id: "tenki_png",
      name: "Weather Stamps",
      schemaVersion: 1,
      basePath: "./assets/stamps/tenki/",
      hash: "",
      stamps: [
        { mood: "mood_1", label: "天気 1", asset: "tenki_1.png", renderMode: "mask", color: "#ffb347" },
        { mood: "mood_2", label: "天気 2", asset: "tenki_2.png", renderMode: "mask", color: "#ffd59e" },
        { mood: "mood_3", label: "天気 3", asset: "tenki_3.png", renderMode: "mask", color: "#c8d0dc" },
        { mood: "mood_4", label: "天気 4", asset: "tenki_4.png", renderMode: "mask", color: "#9fd4ff" },
        { mood: "mood_5", label: "天気 5", asset: "tenki_5.png", renderMode: "mask", color: "#5aa7ff" },
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
    moodlog: { type:"moodlog", defaultName:"気分ログ", lockOrder: false, lockName: false },
    goal: { type:"goal",  defaultName:"今日の目標",     lockOrder: true,  lockName: false },
    todo: { type:"todo",  defaultName:"TODOリスト",     lockOrder: false, lockName: false },
    memo: { type:"memo",  defaultName:"自由メモ",       lockOrder: false, lockName: false },
  };

  // ①mood(固定) ②goal(固定) ③todo ④memo
  function defaultDiaryLayout(){
    return [
      { instanceId: "blk_mood_fixed", type:"mood", name: BLOCK_TEMPLATES.mood.defaultName, visible:true },
      { instanceId: "blk_goal_fixed", type:"goal", name: BLOCK_TEMPLATES.goal.defaultName, visible:true },
      { instanceId: "blk_moodlog_1",  type:"moodlog", name: BLOCK_TEMPLATES.moodlog.defaultName, visible:true },
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
  function normalizeStampEvent(raw){
    if (!raw || typeof raw !== "object") return null;
    const moodId = normalizeStampId(raw.moodId || raw.stampId || raw.mood);
    if (!moodId) return null;
    const id = (typeof raw.id === "string") ? raw.id : null;
    const createdAt = (typeof raw.createdAt === "string") ? raw.createdAt : null;
    const moodMemo = (raw.moodMemo && typeof raw.moodMemo === "object")
      ? raw.moodMemo
      : (typeof raw.moodMemo === "string" ? { text: raw.moodMemo } : null);
    return { id, moodId, createdAt, moodMemo };
  }
  function normalizeStampEventsForRead(list){
    if (!Array.isArray(list)) return [];
    const out = [];
    for (const item of list){
      const ev = normalizeStampEvent(item);
      if (ev) out.push(ev);
    }
    return out;
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
  function legacyStampCreatedAt(dateKey){
    return `${dateKey}T12:00:00`;
  }
  function buildLegacyStampEvent(dateKey, stampId){
    const moodId = normalizeStampId(stampId);
    if (!moodId) return null;
    return { id: uid(), moodId, createdAt: legacyStampCreatedAt(dateKey) };
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
  const fabStampBtn = document.getElementById("fabStamp");
  const fabBubble = document.getElementById("fabBubble");
  const fabBubbleRow = document.getElementById("fabBubbleRow");
  const fabMemoBubble = document.getElementById("fabMemoBubble");
  const fabMemoCloseBtn = document.getElementById("fabMemoClose");
  const fabMemoInput = document.getElementById("fabMemoInput");
  const fabMemoSaveBtn = document.getElementById("fabMemoSave");
  let fabBubbleHideTimer = null;
  let fabMemoAttentionTimer = null;
  let fabMemoEventId = null;

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
  const logDetailPanel = document.getElementById("logDetailPanel");
  const closeLogDetailBtn = document.getElementById("closeLogDetail");
  const logDetailListEl = document.getElementById("logDetailList");
  const logDetailSubEl = document.getElementById("logDetailSub");
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
  const storeEl = document.getElementById("store");
  const storeStatusEl = document.getElementById("storeStatus");
  const storeGridEl = document.getElementById("storeGrid");

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
  const menuStoreBtn = document.getElementById("menuStore");

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
      day.stampEvents = normalizeStampEventsForRead(day.stampEvents);
      out[k] = day;
    }
    return out;
  }
  function migrateMonthData(raw){
    // 追加項目が出たときはここで変換/補完を行う。
    const out = sanitizeMonthData(raw);
    let migrated = false;
    for (const [dateKey, day] of Object.entries(out)){
      const hasEvents = Array.isArray(day.stampEvents) && day.stampEvents.length > 0;
      if (day.stampId && !hasEvents){
        const ev = buildLegacyStampEvent(dateKey, day.stampId);
        if (ev){
          day.stampEvents = [ev];
          migrated = true;
        }
      }
    }
    return { data: out, migrated };
  }
  function migrateSettings(obj){
    // 追加フィールドや形式変更があればここで補正する。
    return {
      stampThemeId: (obj && typeof obj.stampThemeId === "string") ? obj.stampThemeId : DEFAULT_STAMP_THEME_ID,
      uiThemeId: (obj && typeof obj.uiThemeId === "string") ? obj.uiThemeId : DEFAULT_UI_THEME_ID,
      ownedThemeIds: normalizeOwnedThemeIds(obj && Array.isArray(obj.ownedThemeIds) ? obj.ownedThemeIds : []),
      themeByMonth: (obj && typeof obj.themeByMonth === "object" && obj.themeByMonth !== null) ? obj.themeByMonth : {},
      diaryLayout: sanitizeLayout(obj && Array.isArray(obj.diaryLayout) ? obj.diaryLayout : defaultDiaryLayout()),
      schemaVersion: obj?.schemaVersion || APP_SCHEMA_VERSION
    };
  }

  // -- Public --
  function loadStateForMonth(month){
    const raw = window.storageApi.loadMonthData(month) || {};
    const { data, migrated } = migrateMonthData(raw);
    if (migrated) saveStateForMonth(month, data);
    return data;
  }
  function saveStateForMonth(month, obj){
    window.storageApi.saveMonthData(month, obj);
  }

  // state
  let currentMonth = 1;
  let state = loadStateForMonth(currentMonth);
  let derivedCache = null;
  let derivedDirty = true;
  let derivedMonth = null;
  let selectedDate = null;
  let pickerDate = null;
  let pickerSource = null;
  let viewMode = "calendar"; // calendar | list | data
  let breakdownOpen = false;
  const DERIVED_SCOPE_ORDER = { calendar: 1, stats: 2 };
  const PRESS_MIN_MS = 120;

  // settings (theme + diary layout)
  function getDefaultOwnedThemeIds(){
    return [
      ...DEFAULT_UI_THEME_IDS.map(id => `ui:${id}`),
      ...DEFAULT_STAMP_THEME_IDS.map(id => `stamp:${id}`)
    ];
  }
  function normalizeOwnedThemeIds(ids){
    const out = new Set(getDefaultOwnedThemeIds());
    if (Array.isArray(ids)){
      for (const raw of ids){
        if (typeof raw !== "string") continue;
        if (raw.includes(":")){
          out.add(raw);
          continue;
        }
        if (UI_THEMES[raw] || DEFAULT_UI_THEME_IDS.includes(raw)){
          out.add(`ui:${raw}`);
        } else {
          out.add(`stamp:${raw}`);
        }
      }
    }
    return Array.from(out);
  }

  function loadSettings(){
    try {
      const s = window.storageApi.loadSettings();
      const stampThemeId = (typeof s.stampThemeId === "string") ? s.stampThemeId : DEFAULT_STAMP_THEME_ID;
      const uiThemeId = (typeof s.uiThemeId === "string") ? s.uiThemeId : DEFAULT_UI_THEME_ID;
      const ownedThemeIds = normalizeOwnedThemeIds(s.ownedThemeIds);
      const themeByMonth = (s && typeof s.themeByMonth === "object" && s.themeByMonth !== null) ? s.themeByMonth : {};
      const diaryLayout = sanitizeLayout(Array.isArray(s.diaryLayout) ? s.diaryLayout : defaultDiaryLayout());
      return { stampThemeId, uiThemeId, ownedThemeIds, themeByMonth, diaryLayout, schemaVersion: APP_SCHEMA_VERSION };
    } catch {
      return {
        stampThemeId: DEFAULT_STAMP_THEME_ID,
        uiThemeId: DEFAULT_UI_THEME_ID,
        ownedThemeIds: getDefaultOwnedThemeIds(),
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
      ownedThemeIds: normalizeOwnedThemeIds(obj && Array.isArray(obj.ownedThemeIds) ? obj.ownedThemeIds : []),
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
  let customizeDirty = false;
  let customizeTouched = new Set();

  function ensureDiaryLayout(){
    settings.diaryLayout = sanitizeLayout(settings.diaryLayout || defaultDiaryLayout());
    return settings.diaryLayout;
  }

  function resolveFabColorValue(entry){
    const paletteMap = {
      pink: "var(--pink)",
      orange: "var(--orange)",
      yellow: "var(--yellow)",
      green: "var(--green)",
      blue: "var(--blue)"
    };
    if (entry && entry.color) return entry.color;
    if (entry && entry.className && paletteMap[entry.className]) return paletteMap[entry.className];

    const fallbackTheme = resolveStampTheme(DEFAULT_STAMP_THEME_ID);
    const fallbackEntry = getStampDef(fallbackTheme, STAMP_MOODS[0]);
    if (fallbackEntry && fallbackEntry.color) return fallbackEntry.color;
    if (fallbackEntry && fallbackEntry.className && paletteMap[fallbackEntry.className]){
      return paletteMap[fallbackEntry.className];
    }
    return "var(--pink)";
  }
  function applyFabColorFromStampTheme(){
    if (!fabStampBtn) return;
    const entry = getStampDef(resolvedStampTheme, STAMP_MOODS[0]);
    const value = resolveFabColorValue(entry);
    document.documentElement.style.setProperty("--fab-color", value);
  }
  function updateFabPosition(){
    if (!fabStampBtn || !calendarPanel) return;
    const rect = calendarPanel.getBoundingClientRect();
    const fabWidth = fabStampBtn.offsetWidth || 54;
    const gapValue = getComputedStyle(document.documentElement).getPropertyValue("--fab-inset").trim();
    const gap = Number.parseFloat(gapValue || "0") || 0;
    const left = rect.right - fabWidth - gap;
    fabStampBtn.style.left = `${Math.max(8, left)}px`;
  }
  function renderFabBubble(){
    if (!fabBubbleRow) return;
    fabBubbleRow.innerHTML = "";
    const map = buildStampIndex(resolvedStampTheme);
    for (const mood of STAMP_MOODS){
      const entry = map.get(mood) || null;
      const b = document.createElement("button");
      b.type = "button";
      b.dataset.stamp = mood;
      b.setAttribute("aria-label", entry?.label || mood);
      renderStamp(b, entry, { baseClass: "fabPick", basePath: resolvedStampTheme.basePath });
      let pickPressStartAt = 0;
      const releasePick = () => {
        const elapsed = Date.now() - pickPressStartAt;
        const delay = Math.max(0, PRESS_MIN_MS - elapsed);
        window.setTimeout(() => {
          b.classList.remove("is-pressing");
          if (fabBubble) fabBubble.classList.remove("is-pressing");
        }, delay);
      };
      b.addEventListener("pointerdown", () => {
        pickPressStartAt = Date.now();
        b.classList.add("is-pressing");
        if (fabBubble) fabBubble.classList.add("is-pressing");
      });
      b.addEventListener("pointerup", releasePick);
      b.addEventListener("pointercancel", releasePick);
      b.addEventListener("pointerleave", releasePick);
      b.addEventListener("click", () => {
        const today = new Date();
        const day = Math.min(daysInMonthOf(currentMonth), today.getDate());
        const key = ymd(currentMonth, day);
        const ev = appendStampEvent(key, mood);
        applyStamp(key, mood, { skipEvent: true });
        hideFabBubble();
        showFabMemoBubble(ev?.id || null);
      });
      fabBubbleRow.appendChild(b);
    }
  }
  function updateFabBubblePosition(){
    if (!fabBubble || !fabStampBtn) return;
    const r = fabStampBtn.getBoundingClientRect();
    const pr = fabBubble.getBoundingClientRect();
    let left = r.left + r.width/2 - pr.width/2;
    left = Math.max(8, Math.min(left, window.innerWidth - pr.width - 8));
    const top = r.top - pr.height - 12;
    fabBubble.style.left = `${left}px`;
    fabBubble.style.top = `${Math.max(8, top)}px`;
    const caretLeft = r.left + r.width/2 - left;
    fabBubble.style.setProperty("--fab-bubble-caret-x", `${caretLeft}px`);
  }
  function updateFabMemoPosition(){
    if (!fabMemoBubble || !fabStampBtn) return;
    const r = fabStampBtn.getBoundingClientRect();
    const pr = fabMemoBubble.getBoundingClientRect();
    let left = r.left + r.width/2 - pr.width/2;
    left = Math.max(8, Math.min(left, window.innerWidth - pr.width - 8));
    const top = r.top - pr.height - 12;
    fabMemoBubble.style.left = `${left}px`;
    fabMemoBubble.style.top = `${Math.max(8, top)}px`;
    const caretLeft = r.left + r.width/2 - left;
    fabMemoBubble.style.setProperty("--fab-memo-caret-x", `${caretLeft}px`);
  }
  function updateFabMemoSaveState(){
    if (!fabMemoSaveBtn || !fabMemoInput) return;
    const hasText = !!(fabMemoInput.value && fabMemoInput.value.trim());
    fabMemoSaveBtn.classList.toggle("is-active", hasText);
  }
  function showFabMemoBubble(eventId){
    if (!fabMemoBubble) return;
    fabMemoEventId = eventId;
    if (fabMemoInput) fabMemoInput.value = "";
    updateFabMemoSaveState();
    fabMemoBubble.classList.add("show");
    fabMemoBubble.setAttribute("aria-hidden", "false");
    updateFabMemoPosition();
  }
  function hideFabMemoBubble(){
    if (!fabMemoBubble) return;
    fabMemoBubble.classList.remove("show");
    fabMemoBubble.setAttribute("aria-hidden", "true");
    fabMemoEventId = null;
  }
  function triggerFabMemoAttention(){
    if (!fabMemoBubble) return;
    fabMemoBubble.classList.remove("is-attention");
    void fabMemoBubble.offsetWidth;
    fabMemoBubble.classList.add("is-attention");
    if (fabMemoAttentionTimer) window.clearTimeout(fabMemoAttentionTimer);
    fabMemoAttentionTimer = window.setTimeout(() => {
      fabMemoBubble.classList.remove("is-attention");
      fabMemoAttentionTimer = null;
    }, 180);
  }
  function showFabBubble(){
    if (!fabBubble) return;
    if (fabBubbleHideTimer){
      window.clearTimeout(fabBubbleHideTimer);
      fabBubbleHideTimer = null;
    }
    renderFabBubble();
    fabBubble.classList.add("show");
    fabBubble.classList.remove("is-hiding");
    fabBubble.setAttribute("aria-hidden", "false");
    updateFabBubblePosition();
  }
  function hideFabBubble(){
    if (!fabBubble) return;
    if (!fabBubble.classList.contains("show")) return;
    fabBubble.classList.remove("is-hiding");
    fabBubble.setAttribute("aria-hidden", "true");
    if (fabBubbleHideTimer) window.clearTimeout(fabBubbleHideTimer);
    fabBubbleHideTimer = window.setTimeout(() => {
      fabBubble.classList.add("is-hiding");
      fabBubbleHideTimer = window.setTimeout(() => {
        fabBubble.classList.remove("show");
        fabBubble.classList.remove("is-hiding");
        fabBubbleHideTimer = null;
      }, 300);
    }, 60);
  }
  function appendStampEvent(dateKey, moodId){
    ensureDay(dateKey);
    if (!Array.isArray(state[dateKey].stampEvents)) state[dateKey].stampEvents = [];
    const ev = { id: uid(), moodId, createdAt: new Date().toISOString(), moodMemo: null };
    state[dateKey].stampEvents.push(ev);
    return ev;
  }
  function applyMemoToEvent(eventId, memoText){
    if (!eventId || !memoText) return;
    const text = memoText.trim();
    if (!text) return;
    for (const day of Object.values(state)){
      const list = Array.isArray(day?.stampEvents) ? day.stampEvents : [];
      const found = list.find(ev => ev && ev.id === eventId);
      if (found){
        found.moodMemo = { text };
        persist();
        return;
      }
    }
  }
  function toggleFabBubble(){
    if (!fabBubble) return;
    if (fabBubble.classList.contains("show")) hideFabBubble();
    else showFabBubble();
  }
  let fabPosQueued = false;
  function scheduleFabPositionUpdate(){
    if (fabPosQueued) return;
    fabPosQueued = true;
    window.requestAnimationFrame(() => {
      fabPosQueued = false;
      updateFabPosition();
      if (fabBubble && fabBubble.classList.contains("show")){
        updateFabBubblePosition();
      }
      if (fabMemoBubble && fabMemoBubble.classList.contains("show")){
        updateFabMemoPosition();
      }
    });
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
    applyFabColorFromStampTheme();
    if (fabBubble && fabBubble.classList.contains("show")) renderFabBubble();
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

  function applyThemeTokensFromCatalog(tokens, targetEl){
    if (!targetEl) return;
    const safe = sanitizeThemeVars(tokens || {}, {});
    for (const key of UI_TOKEN_KEYS){
      if (Object.prototype.hasOwnProperty.call(safe, key)){
        targetEl.style.setProperty(key, safe[key]);
      } else {
        targetEl.style.removeProperty(key);
      }
    }
  }

  function applyUiThemeFromCatalog(theme){
    applyThemeTokensFromCatalog(theme?.cssVars, document.documentElement);
    if (theme?.id) document.documentElement.setAttribute("data-ui-theme", theme.id);
    settings.uiThemeId = theme?.id || DEFAULT_UI_THEME_ID;
  }

  function applyUiTheme(themeId){
    const { id } = applyThemeTokens(themeId || settings.uiThemeId);
    settings.uiThemeId = id;
  }

  let lastAppliedThemeKey = null;

  function applyStampThemeFromCatalog(theme){
    if (!theme || theme.type !== "stamp"){
      applyStampTheme(DEFAULT_STAMP_THEME_ID);
      return;
    }
    const entries = Array.isArray(theme.stamps) ? theme.stamps : [];
    const byMood = new Map();
    for (const mood of STAMP_MOODS){
      const fromDef = entries.find(s => s?.mood === mood) || {};
      byMood.set(mood, {
        mood,
        label: fromDef.label || mood,
        className: fromDef.className || null,
        color: fromDef.color || null,
        asset: fromDef.asset || theme.assets?.file || null,
        renderMode: fromDef.renderMode || theme.assets?.mode || "img-tag",
        shape: fromDef.shape || "circle"
      });
    }
    settings.stampThemeId = theme.id || DEFAULT_STAMP_THEME_ID;
    resolvedStampTheme = { id: settings.stampThemeId, byMood, basePath: theme.assets?.basePath || "" };
    renderStampPickerButtons();
    applyFabColorFromStampTheme();
    if (fabBubble && fabBubble.classList.contains("show")) renderFabBubble();
  }

  function buildThemeKey(){
    const monthKey = `${YEAR}-${String(currentMonth).padStart(2,'0')}`;
    const uiFromBuiltIn = UI_THEMES[settings.uiThemeId] ? settings.uiThemeId : null;
    const uiFromCatalog = findCatalogTheme("ui", settings.uiThemeId);
    const uiThemeId = uiFromBuiltIn ? uiFromBuiltIn : (uiFromCatalog?.id || DEFAULT_UI_THEME_ID);

    const stampIdRaw = getStampThemeIdForMonth(monthKey);
    const stampFromBuiltIn = STAMP_THEMES[stampIdRaw] ? stampIdRaw : null;
    const stampFromCatalog = findCatalogTheme("stamp", stampIdRaw);
    const stampThemeId = stampFromBuiltIn ? stampFromBuiltIn : (stampFromCatalog?.id || DEFAULT_STAMP_THEME_ID);

    return { themeKey: `${uiThemeId}::${stampThemeId}`, uiThemeId, stampThemeId, uiFromCatalog, stampFromCatalog };
  }

  function applyThemeIfNeeded(){
    const { themeKey, uiThemeId, stampThemeId, uiFromCatalog, stampFromCatalog } = buildThemeKey();
    if (themeKey == lastAppliedThemeKey) return false;
    if (UI_THEMES[uiThemeId]){
      applyUiTheme(uiThemeId);
    } else if (uiFromCatalog){
      applyThemeTokensFromCatalog(uiFromCatalog.cssVars, document.documentElement);
      document.documentElement.setAttribute("data-ui-theme", uiThemeId);
      settings.uiThemeId = uiThemeId;
    } else {
      applyUiTheme(DEFAULT_UI_THEME_ID);
    }

    if (STAMP_THEMES[stampThemeId]){
      applyStampTheme(stampThemeId);
    } else if (stampFromCatalog){
      applyStampThemeFromCatalog(stampFromCatalog);
    } else {
      applyStampTheme(DEFAULT_STAMP_THEME_ID);
    }
    lastAppliedThemeKey = themeKey;
    return true;
  }

  function createDefaultDay(){
    return { stampId: null, stampEvents: [], diary: { goal:"", todos: [], memo:"" } };
  }

  function normalizeTodoForRead(t){
    return {
      id: (t && typeof t.id === "string") ? t.id : null,
      done: !!(t && t.done),
      text: (t && typeof t.text === "string") ? t.text : ""
    };
  }

  function ensureDay(dateKey){
    if (!state[dateKey]) state[dateKey] = createDefaultDay();

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

    state[dateKey].stampEvents = normalizeStampEventsForRead(state[dateKey].stampEvents);

    if (!state[dateKey].diary) state[dateKey].diary = { goal:"", todos: [], memo:"" };

    const d = state[dateKey].diary;
    if (typeof d.goal !== "string") d.goal = "";
    if (!Array.isArray(d.todos)) d.todos = [];
    if (typeof d.memo !== "string") d.memo = "";

    if (d.todos.length > 0){
      d.todos = d.todos.map(normalizeTodoForRead);
    }
  }

  function prepareDayForEdit(dateKey){
    ensureDay(dateKey);
    const d = state[dateKey].diary;

    if (!Array.isArray(d.todos)) d.todos = [];

    if (d.todos.length === 0){
      d.todos = [
        { id: uid(), done:false, text:"" },
        { id: uid(), done:false, text:"" },
        { id: uid(), done:false, text:"" },
      ];
      return;
    }

    d.todos = d.todos.map(t => ({
      id: (t && typeof t.id === "string") ? t.id : uid(),
      done: !!(t && t.done),
      text: (t && typeof t.text === "string") ? t.text : ""
    }));
  }
  function persist(){
    saveStateForMonth(currentMonth, state);
    derivedDirty = true;
  }
  function resetDerivedCache(){
    derivedDirty = true;
    derivedMonth = null;
    derivedCache = null;
  }
  function moodValueFromId(moodId){
    if (!moodId) return null;
    const idx = STAMP_MOODS.indexOf(moodId);
    return (idx >= 0) ? (idx + 1) : null;
  }
  function buildDerivedForMonth(monthState, scope){
    const byDayCount = {};
    const byDayLastEventId = {};
    const timelineByDay = {};
    const eventIndex = {};
    let lastEvent = null;

    const needsStats = (scope === "stats");
    const byDayMoodHistogram = needsStats ? {} : null;
    const byDayAverageMood = needsStats ? {} : null;

    for (const [dateKey, day] of Object.entries(monthState)){
      const events = Array.isArray(day?.stampEvents) ? day.stampEvents : [];
      if (!events.length) continue;

      let count = 0;
      let dayMoodSum = 0;
      let dayMoodCount = 0;
      const dayHistogram = needsStats ? {} : null;
      const ids = [];

      for (let i=0; i<events.length; i++){
        const ev = events[i];
        const moodId = normalizeStampId(ev?.moodId);
        if (!moodId) continue;

        const eventId = (typeof ev.id === "string" && ev.id) ? ev.id : `tmp_${dateKey}_${i}`;
        if (!eventIndex[eventId]){
          eventIndex[eventId] = { ...ev, id: eventId, moodId };
        }
        ids.push(eventId);
        count++;

        if (needsStats){
          dayHistogram[moodId] = (dayHistogram[moodId] || 0) + 1;
          const moodValue = moodValueFromId(moodId);
          if (moodValue){
            dayMoodSum += moodValue;
            dayMoodCount += 1;
          }
        }
      }

      if (count){
        byDayCount[dateKey] = count;
        const lastId = ids[ids.length - 1];
        byDayLastEventId[dateKey] = lastId;
        timelineByDay[dateKey] = ids;
        if (lastId && eventIndex[lastId]){
          lastEvent = { ...eventIndex[lastId], dateKey };
        }
        if (needsStats){
          byDayMoodHistogram[dateKey] = dayHistogram;
          if (dayMoodCount){
            byDayAverageMood[dateKey] = dayMoodSum / dayMoodCount;
          }
        }
      }
    }

    return {
      scope,
      byDayCount,
      byDayLastEventId,
      timelineByDay,
      eventIndex,
      lastEvent,
      byDayMoodHistogram,
      byDayAverageMood
    };
  }
  function rebuildDerivedIfNeeded(scope = "calendar"){
    const currentScope = derivedCache?.scope || "calendar";
    if (!derivedDirty && derivedMonth === currentMonth && derivedCache && DERIVED_SCOPE_ORDER[currentScope] >= DERIVED_SCOPE_ORDER[scope]){
      return derivedCache;
    }
    derivedCache = buildDerivedForMonth(state, scope);
    derivedDirty = false;
    derivedMonth = currentMonth;
    return derivedCache;
  }
  function resolveDisplayStampId(dateKey, derived){
    const fallback = normalizeStampId(state[dateKey]?.stampId);
    if (!derived) return fallback;
    const lastId = derived.byDayLastEventId && derived.byDayLastEventId[dateKey];
    if (!lastId) return fallback;
    const ev = derived.eventIndex && derived.eventIndex[lastId];
    const moodId = normalizeStampId(ev?.moodId);
    return moodId || fallback;
  }

  function resolveStampEntryForId(stampId){
    const moodId = normalizeStampId(stampId);
    return moodId ? getStampDef(resolvedStampTheme, moodId) : null;
  }

  // goal preview condition
  function shouldShowGoalPreview(){
    return window.matchMedia("(min-width: 760px)").matches;
  }
  let resizeRenderQueued = false;
  function scheduleResizeRender(){
    if (resizeRenderQueued) return;
    resizeRenderQueued = true;
    window.requestAnimationFrame(() => {
      resizeRenderQueued = false;
      renderCalendar();
    });
  }
  window.addEventListener("resize", scheduleResizeRender);
  window.addEventListener("resize", scheduleFabPositionUpdate);
  if (fabStampBtn){
    let pressStartAt = 0;
    const release = () => {
      const elapsed = Date.now() - pressStartAt;
      const delay = Math.max(0, PRESS_MIN_MS - elapsed);
      window.setTimeout(() => {
        fabStampBtn.classList.remove("is-pressing");
      }, delay);
    };
    fabStampBtn.addEventListener("pointerdown", () => {
      pressStartAt = Date.now();
      fabStampBtn.classList.add("is-pressing");
    });
    fabStampBtn.addEventListener("pointerup", release);
    fabStampBtn.addEventListener("pointercancel", release);
    fabStampBtn.addEventListener("pointerleave", release);
    fabStampBtn.addEventListener("click", () => {
      if (viewMode !== "calendar") return;
      hidePicker();
      hideFabMemoBubble();
      toggleFabBubble();
    });
  }
  document.addEventListener("pointerdown", (e) => {
    const inBubble = e.target.closest("#fabBubble");
    const inFab = e.target.closest("#fabStamp");
    const inMemo = e.target.closest("#fabMemoBubble");
    if (fabBubble && fabBubble.classList.contains("show")){
      if (!inBubble && !inFab && !inMemo) hideFabBubble();
    }
    if (fabMemoBubble && fabMemoBubble.classList.contains("show")){
      const memoFocused = (fabMemoInput && document.activeElement === fabMemoInput);
      const memoHasText = !!(fabMemoInput && fabMemoInput.value && fabMemoInput.value.trim());
      if (!inMemo && !inFab && !inBubble){
        if (memoHasText){
          triggerFabMemoAttention();
        } else if (!memoFocused){
          hideFabMemoBubble();
        }
      }
    }
  });
  if (fabMemoCloseBtn){
    fabMemoCloseBtn.addEventListener("click", () => {
      hideFabMemoBubble();
    });
  }
  if (fabMemoSaveBtn){
    fabMemoSaveBtn.addEventListener("click", () => {
      applyMemoToEvent(fabMemoEventId, fabMemoInput?.value || "");
      hideFabMemoBubble();
      renderDiaryBlocks();
    });
  }
  if (fabMemoInput){
    fabMemoInput.addEventListener("input", updateFabMemoSaveState);
    fabMemoInput.addEventListener("change", updateFabMemoSaveState);
    fabMemoInput.addEventListener("compositionend", updateFabMemoSaveState);
  }

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
    } else if (viewMode === "store"){
      headerTitleEl.textContent = "ストア";
      headerSubEl.textContent = "テーマの購入・追加";
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
    closeLogDetail();

    const calendarVisible = (mode !== "data" && mode !== "store");
    dowRow.classList.toggle("hidden", !calendarVisible);
    calendarPanel.classList.toggle("hidden", !calendarVisible);

    listEl.classList.remove("show");
    dataEl.classList.remove("show");
    storeEl.classList.remove("show");

    // diaryWrap visibility (calendar or list only when diary opened)
    if (mode === "calendar"){
      if (selectedDate){
        diaryWrap.style.display = "";
        diaryPanel.classList.add("show");
        customPanel.classList.remove("show"); // 普段は出さない
        logDetailPanel.classList.remove("show");
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
    } else if (mode === "store"){
      storeEl.classList.add("show");
      renderStore();
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
    resetDerivedCache();

    applyThemeIfNeeded();
    renderCalendar();
    setView("calendar");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  prevMonthBtn.addEventListener("click", () => changeMonth(currentMonth - 1));
  nextMonthBtn.addEventListener("click", () => changeMonth(currentMonth + 1));

  function attachMonthSwipe(targetEl){
    if (!targetEl) return;
    let tracking = false;
    let pointerId = null;
    let startX = 0;
    let startY = 0;
    let startTime = 0;

    const shouldIgnoreTarget = (el) => !!el?.closest("input, textarea, select, button");

    const startTracking = (x, y, id) => {
      tracking = true;
      pointerId = id;
      startX = x;
      startY = y;
      startTime = Date.now();
    };

    const maybePrevent = (dx, dy, event) => {
      if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy) * 1.2){
        event.preventDefault();
      }
    };

    const finishTracking = (x, y, id) => {
      if (!tracking || id !== pointerId) return;
      const dx = x - startX;
      const dy = y - startY;
      const absX = Math.abs(dx);
      const absY = Math.abs(dy);
      const elapsed = Date.now() - startTime;
      const minDistance = 45;
      const maxTime = 900;
      if (absX > minDistance && absX > absY * 1.2 && elapsed < maxTime){
        changeMonth(dx < 0 ? currentMonth + 1 : currentMonth - 1);
      }
      tracking = false;
      pointerId = null;
    };

    targetEl.addEventListener("pointerdown", (e) => {
      if (e.pointerType !== "touch") return;
      if (shouldIgnoreTarget(e.target)) return;
      startTracking(e.clientX, e.clientY, e.pointerId);
      targetEl.setPointerCapture?.(e.pointerId);
    });

    targetEl.addEventListener("pointermove", (e) => {
      if (!tracking || e.pointerId !== pointerId) return;
      maybePrevent(e.clientX - startX, e.clientY - startY, e);
    });

    targetEl.addEventListener("pointerup", (e) => {
      finishTracking(e.clientX, e.clientY, e.pointerId);
    });
    targetEl.addEventListener("pointercancel", (e) => {
      finishTracking(e.clientX, e.clientY, e.pointerId);
    });

    targetEl.addEventListener("touchstart", (e) => {
      if (e.touches.length !== 1) return;
      if (shouldIgnoreTarget(e.target)) return;
      const t = e.touches[0];
      startTracking(t.clientX, t.clientY, "touch");
    }, { passive: true });

    targetEl.addEventListener("touchmove", (e) => {
      if (!tracking || pointerId !== "touch") return;
      const t = e.touches[0];
      maybePrevent(t.clientX - startX, t.clientY - startY, e);
    }, { passive: false });

    targetEl.addEventListener("touchend", (e) => {
      if (pointerId !== "touch") return;
      const t = e.changedTouches[0];
      finishTracking(t.clientX, t.clientY, "touch");
    });
    targetEl.addEventListener("touchcancel", () => {
      if (pointerId !== "touch") return;
      tracking = false;
      pointerId = null;
    });
  }

  attachMonthSwipe(calendarPanel);
  attachMonthSwipe(listEl);

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
  menuStoreBtn.addEventListener("click", () => { closeMenu(); setView("store"); });

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
    el.style.maskImage = "";
    el.style.webkitMaskImage = "";
    el.style.maskSize = "";
    el.style.webkitMaskSize = "";
    el.style.maskRepeat = "";
    el.style.webkitMaskRepeat = "";
    el.style.maskPosition = "";
    el.style.webkitMaskPosition = "";
    // remove existing img-tag if any
    const oldImg = el.querySelector(".stampImg");
    if (oldImg) oldImg.remove();
    if (!entry) return;

    const cls = entry.className;
    const col = entry.color;
    const shape = entry.shape || "circle";
    const assetUrl = entry.asset ? resolveAssetUrl(basePath, entry.asset) : "";
    const mode = entry.renderMode || "color";

    function applyFallback(){
      if (cls) el.classList.add(cls);
      if (shape) el.classList.add(`shape-${shape}`);
      if (col){
        el.style.backgroundColor = col;
        el.classList.add("filled");
      } else if (cls){
        el.classList.add("filled");
      }
    }

    if (mode === "img-tag" && assetUrl){
      el.classList.add("imgStamp");
      const img = document.createElement("img");
      img.className = "stampImg";
      img.decoding = "async";
      img.loading = "lazy";
      img.onerror = () => {
        img.remove();
        el.classList.remove("imgStamp");
        applyFallback();
      };
      img.src = assetUrl;
      el.appendChild(img);
      return;
    }

    if (mode === "image-bg" && assetUrl){
      el.classList.add("imgStamp");
      el.style.backgroundImage = `url("${assetUrl}")`;
      el.style.backgroundSize = "contain";
      el.style.backgroundRepeat = "no-repeat";
      el.style.backgroundPosition = "center";
      return;
    }

    if (mode === "mask" && assetUrl){
      if (!col){
        applyFallback();
        return;
      }
      el.classList.add("maskStamp");
      el.style.backgroundColor = col;
      el.style.maskImage = `url("${assetUrl}")`;
      el.style.webkitMaskImage = `url("${assetUrl}")`;
      el.style.maskSize = "contain";
      el.style.webkitMaskSize = "contain";
      el.style.maskRepeat = "no-repeat";
      el.style.webkitMaskRepeat = "no-repeat";
      el.style.maskPosition = "center";
      el.style.webkitMaskPosition = "center";
      return;
    }

    // fallback: color
    applyFallback();
  }

  function applyStamp(dateKey, stampIdOrNull, options = {}){
    ensureDay(dateKey);
    const moodId = normalizeStampId(stampIdOrNull);
    state[dateKey].stampId = moodId;
    if (moodId && !options.skipEvent){
      if (!Array.isArray(state[dateKey].stampEvents)) state[dateKey].stampEvents = [];
      state[dateKey].stampEvents.push({ id: uid(), moodId, createdAt: new Date().toISOString() });
    }
    persist();

    updateCalendarDot(dateKey);
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
  function updateCalendarDot(dateKey){
    const dot = daysEl.querySelector(`.dot[aria-label="${dateKey} スタンプ"]`);
    if (!dot) return;
    const derived = rebuildDerivedIfNeeded("calendar");
    const stampId = resolveDisplayStampId(dateKey, derived);
    const entry = resolveStampEntryForId(stampId);
    renderStamp(dot, entry, { baseClass: "dot", basePath: resolvedStampTheme.basePath });
  }

  // render calendar (dynamic weeks)
  let lastBuiltMonth = null;

  function buildCalendarGrid(){
    daysEl.innerHTML = "";

    const first = new Date(YEAR, currentMonth - 1, 1);
    const dim = daysInMonthOf(currentMonth);
    const firstDow = first.getDay();

    const cellsNeeded = firstDow + dim;
    const weeks = Math.ceil(cellsNeeded / 7);
    const totalCells = weeks * 7;

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
        cell.setAttribute("data-date", key);


        const pvEl = document.createElement("div");
        pvEl.className = "goalPreview";
        cell.appendChild(pvEl);
        cell.addEventListener("click", () => {
          hidePicker();
          openDiary(key);
        });

        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "dot";
        dot.setAttribute("aria-label", `${key} スタンプ`);


        dot.addEventListener("click", (e) => {
          e.stopPropagation();
          const events = getStampEventsForDate(key);
          if (events.length){
            hidePicker();
            openDiary(key);
            return;
          }
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
    lastBuiltMonth = currentMonth;
  }

  function paintCalendar(derived){
    const showGoal = shouldShowGoalPreview();
    const cells = daysEl.querySelectorAll(".cell[data-date]");
    for (const cell of cells){
      const key = cell.getAttribute("data-date");
      if (!key) continue;
      ensureDay(key);

      cell.classList.toggle("selected", key === selectedDate);

      const pvEl = cell.querySelector(".goalPreview");
      if (pvEl){
        if (showGoal){
          const g = (state[key].diary && typeof state[key].diary.goal === "string") ? state[key].diary.goal : "";
          const pv = goalPreviewText(g);
          pvEl.classList.add("show");
          pvEl.classList.toggle("empty", !pv);
        } else {
          pvEl.classList.remove("show");
          pvEl.classList.remove("empty");
          pvEl.textContent = "";
        }
      }

      const dot = cell.querySelector(".dot");
      if (dot){
        const stampId = resolveDisplayStampId(key, derived);
        const entry = resolveStampEntryForId(stampId);
        renderStamp(dot, entry, { baseClass: "dot", basePath: resolvedStampTheme.basePath });
      }
    }
  }

  function renderCalendar(){
    if (lastBuiltMonth !== currentMonth || !daysEl.hasChildNodes()){
      buildCalendarGrid();
    }
    const derived = rebuildDerivedIfNeeded("calendar");
    paintCalendar(derived);
    scheduleFabPositionUpdate();
  }

  // diary open
  function openDiary(dateKey){
    selectedDate = dateKey;
    prepareDayForEdit(dateKey);
    persist();

    diaryWrap.style.display = "";
    diaryPanel.classList.add("show");
　　customPanel.classList.remove("show"); // 普段は出さない
    logDetailPanel.classList.remove("show");

    slider.classList.remove("customize");
    slider.classList.remove("logDetail");

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
      } else if (blk.type === "moodlog"){
        diaryBlocksEl.appendChild(renderMoodLogBlock(blk));
      } else if (blk.type === "goal"){
        diaryBlocksEl.appendChild(renderGoalBlock(blk));
      } else if (blk.type === "todo"){
        diaryBlocksEl.appendChild(renderTodoBlock(blk));
      } else if (blk.type === "memo"){
        diaryBlocksEl.appendChild(renderMemoBlock(blk));
      }
    }
    if (slider.classList.contains("logDetail")){
      renderLogDetailPanel();
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

  function getStampEventsForDate(dateKey){
    ensureDay(dateKey);
    return Array.isArray(state[dateKey].stampEvents) ? state[dateKey].stampEvents : [];
  }
  function formatLogTime(iso){
    if (!iso) return "--:--";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "--:--";
    const hh = String(d.getHours()).padStart(2,"0");
    const mm = String(d.getMinutes()).padStart(2,"0");
    return `${hh}:${mm}`;
  }
  function sortEventsByTime(events){
    const sorted = events.map((ev, idx) => ({ ev, idx }));
    const timeKey = (item) => {
      const t = Date.parse(item.ev?.createdAt);
      return Number.isNaN(t) ? null : t;
    };
    sorted.sort((a,b) => {
      const at = timeKey(a);
      const bt = timeKey(b);
      if (at === null && bt === null) return a.idx - b.idx;
      if (at === null) return 1;
      if (bt === null) return -1;
      return at - bt;
    });
    return sorted.map(item => item.ev);
  }
  function renderLogRows(container, events, options = {}){
    const { emptyClass = "diaryLogEmpty", rowClass = "diaryLogItem", timeClass = "diaryLogTime" } = options;
    container.innerHTML = "";
    if (!events.length){
      const empty = document.createElement("div");
      empty.className = emptyClass;
      empty.textContent = "記録なし";
      container.appendChild(empty);
      return;
    }
    for (const ev of events){
      const moodId = normalizeStampId(ev?.moodId);
      const entry = moodId ? getStampDef(resolvedStampTheme, moodId) : null;
      const label = entry?.label || moodId || "unknown";

      const row = document.createElement("div");
      row.className = rowClass;

      const time = document.createElement("div");
      time.className = timeClass;
      time.textContent = formatLogTime(ev?.createdAt);

      const mood = document.createElement("div");
      mood.className = "diaryLogMood";
      mood.textContent = label;

      row.appendChild(time);
      row.appendChild(mood);
      if (ev?.moodMemo && typeof ev.moodMemo.text === "string" && ev.moodMemo.text.trim()){
        const memo = document.createElement("div");
        memo.className = "diaryLogMemo";
        memo.textContent = ev.moodMemo.text.trim();
        row.appendChild(memo);
      }
      container.appendChild(row);
    }
  }
  function renderMoodLogBlock(blk){
    const section = document.createElement("div");
    section.className = "section";

    const head = document.createElement("div");
    head.className = "sectionHead";

    const left = document.createElement("div");
    left.className = "sectionTitle";
    left.textContent = blk.name || "気分ログ";

    const right = document.createElement("div");
    right.className = "diaryLogHead";

    const count = document.createElement("div");
    count.className = "diaryLogCount";

    const detailBtn = document.createElement("button");
    detailBtn.className = "btn";
    detailBtn.type = "button";
    detailBtn.textContent = "詳細";
    detailBtn.style.padding = "6px 10px";
    detailBtn.style.minWidth = "auto";

    head.appendChild(left);
    right.appendChild(count);
    head.appendChild(right);
    section.appendChild(head);

    const body = document.createElement("div");
    body.className = "diaryLogBody";
    section.appendChild(body);

    const events = sortEventsByTime(getStampEventsForDate(selectedDate));
    const rows = events.slice(0, 7);
    count.textContent = `${rows.length}/${events.length}件`;
    renderLogRows(body, rows);

    right.appendChild(detailBtn);
    detailBtn.addEventListener("click", () => openLogDetail());

    return section;
  }
  function renderLogDetailPanel(){
    if (!selectedDate) return;
    const events = sortEventsByTime(getStampEventsForDate(selectedDate));
    if (logDetailSubEl){
      logDetailSubEl.textContent = `${selectedDate} / ${events.length}件`;
    }
    if (logDetailListEl){
      renderLogRows(logDetailListEl, events, { rowClass: "logDetailItem", timeClass: "logDetailTime", emptyClass: "diaryLogEmpty" });
    }
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
    closeLogDetail();
    calendarPanel.classList.remove("hidden");
    dowRow.classList.remove("hidden");
    hideInlineConfirm();
    renderCalendar();
    if (viewMode === "list") renderList();
    if (viewMode === "data") renderYearStats();
  });

  // ===== Customize Panel (骨格) =====
  function openCustomize(){
    if (!selectedDate) return;
    closeLogDetail();
    customizeDraft = JSON.parse(JSON.stringify(ensureDiaryLayout()));
    customizeTouched = new Set();
    setCustomizeDirty(false);
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
    customizeTouched = new Set();
    setCustomizeDirty(false);
    slider.classList.remove("customize");
  }

  function setCustomizeDirty(isDirty){
    customizeDirty = !!isDirty;
    if (saveCustomizeBtn){
      saveCustomizeBtn.classList.toggle("is-active", customizeDirty);
    }
  }

  function markCustomizeTouched(instanceId){
    if (instanceId) customizeTouched.add(instanceId);
  }

  function markCustomizeDirty(instanceId){
    markCustomizeTouched(instanceId);
    setCustomizeDirty(true);
  }

  function openLogDetail(){
    if (!selectedDate) return;
    closeCustomize(false);
    calendarPanel.classList.add("hidden");
    dowRow.classList.add("hidden");
    renderLogDetailPanel();
    logDetailPanel.classList.add("show");
    slider.classList.add("logDetail");
  }
  function closeLogDetail(){
    slider.classList.remove("logDetail");
    logDetailPanel.classList.remove("show");
  }

  function sanitizeLayout(layout){
    // mood must be 1st, goal must be 2nd
    const safe = Array.isArray(layout) ? layout.filter(Boolean) : [];
    const mood = safe.find(b => b.type === "mood") || { instanceId:"blk_mood_fixed", type:"mood", name:BLOCK_TEMPLATES.mood.defaultName, visible:true };
    const goal = safe.find(b => b.type === "goal") || { instanceId:"blk_goal_fixed", type:"goal", name:BLOCK_TEMPLATES.goal.defaultName, visible:true };
    const moodlog = safe.find(b => b.type === "moodlog") || { instanceId:"blk_moodlog_1", type:"moodlog", name:BLOCK_TEMPLATES.moodlog.defaultName, visible:true };

    // remove duplicates of mood/goal/moodlog (keep first)
    const rest = safe.filter(b => b.type !== "mood" && b.type !== "goal" && b.type !== "moodlog");
    rest.unshift(moodlog);

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
      card.className = "blockCard" + (customizeTouched.has(blk.instanceId) ? " is-touched" : "");

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
      card.addEventListener("pointerdown", () => {
        markCustomizeTouched(blk.instanceId);
        card.classList.add("is-touched");
      });
      renameBtn.addEventListener("click", () => {
        renameRow.classList.toggle("show");
        if (renameRow.classList.contains("show")) renameInput.focus();
      });

      renameOk.addEventListener("click", () => {
        blk.name = (renameInput.value || "").trim() || (tpl?.defaultName || blk.type);
        // mood name lock
        if (blk.type === "mood") blk.name = BLOCK_TEMPLATES.mood.defaultName;
        markCustomizeDirty(blk.instanceId);
        renderCustomizeList();
      });
      renameInput.addEventListener("input", () => {
        markCustomizeDirty(blk.instanceId);
      });

      upBtn.addEventListener("click", () => {
        if (i <= 2) return;
        const tmp = customizeDraft[i-1];
        customizeDraft[i-1] = customizeDraft[i];
        customizeDraft[i] = tmp;
        markCustomizeDirty(blk.instanceId);
        renderCustomizeList();
      });

      downBtn.addEventListener("click", () => {
        if (i >= customizeDraft.length - 1) return;
        const tmp = customizeDraft[i+1];
        customizeDraft[i+1] = customizeDraft[i];
        customizeDraft[i] = tmp;
        markCustomizeDirty(blk.instanceId);
        renderCustomizeList();
      });

      cb.addEventListener("change", () => {
        blk.visible = cb.checked;
        markCustomizeDirty(blk.instanceId);
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

  function exitLogDetailAndShowCalendar(){
    calendarPanel.classList.remove("hidden");
    dowRow.classList.remove("hidden");
    logDetailPanel.classList.remove("show");
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

  closeLogDetailBtn.addEventListener("click", () => {
    closeLogDetail();
    exitLogDetailAndShowCalendar();
  });

  // ===== UI Theme Picker =====
  function showThemePicker(){
    selectedUiThemeId = null;
    selectedStampThemeId = null;
    renderThemeGrid();
    themeOverlay.classList.add("show");
    themePanel.classList.add("show");
    applyThemeBtn.classList.remove("is-active");
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

    const uiEntries = DEFAULT_UI_THEME_IDS.map(id => UI_THEMES[id]).filter(Boolean);
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
          const entry = getStampDef(resolvedStampTheme, STAMP_MOODS[0]);
          renderStamp(dayStamp, entry, { baseClass: "thumbDayStamp", basePath: resolvedStampTheme.basePath });
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
      const diaryEntry = getStampDef(resolvedStampTheme, STAMP_MOODS[1]);
      renderStamp(diaryStamp, diaryEntry, { baseClass: "thumbDiaryStamp", basePath: resolvedStampTheme.basePath });
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
        applyThemeBtn.classList.toggle("is-active", !!(selectedUiThemeId || selectedStampThemeId));
        renderThemeGrid();
      });

      themeGrid.appendChild(card);
    }

    // stamp themes
    const stampTitle = document.createElement("div");
    stampTitle.className = "themeSectionTitle";
    stampTitle.textContent = "デフォルトスタンプテーマ";
    themeGrid.appendChild(stampTitle);

    const stampEntries = DEFAULT_STAMP_THEME_IDS.map(id => STAMP_THEMES[id]).filter(Boolean);
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
        applyThemeBtn.classList.toggle("is-active", !!(selectedUiThemeId || selectedStampThemeId));
        renderThemeGrid();
      });

      themeGrid.appendChild(card);
    }

    applyThemeBtn.classList.toggle("is-active", !!(selectedUiThemeId || selectedStampThemeId));
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
    }
    if (selectedStampThemeId){
      settings.stampThemeId = validStampThemeId(selectedStampThemeId);
      if (!settings.themeByMonth || typeof settings.themeByMonth !== "object") settings.themeByMonth = {};
      const monthKey = `${YEAR}-${String(currentMonth).padStart(2,"0")}`;
      settings.themeByMonth[monthKey] = settings.stampThemeId;
    }
    applyThemeIfNeeded();
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

  function findCatalogTheme(type, id){
    if (!id || !storeCatalog || !Array.isArray(storeCatalog.themes)) return null;
    return storeCatalog.themes.find(t => t && t.type === type && t.id === id) || null;
  }

  // store
  let storeCatalog = null;
  let storeCatalogLoading = null;

  function loadStoreCatalog(){
    if (storeCatalog) return Promise.resolve(storeCatalog);
    if (storeCatalogLoading) return storeCatalogLoading;
    storeStatusEl.textContent = "読み込み中...";
    storeCatalogLoading = fetch("./themes/catalog.json", { cache: "no-store" })
      .then(res => {
        if (!res.ok) throw new Error("catalog_load_failed");
        return res.json();
      })
      .then(data => {
        storeCatalog = data || null;
        return storeCatalog;
      })
      .catch(() => {
        storeStatusEl.textContent = "カタログの読み込みに失敗しました。";
        return null;
      })
      .finally(() => {
        storeCatalogLoading = null;
      });
    return storeCatalogLoading;
  }

  function renderStoreCatalog(catalog){
    storeGridEl.innerHTML = "";
    if (!catalog || !Array.isArray(catalog.themes) || catalog.themes.length === 0){
      storeStatusEl.textContent = "テーマが見つかりません。";
      return;
    }
    storeStatusEl.textContent = "";

    const uiEntries = catalog.themes.filter(t => t && t.type === "ui");
    const stampEntries = catalog.themes.filter(t => t && t.type === "stamp");

    if (uiEntries.length){
      const uiTitle = document.createElement("div");
      uiTitle.className = "themeSectionTitle";
      uiTitle.textContent = "ストアUIテーマ";
      storeGridEl.appendChild(uiTitle);

      for (const t of uiEntries){
        const card = document.createElement("div");
        card.className = "themeCard storeCard";

        applyThemeTokensFromCatalog(t.cssVars, card);

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
            const entry = getStampDef(resolvedStampTheme, STAMP_MOODS[0]);
            renderStamp(dayStamp, entry, { baseClass: "thumbDayStamp", basePath: resolvedStampTheme.basePath });
            day.appendChild(dayStamp);
          }
          calRow.appendChild(day);
        }
        cal.appendChild(calRow);

        const content = document.createElement("div");
        content.className = "thumbContent";
        const diaryCard = document.createElement("div");
        diaryCard.className = "thumbDiaryCard";

        const diaryTop = document.createElement("div");
        diaryTop.className = "thumbDiaryTop";
        const diaryStamp = document.createElement("div");
        const diaryEntry = getStampDef(resolvedStampTheme, STAMP_MOODS[1]);
        renderStamp(diaryStamp, diaryEntry, { baseClass: "thumbDiaryStamp", basePath: resolvedStampTheme.basePath });
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
        name.textContent = t.name || t.id || "Theme";

        const owned = settings.ownedThemeIds && settings.ownedThemeIds.includes(`ui:${t.id}`);
        if (owned){
          const ownedBadge = document.createElement("div");
          ownedBadge.className = "storeOwned";
          ownedBadge.textContent = "保有中";
          thumb.appendChild(ownedBadge);
        }

        const actions = document.createElement("div");
        actions.className = "storeActions";
        const btn = document.createElement("button");
        btn.className = "btn";
        btn.type = "button";
        btn.textContent = owned ? "適用" : "購入";
        btn.addEventListener("click", () => {
          if (!owned){
            const next = new Set(normalizeOwnedThemeIds(settings.ownedThemeIds));
            next.add(`ui:${t.id}`);
            settings.ownedThemeIds = Array.from(next);
            saveSettings(settings);
            renderStore();
            return;
          }
          applyUiThemeFromCatalog(t);
          lastAppliedThemeKey = null;
          saveSettings(settings);
          renderCalendar();
          if (selectedDate){
            renderDiaryBlocks();
            setDiaryStampFromDate(selectedDate);
          }
          if (viewMode === "list") renderList();
          if (viewMode === "data") renderYearStats();
        });
        actions.appendChild(btn);

        card.appendChild(thumb);
        card.appendChild(name);
        card.appendChild(actions);

        storeGridEl.appendChild(card);
      }
    }

    if (stampEntries.length){
      const stampTitle = document.createElement("div");
      stampTitle.className = "themeSectionTitle";
      stampTitle.textContent = "ストアスタンプテーマ";
      storeGridEl.appendChild(stampTitle);

      for (const t of stampEntries){
        const card = document.createElement("div");
        card.className = "stampCard storeCard";

        const thumb = document.createElement("div");
        thumb.className = "stampThumb";

        const dotsRow = document.createElement("div");
        dotsRow.className = "stampDotsRow";

        for (const mood of STAMP_MOODS){
          const dot = document.createElement("div");
          const fromStamps = Array.isArray(t.stamps) ? t.stamps.find(s => s && s.mood === mood) : null;
          const entry = fromStamps ? {
            asset: fromStamps.asset || t.assets?.file || null,
            renderMode: fromStamps.renderMode || t.assets?.mode || "img-tag",
            color: fromStamps.color || t.preview?.color || null,
            className: fromStamps.className || null,
            shape: fromStamps.shape || null
          } : (t.assets?.file ? {
            asset: t.assets.file,
            renderMode: t.assets.mode || "img-tag",
            color: t.preview?.color || null
          } : null);
          renderStamp(dot, entry, { baseClass: "stampPreviewDot", basePath: t.assets?.basePath || "" });
          dotsRow.appendChild(dot);
        }
        thumb.appendChild(dotsRow);

        const name = document.createElement("div");
        name.className = "themeName";
        name.textContent = t.name || t.id || "Theme";

        const owned = settings.ownedThemeIds && settings.ownedThemeIds.includes(`stamp:${t.id}`);
        if (owned){
          const ownedBadge = document.createElement("div");
          ownedBadge.className = "storeOwned";
          ownedBadge.textContent = "保有中";
          thumb.appendChild(ownedBadge);
        }

        const actions = document.createElement("div");
        actions.className = "storeActions";
        const btn = document.createElement("button");
        btn.className = "btn";
        btn.type = "button";
        btn.textContent = owned ? "適用" : "購入";
        btn.addEventListener("click", () => {
          if (!owned){
            const next = new Set(normalizeOwnedThemeIds(settings.ownedThemeIds));
            next.add(`stamp:${t.id}`);
            settings.ownedThemeIds = Array.from(next);
            saveSettings(settings);
            renderStore();
            return;
          }
          applyStampThemeFromCatalog(t);
          lastAppliedThemeKey = null;
          saveSettings(settings);
          renderCalendar();
          if (selectedDate){
            renderDiaryBlocks();
            setDiaryStampFromDate(selectedDate);
          }
          if (viewMode === "list") renderList();
          if (viewMode === "data") renderYearStats();
        });
        actions.appendChild(btn);

        card.appendChild(thumb);
        card.appendChild(name);
        card.appendChild(actions);

        storeGridEl.appendChild(card);
      }
    }
  }

  function renderStore(){
    loadStoreCatalog().then(renderStoreCatalog);
  }

  // list
  function escapePreview(s){ return (s || "").slice(0, 160); }

  function renderList(){
    const derived = rebuildDerivedIfNeeded("calendar");
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
      const stampId = resolveDisplayStampId(key, derived);
      setMiniStampClass(stamp, stampId);

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

      if (hasAnyEntry(state[key])) filledCount++;

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
  function hasAnyEntry(dayObj){
    if (!dayObj || typeof dayObj !== "object") return false;
    if (dayObj.stampId) return true;
    const d = (dayObj.diary && typeof dayObj.diary === "object") ? dayObj.diary : null;
    if (!d) return false;
    if (d.goal && String(d.goal).trim()) return true;
    if (d.memo && String(d.memo).trim()) return true;
    if (Array.isArray(d.todos) && d.todos.some(t => t && ((t.text && String(t.text).trim()) || t.done))) return true;
    return false;
  }
  function countRecordedDaysForMonth(month){
    const dim = daysInMonthOf(month);
    const st = monthState(month);
    let used = 0;
    for (let day=1; day<=dim; day++){
      const key = ymd(month, day);
      const it = st[key];
      if (hasAnyEntry(it)) used++;
    }
    return { used, dim };
  }

  function renderYearStats(){
    rebuildDerivedIfNeeded("stats");
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
    applyThemeIfNeeded();
    saveSettings(settings);

    for (let m=MIN_MONTH; m<=MAX_MONTH; m++){
      const key = String(m).padStart(2,'0');
      if (Object.prototype.hasOwnProperty.call(monthsObj, key)){
        const incoming = monthsObj[key];
        if (incoming && typeof incoming === "object"){
          const { data } = migrateMonthData(incoming);
          saveStateForMonth(m, data);
        }
      }
    }

    state = loadStateForMonth(currentMonth);
    resetDerivedCache();
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
    resetDerivedCache();
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
    resetDerivedCache();
    settings = loadSettings();
    applyThemeIfNeeded();
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
  applyThemeIfNeeded();
  renderCalendar();
  setView("calendar");
  const monthKey = `${YEAR}-${String(currentMonth).padStart(2,'0')}`;
  const needsCatalogUi = !UI_THEMES[settings.uiThemeId];
  const needsCatalogStamp = !STAMP_THEMES[getStampThemeIdForMonth(monthKey)];
  if (needsCatalogUi || needsCatalogStamp){
    loadStoreCatalog().then(() => {
      lastAppliedThemeKey = null;
      if (applyThemeIfNeeded()){
        renderCalendar();
        if (selectedDate){
          renderDiaryBlocks();
          setDiaryStampFromDate(selectedDate);
        }
        if (viewMode === "list") renderList();
        if (viewMode === "data") renderYearStats();
      }
    });
  }

})();
