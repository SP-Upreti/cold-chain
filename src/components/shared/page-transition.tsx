"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import React, {
  ReactNode,
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";
import Image from "next/image";

interface TransitionContextType {
  startTransition: (callback: () => void) => void;
  isTransitioning: boolean;
}

const TransitionContext = createContext<TransitionContextType | null>(null);

export const useTransitionContext = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("useTransitionContext must be used within TransitionProvider");
  }
  return context;
};

// Provider component that wraps the entire app
export function TransitionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayPath, setDisplayPath] = useState(pathname);
  const [isUserInitiated, setIsUserInitiated] = useState(false);

  const startTransition = useCallback(
    (callback: () => void) => {
      if (isTransitioning) return;

      setIsUserInitiated(true);
      setIsTransitioning(true);

      // Wait for slide up (0.5s) + hold (0.5s) before navigating
      setTimeout(() => {
        callback(); // This triggers the navigation
      }, 800);
    },
    [isTransitioning]
  );

  // Detect pathname changes and update display
  React.useEffect(() => {
    if (pathname !== displayPath) {
      // If not already transitioning, this is a browser navigation (back/forward)
      if (!isTransitioning) {
        // Browser navigation - skip transition
        setDisplayPath(pathname);
      } else {
        // Already transitioning (from TransitionLink), just update display
        setDisplayPath(pathname);

        // Wait a bit then reveal
        setTimeout(() => {
          setIsTransitioning(false);
          setIsUserInitiated(false);
        }, 100);
      }
    }
  }, [pathname, displayPath, isTransitioning]);

  return (
    <TransitionContext.Provider value={{ startTransition, isTransitioning }}>
      {children}

      {/* Transition Overlay */}
      <AnimatePresence mode="wait" initial={false}>
        {isTransitioning && (
          <motion.div
            key="overlay"
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{
              duration: 0.5,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="fixed inset-0 z-[9998] bg-primary flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="w-20 h-20"
            >
              <Image
                src="/logos/WhiteFav.png"
                alt="Logo"
                width={80}
                height={80}
                className="w-full h-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}

// Component that wraps page content for transitions
export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
