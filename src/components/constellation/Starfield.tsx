import { useMemo } from "react";

type StarBrightnessTier = "dim" | "mid" | "bright";

interface StarfieldDot {
  id: number;
  xPercent: number;
  yPercent: number;
  sizePx: number;
  opacity: number;
  twinkleDurationSeconds: number;
  twinkleDelaySeconds: number;
  brightnessTier: StarBrightnessTier;
}

interface StarfieldProps {
  starCount?: number;
}

function pickRandomBrightnessTier(): StarBrightnessTier {
  const roll = Math.random();

  if (roll < 0.8) {
    return "dim";
  }

  if (roll < 0.98) {
    return "mid";
  }

  return "bright";
}

function randomPropertiesForTier(tier: StarBrightnessTier) {
  switch (tier) {
    case "dim":
      return {
        sizePx: Math.random() * 0.8 + 0.3,
        opacity: Math.random() * 0.3 + 0.12,
        twinkleDurationSeconds: Math.random() * 5 + 6,
      };

    case "mid":
      return {
        sizePx: Math.random() * 1.3 + 0.8,
        opacity: Math.random() * 0.4 + 0.35,
        twinkleDurationSeconds: Math.random() * 4 + 4,
      };

    case "bright":
      return {
        sizePx: Math.random() * 2.2 + 1.8,
        opacity: Math.random() * 0.25 + 0.7,
        twinkleDurationSeconds: Math.random() * 3 + 3,
      };
  }
}

export function Starfield({ starCount = 800 }: StarfieldProps) {
  const stars = useMemo<StarfieldDot[]>(() => {
    return Array.from({ length: starCount }, (_, index) => {
      const brightnessTier = pickRandomBrightnessTier();
      const visual = randomPropertiesForTier(brightnessTier);

      return {
        id: index,
        xPercent: Math.random() * 100,
        yPercent: Math.random() * 100,
        brightnessTier,
        twinkleDelaySeconds: Math.random() * -10,
        ...visual,
      };
    });
  }, [starCount]);

  return (
    <div className="starfield" aria-hidden="true">
      {stars.map((star) => (
        <span
          key={star.id}
          className={`starfield__star starfield__star--${star.brightnessTier}`}
          style={{
            left: `${star.xPercent}%`,
            top: `${star.yPercent}%`,
            width: `${star.sizePx}px`,
            height: `${star.sizePx}px`,
            opacity: star.opacity,
            animationDuration: `${star.twinkleDurationSeconds}s`,
            animationDelay: `${star.twinkleDelaySeconds}s`,
          }}
        />
      ))}
    </div>
  );
}
