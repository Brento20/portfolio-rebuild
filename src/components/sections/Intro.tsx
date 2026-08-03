import { motion, useReducedMotion } from "framer-motion";
import { profile } from "../../data/profile";

const enterEase = [0.22, 1, 0.36, 1] as const;

export function Intro() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section intro" id="about" aria-labelledby="about-title">
      <div className="section__inner">
        <motion.div
          className="intro__grid"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: enterEase }}
        >
          <div>
            <p className="section__eyebrow">About</p>
            <h2 className="section__title" id="about-title">
              Building sites that feel as considered as the brands behind them
            </h2>
            <div className="intro__copy">
              {profile.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </div>

          <dl className="intro__highlights">
            {profile.highlights.map((item) => (
              <div className="intro__highlight" key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
