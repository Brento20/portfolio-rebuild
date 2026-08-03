import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Project } from "../../types/project";

const drawerEase = [0.22, 1, 0.36, 1] as const;

interface ProjectDrawerProps {
  project: Project | null;
  onClose: () => void;
}

/*
  Asymmetric chart plate — screenshot sits proud and slightly
  rotated, overlapping the panel like a survey photograph.
*/
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
            transition={{ duration: reduceMotion ? 0 : 0.25 }}
            onClick={onClose}
          />

          <motion.aside
            className="project-drawer"
            aria-label={`${project.title} project details`}
            role="dialog"
            aria-modal="true"
            initial={reduceMotion ? false : { y: "108%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduceMotion ? undefined : { y: "108%", opacity: 0 }}
            transition={{ duration: 0.5, ease: drawerEase }}
          >
            <button
              type="button"
              className="project-drawer__close"
              onClick={onClose}
              aria-label="Close project details"
            >
              ×
            </button>

            <div className="project-drawer__layout">
              {project.image ? (
                <motion.a
                  className="project-drawer__figure"
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visit ${project.title} live site`}
                  initial={reduceMotion ? false : { y: 28, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.65, ease: drawerEase, delay: 0.08 }}
                >
                  <img
                    src={project.image}
                    alt={`${project.title} website`}
                    loading="lazy"
                  />
                  <span className="project-drawer__figure-caption">
                    fig. — {project.title.toLowerCase()}
                  </span>
                </motion.a>
              ) : null}

              <div className="project-drawer__body">
                <p className="project-drawer__meta">
                  {project.category} · {project.location}
                </p>

                <h2 className="project-drawer__title">{project.title}</h2>

                <p className="project-drawer__summary">{project.summary}</p>

                <ul className="project-drawer__legend">
                  {project.capabilities.slice(0, 5).map((capability) => (
                    <li className="project-drawer__legend-item" key={capability}>
                      <span
                        className="project-drawer__legend-star"
                        aria-hidden="true"
                      >
                        ✦
                      </span>
                      {capability}
                    </li>
                  ))}
                </ul>

                <a
                  className="btn btn--solid"
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit live site
                  <span className="btn__arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </div>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
