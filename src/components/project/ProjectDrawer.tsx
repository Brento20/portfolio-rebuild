import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Project } from "../../types/project";

const drawerEase = [0.22, 1, 0.36, 1] as const;

interface ProjectDrawerProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectDrawer({ project, onClose }: ProjectDrawerProps) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!project) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
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
            transition={{ duration: reduceMotion ? 0 : 0.22 }}
            onClick={onClose}
          />

          <motion.aside
            className="project-drawer"
            aria-label={`${project.title} project details`}
            role="dialog"
            aria-modal="true"
            initial={reduceMotion ? false : { y: "100%" }}
            animate={{ y: 0 }}
            exit={reduceMotion ? undefined : { y: "100%" }}
            transition={{ duration: 0.38, ease: drawerEase }}
          >
            <button
              type="button"
              className="project-drawer__close"
              onClick={onClose}
              aria-label="Close project details"
            >
              ×
            </button>

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
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
