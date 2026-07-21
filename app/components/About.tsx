import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const vidColRef = useRef<HTMLDivElement>(null);
  const vidRef = useRef<HTMLVideoElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const para1Ref = useRef<HTMLParagraphElement>(null);
  const para2Ref = useRef<HTMLParagraphElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const bgYearRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      },
    });

    // ── 1. Ghost "1997" watermark scales up from behind ──────────────
    tl.from(
      bgYearRef.current,
      { scale: 0.6, opacity: 0, duration: 1.6, ease: "power3.out" },
      0
    );

    // ── 2. Video column slides in from left ───────────────────────────
    tl.from(
      vidColRef.current,
      { x: -100, opacity: 0, duration: 1.1, ease: "power4.out" },
      0
    );

    // ── 3. Text column slides in from right simultaneously ────────────
    tl.from(
      textColRef.current,
      { x: 100, opacity: 0, duration: 1.1, ease: "power4.out" },
      0
    );

    // ── 4. Label: letter-spacing stretches then contracts ─────────────
    tl.from(
      labelRef.current,
      {
        letterSpacing: "0.6em",
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      },
      0.2
    );

    // ── 5. Heading: each char focuses in from blur ────────────────────
    const charSplit = new SplitText(headingRef.current, {
      type: "chars,words",
    });

    tl.from(
      charSplit.chars,
      {
        opacity: 0,
        filter: "blur(12px)",
        y: 16,
        stagger: 0.025,
        duration: 0.7,
        ease: "power3.out",
      },
      0.35
    );

    // ── 6. Paragraphs: lines alternate left ↔ right ───────────────────
    const splitP1 = new SplitText(para1Ref.current, { type: "lines" });
    const splitP2 = new SplitText(para2Ref.current, { type: "lines" });
    const allLines = [...splitP1.lines, ...splitP2.lines];

    allLines.forEach((line, i) => {
      tl.from(
        line,
        {
          x: i % 2 === 0 ? -40 : 40,
          opacity: 0,
          duration: 0.75,
          ease: "power3.out",
        },
        0.7 + i * 0.09
      );
    });

    // ── 7. Link draws up from below ───────────────────────────────────
    tl.from(
      linkRef.current,
      { y: 30, opacity: 0, duration: 0.6, ease: "power3.out" },
      1.1
    );

    // ── 8. Video parallax on scroll scrub ────────────────────────────
    gsap.to(vidRef.current, {
      y: "-14%",
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
    });

    // ── 9. "1997" watermark drifts at different speed than content ────
    gsap.to(bgYearRef.current, {
      y: "8%",
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 2,
      },
    });
  }, []);

  return (
    <div
      ref={sectionRef}
      className="about relative overflow-hidden font-medium w-full min-h-screen flex lg:flex-row flex-col lg:gap-16 gap-14 items-center text-black lg:px-40 md:px-14 px-6 lg:py-40 py-24"
    >
      {/* ── Ghost year watermark ──────────────────────────────────── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
        <span
          ref={bgYearRef}
          className="text-[28vw] font-black leading-none text-black/[0.04] whitespace-nowrap"
        >
          1997
        </span>
      </div>

      {/* ── Video Column ─────────────────────────────────────────── */}
      <div
        ref={vidColRef}
        className="lg:w-1/2 md:w-[70%] w-full flex justify-center lg:justify-start relative z-10"
      >
        <div className="w-full lg:w-[90%] rounded-2xl">
          <video
            ref={vidRef}
            className="w-full object-cover scale-[1.15]"
            src="/videos/about.mp4"
            muted
            autoPlay
            loop
          />
        </div>
      </div>

      {/* ── Text Column ──────────────────────────────────────────── */}
      <div
        ref={textColRef}
        className="lg:w-1/2 w-full flex flex-col lg:items-start items-start gap-7 lg:gap-9 relative z-10"
      >
        {/* Label */}
        <div
          ref={labelRef}
          className="text-sm md:text-base font-bold tracking-[0.2em] text-gray-500 uppercase"
        >
          OUR STORY
        </div>

        {/* Heading — chars blur-to-sharp */}
        <h2
          ref={headingRef}
          className="text-4xl md:text-5xl lg:text-[60px] font-bold leading-tight"
        >
          Creatively Different Since 1997.
        </h2>

        {/* Paragraphs — lines alternate left ↔ right */}
        <div className="flex flex-col gap-6 text-lg md:text-xl lg:text-[20px] text-gray-700 font-medium leading-relaxed">
          <p ref={para1Ref}>
            What began as a small design studio in Ahmedabad has grown into a
            full-scale exhibition and brand communications agency. We've built
            stalls across India and overseas — from chemical expos in Shanghai
            to coatings shows in Germany — always with the same idea: your
            stall should stop people mid-walk.
          </p>
          <p ref={para2Ref}>
            We don't just design stands. We concept, design, execute and
            deliver — so you can focus on your business, not your booth.
          </p>
        </div>

        {/* CTA Link */}
        <a
          ref={linkRef}
          href="#"
          className="group mt-2 inline-flex items-center gap-3 text-lg md:text-xl font-bold relative"
        >
          <span className="relative">
            Read Our Story
            <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-black origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-300" />
            <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-gray-400 origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </span>
          <span className="inline-block group-hover:translate-x-2 transition-transform duration-300">
            →
          </span>
        </a>
      </div>
    </div>
  );
};

export default About;
