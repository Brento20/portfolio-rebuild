import type { Project } from "../../types/project";

interface NodeProps {
  project: Project;
  x: number;
  y: number;
  isActive: boolean;
  onClick: () => void;
}

export function Node({
  project,
  x,
  y,
  isActive,
  onClick,
}: NodeProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Open ${project.title}`}
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: 0,
        border: 0,
        background: "transparent",
        color: "#ffffff",
        cursor: "pointer",
      }}
    >
      <span
        style={{
          width: isActive ? 18 : 12,
          height: isActive ? 18 : 12,
          flexShrink: 0,
          borderRadius: "50%",
          background: "#ffffff",
          boxShadow: isActive
            ? "0 0 28px rgba(255, 255, 255, 0.95)"
            : "0 0 14px rgba(255, 255, 255, 0.6)",
          transition: "all 180ms ease",
        }}
      />

      <span
        style={{
          fontSize: "13px",
          letterSpacing: "0.04em",
          whiteSpace: "nowrap",
          opacity: isActive ? 1 : 0.72,
          transition: "opacity 180ms ease",
        }}
      >
        {project.title}
      </span>
    </button>
  );
}