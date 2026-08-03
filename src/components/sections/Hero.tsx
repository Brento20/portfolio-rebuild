import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { profile } from "../../data/profile";

const enterEase = [0.22, 1, 0.36, 1] as const;

const stagger = {
  animate: {
    transition: { staggerChildren: 0.14, delayChildren: 0.2 },
  },
};

const rise = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: enterEase },
  },
};

export function Hero() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const copyY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const ringsY = useTransform(scrollYProgress, [0, 1], [0, 170]);

  return (
    <section
      ref={sectionRef}
      className="hero"
      id="top"
      aria-labelledby="hero-title"
    >
      <motion.div
        className="hero__rings"
        aria-hidden="true"
        style={reduceMotion ? undefined : { y: ringsY }}
      >
        <span className="hero__ring hero__ring--one" />
        <span className="hero__ring hero__ring--two" />
        <span className="hero__ring hero__ring--three" />
        <span className="hero__ring-planet" />
      </motion.div>

      <motion.div
        className="hero__frame"
        style={reduceMotion ? undefined : { y: copyY, opacity: copyOpacity }}
        variants={reduceMotion ? undefined : stagger}
        initial={reduceMotion ? false : "initial"}
        animate={reduceMotion ? undefined : "animate"}
      >
        <motion.header className="hero__meta" variants={rise}>
          <span className="hero__meta-item">33.8688°S&thinsp;/&thinsp;151.2093°E</span>
          <span className="hero__meta-item hero__meta-item--wide">
            {profile.role} — {profile.roleDetail}
          </span>
          <span className="hero__meta-item hero__meta-status">
            <span className="hero__meta-pulse" aria-hidden="true" />
            Open to opportunities
          </span>
        </motion.header>

        <motion.h1 className="hero__title" id="hero-title" variants={rise}>
          <span className="hero__title-line">Brenton</span>
          <span className="hero__title-line hero__title-line--offset">
            <em>Weaver</em>
          </span>
        </motion.h1>

        <motion.div className="hero__foot" variants={rise}>
          <p className="hero__lead">{profile.tagline}</p>

          <div className="hero__actions">
            <a className="btn btn--solid" href="#experience">
              Explore the work
            </a>
            <a className="btn btn--line" href="#contact">
              Get in touch
              <span className="btn__arrow" aria-hidden="true">
                →
              </span>
            </a>
          </div>
        </motion.div>
      </motion.div>

      <motion.a
        className="hero__scroll"
        href="#about"
        aria-label="Scroll to about section"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
      >
        <span className="hero__scroll-line" aria-hidden="true" />
      </motion.a>

      <div className="hero__horizon" aria-hidden="true" />
    </section>
  );
}
