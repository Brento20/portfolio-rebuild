import type { SatelliteConfig } from "../../../types/project";

interface SatelliteProps {
  satellite: SatelliteConfig;
}

export function Satellite({ satellite }: SatelliteProps) {
  return (
    <span
      className="star-system__satellite"
      style={{
        width: `${satellite.size}px`,
        height: `${satellite.size}px`,
      }}
    />
  );
}