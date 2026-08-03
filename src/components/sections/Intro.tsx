import { motion, useReducedMotion } from "framer-motion";
import { Approach } from "../celestial/Approach";
import { profile } from "../../data/profile";
import { SectionHead } from "../layout/SectionHead";

const stats = [
  { value: "200+", label: "Sites delivered" },
  { value: "5 yrs", label: "Web, UX & SEO" },
  { value: "100", label: "Legacy sites supported" },
] as const;

export function Intro() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section intro" id="about" aria-labelledby="about-title">
      <div className="section__inner">
        <Approach>
          <SectionHead
            eyebrow="about"
            title={profile.introTitle}
            titleId="about-title"
          />
        </Approach>

        <div className="intro__grid">
          <Approach className="intro__copy" delay={0.08}>
            {profile.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </Approach>

          <Approach delay={0.16}>
            <dl className="intro__constellation" aria-label="Focus areas">
              {profile.highlights.map((item, index) => (
                <div
                  className="intro__node"
                  key={item.label}
                  style={{ "--node-index": index } as React.CSSProperties}
                >
                  <span className="intro__node-star" aria-hidden="true" />
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </Approach>
        </div>

        <motion.ul
          className="intro__orbits"
          aria-label="Career highlights"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          {stats.map((stat, index) => (
            <li className="intro__orbit" key={stat.label}>
              <span
                className="intro__orbit-ring"
                aria-hidden="true"
                style={{ "--orbit-index": index } as React.CSSProperties}
              >
                <span className="intro__orbit-spin">
                  <span className="intro__orbit-satellite" />
                </span>
                <span className="intro__orbit-spin intro__orbit-spin--counter">
                  <span className="intro__orbit-satellite intro__orbit-satellite--small" />
                </span>
                <span className="intro__orbit-value">{stat.value}</span>
              </span>
              <span className="intro__orbit-label">{stat.label}</span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
