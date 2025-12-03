"use client";

import { useRouter } from "next/navigation";
import { useCallback, useRef } from "react";
import gsap from "gsap";

export function usePageTransition() {
  const router = useRouter();
  const isTransitioning = useRef(false);

  const navigateWithTransition = useCallback(
    (href: string, onTransitionStart?: () => void) => {
      // Prevent multiple transitions
      if (isTransitioning.current) return;
      isTransitioning.current = true;

      // Create overlay element
      const overlay = document.createElement("div");
      overlay.className =
        "fixed inset-0 z-50 bg-gradient-to-br from-primary/90 to-primary pointer-events-none";
      overlay.style.transform = "translateX(100%)";
      document.body.appendChild(overlay);

      // Call optional callback
      onTransitionStart?.();

      // Animate overlay
      const tl = gsap.timeline({
        onComplete: () => {
          router.push(href);
          // Remove overlay after navigation
          setTimeout(() => {
            overlay.remove();
            isTransitioning.current = false;
          }, 1000);
        },
      });

      tl.to(overlay, {
        x: "0%",
        duration: 0.5,
        ease: "power3.inOut",
      });
    },
    [router]
  );

  return { navigateWithTransition, isTransitioning: isTransitioning.current };
}
