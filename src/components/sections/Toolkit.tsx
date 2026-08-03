import { Approach } from "../celestial/Approach";
import { profile } from "../../data/profile";
import { SectionHead } from "../layout/SectionHead";

export function Toolkit() {
  return (
    <section
      className="section toolkit"
      id="toolkit"
      aria-labelledby="toolkit-title"
    >
      <div className="section__inner">
        <Approach>
          <SectionHead
            title="Instruments"
            subtitle="the tools I navigate by"
            titleId="toolkit-title"
          />
        </Approach>

        <Approach delay={0.08}>
          <div className="toolkit__index">
            {profile.toolkit.map((group) => (
              <div className="toolkit__row" key={group.label}>
                <h3 className="toolkit__row-label">{group.label}</h3>
                <p className="toolkit__row-items">
                  {group.items.map((item, index) => (
                    <span key={item}>
                      {index > 0 ? (
                        <span className="toolkit__sep" aria-hidden="true">
                          ·
                        </span>
                      ) : null}
                      {item}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </Approach>
      </div>
    </section>
  );
}
