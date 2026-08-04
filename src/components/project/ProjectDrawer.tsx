import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { motionEaseOut } from "../../constants/motion";
import { useBodyScrollLock } from "../../hooks/useBodyScrollLock";
import type { Project } from "../../types/project";

interface ProjectDrawerProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectDrawer({ project, onClose }: ProjectDrawerProps) {
  const prefersReducedMotion = useReducedMotion();

  useBodyScrollLock(project !== null);

  useEffect(() => {
    if (!project) {
      return;
    }

    const onEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onEscapeKey);

    return () => {
      window.removeEventListener("keydown", onEscapeKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project ? (
        <>
          <motion.button
            type="button"
            className="project-drawer-backdrop"
            aria-label="Close project details"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
            onClick={onClose}
          />

          <motion.aside
            className="project-drawer"
            aria-label={`${project.title} project details`}
            role="dialog"
            aria-modal="true"
            initial={prefersReducedMotion ? false : { y: "104%" }}
            animate={{ y: 0 }}
            exit={prefersReducedMotion ? undefined : { y: "104%" }}
            transition={{ duration: 0.45, ease: motionEaseOut }}
          >
            <button
              type="button"
              className="project-drawer__close"
              onClick={onClose}
              aria-label="Close project details"
            >
              ×
            </button>

            {project.image ? (
              <a
                className="project-drawer__figure"
                href={project.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visit ${project.title} live site`}
              >
                <img
                  src={project.image}
                  alt={`${project.title} website`}
                  loading="lazy"
                />
              </a>
            ) : null}

            <div className="project-drawer__body">
              <p className="project-drawer__meta">
                {project.category} · {project.location}
              </p>

              <h2 className="project-drawer__title">{project.title}</h2>

              <p className="project-drawer__summary">{project.summary}</p>

              <div className="project-drawer__tags">
                {project.capabilities.map((capability) => (
                  <span className="project-drawer__tag" key={capability}>
                    {capability}
                  </span>
                ))}
              </div>

              <a
                className="project-drawer__link"
                href={project.url}
                target="_blank"
                rel="noreferrer"
              >
                Visit live site
              </a>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
