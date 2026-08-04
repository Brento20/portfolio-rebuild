/**
 * CSS custom property names defined in src/styles/tokens.css.
 * Use with getCssVariable() when JavaScript needs the same values as CSS.
 */
export const cssVariableNames = {
  background: "--color-bg",
  ink: "--color-ink",
  accent: "--color-accent",
  starBright: "--color-star-bright",
} as const;

export function getCssVariable(
  variableName: string,
  fallback: string,
): string {
  if (typeof document === "undefined") {
    return fallback;
  }

  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(variableName)
    .trim();

  return value || fallback;
}
