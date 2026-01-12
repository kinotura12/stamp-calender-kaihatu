export default function UiLabPanel() {
  return (
    <section className="uiLabPanel uiLab">
      <div className="uiLabHead uiLab__head">
        <div className="uiLabTitle uiLab__title">UI部品棚</div>
        <div className="badge uiLab__badge">見た目チェック</div>
      </div>

      <div className="section uiLab__section">
        <div className="sectionHead uiLab__sectionHead">
          <div className="sectionTitle uiLab__sectionTitle">気分スタンプ</div>
        </div>
        <div className="stampRow uiLab__row">
          <div className="diaryStamp stamp stamp--filled stamp--mood-1" aria-label="mood 1"></div>
          <div className="diaryStamp stamp stamp--filled stamp--mood-2" aria-label="mood 2"></div>
          <div className="diaryStamp stamp stamp--filled stamp--mood-3" aria-label="mood 3"></div>
          <div className="diaryStamp stamp stamp--filled stamp--mood-4" aria-label="mood 4"></div>
          <div className="diaryStamp stamp stamp--filled stamp--mood-5" aria-label="mood 5"></div>
        </div>
      </div>

      <div className="section uiLab__section">
        <div className="sectionHead uiLab__sectionHead">
          <div className="sectionTitle uiLab__sectionTitle">ボタン</div>
        </div>
        <div className="stampRow uiLab__row">
          <button className="btn" type="button">基本</button>
          <button className="btn is-active" type="button">強調</button>
          <button className="btn danger" type="button">危険</button>
          <button className="ghostBtn" type="button">ゴースト</button>
          <button className="iconBtn" type="button" aria-label="Icon button">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="section uiLab__section">
        <div className="sectionHead uiLab__sectionHead">
          <div className="sectionTitle uiLab__sectionTitle">入力</div>
        </div>
        <div className="uiLabField uiLab__field">
          <input className="goal" type="text" value="短い入力の見本" readOnly />
          <textarea className="memo" rows="3" readOnly defaultValue="複数行の入力の見本。余白や影を調整する。"></textarea>
        </div>
      </div>

      <div className="section uiLab__section">
        <div className="sectionHead uiLab__sectionHead">
          <div className="sectionTitle uiLab__sectionTitle">チェックリスト</div>
        </div>
        <div className="todoList">
          <label className="todoRow">
            <input type="checkbox" defaultChecked />
            <span>完了した項目</span>
          </label>
          <label className="todoRow">
            <input type="checkbox" />
            <span>未完了の項目</span>
          </label>
        </div>
      </div>

      <div className="section uiLab__section">
        <div className="sectionHead uiLab__sectionHead">
          <div className="sectionTitle uiLab__sectionTitle">タグ</div>
        </div>
        <div className="stampRow uiLab__row">
          <span className="lockTag tagChip">仕事</span>
          <span className="lockTag tagChip">家</span>
          <span className="lockTag tagChip">睡眠</span>
          <span className="lockTag tagChip">健康</span>
        </div>
      </div>

      <div className="section uiLab__section">
        <div className="sectionHead uiLab__sectionHead">
          <div className="sectionTitle uiLab__sectionTitle">トグル</div>
        </div>
        <label className="switch toggle uiLab__toggle">
          <input type="checkbox" defaultChecked />
          <span>表示する</span>
        </label>
      </div>

      <div className="section uiLab__section">
        <div className="sectionHead uiLab__sectionHead">
          <div className="sectionTitle uiLab__sectionTitle">カード</div>
        </div>
        <div className="uiLabField uiLab__field">
          <div className="blockCard">
            <div className="blockTop">
              <div className="blockName">
                <strong>カード見本</strong>
                <span className="lockTag tagChip">固定</span>
              </div>
              <button className="tinyBtn" type="button">…</button>
            </div>
            <div className="blockBottom">
              <span className="badge">内容の説明テキスト</span>
              <label className="switch toggle">
                <input type="checkbox" />
                <span>非表示</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
