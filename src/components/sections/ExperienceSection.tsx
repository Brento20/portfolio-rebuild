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
            eyebrow="Plate II · Selected work"
            title="Weaver · recent builds"
            titleId="experience-title"
            className="experience-section__head section-head--chart"
            lede={
              <p className="experience-section__hint">
                Figure traced in the southern sky — select a star to read the
                field notes
              </p>
            }
          />
        }
      />
    </section>
  );
}
