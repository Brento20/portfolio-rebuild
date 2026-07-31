import "./star-system.css";

interface LabelProps {
  title: string;
  x: number;
  y: number;
  isActive: boolean;
}

export function Label({
  title,
  x,
  y,
  isActive,
}: LabelProps) {
  return (
    <span
      className={[
        "star-system__label",
        isActive ? "star-system__label--active" : "",
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