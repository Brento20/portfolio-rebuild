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
            title="Selected constellations"
            subtitle="seven live builds, plotted as stars"
            titleId="experience-title"
            className="experience-section__head"
          />
        }
      />
    </section>
  );
}
