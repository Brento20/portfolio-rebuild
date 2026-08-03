import { ExperienceMap } from "../constellation/ExperienceMap";

export function ExperienceSection() {
  return (
    <section
      className="experience-section"
      id="experience"
      aria-labelledby="experience-title"
    >
      <div className="section__inner experience-section__intro">
        <p className="section__eyebrow">Experience</p>
        <h2 className="section__title" id="experience-title">
          A map of recent work
        </h2>
        <p className="section__lede">
          Hospitality venues, creative studios, and personal builds — each node
          is a live project. Select a star to read the story, capabilities, and
          visit the site.
        </p>
        <p className="experience-section__hint">
          Tip: hover or focus a star to preview; click to open details.
        </p>
      </div>

      <ExperienceMap />
    </section>
  );
}
