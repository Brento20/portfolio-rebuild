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

  const containerRef = useRef<HTMLDivElement>(null);

  const nebulaRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;

    const handleMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMove);

    let frame = 0;

    const animate = () => {
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;

      const move = (
        el: HTMLDivElement | null,
        amount: number
      ) => {
        if (!el) return;

        el.style.transform = `translate(
          ${currentX * amount}px,
          ${currentY * amount}px
        )`;
      };

      move(nebulaRef.current, 2);
      move(backgroundRef.current, 4);
      move(starsRef.current, 10);
      move(labelsRef.current, 18);

      frame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return (
    <>
      <main
        ref={containerRef}
        style={{
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          overflow: "hidden",
          background:
            "radial-gradient(circle at center, #111827 0%, #080b12 45%, #020203 100%)",
        }}
      >
        <div
          ref={nebulaRef}
          style={{
            position: "absolute",
            inset: 0,
          }}
        >
          <Nebula />
        </div>

        <div
          ref={backgroundRef}
          style={{
            position: "absolute",
            inset: 0,
          }}
        >
          <Starfield count={900} />
        </div>

        <header
          style={{
            position: "absolute",
            top: 32,
            left: 32,
            zIndex: 20,
            color: "#fff",
          }}
        >
          <p
            style={{
              margin: "0 0 8px",
              fontSize: 12,
              letterSpacing: ".14em",
              textTransform: "uppercase",
              opacity: .55,
            }}
          >
            Brenton Weaver
          </p>

          <h1
            style={{
              margin: 0,
              fontSize: "clamp(32px,5vw,72px)",
              lineHeight: .95,
            }}
          >
            Experience Map
          </h1>
        </header>

        <div
          ref={starsRef}
          style={{
            position: "absolute",
            inset: 0,
          }}
        >
          {projects.map((project) => {
            const position = projectLayout[project.id];

            if (!position) return null;

            return (
              <StarSystem
                key={project.id}
                project={project}
                x={position.x}
                y={position.y}
                isActive={selectedProject?.id === project.id}
                onClick={() => setSelectedProject(project)}
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
                x={position.x}
                y={position.y}
              />
            );
          })}
        </div>
      </main>

      <ProjectDrawer
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}