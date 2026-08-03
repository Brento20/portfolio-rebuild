import type { Project } from "../../../types/project";
import { OrbitRenderer } from "./OrbitRenderer";
import { Star } from "./Star";
import "./star-system.css";

interface StarSystemProps {
  project: Project;
  x: number;
  y: number;
  usePercent?: boolean;
  isActive: boolean;
  isDimmed?: boolean;
  onClick: () => void;
}

export function StarSystem({
  project,
  x,
  y,
  usePercent = false,
  isActive,
  isDimmed = false,
  onClick,
}: StarSystemProps) {
  const isFeatured = project.featured;

  return (
    <button
      type="button"
      className={[
        "star-system",
        isActive ? "star-system--active" : "",
        isDimmed ? "star-system--dimmed" : "",
        isFeatured ? "star-system--featured" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={onClick}
      aria-label={`Open ${project.title}`}
      aria-pressed={isActive}
      style={{
        position: "absolute",
        left: usePercent ? `${x}%` : x,
        top: usePercent ? `${y}%` : y,
        transform: "translate(-50%, -50%)",
        zIndex: 2,
      }}
    >
      <span className="star-system__visual">
        <OrbitRenderer star={project.star} />

        <Star
          star={project.star}
          isActive={isActive}
          isFeatured={isFeatured}
        />
      </span>
    </button>
  );
}