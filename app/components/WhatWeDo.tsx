"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const services = [
  {
    number: "01",
    title: "Exhibition\nStall Design",
    description: "Custom booths built around your brand, not a catalogue.",
    dark: false,
  },
  {
    number: "02",
    title: "Turnkey\nExecution",
    description: "On-ground build and install, in India and overseas.",
    dark: true,
  },
  {
    number: "03",
    title: "Branding\nSolutions",
    description:
      "Identity that carries from your booth to your business cards.",
    dark: false,
  },
  {
    number: "04",
    title: "Print &\nGraphics",
    description: "High-quality large-format print, done in-house.",
    dark: true,
  },
  {
    number: "05",
    title: "Advertising\nCampaigns",
    description: "Marketing communication beyond the show floor.",
    dark: false,
  },
  {
    number: "06",
    title: "Consultancy",
    description:
      "Strategy for your next trade show, before a single panel is built.",
    dark: true,
  },
];

const WhatWeDo = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const pipRefs = useRef<HTMLDivElement[]>([]);
  const panelRefs = useRef<HTMLDivElement[]>([]);
  const ghostRefs = useRef<HTMLSpanElement[]>([]);
  const titleRefs = useRef<HTMLHeadingElement[]>([]);
  const descRefs = useRef<HTMLParagraphElement[]>([]);
  const numRefs = useRef<HTMLParagraphElement[]>([]);

  useGSAP(() => {
    if (!trackRef.current || !outerRef.current) return;

    const splits: SplitText[] = [];
    const totalSlide = trackRef.current.scrollWidth - window.innerWidth;

    // ── 1. Eyebrow wipes in when section enters viewport ─────────────
    gsap.set(eyebrowRef.current, { clipPath: "inset(0 100% 0 0)", opacity: 0 });
    gsap.to(eyebrowRef.current, {
      clipPath: "inset(0 0% 0 0)",
      opacity: 1,
      duration: 0.9,
      ease: "power4.out",
      scrollTrigger: {
        trigger: outerRef.current,
        start: "top 80%",
      },
    });

    // ── 2. Initialise pips ────────────────────────────────────────────
    pipRefs.current.forEach((pip, i) => {
      if (!pip) return;
      gsap.set(pip, {
        width: i === 0 ? 40 : 18,
        backgroundColor: services[0].dark ? "#ffffff" : "#0a0a0a",
        opacity: i === 0 ? 1 : 0.28,
      });
    });

    // ── 3. Main scroll-driven horizontal translation ──────────────────
    const scrollTween = gsap.to(trackRef.current, {
      x: -totalSlide,
      ease: "none",
      scrollTrigger: {
        trigger: outerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
        onUpdate: (self) => {
          const idx = Math.min(
            Math.floor(self.progress * services.length),
            services.length - 1
          );
          const isDark = services[idx].dark;
          const activeCol  = isDark ? "#ffffff" : "#0a0a0a";
          const inactiveCol = isDark
            ? "rgba(255,255,255,0.28)"
            : "rgba(0,0,0,0.22)";

          pipRefs.current.forEach((pip, i) => {
            if (!pip) return;
            gsap.to(pip, {
              width: i === idx ? 40 : 18,
              backgroundColor: i === idx ? activeCol : inactiveCol,
              opacity: i === idx ? 1 : 0.35,
              duration: 0.3,
              ease: "power2.out",
              overwrite: "auto",
            });
          });
        },
      },
    });

    // ── 4. Per-panel entry animations (containerAnimation) ───────────
    panelRefs.current.forEach((panel, i) => {
      if (!panel) return;

      // Ghost number scales up
      gsap.from(ghostRefs.current[i], {
        scale: 0.78,
        opacity: 0,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: panel,
          containerAnimation: scrollTween,
          start: "left center",
          toggleActions: "play none none reverse",
        },
      });

      // Service number label fades up
      gsap.from(numRefs.current[i], {
        opacity: 0,
        y: 18,
        duration: 0.65,
        ease: "power3.out",
        scrollTrigger: {
          trigger: panel,
          containerAnimation: scrollTween,
          start: "left 82%",
          toggleActions: "play none none reverse",
        },
      });

      // Title words clip up from overflow
      if (titleRefs.current[i]) {
        const split = new SplitText(titleRefs.current[i], {
          type: "words,lines",
          linesClass: "overflow-hidden pb-1",
        });
        splits.push(split);

        gsap.from(split.words, {
          y: "110%",
          opacity: 0,
          duration: 0.9,
          stagger: 0.055,
          ease: "power4.out",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: scrollTween,
            start: "left 78%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Description fades + slides up
      gsap.from(descRefs.current[i], {
        y: 30,
        opacity: 0,
        duration: 0.75,
        ease: "power3.out",
        delay: 0.22,
        scrollTrigger: {
          trigger: panel,
          containerAnimation: scrollTween,
          start: "left 68%",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => {
      splits.forEach((s) => s.revert());
    };
  }, []);

  return (
    /* Outer: provides scroll height — 100vh per panel */
    <div
      ref={outerRef}
      className="relative w-full"
      style={{ height: `${services.length * 100}vh` }}
    >
      {/* Sticky viewport — holds the full-screen stage */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Eyebrow label — top-left */}
        <div className="absolute top-8 lg:left-40 md:left-14 left-6 z-20 pointer-events-none">
          <p
            ref={eyebrowRef}
            className="text-sm font-bold tracking-[0.22em] text-gray-400 uppercase"
          >
            WHAT WE DO
          </p>
        </div>

        {/* Progress pips — bottom center */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-[8px]">
          {services.map((_, i) => (
            <div
              key={i}
              ref={(el) => { if (el) pipRefs.current[i] = el; }}
              className="h-[3px] rounded-full"
              style={{ width: 18, backgroundColor: "#ffffff", opacity: 0.28 }}
            />
          ))}
        </div>

        {/* Horizontal track — width = N × 100vw */}
        <div
          ref={trackRef}
          className="flex h-full will-change-transform"
          style={{ width: `${services.length * 100}vw` }}
        >
          {services.map((service, i) => (
            <div
              key={i}
              ref={(el) => { if (el) panelRefs.current[i] = el; }}
              className="relative flex-shrink-0 w-screen h-full flex items-center overflow-hidden"
              style={{
                backgroundColor: service.dark ? "#0a0a0a" : "#f4f4ef",
                color: service.dark ? "#ffffff" : "#0a0a0a",
              }}
            >
              {/* Ghost number watermark */}
              <span
                ref={(el) => { if (el) ghostRefs.current[i] = el; }}
                className="absolute inset-0 flex items-center justify-center select-none pointer-events-none font-black leading-none whitespace-nowrap"
                style={{
                  fontSize: "clamp(120px, 40vw, 520px)",
                  color: service.dark
                    ? "rgba(255,255,255,0.04)"
                    : "rgba(0,0,0,0.055)",
                }}
              >
                {service.number}
              </span>

              {/* Panel content */}
              <div className="relative z-10 lg:px-40 md:px-14 px-6">

                {/* Service index */}
                <p
                  ref={(el) => { if (el) numRefs.current[i] = el; }}
                  className="text-xs font-bold tracking-[0.28em] uppercase mb-8 md:mb-12"
                  style={{ opacity: service.dark ? 0.38 : 0.32 }}
                >
                  {service.number}&nbsp;/&nbsp;06
                </p>

                {/* Main title */}
                <h2
                  ref={(el) => { if (el) titleRefs.current[i] = el; }}
                  className="font-black leading-[0.88] tracking-tight mb-7 md:mb-10 whitespace-pre-line"
                  style={{ fontSize: "clamp(44px, 9vw, 140px)" }}
                >
                  {service.title}
                </h2>

                {/* Description */}
                <p
                  ref={(el) => { if (el) descRefs.current[i] = el; }}
                  className="text-base md:text-2xl lg:text-[28px] font-medium leading-snug max-w-xs md:max-w-lg"
                  style={{ opacity: service.dark ? 0.58 : 0.52 }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhatWeDo;
