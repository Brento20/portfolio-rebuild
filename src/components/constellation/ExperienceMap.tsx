import type { ReactNode, RefObject } from "react";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
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
  scrollRootRef?: RefObject<HTMLElement | null>;
}

export function ExperienceMap({ overlay, scrollRootRef }: ExperienceMapProps) {
  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  const internalRef = useRef<HTMLElement>(null);
  const scrollTarget = scrollRootRef ?? internalRef;
  const nebulaRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);
  const galaxyRef = useRef<HTMLDivElement>(null);

  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 40, damping: 18 });
  const smoothY = useSpring(pointerY, { stiffness: 40, damping: 18 });

  const { scrollYProgress } = useScroll({
    target: scrollTarget,
    offset: ["start end", "end start"],
  });

  const scrollDriftY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const scrollScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1.06, 1, 1.04],
  );
  const overlayY = useTransform(scrollYProgress, [0, 1], [28, -32]);

  useEffect(() => {
    if (reduceMotion) return;

    const handleMove = (event: PointerEvent) => {
      pointerX.set((event.clientX / window.innerWidth - 0.5) * 2);
      pointerY.set((event.clientY / window.innerHeight - 0.5) * 2);
    };

    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, [pointerX, pointerY, reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;

    let frame = 0;

    const animate = () => {
      const x = smoothX.get();
      const y = smoothY.get();

      const move = (el: HTMLDivElement | null, amount: number) => {
        if (!el) return;
        el.style.transform = `translate3d(${x * amount}px, ${y * amount}px, 0)`;
      };

      move(nebulaRef.current, 14);
      move(galaxyRef.current, 8);
      move(backgroundRef.current, 22);
      move(starsRef.current, 38);
      move(labelsRef.current, 48);

      frame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion, smoothX, smoothY]);

  const hasSelection = selectedProject !== null;

  return (
    <>
      <div className="experience-map experience-map--immersive">
        <motion.div
          className="experience-map__viewport"
          style={
            reduceMotion
              ? undefined
              : {
                  scale: scrollScale,
                }
          }
        >
          <div className="experience-map__canvas">
            <motion.div
              className="experience-map__galaxy"
              ref={galaxyRef}
              style={reduceMotion ? undefined : { y: scrollDriftY }}
              aria-hidden="true"
            />

            <div ref={nebulaRef} className="experience-map__layer">
              <Nebula />
            </div>

            <div ref={backgroundRef} className="experience-map__layer">
              <Starfield count={1400} />
            </div>

            <ShootingStars count={8} />

            <div ref={starsRef} className="experience-map__layer experience-map__layer--systems">
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
                    isDimmed={
                      hasSelection && selectedProject?.id !== project.id
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
                style={reduceMotion ? undefined : { y: overlayY }}
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
        </motion.div>
      </div>

      <ProjectDrawer
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
