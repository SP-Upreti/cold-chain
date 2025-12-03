"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface UseScrollVisibilityOptions {
    threshold?: number;
    hideThreshold?: number;
}

export function useScrollVisibility(options: UseScrollVisibilityOptions = {}) {
    const { threshold = 50, hideThreshold = 100 } = options;
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);
    const ticking = useRef(false);

    const updateVisibility = useCallback(() => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY.current && currentScrollY > hideThreshold) {
            setIsVisible(false);
        } else if (currentScrollY < lastScrollY.current && currentScrollY > threshold) {
            setIsVisible(true);
        } else if (currentScrollY <= threshold) {
            setIsVisible(true);
        }

        lastScrollY.current = currentScrollY;
        ticking.current = false;
    }, [threshold, hideThreshold]);

    useEffect(() => {
        const handleScroll = () => {
            if (!ticking.current) {
                window.requestAnimationFrame(updateVisibility);
                ticking.current = true;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [updateVisibility]);

    return isVisible;
}
