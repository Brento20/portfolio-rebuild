import type { ProjectStar } from "../../../types/project";

interface NodeOrbitProps {
  star: ProjectStar;
  isActive: boolean;
  isFeatured: boolean;
}

export function NodeOrbit({
  star,
  isActive,
  isFeatured,
}: NodeOrbitProps) {
  const directionMultiplier =
    star.orbitDirection === "clockwise" ? 1 : -1;

  return (
    <>
      <span
        className={[
          "project-node__orbit",
          isActive ? "project-node__orbit--active" : "",
          isFeatured ? "project-node__orbit--featured" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        style={{
          transform: `
            rotate(${star.tilt ?? 0}deg)
            scaleX(${star.orbitScaleX})
            scaleY(${star.orbitScaleY})
          `,
        }}
      >
        <span
          className="project-node__orbit-rotation"
          style={{
            animationDuration: `${star.orbitDuration}s`,
            animationDirection:
              directionMultiplier === 1 ? "normal" : "reverse",
          }}
        >
          <span
            className="project-node__satellite"
            style={{
              transform: `
                translateX(-50%)
                scaleX(${1 / star.orbitScaleX})
                scaleY(${1 / star.orbitScaleY})
              `,
            }}
          />
        </span>
      </span>

      {star.secondaryOrbit && (
        <span
          className={[
            "project-node__orbit",
            "project-node__orbit--secondary",
            isActive ? "project-node__orbit--active" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          style={{
            transform: `
              rotate(${star.secondaryOrbit.tilt ?? 0}deg)
              scaleX(${star.secondaryOrbit.orbitScaleX})
              scaleY(${star.secondaryOrbit.orbitScaleY})
            `,
          }}
        >
          <span
            className="project-node__orbit-rotation"
            style={{
              animationDuration: `${star.secondaryOrbit.orbitDuration}s`,
              animationDirection:
                star.secondaryOrbit.orbitDirection === "clockwise"
                  ? "normal"
                  : "reverse",
            }}
          >
            <span
              className="project-node__satellite"
              style={{
                transform: `
                  translateX(-50%)
                  scaleX(${1 / star.secondaryOrbit.orbitScaleX})
                  scaleY(${1 / star.secondaryOrbit.orbitScaleY})
                `,
              }}
            />
          </span>
        </span>
      )}
    </>
  );
}