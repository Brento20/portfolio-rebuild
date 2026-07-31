interface LabelProps {
  title: string;
  isActive: boolean;
}

export function Label({
  title,
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
    >
      {title}
    </span>
  );
}