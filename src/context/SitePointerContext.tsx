import {
  createContext,
  useContext,
  useEffect,
  type ReactNode,
} from "react";
import {
  useMotionValue,
  useReducedMotion,
  useSpring,
  type MotionValue,
} from "framer-motion";

interface SitePointerContextValue {
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
}

const SitePointerContext = createContext<SitePointerContextValue | null>(null);

export function SitePointerProvider({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 52, damping: 22, mass: 0.35 });
  const smoothY = useSpring(pointerY, { stiffness: 52, damping: 22, mass: 0.35 });

  useEffect(() => {
    if (reduceMotion) return;

    const handleMove = (event: PointerEvent) => {
      pointerX.set((event.clientX / window.innerWidth - 0.5) * 2);
      pointerY.set((event.clientY / window.innerHeight - 0.5) * 2);
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, [pointerX, pointerY, reduceMotion]);

  return (
    <SitePointerContext.Provider value={{ smoothX, smoothY }}>
      {children}
    </SitePointerContext.Provider>
  );
}

export function useSitePointer() {
  const context = useContext(SitePointerContext);
  if (!context) {
    throw new Error("useSitePointer must be used within SitePointerProvider");
  }
  return context;
}
