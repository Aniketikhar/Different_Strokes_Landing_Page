"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

// ── Client name lists (swap to <Image> tags when logo assets are ready) ──
const row1Logos = [
  "Asian Paints", "BASF India", "Jotun", "Pidilite",
  "Kansai Nerolac", "Berger Paints", "Sika India", "Henkel",
  "3M India", "Fosroc",
];

const row2Logos = [
  "Nippon Paint", "RPG Group", "Faber-Castell", "Atul Ltd",
  "Clariant", "Huntsman", "Arkema", "LANXESS",
  "Cabot India", "Ferro",
];

// ── Logo pill card ────────────────────────────────────────────────────────
const LogoCard = ({ name }: { name: string }) => (
  <div
    className="
      flex-shrink-0 group flex items-center justify-center
      px-12 py-10 rounded-3xl cursor-default select-none
      border border-black/[0.08] bg-white
      hover:border-black/20 hover:shadow-2xl hover:-translate-y-[3px]
      transition-all duration-500
      min-w-[280px]
    "
  >
    <span
      className="
        text-sm font-black tracking-[0.28em] whitespace-nowrap uppercase
        text-black/30 group-hover:text-black/75
        transition-colors duration-500
      "
    >
      {name}
    </span>
  </div>
);

// ── Main component ────────────────────────────────────────────────────────
const Clients = () => {
  const sectionRef      = useRef<HTMLDivElement>(null);
  const eyebrowRef      = useRef<HTMLParagraphElement>(null);
  const headingRef      = useRef<HTMLHeadingElement>(null);
  const subRef          = useRef<HTMLParagraphElement>(null);
  const marqueeAreaRef  = useRef<HTMLDivElement>(null);
  const row1Ref         = useRef<HTMLDivElement>(null);
  const row2Ref         = useRef<HTMLDivElement>(null);

  // Mutable refs for the ticker — avoids React re-renders
  const row1Pos  = useRef(0);
  const row2Pos  = useRef(-50);
  const speedRef = useRef({ v: 0.032 });

  useGSAP(() => {
    // Snap row 2 into its starting offset before the first paint
    gsap.set(row2Ref.current, { xPercent: -50 });

    // ── 1. Eyebrow: clipPath wipe from left ──────────────────────────
    gsap.set(eyebrowRef.current, { clipPath: "inset(0 100% 0 0)", opacity: 0 });
    gsap.to(eyebrowRef.current, {
      clipPath: "inset(0 0% 0 0)",
      opacity: 1,
      duration: 0.9,
      ease: "power4.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
    });

    // ── 2. Heading: words slide up from overflow clip ─────────────────
    const split = new SplitText(headingRef.current, {
      type: "words,lines",
      linesClass: "overflow-hidden pb-2",
    });
    gsap.from(split.words, {
      y: "110%",
      opacity: 0,
      duration: 1,
      stagger: 0.055,
      ease: "power4.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
    });

    // ── 3. Sub-stat line floats up ────────────────────────────────────
    gsap.from(subRef.current, {
      y: 24,
      opacity: 0,
      duration: 0.8,
      delay: 0.45,
      ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 73%" },
    });

    // ── 4. Marquee strip slides up as section enters ──────────────────
    gsap.from(marqueeAreaRef.current, {
      y: 60,
      opacity: 0,
      duration: 1.1,
      ease: "power3.out",
      scrollTrigger: { trigger: marqueeAreaRef.current, start: "top 88%" },
    });

    // ── 5. GSAP ticker: delta-time-normalised continuous scroll ───────
    const tick = (_: number, deltaTime: number) => {
      const step = speedRef.current.v * (deltaTime / 16.667); // 60fps baseline

      row1Pos.current -= step;
      row2Pos.current += step;

      // Seamless loop: when half the track (one full logo set) has passed, reset
      if (row1Pos.current <= -50) row1Pos.current = 0;
      if (row2Pos.current >= 0)   row2Pos.current = -50;

      gsap.set(row1Ref.current, { xPercent: row1Pos.current });
      gsap.set(row2Ref.current, { xPercent: row2Pos.current });
    };

    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      split.revert();
    };
  }, []);

  // ── Hover: decelerate / resume ────────────────────────────────────────
  const slowDown = () =>
    gsap.to(speedRef.current, { v: 0.003, duration: 0.65, ease: "power2.out" });
  const resume   = () =>
    gsap.to(speedRef.current, { v: 0.032, duration: 0.9,  ease: "power2.inOut" });

  return (
    <div
      ref={sectionRef}
      className="
        relative w-full bg-white overflow-hidden tracking-tight
        lg:rounded-t-[60px] rounded-t-[40px]
        lg:pt-32 md:pt-24 pt-20
        lg:pb-28 md:pb-20 pb-16
      "
    >
      {/* ── Ghost watermark ─────────────────────────────────────────── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span
          className="font-black leading-none text-black/[0.025] whitespace-nowrap"
          style={{ fontSize: "28vw" }}
        >
          CLIENTS
        </span>
      </div>

      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="relative z-10 lg:px-40 md:px-14 px-6 mb-16 lg:mb-24">
        {/* Eyebrow */}
        <p
          ref={eyebrowRef}
          className="text-sm font-bold tracking-[0.22em] text-gray-400 uppercase mb-6"
        >
          OUR CLIENTS
        </p>

        {/* Heading */}
        <h2
          ref={headingRef}
          className="font-bold leading-[1.08] text-black mb-8"
          style={{ fontSize: "clamp(40px, 5.5vw, 80px)" }}
        >
          Brands who trusted<br className="hidden md:block" /> us with their stage.
        </h2>

        {/* Sub stat line */}
        <p
          ref={subRef}
          className="text-sm md:text-base text-black/30 font-bold tracking-[0.25em] uppercase"
        >
          26 brands&nbsp;&nbsp;&middot;&nbsp;&nbsp;15 countries&nbsp;&nbsp;&middot;&nbsp;&nbsp;27 years
        </p>
      </div>

      {/* ── Marquee strip ────────────────────────────────────────────── */}
      <div ref={marqueeAreaRef} className="relative z-10">
        {/* Top rule */}
        <div className="w-full h-px bg-black/[0.07]" />

        {/* Edge-faded scrolling area */}
        <div
          className="py-6"
          onMouseEnter={slowDown}
          onMouseLeave={resume}
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          }}
        >
          {/* Row 1 — scrolls LEFT */}
          <div className="mb-6">
            <div
              ref={row1Ref}
              className="flex gap-5 will-change-transform"
            >
              {[...row1Logos, ...row1Logos].map((name, i) => (
                <LogoCard key={`r1-${i}`} name={name} />
              ))}
            </div>
          </div>

          {/* Row 2 — scrolls RIGHT */}
          <div>
            <div
              ref={row2Ref}
              className="flex gap-5 will-change-transform"
            >
              {[...row2Logos, ...row2Logos].map((name, i) => (
                <LogoCard key={`r2-${i}`} name={name} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom rule */}
        <div className="w-full h-px bg-black/[0.07]" />
      </div>
    </div>
  );
};

export default Clients;
