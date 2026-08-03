import type { ReactNode } from "react";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { projects } from "../../data/projects";
import { projectLayout } from "../../data/layout";
import type { Project } from "../../types/project";
import { ParallaxLayer } from "../celestial/ParallaxLayer";
import { ShootingStars } from "../celestial/ShootingStars";
import { ProjectDrawer } from "../project/ProjectDrawer";
import { StarSystem } from "./StarSystem/StarSystem";
import { Label } from "./StarSystem/Label";
import { Starfield } from "./Starfield";
import { Nebula } from "./Nebula";

interface ExperienceMapProps {
  overlay?: ReactNode;
}

export function ExperienceMap({ overlay }: ExperienceMapProps) {
  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);
  const reduceMotion = useReducedMotion();
  const hasSelection = selectedProject !== null;

  return (
    <>
      <div className="experience-map experience-map--immersive">
        <div className="experience-map__viewport">
          <div className="experience-map__canvas">
            <ParallaxLayer depth={6} className="experience-map__layer">
              <div className="experience-map__galaxy" aria-hidden="true" />
            </ParallaxLayer>

            <ParallaxLayer depth={14} className="experience-map__layer">
              <Nebula />
            </ParallaxLayer>

            <ParallaxLayer depth={24} className="experience-map__layer">
              <Starfield count={1400} />
            </ParallaxLayer>

            <ShootingStars count={8} />

            <ParallaxLayer
              depth={36}
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
            </ParallaxLayer>

            <ParallaxLayer
              depth={44}
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
                    isDimmed={
                      hasSelection && selectedProject?.id !== project.id
                    }
                    x={position.x}
                    y={position.y}
                    usePercent
                  />
                );
              })}
            </ParallaxLayer>

            {overlay ? (
              <motion.div
                className="experience-map__overlay"
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                {overlay}
              </motion.div>
            ) : null}

            <motion.a
              className="experience-map__scroll-hint"
              href="#contact"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <span>Continue to contact</span>
              <span className="experience-map__scroll-hint-icon" aria-hidden="true">
                ↓
              </span>
            </motion.a>
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
