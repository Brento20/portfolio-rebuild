import { useEffect, useRef, useState } from "react";
import { projects } from "../../data/projects";
import { projectLayout } from "../../data/layout";
import type { Project } from "../../types/project";
import { ProjectDrawer } from "../project/ProjectDrawer";
import { StarSystem } from "./StarSystem/StarSystem";
import { Label } from "./StarSystem/Label";
import { Starfield } from "./Starfield";
import { Nebula } from "./Nebula";

export function ExperienceMap() {
  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  const nebulaRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  const designWidth = 960;
  const designHeight = 680;

  useEffect(() => {
    const updateScale = () => {
      const stage = stageRef.current;
      const viewport = viewportRef.current;
      if (!stage || !viewport) return;

      const available = viewport.clientWidth - 32;
      const scale = Math.min(1, available / designWidth);
      stage.style.setProperty("--experience-map-scale", String(scale));
      viewport.style.minHeight = `${designHeight * scale}px`;
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMove);

    let frame = 0;

    const animate = () => {
      currentX += (mouseX - currentX) * 0.06;
      currentY += (mouseY - currentY) * 0.06;

      const move = (el: HTMLDivElement | null, amount: number) => {
        if (!el) return;
        el.style.transform = `translate3d(${currentX * amount}px, ${currentY * amount}px, 0)`;
      };

      move(nebulaRef.current, 1.5);
      move(backgroundRef.current, 3);
      move(starsRef.current, 7);
      move(labelsRef.current, 11);

      frame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  const hasSelection = selectedProject !== null;

  return (
    <>
      <div className="experience-map">
        <div className="experience-map__viewport" ref={viewportRef}>
          <div className="experience-map__canvas">
            <div
              className="experience-map__stage"
              ref={stageRef}
              style={{ width: designWidth, height: designHeight }}
            >
              <div className="experience-map__overlay-header">
                <p>Scroll the page to continue after exploring</p>
              </div>

              <div ref={nebulaRef} style={{ position: "absolute", inset: 0 }}>
                <Nebula />
              </div>

              <div
                ref={backgroundRef}
                style={{ position: "absolute", inset: 0 }}
              >
                <Starfield count={750} />
              </div>

              <div ref={starsRef} style={{ position: "absolute", inset: 0 }}>
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
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                }}
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
                  />
                );
              })}
              </div>
            </div>
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
