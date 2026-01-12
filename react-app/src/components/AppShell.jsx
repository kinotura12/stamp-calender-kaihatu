import Header from "./Header";
import CalendarView from "./CalendarView";

export default function AppShell({ state }) {
  return (
    <>
      <Header
        currentYear={state.currentYear}
        currentMonth={state.currentMonth}
        onPrevMonth={() => {}}
        onNextMonth={() => {}}
        onOpenTheme={() => {}}
        onOpenMenu={() => {}}
      />
      <main className="wrap">
        {state.view === "calendar" && <CalendarView />}
      </main>
    </>
  );
}
