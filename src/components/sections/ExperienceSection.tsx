import { ExperienceMap } from "../constellation/ExperienceMap";
import { SectionHead } from "../layout/SectionHead";

export function ExperienceSection() {
  return (
    <section
      className="experience-section"
      id="experience"
      aria-labelledby="experience-title"
    >
      <ExperienceMap
        overlay={
          <SectionHead
            eyebrow="selected work"
            title="A constellation of recent builds"
            titleId="experience-title"
            className="experience-section__head"
            lede={
              <p className="experience-section__hint">
                Each star is a live project — select one to open its story
              </p>
            }
          />
        }
      />
    </section>
  );
}
