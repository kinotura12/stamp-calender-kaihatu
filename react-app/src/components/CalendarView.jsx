import DowRow from "./DowRow";
import CalendarGrid from "./CalendarGrid";

export default function CalendarView() {
  return (
    <>
      <DowRow />
      <section className="grid calendarPanel" aria-label="カレンダー">
        <CalendarGrid />
      </section>
    </>
  );
}
