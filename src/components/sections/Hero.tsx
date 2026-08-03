import { motion, useReducedMotion } from "framer-motion";
import { CelestialVeil } from "../celestial/CelestialVeil";
import { ShootingStars } from "../celestial/ShootingStars";
import { profile } from "../../data/profile";
import { HeroOrbit } from "./HeroOrbit";

const enterEase = [0.22, 1, 0.36, 1] as const;

const stagger = {
  animate: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const item = {
  initial: { opacity: 0, y: 22 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: enterEase },
  },
};

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <CelestialVeil variant="dawn" starCount={90} />
      <ShootingStars count={3} className="shooting-stars--subtle" />
      <div className="hero__backdrop" aria-hidden="true" />
      <div className="hero__inner">
        <motion.div
          className="hero__grid"
          variants={reduceMotion ? undefined : stagger}
          initial={reduceMotion ? false : "initial"}
          animate={reduceMotion ? undefined : "animate"}
        >
          <div className="hero__copy">
            <motion.p className="hero__eyebrow" variants={item}>
              <span className="hero__eyebrow-dot" aria-hidden="true" />
              {profile.location}
            </motion.p>

            <motion.h1 className="hero__title" id="hero-title" variants={item}>
              {profile.name.split(" ").map((part, index) => (
                <span key={part} className="hero__title-part">
                  {part}
                  {index === 0 ? <br /> : null}
                </span>
              ))}
            </motion.h1>

            <motion.p className="hero__role" variants={item}>
              <span>{profile.role}</span>
              <span className="hero__role-sep" aria-hidden="true">
                /
              </span>
              <span className="hero__role-detail">{profile.roleDetail}</span>
            </motion.p>

            <motion.p className="hero__tagline" variants={item}>
              {profile.tagline}
            </motion.p>

            <motion.p className="hero__lead" variants={item}>
              {profile.heroLead}
            </motion.p>

            <motion.div className="hero__actions" variants={item}>
              <a className="btn btn--primary" href="#experience">
                Enter the map
                <span className="btn__arrow" aria-hidden="true">
                  →
                </span>
              </a>
              <a className="btn btn--ghost" href="#contact">
                Get in touch
              </a>
            </motion.div>
          </div>

          <motion.div className="hero__visual" variants={item}>
            <HeroOrbit />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
