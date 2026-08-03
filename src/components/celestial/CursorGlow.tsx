import { useEffect } from "react";
import {
  motion,
  useReducedMotion,
  useSpring,
  useMotionValue,
} from "framer-motion";

export function CursorGlow() {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 120, damping: 22 });
  const y = useSpring(pointerY, { stiffness: 120, damping: 22 });

  useEffect(() => {
    if (reduceMotion) return;

    const handleMove = (event: PointerEvent) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, [pointerX, pointerY, reduceMotion]);

  if (reduceMotion) return null;

  return (
    <motion.div
      className="cursor-glow"
      aria-hidden="true"
      style={{ left: x, top: y }}
    />
  );
}
