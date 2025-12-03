"use client";
import React, { useLayoutEffect } from 'react';
import ScrollHero from "@/components/home/scroll-hero";
import Banners from "@/components/home/firstbanner";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MotionPathPlugin from 'gsap/MotionPathPlugin';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function AnimatedProducts() {
  const earbudRef = React.useRef<HTMLImageElement>(null);
  const container2Ref = React.useRef<HTMLDivElement>(null);
  const pathRef = React.useRef<SVGPathElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Get the length of the path for motionPath plugin
      const path = pathRef.current;
      
      if (!path || !earbudRef.current) return;
      // Create timeline with ScrollTrigger
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: container2Ref.current,
          start: 'top top',
          end: '+=100%',
          scrub: true,
          markers: true, // Show markers for debugging (remove in production)
        }
      });

      // Animate image along the path
      timeline.to(
        earbudRef.current,
        {
          motionPath: {
            path: path, 
            align: path,
            alignOrigin: [0, 0],
            autoRotate: true,  // Optional: auto-rotate along the path
          },
          ease: "none",
        }
      );

    });

    return () => ctx.revert(); // Clean up the effect
  });

  return (
    <div ref={container2Ref} className="relative ">
      {/* Animated image - positioned fixed for scroll animation */}
      <img
        src="/banners/earbud.png"
        alt="earbuds"
        className="fixed top-0 left-0 w-32 h-32 object-contain z-10"
        ref={earbudRef}
      />

      <svg width="745" height="745" className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' viewBox="0 0 745 745" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path ref={pathRef} d="M0.5 0.00259399C1.66667 224.503 152.1 687.603 744.5 744.003" stroke="black"/>
      </svg>

      {/* Component to scroll */}
      <div className="relative z-0">
        <Banners />
        <ScrollHero />
      </div>
    </div>
  );
}
