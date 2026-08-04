import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const SCROLL_SMOOTHING = 0.055;

/**
 * Returns a ref whose `.current` is scroll progress from 0 (top) to 1 (bottom),
 * smoothed each frame so the Three.js camera does not jitter.
 */
export function useScrollLinkedProgress() {
  const scrollProgress = useRef(0);

  useFrame(() => {
    const scrollableDistance =
      document.documentElement.scrollHeight - window.innerHeight;
    const rawProgress =
      scrollableDistance > 0 ? window.scrollY / scrollableDistance : 0;

    scrollProgress.current +=
      (rawProgress - scrollProgress.current) * SCROLL_SMOOTHING;
  });

  return scrollProgress;
}
