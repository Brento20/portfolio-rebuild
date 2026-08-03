import { ExperienceMap } from "../constellation/ExperienceMap";
import { SectionHead } from "../layout/SectionHead";

export function ExperienceSection() {
  return (
    <>
      <div className="page-divider page-divider--into-dark" aria-hidden="true" />
      <section
        className="experience-section"
        id="experience"
        aria-labelledby="experience-title"
      >
        <div className="section__inner experience-section__intro">
          <SectionHead
            index="02"
            eyebrow="Experience"
            title="A map of recent work"
            titleId="experience-title"
            tone="dark"
            lede={
              <>
                <p>
                  Hospitality venues, creative studios, and personal builds —
                  each node is a live project. Select a star to read the
                  story, capabilities, and visit the site.
                </p>
                <p className="experience-section__hint">
                  Hover or focus a star to preview · click to open details
                </p>
              </>
            }
          />
        </div>

        <ExperienceMap />
      </section>
    </>
  );
}
