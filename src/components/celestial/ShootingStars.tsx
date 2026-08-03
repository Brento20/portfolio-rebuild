import { useMemo } from "react";

interface ShootingStar {
  id: number;
  top: number;
  left: number;
  delay: number;
  duration: number;
  scale: number;
}

interface ShootingStarsProps {
  count?: number;
  className?: string;
}

export function ShootingStars({
  count = 6,
  className = "",
}: ShootingStarsProps) {
  const stars = useMemo<ShootingStar[]>(() => {
    return Array.from({ length: count }, (_, index) => ({
      id: index,
      top: Math.random() * 70 + 5,
      left: Math.random() * 80 + 10,
      delay: Math.random() * 12,
      duration: Math.random() * 2.5 + 2.5,
      scale: Math.random() * 0.45 + 0.55,
    }));
  }, [count]);

  return (
    <div
      className={["shooting-stars", className].filter(Boolean).join(" ")}
      aria-hidden="true"
    >
      {stars.map((star) => (
        <span
          key={star.id}
          className="shooting-stars__trail"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
            transform: `scale(${star.scale})`,
          }}
        />
      ))}
    </div>
  );
}
