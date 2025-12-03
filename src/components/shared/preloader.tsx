"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef({ value: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(counterRef.current, {
        value: 100,
        duration: 2.5,
        ease: "power2.inOut",
        onUpdate: () => {
          if (numberRef.current) {
            numberRef.current.textContent = Math.floor(counterRef.current.value).toString();
          }
          // Update logo inset reveal based on progress (bottom to top)
          if (logoRef.current) {
            const progress = counterRef.current.value;
            const insetBottom = 100 - progress; // Start at 100%, end at 0%
            logoRef.current.style.clipPath = `inset(${insetBottom}% 0 0% 0)`;
          }
        },
        onComplete: () => {
          gsap.to(preloaderRef.current, {
            y: "-100%",
            duration: 1,
            ease: "power3.inOut",
            onComplete: () => {
              setIsLoading(false);
            },
          });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  if (!isLoading) return null;

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] bg-background flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-background">
        {/* C-shaped curved bottom edge */}
        <svg
          className="absolute bottom-0 left-0 w-full h-32 md:h-48"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,0 L0,120 Q360,60 720,80 T1440,120 L1440,0 Z"
            className="fill-background"
          />
        </svg>
      </div>

      <div className=" space-y-4  flex flex-col gap-6 justify-center items-center  z-10">
        <div 
          ref={logoRef}
          className="logo w-28 mx-auto"
          style={{ clipPath: 'inset(0 0 100% 0)' }}
        >
            <Image  src="/logos/Favicon.png" alt="logo" width={100} height={100} />
        </div>
        {/* <div className="flex items-baseline gap-1">
          <span
            ref={numberRef}
            className="text-6xl font-bold text-primary tabular-nums"
          >
            0
          </span>
          <span className="text-3xl md:text-5xl font-bold text-primary/60">%</span>
        </div> */}
      </div>
    </div>
  );
}
