"use client";

import { RefObject, useEffect, useRef, useCallback } from "react";

export const useMousePositionRef = (
  containerRef?: RefObject<HTMLElement | SVGElement>
) => {
  const positionRef = useRef({ x: 0, y: 0 });

  // Memoize update function to avoid recreating on every render
  const updatePosition = useCallback(
    (x: number, y: number) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        positionRef.current = {
          x: x - rect.left,
          y: y - rect.top,
        };
      } else {
        positionRef.current = { x, y };
      }
    },
    [containerRef]
  );

  useEffect(() => {
    const handleMouseMove = (ev: MouseEvent) => {
      updatePosition(ev.clientX, ev.clientY);
    };

    const handleTouchMove = (ev: TouchEvent) => {
      if (ev.touches[0]) {
        updatePosition(ev.touches[0].clientX, ev.touches[0].clientY);
      }
    };

    // Use passive listeners for better performance
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [updatePosition]);

  return positionRef;
};
