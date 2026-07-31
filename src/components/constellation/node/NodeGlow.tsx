interface NodeGlowProps {
  isActive: boolean;
  isFeatured: boolean;
}

export function NodeGlow({
  isActive,
  isFeatured,
}: NodeGlowProps) {
  return (
    <span
      className={[
        "project-node__glow",
        isActive ? "project-node__glow--active" : "",
        isFeatured ? "project-node__glow--featured" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}