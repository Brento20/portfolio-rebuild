import type { ProjectStar } from "../../../types/project";
import { Orbit } from "./Orbit";

interface OrbitRendererProps {
  star: ProjectStar;
}

export function OrbitRenderer({
  star,
}: OrbitRendererProps) {
  return (
    <>
      {star.orbits.map((orbit, index) => (
        <Orbit
          key={index}
          orbit={orbit}
        />
      ))}
    </>
  );
}