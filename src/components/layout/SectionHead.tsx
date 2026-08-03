import type { ReactNode } from "react";

interface SectionHeadProps {
  eyebrow: string;
  title: string;
  titleId?: string;
  lede?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHead({
  eyebrow,
  title,
  titleId,
  lede,
  align = "left",
  className = "",
}: SectionHeadProps) {
  return (
    <header
      className={[
        "section-head",
        align === "center" ? "section-head--center" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <p className="section-head__eyebrow">{eyebrow}</p>
      <h2 className="section-head__title" id={titleId}>
        {title}
      </h2>
      {lede ? <div className="section-head__lede">{lede}</div> : null}
    </header>
  );
}
