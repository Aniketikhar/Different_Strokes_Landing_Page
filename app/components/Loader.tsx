"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface LoaderProps {
  onComplete: () => void;
}

const Loader = ({ onComplete }: LoaderProps) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const panelTopRef = useRef<HTMLDivElement>(null);
  const panelBottomRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    // Count up 0 → 100
    const obj = { val: 0 };
    tl.to(
      obj,
      {
        val: 100,
        duration: 2,
        ease: "power2.inOut",
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = Math.round(obj.val)
              .toString()
              .padStart(3, "0");
          }
        },
      },
      0
    );

    // Progress bar sweeps across
    tl.to(
      progressBarRef.current,
      {
        width: "100%",
        duration: 2,
        ease: "power2.inOut",
      },
      0
    );

    // Brand name fades in
    tl.from(
      brandRef.current,
      {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      0
    );

    // Tagline fades in slightly after
    tl.from(
      taglineRef.current,
      {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      },
      0.3
    );

    // Brief pause at 100% before exit
    tl.to({}, { duration: 0.3 });

    // EXIT: Two panels split — top slides up, bottom slides down
    tl.to(
      panelTopRef.current,
      {
        y: "-100%",
        duration: 0.8,
        ease: "power4.inOut",
      },
      "exit"
    );
    tl.to(
      panelBottomRef.current,
      {
        y: "100%",
        duration: 0.8,
        ease: "power4.inOut",
      },
      "exit"
    );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex flex-col overflow-hidden"
      style={{ pointerEvents: "all" }}
    >
      {/* Top panel */}
      <div
        ref={panelTopRef}
        className="absolute inset-0 h-[50%] top-0 bg-black flex flex-col items-start justify-end px-8 md:px-16 lg:px-24 pb-6"
      >
        {/* Brand name */}
        <div ref={brandRef} className="overflow-hidden">
          <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-none uppercase">
            Different Strokes
          </h1>
        </div>

        {/* Tagline */}
        <div ref={taglineRef} className="mt-2">
          <p className="text-white/50 text-sm md:text-base font-medium tracking-[0.2em] uppercase">
            Exhibition Design Studio · Since 1997
          </p>
        </div>
      </div>

      {/* Bottom panel */}
      <div
        ref={panelBottomRef}
        className="absolute bottom-0 h-[50%] w-full bg-black flex flex-col items-end justify-start px-8 md:px-16 lg:px-24 pt-6"
      >
        {/* Counter */}
        <div className="flex items-baseline gap-1">
          <span
            ref={counterRef}
            className="text-white text-5xl md:text-7xl lg:text-8xl font-bold tabular-nums leading-none"
          >
            000
          </span>
          <span className="text-white/40 text-2xl md:text-3xl font-light">%</span>
        </div>
      </div>

      {/* Progress bar — sits at the midpoint seam */}
      <div className="absolute top-[50%] left-0 w-full h-[1px] bg-white/10 z-10">
        <div
          ref={progressBarRef}
          className="h-full bg-white"
          style={{ width: "0%" }}
        />
      </div>
    </div>
  );
};

export default Loader;
