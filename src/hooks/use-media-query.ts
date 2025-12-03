"use client";

import { useEffect, useState, useMemo } from "react";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Memoize media query to avoid recreating on every render
  const mediaQuery = useMemo(() => {
    if (typeof window === "undefined") return null;
    return window.matchMedia(query);
  }, [query]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mediaQuery) return;

    // Set initial value
    setMatches(mediaQuery.matches);

    // Use modern API with fallback
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
    // Legacy browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [mediaQuery]);

  // Prevent hydration mismatch
  return mounted ? matches : false;
}
