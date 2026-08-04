import { useEffect, type RefObject } from "react";

export interface MapParallaxLayer {
  elementRef: RefObject<HTMLDivElement | null>;
  /** Multiplier for pointer offset; higher = more movement. */
  parallaxDepth: number;
}

const POINTER_SMOOTHING = 0.045;

/**
 * Moves map layers slightly based on pointer position inside the chart canvas.
 * Resets when the pointer leaves the canvas.
 */
export function useMapPointerParallax(
  canvasRef: RefObject<HTMLDivElement | null>,
  layers: MapParallaxLayer[],
  isEnabled: boolean,
) {
  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    let targetOffsetX = 0;
    let targetOffsetY = 0;
    let currentOffsetX = 0;
    let currentOffsetY = 0;
    let animationFrameId = 0;

    const applyLayerTransform = (
      element: HTMLDivElement | null,
      depth: number,
    ) => {
      if (!element) {
        return;
      }

      element.style.transform = `translate3d(${currentOffsetX * depth}px, ${currentOffsetY * depth}px, 0)`;
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      targetOffsetX =
        ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      targetOffsetY =
        ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    };

    const onPointerLeave = () => {
      targetOffsetX = 0;
      targetOffsetY = 0;
    };

    const tick = () => {
      currentOffsetX += (targetOffsetX - currentOffsetX) * POINTER_SMOOTHING;
      currentOffsetY += (targetOffsetY - currentOffsetY) * POINTER_SMOOTHING;

      for (const layer of layers) {
        applyLayerTransform(
          layer.elementRef.current,
          layer.parallaxDepth,
        );
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    canvas.addEventListener("pointermove", onPointerMove, { passive: true });
    canvas.addEventListener("pointerleave", onPointerLeave);
    tick();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [canvasRef, isEnabled, layers]);
}
