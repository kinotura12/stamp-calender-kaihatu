# Schema/Import Notes (StickerCalendar)

## Versions
- APP_SCHEMA_VERSION: 1 (bulk export/import format)
- settings.schemaVersion: 1 (saved settings structure)
- UI theme schemaVersion: 1 (UI_THEMES)
- Stamp theme schemaVersion: 1 (STAMP_THEMES, mood_1..5 fixed)

## Import behavior
- appSchemaVersion: if incoming > APP_SCHEMA_VERSION -> import **abort** with warning.
- settings/theme schemaVersion: if unsupported -> **fallback** to defaults (not abort). Unknown fields ignored; missing fields filled from defaults.
- Unknown theme IDs -> fallback to default themes.
- Legacy stamp IDs (dot_*/color names) -> normalize to mood_1..5 on load.

### 日本語
- appSchemaVersion: 受信した値が APP_SCHEMA_VERSION より新しい場合は警告して中断。
- settings/theme schemaVersion: 非対応ならデフォルトへフォールバック（中断しない）。未知フィールドは無視し、欠損はデフォルトで補完。
- 不明なテーマIDはデフォルトテーマへフォールバック。
- 旧スタンプID（dot_* や色名）は読み込み時に mood_1..5 へ正規化。

## Migration hooks
- migrateSettings(obj): place to adjust settings when fields are added/changed (currently sanitize). Always called on import.
- migrateMonthData(raw): place to adjust month data (currently sanitize/legacy stamp mapping). Called on import per month.

### 日本語
- migrateSettings(obj): 設定のフィールド追加/変更があった場合の補正処理をここに書く（現状はサニタイズのみ）。インポート時に必ず呼ばれる。
- migrateMonthData(raw): 月データを補正するための入口（現状はサニタイズ＋旧スタンプID変換）。インポート時に各月に対して呼ばれる。

## Base paths & assets
- Themes support asePath and ssetUrl resolution via esolveAssetUrl(basePath, assetUrl).
- Bulk export stores 	hemeBasePaths (ui/stamp). Base paths are returned by resolve functions; UI application of assets is not yet implemented.

### 日本語
- テーマは asePath と ssetUrl を持ち、esolveAssetUrl で組み合わせて解決できる。
- バルクエクスポートには 	hemeBasePaths（UI/スタンプ）が保存される。リゾルバから basePath を取得可能。UIへのアセット適用は未実装。

## Hash (integrity)
- Theme definitions may contain hash; currently stored only. Verification not implemented (future: integrity check; purchase/auth to be server-side).

### 日本語
- テーマ定義に hash を含めることができるが、現在は保存のみ。検証は未実装（将来、整合性チェックや認証はサーバ側で）。

## Scope in bulk export
- xportScope: "fullSettings" in payload. Months range is from/to selection; settings are global. Future option: minimal scope if needed.

### 日本語
- xportScope: "fullSettings" をペイロードに含めている。月データは指定範囲、設定はグローバル。将来的に必要なら minimal などのスコープ追加も可能。

## Data shape in bulk export
- payload: { app, version, appSchemaVersion, settingsSchemaVersion, exportScope, type, year, fromMonth, toMonth, exportedAt, settings, months }
- settings includes: stampThemeId, uiThemeId, ownedThemeIds (state cache), themeByMonth, diaryLayout, schemaVersion.

### 日本語
- ペイロードの構造: { app, version, appSchemaVersion, settingsSchemaVersion, exportScope, type, year, fromMonth, toMonth, exportedAt, settings, months }
- settings に含まれるもの: stampThemeId, uiThemeId, ownedThemeIds（状態キャッシュ）, themeByMonth, diaryLayout, schemaVersion。

## Purchased themes
- ownedThemeIds is for local state/backup. Not suitable for purchase verification; real ownership should be server-side in future.

### 日本語
- ownedThemeIds はローカル状態/バックアップ用で、購入検証には向かない。実際の所有確認は将来サーバ側で行う想定。
