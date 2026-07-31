interface NodeCoreProps {
  isActive: boolean;
  isFeatured: boolean;
}

export function NodeCore({
  isActive,
  isFeatured,
}: NodeCoreProps) {
  return (
    <span
      className={[
        "project-node__core",
        isActive ? "project-node__core--active" : "",
        isFeatured ? "project-node__core--featured" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}