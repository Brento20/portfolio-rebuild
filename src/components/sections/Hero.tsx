import { motion, useReducedMotion } from "framer-motion";
import { profile } from "../../data/profile";
import { HeroOrbit } from "./HeroOrbit";

const enterEase = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduceMotion = useReducedMotion();

  const fade = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: enterEase },
      };

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__backdrop" aria-hidden="true" />
      <div className="hero__inner">
        <div className="hero__grid">
          <div className="hero__copy">
            <motion.p className="hero__eyebrow" {...fade}>
              <span className="hero__eyebrow-dot" aria-hidden="true" />
              {profile.location}
            </motion.p>

            <motion.h1 className="hero__title" id="hero-title" {...fade}>
              {profile.name.split(" ").map((part, index) => (
                <span key={part} className="hero__title-part">
                  {part}
                  {index === 0 ? <br /> : null}
                </span>
              ))}
            </motion.h1>

            <motion.p className="hero__role" {...fade}>
              <span>{profile.role}</span>
              <span className="hero__role-sep" aria-hidden="true">
                /
              </span>
              <span className="hero__role-detail">{profile.roleDetail}</span>
            </motion.p>

            <motion.p className="hero__tagline" {...fade}>
              {profile.tagline}
            </motion.p>

            <motion.p className="hero__lead" {...fade}>
              {profile.heroLead}
            </motion.p>

            <motion.div className="hero__actions" {...fade}>
              <a className="btn btn--primary" href="#experience">
                View selected work
                <span className="btn__arrow" aria-hidden="true">
                  →
                </span>
              </a>
              <a className="btn btn--ghost" href="#contact">
                Get in touch
              </a>
            </motion.div>
          </div>

          <motion.div
            className="hero__visual"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, ease: enterEase, delay: 0.12 }}
          >
            <HeroOrbit />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
