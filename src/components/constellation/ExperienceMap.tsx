import { useState } from "react";
import { projects } from "../../data/projects";
import { projectLayout } from "../../data/layout";
import type { Project } from "../../types/project";
import { ProjectDrawer } from "../project/ProjectDrawer";
import { StarSystem } from "./StarSystem/StarSystem";
import { Starfield } from "./Starfield";
import { Nebula } from "./Nebula";

export function ExperienceMap() {
  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  return (
    <>
      <main
        style={{
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          overflow: "hidden",
          background:
            "radial-gradient(circle at center, #111827 0%, #080b12 45%, #020203 100%)",
        }}
      >
        <Nebula />
        <Starfield count={900} />

        <header
          style={{
            position: "absolute",
            top: "32px",
            left: "32px",
            zIndex: 10,
            color: "#ffffff",
          }}
        >
          <p
            style={{
              margin: "0 0 8px",
              fontSize: "12px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              opacity: 0.55,
            }}
          >
            Brenton Weaver
          </p>

          <h1
            style={{
              margin: 0,
              fontSize: "clamp(32px, 5vw, 72px)",
              lineHeight: 0.95,
            }}
          >
            Experience Map
          </h1>
        </header>

        {projects.map((project) => {
          const position = projectLayout[project.id];

          if (!position) {
            return null;
          }

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
      </main>

      <ProjectDrawer
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}