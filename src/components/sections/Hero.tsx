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
  initial: { opacity: 0, y: 28 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.05, ease: enterEase },
  },
};

/*
  Quiet studio landing — left-locked type, breathing room,
  the three.js field does the heavy lifting. Inspired by
  2xA: systems over furniture, confidence over decoration.
*/
export function Hero() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="hero"
      id="top"
      aria-labelledby="hero-title"
    >
      <motion.div
        className="hero__content"
        style={
          reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }
        }
        variants={reduceMotion ? undefined : stagger}
        initial={reduceMotion ? false : "initial"}
        animate={reduceMotion ? undefined : "animate"}
      >
        <motion.p className="hero__kicker" variants={rise}>
          <span className="hero__kicker-dot" aria-hidden="true" />
          {profile.location} · {profile.role}
        </motion.p>

        <motion.h1 className="hero__title" id="hero-title" variants={rise}>
          Brenton
          <br />
          <em>Weaver</em>
        </motion.h1>

        <motion.p className="hero__lead" variants={rise}>
          {profile.tagline}
        </motion.p>

        <motion.div className="hero__actions" variants={rise}>
          <a className="btn btn--solid" href="#experience">
            See the work
            <span className="btn__arrow" aria-hidden="true">
              ↓
            </span>
          </a>
          <a className="btn btn--line" href="#contact">
            Say hello
            <span className="btn__arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        </motion.div>
      </motion.div>

      <div className="hero__aside" aria-hidden="true">
        <span className="hero__aside-ring" />
        <span className="hero__aside-ring hero__aside-ring--dashed" />
        <span className="hero__aside-planet" />
      </div>
    </section>
  );
}
