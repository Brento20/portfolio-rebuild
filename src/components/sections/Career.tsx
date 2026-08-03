import { Approach } from "../celestial/Approach";
import { profile } from "../../data/profile";
import { SectionHead } from "../layout/SectionHead";

export function Career() {
  return (
    <section
      className="section career"
      id="career"
      aria-labelledby="career-title"
    >
      <div className="section__inner">
        <Approach>
          <SectionHead
            title="The path so far"
            subtitle="a decade of shipping, leading and learning"
            titleId="career-title"
            align="right"
            className="career__head"
          />
        </Approach>

        <div className="career__timeline">
          {profile.career.map((entry, index) => (
            <Approach
              key={entry.role + entry.period}
              className="career__entry"
              delay={index * 0.06}
            >
              <span className="career__marker" aria-hidden="true" />
              <span className="career__year" aria-hidden="true">
                {entry.year}
              </span>
              <p className="career__period">{entry.period}</p>
              <h3 className="career__role">
                {entry.role}
                <span className="career__org"> · {entry.org}</span>
              </h3>
              <p className="career__note">{entry.note}</p>
            </Approach>
          ))}
        </div>
      </div>
    </section>
  );
}
