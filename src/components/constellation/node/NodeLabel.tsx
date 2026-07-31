interface NodeLabelProps {
  title: string;
  isActive: boolean;
}

export function NodeLabel({
  title,
  isActive,
}: NodeLabelProps) {
  return (
    <span
      className={[
        "project-node__label",
        isActive ? "project-node__label--active" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {title}
    </span>
  );
}