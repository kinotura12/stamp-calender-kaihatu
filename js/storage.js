// storage abstraction (currently localStorage; future-ready for IndexedDB / cloud)
(() => {
  const YEAR = 2026;
  const SETTINGS_SCHEMA_VERSION = 1;
  const MONTH_SCHEMA_VERSION = 1;
  const SETTINGS_KEY = `sticker-cal:settings:${YEAR}`;

  function storageKeyForMonthLegacy(month, year = YEAR){
    return `sticker-cal:${year}-${String(month).padStart(2,'0')}`;
  }
  function storageKeyForMonth(month, year = YEAR){
    return `sticker-cal:month:${year}-${String(month).padStart(2,'0')}`;
  }

  function normalizeSettings(obj){
    const s = obj && typeof obj === "object" ? { ...obj } : {};
    if (typeof s.schemaVersion !== "number") s.schemaVersion = SETTINGS_SCHEMA_VERSION;
    if (typeof s.stampThemeId !== "string") s.stampThemeId = null;
    if (!Array.isArray(s.diaryLayout)) s.diaryLayout = null;
    return s;
  }

  function normalizeMonthData(obj){
    const d = obj && typeof obj === "object" ? { ...obj } : {};
    if (typeof d.schemaVersion !== "number") d.schemaVersion = MONTH_SCHEMA_VERSION;
    return d;
  }

  function safeParse(json, fallback){
    try { return JSON.parse(json); }
    catch { return fallback; }
  }

  function loadSettings(){
    const raw = safeParse(localStorage.getItem(SETTINGS_KEY), {});
    return normalizeSettings(raw);
  }

  function saveSettings(settings){
    const payload = normalizeSettings(settings);
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(payload || {}));
  }

  function loadMonthData(month, year = YEAR){
    // new key優先、なければ従来キーを読む
    const primary = safeParse(localStorage.getItem(storageKeyForMonth(month, year)), null);
    const legacy = safeParse(localStorage.getItem(storageKeyForMonthLegacy(month, year)), {});
    const data = normalizeMonthData(primary || legacy || {});
    return data;
  }

  function saveMonthData(month, data, year = YEAR){
    const payload = normalizeMonthData(data);
    const json = JSON.stringify(payload || {});
    localStorage.setItem(storageKeyForMonth(month, year), json);
    // 互換のため従来キーにも書いておく
    localStorage.setItem(storageKeyForMonthLegacy(month, year), json);
  }

  function clearAllMonths(year = YEAR){
    for (let m=1; m<=12; m++){
      localStorage.removeItem(storageKeyForMonth(m, year));
      localStorage.removeItem(storageKeyForMonthLegacy(m, year));
    }
  }

  function clearSettings(){
    localStorage.removeItem(SETTINGS_KEY);
  }

  function resetAll(year = YEAR){
    clearAllMonths(year);
    clearSettings();
  }

  // expose
  window.storageApi = {
    loadSettings,
    saveSettings,
    loadMonthData,
    saveMonthData,
    clearAllMonths,
    clearSettings,
    resetAll,
    _keyForMonth: storageKeyForMonth, // for tests/dev
    _legacyKeyForMonth: storageKeyForMonthLegacy,
    _settingsKey: SETTINGS_KEY
  };
})();
