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
