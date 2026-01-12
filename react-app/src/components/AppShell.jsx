import Header from "./Header";
import CalendarView from "./CalendarView";
import DiaryPanel from "./DiaryPanel";
import UiLabPanel from "./UiLabPanel";

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
        {state.view === "calendar" && <DiaryPanel />}
        {state.view === "calendar" && <UiLabPanel />}
      </main>
    </>
  );
}
