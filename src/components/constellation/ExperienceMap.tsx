import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { projects } from "../../data/projects";
import { projectLayout } from "../../data/layout";
import type { Project } from "../../types/project";
import { ShootingStars } from "../celestial/ShootingStars";
import { ProjectDrawer } from "../project/ProjectDrawer";
import { StarSystem } from "./StarSystem/StarSystem";
import { Label } from "./StarSystem/Label";
import { Starfield } from "./Starfield";
import { Nebula } from "./Nebula";

interface ExperienceMapProps {
  overlay?: ReactNode;
}

/** Project stars joined the way a printed chart draws the figure. */
const constellationFigure: [string, string][] = [
  ["medley-kangaroo-point", "akiba"],
  ["akiba", "darling-glebe"],
  ["akiba", "girdlers"],
  ["darling-glebe", "girdlers"],
  ["girdlers", "website-audit-dashboard"],
  ["website-audit-dashboard", "studio-gaxa"],
  ["studio-gaxa", "huzzah"],
  ["huzzah", "medley-kangaroo-point"],
  ["studio-gaxa", "medley-kangaroo-point"],
];

/*
  Parallax is scoped to the map: it responds to the pointer moving
  across the field itself, easing back to rest when the pointer leaves.
*/
export function ExperienceMap({ overlay }: ExperienceMapProps) {
  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  const canvasRef = useRef<HTMLDivElement>(null);
  const nebulaRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);

  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let frame = 0;

    const handleMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const handleLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    canvas.addEventListener("pointermove", handleMove, { passive: true });
    canvas.addEventListener("pointerleave", handleLeave);

    const animate = () => {
      currentX += (targetX - currentX) * 0.045;
      currentY += (targetY - currentY) * 0.045;

      const move = (el: HTMLDivElement | null, amount: number) => {
        if (!el) return;
        el.style.transform = `translate3d(${currentX * amount}px, ${currentY * amount}px, 0)`;
      };

      move(nebulaRef.current, 8);
      move(backgroundRef.current, 14);
      move(linesRef.current, 22);
      move(starsRef.current, 28);
      move(labelsRef.current, 34);

      frame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(frame);
      canvas.removeEventListener("pointermove", handleMove);
      canvas.removeEventListener("pointerleave", handleLeave);
    };
  }, [reduceMotion]);

  const hasSelection = selectedProject !== null;

  return (
    <>
      <div className="experience-map">
        <div className="experience-map__canvas" ref={canvasRef}>
          <div ref={nebulaRef} className="experience-map__layer">
            <Nebula />
          </div>

          <div ref={backgroundRef} className="experience-map__layer">
            <Starfield count={1100} />
          </div>

          <div className="experience-map__graticule" aria-hidden="true">
            <span className="experience-map__ring experience-map__ring--one" />
            <span className="experience-map__ring experience-map__ring--two" />
            <span className="experience-map__ring experience-map__ring--three" />
            <span className="experience-map__axis experience-map__axis--h" />
            <span className="experience-map__axis experience-map__axis--v" />
          </div>

          <div ref={linesRef} className="experience-map__layer experience-map__layer--figure">
            <svg
              className="experience-map__lines"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {constellationFigure.map(([a, b]) => {
                const from = projectLayout[a];
                const to = projectLayout[b];
                if (!from || !to) return null;

                const isLit =
                  hasSelection &&
                  (selectedProject?.id === a || selectedProject?.id === b);

                return (
                  <line
                    key={`${a}-${b}`}
                    className={[
                      "experience-map__line",
                      isLit ? "experience-map__line--lit" : "",
                      hasSelection && !isLit
                        ? "experience-map__line--faded"
                        : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    vectorEffect="non-scaling-stroke"
                  />
                );
              })}
            </svg>
          </div>

          <ShootingStars count={3} />

          <div
            ref={starsRef}
            className="experience-map__layer experience-map__layer--systems"
          >
            {projects.map((project) => {
              const position = projectLayout[project.id];
              if (!position) return null;

              const isActive = selectedProject?.id === project.id;

              return (
                <StarSystem
                  key={project.id}
                  project={project}
                  x={position.x}
                  y={position.y}
                  usePercent
                  isActive={isActive}
                  isDimmed={hasSelection && !isActive}
                  onClick={() =>
                    setSelectedProject((current) =>
                      current?.id === project.id ? null : project,
                    )
                  }
                />
              );
            })}
          </div>

          <div
            ref={labelsRef}
            className="experience-map__layer experience-map__layer--labels"
          >
            {projects.map((project) => {
              const position = projectLayout[project.id];
              if (!position) return null;

              return (
                <Label
                  key={project.id}
                  title={project.title}
                  isActive={selectedProject?.id === project.id}
                  isDimmed={hasSelection && selectedProject?.id !== project.id}
                  x={position.x}
                  y={position.y}
                  usePercent
                />
              );
            })}
          </div>

          {overlay ? (
            <motion.div
              className="experience-map__overlay"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              {overlay}
            </motion.div>
          ) : null}

          <div className="experience-map__rim" aria-hidden="true">
            <span className="experience-map__edge experience-map__edge--north">
              05<sup>h</sup> 12<sup>m</sup> – 06<sup>h</sup> 48<sup>m</sup>
            </span>
            <span className="experience-map__edge experience-map__edge--south">
              −34° – −28°
            </span>
            <span className="experience-map__edge experience-map__edge--west">
              Fig. 1
            </span>
            <span className="experience-map__edge experience-map__edge--east">
              Scale 1:1
            </span>
          </div>

          <div className="experience-map__legend" aria-hidden="true">
            <span className="experience-map__legend-title">Magnitude</span>
            <span className="experience-map__legend-row">
              <span className="experience-map__legend-star experience-map__legend-star--1" />
              1.0
            </span>
            <span className="experience-map__legend-row">
              <span className="experience-map__legend-star experience-map__legend-star--2" />
              2.5
            </span>
            <span className="experience-map__legend-row">
              <span className="experience-map__legend-star experience-map__legend-star--3" />
              4.0
            </span>
          </div>

          <div className="experience-map__frame" aria-hidden="true">
            <span className="experience-map__tick experience-map__tick--tl" />
            <span className="experience-map__tick experience-map__tick--tr" />
            <span className="experience-map__tick experience-map__tick--bl" />
            <span className="experience-map__tick experience-map__tick--br" />
          </div>
        </div>
      </div>

      <ProjectDrawer
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
