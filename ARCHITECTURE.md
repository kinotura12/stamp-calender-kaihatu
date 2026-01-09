# ARCHITECTURE.md
（Sticker Calendar / Diary App）

---

## 0. 目的（共通）

本アプリは以下を満たすことを目的とする。

- 日付ベースの記録（気分スタンプ、目標、TODO、メモ等）を長期保持できる
- 日記パネル内のUIをブロック単位で並べ替え・表示切替できる
- テーマ（装飾＋スタンプ）を差し替えても過去ログが壊れない
- 将来、分析（集計・グラフ）を安全に追加できる

---

# V1：現行実装（2026-01 時点 / 実装準拠）

## V1-1. データレイヤの現実

V1では、保存構造は「固定フォーム型」。

- facts（実データ）＝ monthData の日付ごとの固定構造
- layout（配置）＝ settings.diaryLayout
- theme（見た目）＝ settings の theme 指定 + app.js の定義

※ V2で想定する widgetInstanceId / entries の汎用構造は未導入。

---

## V1-2. 永続化キー（localStorage）

### Settings（年単位）

- key: `sticker-cal:settings:2026`
- 内容: テーマ・レイアウト等

### MonthData（月単位）

- primary key: `sticker-cal:month:2026-01`
- legacy key: `sticker-cal:2026-01`
- 読み込みは primary 優先、保存は両方に書き込む

---

## V1-3. MonthData（facts）構造

- dateKey = `YYYY-MM-DD`
- state[dateKey] = DayRecord

```js
{
  stampId: "mood_1" | "mood_2" | "mood_3" | "mood_4" | "mood_5" | null,
  diary: {
    goal: string,
    todos: { id: string, done: boolean, text: string }[],
    memo: string
  }
}
```

正規化方針（読み込み時）

- legacy の stamp → stampId に変換
- stampId は mood_1..5 のみ許可（不正値は null）
- diary 欠損時は { goal:"", todos:[], memo:"" } を補完
- todos は UI 都合により最低1件以上を保証

補足（責務分離）

- sanitizeMonthData は「保存形式の最低保証」（legacy stamp → stampId、stampId 正規化）のみ
- ensureDay は「画面で扱う最低保証」（stampId 正規化、diary の型補正）まで
- UI 都合の初期化（TODO 初期行や uid 付与）は prepareDayForEdit でのみ行う

テーマ管理の3状態モデル

- Catalog（ストアに存在するテーマ）
  - ストア側の販売一覧
  - UIテーマ/スタンプテーマのメタ情報（価格、プレビュー、説明、対応schemaなど）
- Ownership（ユーザーが所有しているテーマ）
  - 購入/解放済みのテーマID一覧
  - 所有判定の唯一の根拠
- Presentation（表示状態）
  - UIでの表示順・フィルタ・タブ切替・選択状態
  - 永続化の可否は別途検討（基本はUI state）

運用ルール

- UIで選択できるのは Ownership に含まれるテーマのみ
- Catalog はストア画面・購入導線のために参照される
- Ownership と Presentation の更新は Catalog の更新と独立して扱う
---

## V1-4. Settings 構造（layout + theme）

```js
{
  schemaVersion: number,
  stampThemeId: string,
  uiThemeId: string,
  ownedThemeIds: string[],
  themeByMonth: { [YYYY-MM]: stampThemeId },
  diaryLayout: DiaryBlock[]
}
```

DiaryBlock

```js
{
  instanceId: string,
  type: "mood" | "goal" | "todo" | "memo",
  name: string,
  visible: boolean
}
```

配置ルール

- mood は常に先頭固定
- goal は常に2番目固定
- それ以外は順序・表示切替が可能

---

## V1-5. テーマ実装の現実

テーマ定義は app.js 内の定数として保持。

- STAMP_THEMES
- UI_THEMES

facts には meaningId（mood_1..5）のみを保存し、見た目（色・画像・class）は theme側で解決する。

---

## V1-6. マイグレーション方針

- sanitize による補完で救済する設計
- schemaVersion は「保存形式が変わる時のみ」更新
- bulk import 時は version 超過を検知して拒否

---

## V1-7. 現行フォルダ構成

```bash
/index.html
/css/style.css
/js/storage.js
/js/app.js
/assets/stamps/...
/ARCHITECTURE.md
```

---

## V1-8. 押下アニメの共通ルール

- 最小押下時間: 120ms（短いタップでも押下アニメが見えるようにする）
- 対象: FAB、FABバブル内スタンプなど
- 実装指針: pointerdown で is-pressing を付与し、pointerup/cancel/leave で解除

---

# V2：将来設計（憲法 / 移行先）

## V2-1. レイヤ分離（絶対ルール）

**facts**

- 日付ごとの実入力値のみ
- layout / theme を含めない

**layout**

- 表示順・表示有無
- layout変更で facts は変わらない

**theme**

- 色・背景・スタンプ画像など
- theme変更で facts は変わらない

---

## V2-2. ID設計

**meaningId**

- facts に保存する唯一の意味ID
- 例: mood_1..mood_5

**assetRef**

- theme 内で meaningId を描画する参照
- facts に見た目情報は保存しない

---

## V2-3. facts（entries）モデル

```js
entries[dateKey][widgetInstanceId] = {
  value,
  updatedAt,
  deletedAt?
}
```

管理単位は monthKey = YYYY-MM

---

## V2-4. Widgetモデル

WidgetTemplate

- templateType
- dataSchema
- defaultConfig

WidgetInstance

- widgetInstanceId
- templateType
- config

Layout

- layout.diaryPanelOrder: widgetInstanceId[]

---

## V2-5. settings（完全分離）

含めるもの：

- schemaVersion
- ownedThemeIds
- activeThemeId
- themeByMonth
- widgetInstances
- layout
- uiPrefs

含めないもの：

- 日付ごとの記録値
- 分析・集計結果
- theme依存の色・画像

---

## V2-6. テーマ仕様

- themes/<themeId>/theme.json
- meaningId → assetRef の対応
- CSS変数トークンで装飾

フォールバック必須：

- 不正 themeId → default
- 不正 month 指定 → default

---

## V2-7. 永続化・マイグレーション

- storage API を抽象化
- IndexedDB / 同期対応を想定
- schemaVersion による段階移行
- 失敗しても起動不能にしない

---

## V2-8. 目標フォルダ構成

```bash
/index.html
/css/style.css
/js/app.js
/js/state.js
/js/storage.js
/js/theme.js
/js/widgets/*.js
/themes/default/theme.json
/themes/default/assets/...
```
