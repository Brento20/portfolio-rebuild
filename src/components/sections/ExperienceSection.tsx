import { useRef } from "react";
import { ExperienceMap } from "../constellation/ExperienceMap";
import { CosmicHorizon } from "../celestial/CosmicHorizon";
import { SectionHead } from "../layout/SectionHead";

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <>
      <CosmicHorizon />
      <section
        ref={sectionRef}
        className="experience-section experience-section--immersive"
        id="experience"
        aria-labelledby="experience-title"
      >
        <ExperienceMap
          scrollRootRef={sectionRef}
          overlay={
            <SectionHead
              index="02"
              eyebrow="Experience"
              title="A constellation of recent work"
              titleId="experience-title"
              tone="dark"
              className="experience-section__head"
              lede={
                <>
                  <p>
                    Each body of light is a live build — hospitality, studios,
                    and personal products orbiting the same systems-minded craft.
                  </p>
                  <p className="experience-section__hint">
                    Drift across the field · select a star to open its story
                  </p>
                </>
              }
            />
          }
        />
      </section>
    </>
  );
}
