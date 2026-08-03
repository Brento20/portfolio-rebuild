import { Starfield } from "../constellation/Starfield";

interface CelestialVeilProps {
  variant?: "dawn" | "deep";
  starCount?: number;
}

export function CelestialVeil({
  variant = "dawn",
  starCount = 120,
}: CelestialVeilProps) {
  return (
    <div
      className={[
        "celestial-veil",
        variant === "deep" ? "celestial-veil--deep" : "celestial-veil--dawn",
      ].join(" ")}
      aria-hidden="true"
    >
      <div className="celestial-veil__aurora celestial-veil__aurora--one" />
      <div className="celestial-veil__aurora celestial-veil__aurora--two" />
      <Starfield count={starCount} />
    </div>
  );
}
