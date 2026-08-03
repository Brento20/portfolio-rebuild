import { motion, useReducedMotion } from "framer-motion";
import { profile } from "../../data/profile";
import { SectionHead } from "../layout/SectionHead";

const enterEase = [0.22, 1, 0.36, 1] as const;

const stats = [
  { value: "200+", label: "Sites delivered" },
  { value: "5 yrs", label: "Web, UX & SEO" },
  { value: "100", label: "Legacy sites supported" },
] as const;

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
} as const;

export function Intro() {
  const reduceMotion = useReducedMotion();

  const revealProps = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          ...reveal,
          viewport: { once: true, margin: "-100px" },
          transition: { duration: 0.85, ease: enterEase, delay },
        };

  return (
    <section className="section intro" id="about" aria-labelledby="about-title">
      <div className="section__inner">
        <motion.div {...revealProps()}>
          <SectionHead
            eyebrow="About"
            title={profile.introTitle}
            titleId="about-title"
          />
        </motion.div>

        <div className="intro__grid">
          <motion.div className="intro__copy" {...revealProps(0.08)}>
            {profile.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </motion.div>

          <motion.dl
            className="intro__constellation"
            aria-label="Focus areas"
            {...revealProps(0.16)}
          >
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
          </motion.dl>
        </div>

        <motion.ul
          className="intro__orbits"
          aria-label="Career highlights"
          {...revealProps(0.2)}
        >
          {stats.map((stat) => (
            <li className="intro__orbit" key={stat.label}>
              <span className="intro__orbit-ring" aria-hidden="true">
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
