import type { ReactNode } from "react";

interface SectionHeadProps {
  index: string;
  eyebrow: string;
  title: string;
  titleId?: string;
  lede?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}

export function SectionHead({
  index,
  eyebrow,
  title,
  titleId,
  lede,
  tone = "light",
  className = "",
}: SectionHeadProps) {
  return (
    <header
      className={[
        "section-head",
        tone === "dark" ? "section-head--dark" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="section-head__rail" aria-hidden="true">
        <span className="section-head__index">{index}</span>
        <span className="section-head__line" />
      </div>

      <div className="section-head__content">
        <p className="section-head__eyebrow">{eyebrow}</p>
        <h2 className="section-head__title" id={titleId}>
          {title}
        </h2>
        {lede ? <div className="section-head__lede">{lede}</div> : null}
      </div>
    </header>
  );
}
