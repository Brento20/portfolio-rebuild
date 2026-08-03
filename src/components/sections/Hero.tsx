import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { profile } from "../../data/profile";

const enterEase = [0.22, 1, 0.36, 1] as const;

const stagger = {
  animate: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const rise = {
  initial: { opacity: 0, y: 26 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: enterEase },
  },
};

export function Hero() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const copyY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const ringsY = useTransform(scrollYProgress, [0, 1], [0, 150]);

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
        className="hero__inner"
        style={reduceMotion ? undefined : { y: copyY, opacity: copyOpacity }}
        variants={reduceMotion ? undefined : stagger}
        initial={reduceMotion ? false : "initial"}
        animate={reduceMotion ? undefined : "animate"}
      >
        <motion.p className="hero__eyebrow" variants={rise}>
          {profile.location} · {profile.role}
        </motion.p>

        <motion.h1 className="hero__title" id="hero-title" variants={rise}>
          {profile.name}
        </motion.h1>

        <motion.p className="hero__lead" variants={rise}>
          {profile.tagline}
        </motion.p>

        <motion.div className="hero__actions" variants={rise}>
          <a className="btn btn--primary" href="#experience">
            Explore the constellation
          </a>
          <a className="btn btn--ghost" href="#contact">
            Get in touch
          </a>
        </motion.div>
      </motion.div>

      <motion.a
        className="hero__scroll"
        href="#about"
        aria-label="Scroll to about section"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
      >
        <span className="hero__scroll-line" aria-hidden="true" />
      </motion.a>

      <div className="hero__horizon" aria-hidden="true" />
    </section>
  );
}
