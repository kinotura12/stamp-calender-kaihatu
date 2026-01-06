// storage abstraction (currently localStorage; future-ready for IndexedDB / cloud)
(() => {
  const YEAR = 2026;
  const SETTINGS_KEY = `sticker-cal:settings:${YEAR}`;

  function storageKeyForMonth(month){
    return `sticker-cal:${YEAR}-${String(month).padStart(2,'0')}`;
  }

  function safeParse(json, fallback){
    try { return JSON.parse(json); }
    catch { return fallback; }
  }

  function loadSettings(){
    return safeParse(localStorage.getItem(SETTINGS_KEY), {});
  }

  function saveSettings(settings){
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings || {}));
  }

  function loadMonthData(month){
    return safeParse(localStorage.getItem(storageKeyForMonth(month)), {});
  }

  function saveMonthData(month, data){
    localStorage.setItem(storageKeyForMonth(month), JSON.stringify(data || {}));
  }

  function clearAllMonths(){
    for (let m=1; m<=12; m++){
      localStorage.removeItem(storageKeyForMonth(m));
    }
  }

  function clearSettings(){
    localStorage.removeItem(SETTINGS_KEY);
  }

  function resetAll(){
    clearAllMonths();
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
    _settingsKey: SETTINGS_KEY
  };
})();
