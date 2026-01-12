export default function MonthNav({ label, subLabel, onPrev, onNext }) {
  return (
    <div style={{ minWidth: 0 }}>
      <div className="monthNav">
        <button className="navBtn" type="button" aria-label="前の月" onClick={onPrev}>＜</button>
        <div style={{ minWidth: 0 }}>
          <h1>{label}</h1>
          <div className="sub">{subLabel}</div>
        </div>
        <button className="navBtn" type="button" aria-label="次の月" onClick={onNext}>＞</button>
      </div>
    </div>
  );
}
