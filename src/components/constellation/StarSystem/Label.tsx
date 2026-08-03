import "./star-system.css";

interface LabelProps {
  title: string;
  x: number;
  y: number;
  usePercent?: boolean;
  isActive: boolean;
  isDimmed?: boolean;
}

export function Label({
  title,
  x,
  y,
  usePercent = false,
  isActive,
  isDimmed = false,
}: LabelProps) {
  return (
    <span
      className={[
        "star-system__label",
        isActive ? "star-system__label--active" : "",
        isDimmed ? "star-system__label--dimmed" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        position: "absolute",
        left: usePercent ? `${x}%` : x,
        top: usePercent ? `${y}%` : y,
        transform: "translate(-50%, 1.65rem)",
      }}
    >
      {title}
    </span>
  );
}