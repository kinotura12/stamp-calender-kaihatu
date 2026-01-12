# React Rebuild Plan

## 0. 目的 / 方針
- 目的:
  - 10年使える日記アプリ
  - 高速（初期描画 / 月切替 / 入力レスポンス）
  - ブロックカスタム・分析機能の拡張性
- 方針:
  - UI見た目は現行資産を流用
  - データ設計を先に確定
  - 段階的にReactへ移行

---

## 1. 現状整理
- 現行HTML: `index.html`
- 現行CSS: `css/style.css`
- 現行JS: `js/app.js`, `js/storage.js`
- 既存の主要UI:
  - Header / Calendar / Diary / Menu / Theme / List / Data / Store

---

## 2. データ設計（確定事項）
- Settings:
  - schemaVersion
  - uiThemeId / stampThemeId
  - blockDefinitions
  - tags
- MonthData:
  - schemaVersion / year / month
  - days { dateKey -> DayEntry }
- MoodLogs:
  - 月単位 or 年単位（方針: ____）

---

## 3. コンポーネント分解
- AppShell
- Header / MonthNav / RightBar
- CalendarView / CalendarGrid / CalendarCell
- DiaryView / DiaryPanel / CustomizePanel / LogDetailPanel
- ListView / DataView / StoreView
- Picker / MenuSheet / ThemePicker

---

## 3.5 命名規則（BEM + テーマ切替前提）
- BEMで構造を表す（Block__Element--Modifier）
  - 例: `calendar__cell`, `diary__header`, `themePicker__card`
- 状態は共通の状態クラスで表す
  - 例: `.is-active`, `.is-selected`, `.is-open`, `.is-disabled`
- 見た目はトークンとテーマ属性で制御
  - 例: `:root[data-theme="dark"] { --bg: ... }`
- 色や雰囲気をクラス名に入れない
  - NG例: `.blueButton`, `.darkCard`
- 旧クラスは段階移行（互換期間は別名クラスを併用）
- 共有パーツは中立クラスで統一
  - スタンプ: `.stamp` / `.stamp--filled` / `.stamp--mood-1..5`
  - タグ: `.tagChip`
  - トグル: `.toggle`（or `.switch` を置換）
- カレンダードットは日付の代表スタンプを即時反映する前提で扱う
  - UI更新は操作後すぐに state -> class へ反映する

---

## 4. State設計
- ui:
  - view, diaryMode, isPickerOpen, isMenuOpen ...
- nav:
  - currentYear, currentMonth, selectedDate
- settings:
  - uiThemeId, stampThemeId, blockDefinitions
- data:
  - days, moodLogs, tags
- cache:
  - calendarCells, listItems, analysisSeries

---

## 5. 分析用インデックス
- 基本:
  - byDate / byTag / byMood / byTimeBucket
- 拡張:
  - byMoodTag / byTagTime / statsByMonth

---

## 6. 移行ステップ
1) React最小骨組み
   - AppShell + Header + CalendarView
2) カレンダー描画をReact化
3) 日記パネルをReact化
4) メニュー / テーマ / ピッカー
5) List / Data / Store
6) 分析 / 設定ページ追加

---

## 7. パフォーマンス目標
- 初期描画: ___ ms
- 月切替: ___ ms
- 入力反応: ___ ms

---

## 8. リスク / 懸念
- 例: 分析機能の負荷増
- 例: スキーマ変更の互換性

---

## 9. TODO
- [ ] データ設計確定
- [ ] React骨組み作成
- [ ] CalendarView移植
- [ ] DiaryView移植
- [ ] 残りUI移植

---

## Appendix A. 今日のBEM化と中立化メモ（現状）
- CalendarGrid
  - JSX: `calendar__grid`, `calendar__cell`, `calendar__daynum`, `calendar__dot`
  - 共通スタンプ: `.stamp`, `.stamp--filled`, `.stamp--mood-1..5`
  - 旧クラスはCSS側で併存（段階移行中）
- DiaryPanel
  - BEM追加: `diary__*` を要素に付与
  - スタンプ: `.diaryStamp` + `.stamp*` を併用
  - 行系: `stampRow` / `formRow` を導入
  - 入力: `input.goal` / `textarea.memo` に統一
- UiLabPanel
  - BEM追加: `uiLab__*` を要素に付与
  - タグ: `.tagChip`（旧 `.lockTag` 併用）
  - トグル: `.toggle`（旧 `.switch` 併用）

## Appendix B. CSS Modules 移行手順（この時点から）
1) コンポーネント単位で `.module.css` を作成
   - 例: `DiaryPanel.module.css`, `CalendarGrid.module.css`, `UiLabPanel.module.css`
2) 既存 `style.css` から対象コンポーネントのルールを移植
   - 移植時はクラス名を短く（`header`, `section`, `row` など）
3) JSX側を `import styles from "./*.module.css"` に変更
   - `className={styles.header}` のように参照
4) 共通パーツは `shared` に集約
   - 例: `src/styles/shared.module.css`（stamp/tag/toggle）
5) テーマ切替は `:global([data-theme="..."])` を使用
   - 例: `:global([data-theme="dark"]) { --bg: ... }`
6) 移行完了したコンポーネントの旧クラスを削除
   - `style.css` から順次削除
