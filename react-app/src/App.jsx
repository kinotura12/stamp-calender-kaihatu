import AppShell from "./components/AppShell";

export default function App() {
  const state = {
    view: "calendar",
    currentYear: 2026,
    currentMonth: 1,
    selectedDate: "2026-01-01",
  };

  return <AppShell state={state} />;
}
