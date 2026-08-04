import type { ReactNode } from "react";
import { useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { projectConstellationEdges } from "../../data/constellationFigure";
import { projectLayout } from "../../data/layout";
import { projects } from "../../data/projects";
import { useMapPointerParallax } from "../../hooks/useMapPointerParallax";
import type { Project } from "../../types/project";
import { ShootingStars } from "../celestial/ShootingStars";
import { ProjectDrawer } from "../project/ProjectDrawer";
import { Label } from "./StarSystem/Label";
import { StarSystem } from "./StarSystem/StarSystem";
import { Nebula } from "./Nebula";
import { Starfield } from "./Starfield";

interface ExperienceMapProps {
  overlay?: ReactNode;
}

export function ExperienceMap({ overlay }: ExperienceMapProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(
    null,
  );

  const canvasRef = useRef<HTMLDivElement>(null);
  const nebulaLayerRef = useRef<HTMLDivElement>(null);
  const backgroundLayerRef = useRef<HTMLDivElement>(null);
  const figureLinesLayerRef = useRef<HTMLDivElement>(null);
  const starSystemsLayerRef = useRef<HTMLDivElement>(null);
  const labelsLayerRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useReducedMotion();

  const parallaxLayers = useMemo(
    () => [
      { elementRef: nebulaLayerRef, parallaxDepth: 8 },
      { elementRef: backgroundLayerRef, parallaxDepth: 14 },
      { elementRef: figureLinesLayerRef, parallaxDepth: 22 },
      { elementRef: starSystemsLayerRef, parallaxDepth: 28 },
      { elementRef: labelsLayerRef, parallaxDepth: 34 },
    ],
    [],
  );

  useMapPointerParallax(
    canvasRef,
    parallaxLayers,
    prefersReducedMotion !== true,
  );

  const hasSelectedProject = selectedProject !== null;

  return (
    <>
      <div className="experience-map">
        <div className="experience-map__canvas" ref={canvasRef}>
          <div ref={nebulaLayerRef} className="experience-map__layer">
            <Nebula />
          </div>

          <div ref={backgroundLayerRef} className="experience-map__layer">
            <Starfield starCount={1100} />
          </div>

          <div className="experience-map__graticule" aria-hidden="true">
            <span className="experience-map__ring experience-map__ring--one" />
            <span className="experience-map__ring experience-map__ring--two" />
            <span className="experience-map__ring experience-map__ring--three" />
            <span className="experience-map__axis experience-map__axis--h" />
            <span className="experience-map__axis experience-map__axis--v" />
          </div>

          <div
            ref={figureLinesLayerRef}
            className="experience-map__layer experience-map__layer--figure"
          >
            <svg
              className="experience-map__lines"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {projectConstellationEdges.map(
                ([fromProjectId, toProjectId]) => {
                  const fromPosition = projectLayout[fromProjectId];
                  const toPosition = projectLayout[toProjectId];
                  if (!fromPosition || !toPosition) {
                    return null;
                  }

                  const isEdgeHighlighted =
                    hasSelectedProject &&
                    (selectedProject?.id === fromProjectId ||
                      selectedProject?.id === toProjectId);

                  return (
                    <line
                      key={`${fromProjectId}-${toProjectId}`}
                      className={[
                        "experience-map__line",
                        isEdgeHighlighted ? "experience-map__line--lit" : "",
                        hasSelectedProject && !isEdgeHighlighted
                          ? "experience-map__line--faded"
                          : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      x1={fromPosition.x}
                      y1={fromPosition.y}
                      x2={toPosition.x}
                      y2={toPosition.y}
                      vectorEffect="non-scaling-stroke"
                    />
                  );
                },
              )}
            </svg>
          </div>

          <ShootingStars count={3} />

          <div
            ref={starSystemsLayerRef}
            className="experience-map__layer experience-map__layer--systems"
          >
            {projects.map((project) => {
              const position = projectLayout[project.id];
              if (!position) {
                return null;
              }

              const isProjectActive = selectedProject?.id === project.id;

              return (
                <StarSystem
                  key={project.id}
                  project={project}
                  x={position.x}
                  y={position.y}
                  usePercent
                  isActive={isProjectActive}
                  isDimmed={hasSelectedProject && !isProjectActive}
                  onSelect={() =>
                    setSelectedProject((current) =>
                      current?.id === project.id ? null : project,
                    )
                  }
                />
              );
            })}
          </div>

          <div
            ref={labelsLayerRef}
            className="experience-map__layer experience-map__layer--labels"
          >
            {projects.map((project) => {
              const position = projectLayout[project.id];
              if (!position) {
                return null;
              }

              return (
                <Label
                  key={project.id}
                  title={project.title}
                  isActive={selectedProject?.id === project.id}
                  isDimmed={
                    hasSelectedProject && selectedProject?.id !== project.id
                  }
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
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
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
