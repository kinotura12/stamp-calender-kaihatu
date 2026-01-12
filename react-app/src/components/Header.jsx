import MonthNav from "./MonthNav";
import RightBar from "./RightBar";

export default function Header({ currentYear, currentMonth, onPrevMonth, onNextMonth, onOpenTheme, onOpenMenu }) {
  return (
    <header>
      <div className="wrap">
        <div className="titleRow">
          <MonthNav
            label={`${currentYear}年${currentMonth}月`}
            subLabel="丸タップでスタンプ / 日付タップで日記"
            onPrev={onPrevMonth}
            onNext={onNextMonth}
          />
          <RightBar onOpenTheme={onOpenTheme} onOpenMenu={onOpenMenu} />
        </div>
      </div>
    </header>
  );
}
