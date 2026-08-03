interface Position {
  /** 0–100, horizontal placement in the experience viewport */
  x: number;
  /** 0–100, vertical placement in the experience viewport */
  y: number;
}

export const projectLayout: Record<string, Position> = {
  "medley-kangaroo-point": { x: 17, y: 24 },
  akiba: { x: 44, y: 14 },
  girdlers: { x: 72, y: 36 },
  "studio-gaxa": { x: 34, y: 58 },
  huzzah: { x: 11, y: 48 },
  "darling-glebe": { x: 84, y: 26 },
  "website-audit-dashboard": { x: 52, y: 74 },
};
