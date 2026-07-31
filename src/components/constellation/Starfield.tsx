import { useMemo } from "react";

type StarLayer = "background" | "middle" | "hero";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  layer: StarLayer;
}

interface StarfieldProps {
  count?: number;
}

function getStarLayer(): StarLayer {
  const chance = Math.random();

  if (chance < 0.8) {
    return "background";
  }

  if (chance < 0.98) {
    return "middle";
  }

  return "hero";
}

function getStarProperties(layer: StarLayer) {
  switch (layer) {
    case "background":
      return {
        size: Math.random() * 0.8 + 0.3,
        opacity: Math.random() * 0.3 + 0.12,
        duration: Math.random() * 5 + 6,
      };

    case "middle":
      return {
        size: Math.random() * 1.3 + 0.8,
        opacity: Math.random() * 0.4 + 0.35,
        duration: Math.random() * 4 + 4,
      };

    case "hero":
      return {
        size: Math.random() * 2.2 + 1.8,
        opacity: Math.random() * 0.25 + 0.7,
        duration: Math.random() * 3 + 3,
      };
  }
}

export function Starfield({ count = 800 }: StarfieldProps) {
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: count }, (_, index) => {
      const layer = getStarLayer();
      const properties = getStarProperties(layer);

      return {
        id: index,
        x: Math.random() * 100,
        y: Math.random() * 100,
        layer,
        delay: Math.random() * -10,
        ...properties,
      };
    });
  }, [count]);

  return (
    <div className="starfield" aria-hidden="true">
      {stars.map((star) => (
        <span
          key={star.id}
          className={`starfield__star starfield__star--${star.layer}`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
}