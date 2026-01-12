export default function RightBar({ onOpenTheme, onOpenMenu }) {
  return (
    <div className="rightBar">
      <button className="iconBtn" type="button" aria-label="デザインテーマ" onClick={onOpenTheme}>
        ??
      </button>
      <button className="hamburger" type="button" aria-label="メニュー" onClick={onOpenMenu}>
        <span></span><span></span><span></span>
      </button>
    </div>
  );
}
