import type { ReactNode } from "react";

interface SectionHeadProps {
  title: string;
  subtitle?: string;
  titleId?: string;
  lede?: ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
}

/*
  Plate-style heading, after the star-chart convention:
  spaced serif capitals with an italic lowercase subtitle.
*/
export function SectionHead({
  title,
  subtitle,
  titleId,
  lede,
  align = "left",
  className = "",
}: SectionHeadProps) {
  return (
    <header
      className={[
        "section-head",
        align !== "left" ? `section-head--${align}` : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <h2 className="section-head__title" id={titleId}>
        {title}
      </h2>
      {subtitle ? (
        <p className="section-head__subtitle">{subtitle}</p>
      ) : null}
      {lede ? <div className="section-head__lede">{lede}</div> : null}
    </header>
  );
}
