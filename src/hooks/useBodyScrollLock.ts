import { useEffect } from "react";

/**
 * Locks document body scroll while `isLocked` is true (e.g. modal drawer open).
 */
export function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isLocked]);
}
