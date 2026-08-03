import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const enterEase = [0.22, 1, 0.36, 1] as const;

interface ApproachProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/*
  Sections arrive as if approached through space:
  slightly small and distant, easing up to full presence.
*/
export function Approach({ children, className, delay = 0 }: ApproachProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.94, y: 46 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 1, ease: enterEase, delay }}
    >
      {children}
    </motion.div>
  );
}
