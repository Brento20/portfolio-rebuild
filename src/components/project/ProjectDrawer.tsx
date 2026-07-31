import type { Project } from "../../types/project";

interface ProjectDrawerProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectDrawer({
  project,
  onClose,
}: ProjectDrawerProps) {
  if (!project) {
    return null;
  }

  return (
    <aside
      aria-label={`${project.title} project details`}
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 20,
        padding: "32px",
        borderTop: "1px solid rgba(255, 255, 255, 0.16)",
        background: "rgba(10, 10, 10, 0.96)",
        backdropFilter: "blur(18px)",
        color: "#ffffff",
      }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close project details"
        style={{
          position: "absolute",
          top: "20px",
          right: "24px",
          border: 0,
          background: "transparent",
          color: "#ffffff",
          fontSize: "24px",
          cursor: "pointer",
        }}
      >
        ×
      </button>

      <p
        style={{
          margin: "0 0 8px",
          fontSize: "12px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          opacity: 0.55,
        }}
      >
        {project.location}
      </p>

      <h2
        style={{
          margin: "0 0 16px",
          fontSize: "36px",
          lineHeight: 1.1,
        }}
      >
        {project.title}
      </h2>

      <p
        style={{
          maxWidth: "720px",
          margin: "0 0 24px",
          lineHeight: 1.6,
          opacity: 0.8,
        }}
      >
        {project.summary}
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          marginBottom: "24px",
        }}
      >
        {project.capabilities.map((capability) => (
          <span
            key={capability}
            style={{
              padding: "8px 12px",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              borderRadius: "999px",
              fontSize: "13px",
            }}
          >
            {capability}
          </span>
        ))}
      </div>

      <a
        href={project.url}
        target="_blank"
        rel="noreferrer"
        style={{
          display: "inline-flex",
          padding: "12px 18px",
          borderRadius: "999px",
          background: "#ffffff",
          color: "#050505",
          fontWeight: 700,
          textDecoration: "none",
        }}
      >
        Visit live site
      </a>
    </aside>
  );
}