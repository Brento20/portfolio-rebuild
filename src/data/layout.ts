/** Percentage placement (0–100) on the experience map canvas. */
export interface ChartPositionPercent {
  x: number;
  y: number;
}

export const projectLayout: Record<string, ChartPositionPercent> = {
  "medley-kangaroo-point": { x: 17, y: 24 },
  akiba: { x: 44, y: 14 },
  girdlers: { x: 72, y: 36 },
  "studio-gaxa": { x: 34, y: 58 },
  huzzah: { x: 11, y: 48 },
  "darling-glebe": { x: 84, y: 26 },
  "website-audit-dashboard": { x: 52, y: 74 },
};
