import { motion, useReducedMotion } from "framer-motion";
import { profile } from "../../data/profile";
import { SectionHead } from "../layout/SectionHead";

const enterEase = [0.22, 1, 0.36, 1] as const;

const stats = [
  { value: "200+", label: "Sites delivered" },
  { value: "5 yrs", label: "Web & SEO" },
  { value: "100", label: "Legacy sites supported" },
] as const;

export function Intro() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section intro" id="about" aria-labelledby="about-title">
      <div className="section__inner">
        <motion.div
          className="intro__layout"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: enterEase }}
        >
          <SectionHead
            index="01"
            eyebrow="About"
            title={profile.introTitle}
            titleId="about-title"
            className="intro__head"
          />

          <ul className="intro__stats" aria-label="Career highlights">
            {stats.map((stat) => (
              <li className="intro__stat" key={stat.label}>
                <span className="intro__stat-value">{stat.value}</span>
                <span className="intro__stat-label">{stat.label}</span>
              </li>
            ))}
          </ul>

          <div className="intro__grid">
            <div className="intro__copy">
              {profile.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>

            <dl className="intro__highlights">
              {profile.highlights.map((item) => (
                <div className="intro__highlight" key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
