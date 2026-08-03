import { motion, useReducedMotion } from "framer-motion";
import { profile } from "../../data/profile";

const enterEase = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduceMotion = useReducedMotion();

  const fade = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.55, ease: enterEase },
      };

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__inner">
        <motion.p className="hero__eyebrow" {...fade}>
          {profile.location}
        </motion.p>

        <motion.h1 className="hero__title" id="hero-title" {...fade}>
          {profile.name}
        </motion.h1>

        <motion.p className="hero__role" {...fade}>
          {profile.role} · {profile.roleDetail}
        </motion.p>

        <motion.p className="hero__lead" {...fade}>
          {profile.tagline} {profile.heroLead}
        </motion.p>

        <motion.div className="hero__actions" {...fade}>
          <a className="btn btn--primary" href="#experience">
            View selected work
          </a>
          <a className="btn btn--ghost" href="#contact">
            Get in touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}
