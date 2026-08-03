import "./star-system.css";

interface LabelProps {
  title: string;
  x: number;
  y: number;
  isActive: boolean;
  isDimmed?: boolean;
}

export function Label({
  title,
  x,
  y,
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
        left: x,
        top: y + 22,
        transform: "translateX(-50%)",
      }}
    >
      {title}
    </span>
  );
}