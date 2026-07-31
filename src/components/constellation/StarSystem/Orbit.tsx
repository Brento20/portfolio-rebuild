import type { OrbitConfig } from "../../../types/project";
import { Satellite } from "./Satellite";

interface OrbitProps {
  orbit: OrbitConfig;
}

export function Orbit({ orbit }: OrbitProps) {
  const diameter = orbit.radius * 2;

  return (
    <span
      className="star-system__orbit"
      style={{
        width: `${diameter}px`,
        height: `${diameter}px`,
        transform: `
          translate(-50%, -50%)
          rotate(${orbit.tilt ?? 0}deg)
          scaleX(${orbit.ellipse})
        `,
      }}
    >
      {orbit.satellites.map((satellite, index) => {
        const angle =
          satellite.angle ??
          (360 / orbit.satellites.length) * index;

        return (
          <span
            key={index}
            className="star-system__orbit-rotation"
            style={{
              animationDuration: `${orbit.duration}s`,
              animationDirection:
                orbit.direction === "clockwise"
                  ? "normal"
                  : "reverse",
              transform: `rotate(${angle}deg)`,
            }}
          >
            <span className="star-system__satellite-position">
              <Satellite satellite={satellite} />
            </span>
          </span>
        );
      })}
    </span>
  );
}