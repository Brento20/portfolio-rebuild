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
            eyebrow="Instruments"
            title="Tools I navigate by"
            titleId="toolkit-title"
          />
        </Approach>

        <div className="toolkit__grid">
          {profile.toolkit.map((group, index) => (
            <Approach key={group.label} delay={index * 0.05}>
              <div className="toolkit__group">
                <h3 className="toolkit__label">{group.label}</h3>
                <ul className="toolkit__items">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </Approach>
          ))}
        </div>
      </div>
    </section>
  );
}
