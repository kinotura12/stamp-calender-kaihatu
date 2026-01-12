export default function CalendarGrid() {
  const cells = Array.from({ length: 42 }, (_, index) => ({
    key: index,
    date: index + 1,
    inMonth: index < 31,
  }));

  return (
    <div className="days">
      {cells.map((cell) => (
        <div
          key={cell.key}
          className={`cell ${cell.inMonth ? "" : "muted"}`}
          data-date={cell.inMonth ? `2026-01-${String(cell.date).padStart(2, "0")}` : ""}
        >
          <div className="num">{cell.inMonth ? cell.date : ""}</div>
          <button className="dot" type="button" aria-label={`${cell.inMonth ? cell.date : ""} スタンプ`}></button>
        </div>
      ))}
    </div>
  );
}
