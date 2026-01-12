export default function CalendarGrid() {
  const cells = Array.from({ length: 42 }, (_, index) => ({
    key: index,
    date: index + 1,
    inMonth: index < 31,
    moodClass: index % 5,
  }));

  return (
    <div className="calendar__grid">
      {cells.map((cell) => (
        <div
          key={cell.key}
          className={`calendar__cell ${cell.inMonth ? "" : "is-empty"}`}
          data-date={cell.inMonth ? `2026-01-${String(cell.date).padStart(2, "0")}` : ""}
        >
          <div className="calendar__daynum">{cell.inMonth ? cell.date : ""}</div>
          <button
            className={`calendar__dot stamp ${cell.inMonth ? "stamp--filled" : ""} ${cell.inMonth ? `stamp--mood-${cell.moodClass + 1}` : ""}`}
            type="button"
            aria-label={`${cell.inMonth ? cell.date : ""} スタンプ`}
          ></button>
        </div>
      ))}
    </div>
  );
}
