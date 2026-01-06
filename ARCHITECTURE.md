# ARCHITECTURE.md

（Calendar / Diary App – 2026-01-06版）

---

## 0. 目的

本アプリは以下を満たすことを目的とする。

- 日付ベースの記録（気分スタンプ、目標、TODO、メモ等）を **10年以上保持**できる
- 日記パネル内のUIを **ウィジェット単位で追加 / 削除 / 並べ替え / 一部カスタム**できる
- 「テーマ（装飾＋スタンプ）」を **月ごとに差し替え可能**で、過去ログが壊れない
- 将来、**分析パネル（集計・グラフ）**を安全に追加できる

---

## 1. 絶対ルール（レイヤ分離）

内部構造は必ず次の3レイヤに分離する。

この分離は **設計上の最優先事項**であり、例外を作らない。

### 1.1 facts（記録）

- 日付ごとの実際の入力値のみを保持する
- 分析は **このレイヤのみ**を参照する
- 見た目・配置・テーマ情報を一切含めない

### 1.2 layout（配置）

- 日記パネルにどのウィジェットを、どの順序で表示するか
- 並び替えや表示/非表示を管理
- layout変更で facts は変わらない

### 1.3 theme（見た目）

- 色・背景・スタンプ画像などの装飾
- theme変更で facts は変わらない

### 禁止事項

- UIの並び順を保存データ順にしない
- 色コード / 画像URL / CSS値を facts に保存しない
- theme依存の値を facts に埋め込まない

---

## 2. 用語定義（この憲法で使う言葉）

- **facts**
    
    永続化される「記録の事実データ」
    
- **entries**
    
    facts のうち、日付 × ウィジェット単位で整理された値集合
    
- **analysis**
    
    facts を加工して得られる派生データ（原則として保存しない）
    

---

## 3. ID設計（過去ログ保護の核心）

### 3.1 themeId（商品ID）

- 形式：`YYYY-MM-<slug>`
- 例：`2026-01-dots`
- `themes/<themeId>/theme.json` に必ず含める

### 3.2 meaningId（意味ID）

- **factsに保存する唯一の意味ID**
- テーマが変わっても共通の固定ID
- 例：`mood_1` ～ `mood_5`

### 3.3 assetRef（見た目参照）

- theme 内で meaningId を描画するための参照
- 例：`dot_pink`

**facts には meaningId 以外を保存しない。**

---

## 4. データモデル（facts / entries）

### 4.1 管理単位

- `monthKey = YYYY-MM` 単位で管理
- 内部キーは `dateKey = YYYY-MM-DD`

### 4.2 entries 構造

```
entries[dateKey][widgetInstanceId] = {
  value,
  updatedAt,
  deletedAt?// 将来同期用（論理削除）
}

```

### 4.3 template別 value 例

- moodPicker → `meaningId`
- todoList → `{ text, done, createdAt?, doneAt? }[]`
- singleLine → `string`
- multiLine → `string`

---

## 5. ウィジェット設計（可変UIの骨格）

### 5.1 WidgetTemplate（型）

- `templateType`
- `dataSchema`（factsに保存される値の契約）
- `defaultConfig`（初期表示名・制約）

### 5.2 WidgetInstance（実体）

- `widgetInstanceId`（UUID等）
- `templateType`
- `config`（ユーザー変更可能な表示名・設定）

### 5.3 Layout（配置）

- `layout.diaryPanelOrder: widgetInstanceId[]`

### 重要原則

- `widgetInstanceId → templateType` の対応は
    
    **settings.widgetInstances が唯一の正**
    
- entries 側に templateType を重複保持しない

---

## 6. settings（設定データ）

settings は facts とは完全に別ストア。

### 6.1 含めるもの

- `schemaVersion`
- `ownedThemeIds`
- `activeThemeId`
- `themeByMonth`
- `widgetInstances`
- `layout`
- `uiPrefs`（折りたたみ状態など）

### 6.2 含めてはいけないもの

- 日付ごとの記録値
- 集計・分析結果
- theme依存の色・画像そのもの

---

## 7. テーマ仕様

- `themes/<themeId>/theme.json` がテーマ定義
- meaningId → assetRef の対応を提供
- CSS変数（トークン）で装飾を切り替える

### フォールバック規則（必須）

- 未購入 / 取得失敗 / 不正 themeId → `default`
- `themeByMonth[monthKey]` が不正 → `default`

---

## 8. 永続化・将来同期を見据えた設計

### 8.1 保存戦略

- 当面は localStorage 可
- **storage API を抽象化し IndexedDB へ移行可能にする**

### 8.2 マイグレーション

- `schemaVersion` により **一度だけ実行**
- 移行前データのバックアップを保持
- 失敗しても起動不能にしない

### 8.3 同期を見据えた余白

- `updatedAt` を全 entry に保持
- `deletedAt` による論理削除を許容
- monthKey 単位保存を崩さない

---

## 9. 全期間データの扱い（重要）

全期間の表示・分析は **必ず制限付き**で行う。

### 想定ユースケース

1. **月間総覧**
    - 1か月分のみ表示
2. **分析パネル**
    - 期間指定（月 / 年 / 任意）
    - 集計・グラフ表示
3. **期間集計**
    - 件数・文字数などの裏データ

### 原則

- 全期間の entries を一括描画しない
- 期間指定 or 遅延読み込み前提

---

## 10. 分析パネル（Analysis Architecture）

### 10.1 基本原則

- 分析は **facts レイヤのみ**を参照
- layout / theme / UI情報は参照しない
- 見た目変更で分析結果が変わってはならない

### 10.2 正規化（必須）

- null / 欠損 / 型揺れを分析前に吸収
- facts 自体を書き換えない

### 10.3 読み込み順序

1. 期間指定から monthKey を確定
2. 月単位で entries をロード
3. 必要な widgetInstanceId のみ抽出
4. 集計処理を実行

### 10.4 月次サマリ（将来）

- 導入する場合も **月単位のみ**
- 全期間キャッシュは禁止

---

## 11. フォルダ構成（GitHub Pages前提）

```
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

- ES Modules 使用
- 外部ライブラリ不使用

---

## 12. 変更の原則

- 既存 UI の class / id を極力維持
- 変更は段階的に行う
- **動作維持 → 構造化 → 拡張** の順を守る

---

## 最終まとめ

- facts / layout / theme を絶対に混ぜない
- meaningId によって過去ログを守る
- 分割ロードと正規化で 10年運用に耐える
- 拡張はすべて「壊さず足す」