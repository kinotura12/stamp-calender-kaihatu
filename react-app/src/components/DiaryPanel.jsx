export default function DiaryPanel() {
  return (
    <div className="diaryWrap diary">
      <div className="slider diary__slider">
        <section className="panel show diary__panel is-open">
          <div className="diaryHead diary__header">
            <div className="diaryHeadLeft diary__headerLeft">
              <div className="diaryStamp diary__stamp stamp stamp--filled stamp--mood-3" aria-label="その日のスタンプ"></div>
              <div>
                <div className="diaryLabel diary__label">日記</div>
                <div className="diaryDate diary__date">2026年1月15日</div>
              </div>
            </div>

            <div className="headBtns diary__actions">
              <button className="iconBtn" type="button" aria-label="ブロック設定">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M19.4 13.5a7.9 7.9 0 0 0 0-3l1.4-1.1-1.9-3.3-1.7.7a8.3 8.3 0 0 0-2.6-1.5L14.3 3h-4.6l-.3 2.3a8.3 8.3 0 0 0-2.6 1.5l-1.7-.7-1.9 3.3 1.4 1.1a7.9 7.9 0 0 0 0 3L3.2 14.6l1.9 3.3 1.7-.7a8.3 8.3 0 0 0 2.6 1.5l.3 2.3h4.6l.3-2.3a8.3 8.3 0 0 0 2.6-1.5l1.7.7 1.9-3.3-1.4-1.1Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                </svg>
              </button>
              <button className="iconBtn" type="button" aria-label="この日を削除">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9 3h6m-8 4h10m-9 0 1 16h6l1-16M10 7v12m4-12v12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          <div className="inlineConfirm diary__confirm">
            <div className="inlineConfirmMsg diary__confirmMsg">この日のデータを削除しますか？</div>
            <div className="inlineConfirmBtns diary__confirmActions">
              <button className="btn" type="button">いいえ</button>
              <button className="btn danger" type="button">はい</button>
            </div>
          </div>

          <div className="section diary__section">
            <div className="sectionHead diary__sectionHead">
              <div className="sectionTitle diary__sectionTitle">気分スタンプ</div>
            </div>
            <div className="stampRow diary__stampRow">
              <div className="diaryStamp diary__stamp stamp stamp--filled stamp--mood-1" aria-label="mood 1"></div>
              <div className="diaryStamp diary__stamp stamp stamp--filled stamp--mood-2" aria-label="mood 2"></div>
              <div className="diaryStamp diary__stamp stamp stamp--filled stamp--mood-3" aria-label="mood 3"></div>
              <div className="diaryStamp diary__stamp stamp stamp--filled stamp--mood-4" aria-label="mood 4"></div>
              <div className="diaryStamp diary__stamp stamp stamp--filled stamp--mood-5" aria-label="mood 5"></div>
            </div>
          </div>

          <div className="section diary__section">
            <div className="sectionHead diary__sectionHead">
              <div className="sectionTitle diary__sectionTitle">今日の気分</div>
              <div className="diaryLogCount diary__logCount">2件</div>
            </div>
            <div className="diaryLogBody diary__logBody">
              <div className="diaryLogItem diary__logItem">
                <span className="diaryLogTime diary__logTime">09:30</span> 落ち着いた
              </div>
              <div className="diaryLogItem diary__logItem">
                <span className="diaryLogTime diary__logTime">21:10</span> 少し疲れた
              </div>
            </div>
          </div>

          <div className="section diary__section">
            <div className="sectionHead diary__sectionHead">
              <div className="sectionTitle diary__sectionTitle">今日の目標</div>
            </div>
            <div className="formRow diary__fieldRow">
              <input className="goal diary__goal" type="text" value="早寝する" readOnly />
            </div>
          </div>

          <div className="section diary__section">
            <div className="sectionHead diary__sectionHead">
              <div className="sectionTitle diary__sectionTitle">TODO</div>
            </div>
            <div className="todoList diary__todoList">
              <label className="todoRow diary__todoRow">
                <input type="checkbox" defaultChecked />
                <span>資料作成</span>
              </label>
              <label className="todoRow diary__todoRow">
                <input type="checkbox" />
                <span>散歩</span>
              </label>
            </div>
          </div>

          <div className="section diary__section">
            <div className="sectionHead diary__sectionHead">
              <div className="sectionTitle diary__sectionTitle">メモ</div>
            </div>
            <textarea className="memo diary__memo" rows="3" readOnly defaultValue="いい天気だった。"></textarea>
          </div>
        </section>
      </div>
    </div>
  );
}
