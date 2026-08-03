import { motion, useReducedMotion, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { useSitePointer } from "../../context/SitePointerContext";

interface ParallaxLayerProps {
  children: ReactNode;
  depth?: number;
  className?: string;
}

export function ParallaxLayer({
  children,
  depth = 12,
  className,
}: ParallaxLayerProps) {
  const reduceMotion = useReducedMotion();
  const { smoothX, smoothY } = useSitePointer();
  const x = useTransform(smoothX, (value) => value * depth);
  const y = useTransform(smoothY, (value) => value * depth);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} style={{ x, y }}>
      {children}
    </motion.div>
  );
}
