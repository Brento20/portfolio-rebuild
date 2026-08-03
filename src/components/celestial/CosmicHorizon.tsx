import { motion, useReducedMotion } from "framer-motion";

export function CosmicHorizon() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="cosmic-horizon" aria-hidden="true">
      <motion.div
        className="cosmic-horizon__glow"
        initial={reduceMotion ? false : { opacity: 0, scaleY: 0.6 }}
        whileInView={{ opacity: 1, scaleY: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="cosmic-horizon__band"
        initial={reduceMotion ? false : { opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
      >
        <span className="cosmic-horizon__star cosmic-horizon__star--a" />
        <span className="cosmic-horizon__star cosmic-horizon__star--b" />
        <span className="cosmic-horizon__star cosmic-horizon__star--c" />
        <span className="cosmic-horizon__star cosmic-horizon__star--d" />
      </motion.div>
    </div>
  );
}
