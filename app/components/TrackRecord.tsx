import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const stats = [
  { value: 27,  suffix: "+", label: "Years building brands a stage to shine" },
  { value: 500, suffix: "+", label: "Stalls designed and delivered, not just rendered" },
  { value: 15,  suffix: "+", label: "Countries our booths have travelled to" },
  { value: 100, suffix: "%", label: "In-house design-to-execution control" },
  { value: 60,  suffix: "+", label: "Repeat clients who keep coming back" },
];

const TrackRecord = () => {
  const sectionRef   = useRef<HTMLDivElement>(null);
  const headingRef   = useRef<HTMLHeadingElement>(null);
  const eyebrowRef   = useRef<HTMLParagraphElement>(null);
  const ghostRef     = useRef<HTMLSpanElement>(null);
  const rowRefs      = useRef<HTMLDivElement[]>([]);
  const lineRefs     = useRef<HTMLDivElement[]>([]);
  const numberRefs   = useRef<HTMLSpanElement[]>([]);
  const labelRefs    = useRef<HTMLParagraphElement[]>([]);

  useGSAP(() => {
    const trigger = {
      trigger: sectionRef.current,
      start: "top 75%",
    };

    // ── 1. Eyebrow label wipes in ──────────────────────────────────
    gsap.from(eyebrowRef.current, {
      clipPath: "inset(0 100% 0 0)",
      opacity: 0,
      duration: 0.8,
      ease: "power4.out",
      scrollTrigger: trigger,
    });

    // ── 2. Heading words slide up from overflow clip ───────────────
    const split = new SplitText(headingRef.current, {
      type: "words,lines",
      linesClass: "overflow-hidden pb-1",
    });
    gsap.from(split.words, {
      y: "100%",
      opacity: 0,
      duration: 1,
      stagger: 0.07,
      ease: "power4.out",
      scrollTrigger: { ...trigger, start: "top 72%" },
    });

    // ── 3. Ghost watermark scales in ──────────────────────────────
    gsap.from(ghostRef.current, {
      scale: 0.7,
      opacity: 0,
      duration: 2,
      ease: "power3.out",
      scrollTrigger: trigger,
    });

    // ── 4. Ghost parallax scrub ───────────────────────────────────
    gsap.to(ghostRef.current, {
      y: "12%",
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 2,
      },
    });

    // ── 5. Per-row choreography ───────────────────────────────────
    stats.forEach((stat, i) => {
      const rowTrigger = {
        trigger: rowRefs.current[i],
        start: "top 88%",
      };

      // Divider line draws from left
      gsap.from(lineRefs.current[i], {
        scaleX: 0,
        duration: 0.9,
        ease: "power3.inOut",
        transformOrigin: "left center",
        scrollTrigger: rowTrigger,
      });

      // Number slides up
      gsap.from(numberRefs.current[i]?.parentElement, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power4.out",
        delay: 0.1,
        scrollTrigger: rowTrigger,
      });

      // Number count-up
      const obj = { val: 0 };
      gsap.to(obj, {
        val: stat.value,
        duration: 2,
        ease: "power2.out",
        delay: 0.2,
        scrollTrigger: rowTrigger,
        onUpdate: () => {
          if (numberRefs.current[i]) {
            numberRefs.current[i].textContent = Math.round(obj.val).toString();
          }
        },
      });

      // Label slides in from right
      gsap.from(labelRefs.current[i], {
        x: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.15,
        scrollTrigger: rowTrigger,
      });
    });

    // Bottom border line draws in
    gsap.from(".tr-bottom-border", {
      scaleX: 0,
      duration: 0.9,
      ease: "power3.inOut",
      transformOrigin: "left center",
      scrollTrigger: {
        trigger: rowRefs.current[stats.length - 1],
        start: "bottom 90%",
      },
    });
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative overflow-hidden w-full bg-black text-white rounded-t-[60px] lg:px-40 md:px-14 px-6 lg:py-32 md:py-24 py-20 tracking-tight"
    >
      {/* ── Ghost watermark ──────────────────────────────────────── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
        <span
          ref={ghostRef}
          className="text-[32vw] font-black leading-none text-white/[0.03] whitespace-nowrap"
        >
          500+
        </span>
      </div>

      <div className="relative z-10">
        {/* ── Header area ────────────────────────────────────────── */}
        <div className="mb-16 md:mb-20 lg:mb-24">
          <p
            ref={eyebrowRef}
            className="text-sm font-bold tracking-[0.2em] text-white/50 uppercase mb-6"
            style={{ clipPath: "inset(0 100% 0 0)" }}
          >
            TRACK RECORD
          </p>
          <h2
            ref={headingRef}
            className="text-4xl md:text-5xl lg:text-[64px] font-bold leading-tight max-w-3xl"
          >
            We'll let the numbers do the talking.
          </h2>
        </div>

        {/* ── Stat rows ──────────────────────────────────────────── */}
        <div className="flex flex-col">
          {stats.map((stat, i) => (
            <div
              key={i}
              ref={(el) => { if (el) rowRefs.current[i] = el; }}
            >
              {/* Divider line */}
              <div
                ref={(el) => { if (el) lineRefs.current[i] = el; }}
                className="w-full h-px bg-white/15"
              />

              {/* Row content */}
              <div
                className="group flex lg:flex-row flex-col lg:items-center items-start justify-between lg:gap-8 gap-4 py-8 md:py-10 cursor-default transition-all duration-500 hover:bg-white/[0.03] lg:px-4 rounded-xl -mx-4 px-4"
              >
                {/* Huge number */}
                <div className="flex-shrink-0 lg:w-56 md:w-48 w-full">
                  <span className="flex items-baseline gap-1">
                    <span
                      ref={(el) => { if (el) numberRefs.current[i] = el; }}
                      className="text-[72px] md:text-[96px] lg:text-[112px] font-black tabular-nums leading-none
                                 group-hover:text-white transition-colors duration-300 text-white/90"
                    >
                      0
                    </span>
                    <span className="text-[40px] md:text-[56px] lg:text-[64px] font-black leading-none text-white/50 group-hover:text-white/70 transition-colors duration-300">
                      {stat.suffix}
                    </span>
                  </span>
                </div>

                {/* Label */}
                <p
                  ref={(el) => { if (el) labelRefs.current[i] = el; }}
                  className="flex-1 text-xl md:text-2xl lg:text-3xl font-medium text-white/50 leading-snug
                             group-hover:text-white/90 transition-colors duration-500 lg:max-w-xl"
                >
                  {stat.label}
                </p>

                {/* Hover arrow */}
                <div className="lg:flex hidden items-center justify-end w-12 opacity-0 group-hover:opacity-100 translate-x-[-12px] group-hover:translate-x-0 transition-all duration-400">
                  <span className="text-3xl text-white/60">→</span>
                </div>
              </div>
            </div>
          ))}

          {/* Bottom border */}
          <div className="tr-bottom-border w-full h-px bg-white/15" />
        </div>
      </div>
    </div>
  );
};

export default TrackRecord;
