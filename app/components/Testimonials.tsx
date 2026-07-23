"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";

gsap.registerPlugin(ScrollTrigger, SplitText);

const testimonials = [
  {
    quote:
      "Stall design and execution is a tricky job. Glad we tied up with a team that knows it well. Different Strokes helped us put up a great show with their end-to-end support.",
    author: "Neeraj Sharma",
    role: "Ferromatic Milacron",
  },
  {
    quote:
      "Venkat and his team are simply brilliant. They understand the nuances of international markets and trade shows—a great requisite for a world-class exhibition solutions provider.",
    author: "V V Iyer",
    role: "Apan Imex Pvt. Ltd.",
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef<HTMLDivElement>(null);

  const isTransitioning = useRef(false);

  useGSAP(() => {
    // 1. Initial ScrollTrigger Entrance animations
    gsap.set(eyebrowRef.current, { clipPath: "inset(0 100% 0 0)", opacity: 0 });
    gsap.to(eyebrowRef.current, {
      clipPath: "inset(0 0% 0 0)",
      opacity: 1,
      duration: 0.9,
      ease: "power4.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
    });

    if (headingRef.current) {
      const split = new SplitText(headingRef.current, {
        type: "words,lines",
        linesClass: "overflow-hidden pb-1",
      });
      gsap.from(split.words, {
        y: "110%",
        opacity: 0,
        duration: 1,
        stagger: 0.05,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }

    // Initial load animation for the first quote
    if (quoteRef.current && authorRef.current && indexRef.current) {
      const splitQuote = new SplitText(quoteRef.current, { type: "lines" });
      gsap.from(splitQuote.lines, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        onComplete: () => {
          splitQuote.revert();
        },
      });
      gsap.from([authorRef.current, indexRef.current], {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }
  }, []);

  const changeTestimonial = (nextIndex: number) => {
    if (isTransitioning.current || nextIndex === activeIndex) return;
    isTransitioning.current = true;

    const currentQuote = quoteRef.current;
    const currentAuthor = authorRef.current;
    const currentIndexLabel = indexRef.current;

    if (!currentQuote || !currentAuthor || !currentIndexLabel) {
      setActiveIndex(nextIndex);
      isTransitioning.current = false;
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        isTransitioning.current = false;
      },
    });

    // 1. Animate elements out (fade parent quote directly to avoid SplitText DOM desyncs)
    tl.to(currentQuote, {
      y: 30,
      opacity: 0,
      duration: 0.35,
      ease: "power2.in",
    });

    tl.to(
      [currentAuthor, currentIndexLabel],
      {
        y: -15,
        opacity: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.in",
      },
      "<"
    );

    // 2. Swap content manually in the DOM, update React state, and trigger fade-in immediately
    tl.add(() => {
      // Manually set the new quote text directly in the DOM
      currentQuote.innerHTML = `&ldquo;${testimonials[nextIndex].quote}&rdquo;`;

      // Update React state so other components (index, author, buttons) sync up
      setActiveIndex(nextIndex);

      // Reset quote container position and opacity
      gsap.set(currentQuote, { opacity: 1, y: 0 });

      // Split the new updated incoming text
      const splitIn = new SplitText(currentQuote, { type: "lines" });

      gsap.set(splitIn.lines, { y: -30, opacity: 0 });
      gsap.set(currentAuthor, { y: 15, opacity: 0 });
      gsap.set(currentIndexLabel, { y: 10, opacity: 0 });

      gsap.timeline({
        onComplete: () => {
          splitIn.revert();
        },
      })
        .to(splitIn.lines, {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.04,
          ease: "power3.out",
        })
        .to(
          currentAuthor,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
          },
          "<0.15"
        )
        .to(
          currentIndexLabel,
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          },
          "<0.1"
        );
    });
  };

  const handlePrev = () => {
    const nextIdx = (activeIndex - 1 + testimonials.length) % testimonials.length;
    changeTestimonial(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % testimonials.length;
    changeTestimonial(nextIdx);
  };

  return (
    <div
      ref={sectionRef}
      className="
        relative w-full bg-[#000000] text-white overflow-hidden tracking-tight
        lg:rounded-t-[60px] rounded-t-[40px]
        lg:pt-36 md:pt-28 pt-24
        lg:pb-36 md:pb-28 pb-24
      "
    >
      {/* ── Background Giant Watermark ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span
          className="font-black leading-none text-white/[0.015] whitespace-nowrap"
          style={{ fontSize: "24vw" }}
        >
          FEEDBACK
        </span>
      </div>

      <div className="relative z-10 lg:px-40 md:px-14 px-6">
        {/* Eyebrow */}
        <p
          ref={eyebrowRef}
          className="text-xs font-bold tracking-[0.25em] text-gray-500 uppercase mb-8"
        >
          KIND WORDS
        </p>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left Column - Sticky Heading & Nav Controls */}
          <div className="lg:col-span-5 flex flex-col justify-between lg:min-h-[320px]">
            <div>
              <h2
                ref={headingRef}
                className="font-black leading-[1.05] tracking-tight mb-8"
                style={{ fontSize: "clamp(38px, 4.5vw, 68px)" }}
              >
                What our<br />
                clients are<br />
                saying.
              </h2>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center gap-6 mt-4">
              <button
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="
                  group w-14 h-14 rounded-full border border-white/10
                  flex items-center justify-center cursor-pointer
                  hover:bg-white hover:border-white hover:text-black
                  transition-all duration-300 active:scale-95
                "
              >
                <HiArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform duration-300" />
              </button>

              <button
                onClick={handleNext}
                aria-label="Next testimonial"
                className="
                  group w-14 h-14 rounded-full border border-white/10
                  flex items-center justify-center cursor-pointer
                  hover:bg-white hover:border-white hover:text-black
                  transition-all duration-300 active:scale-95
                "
              >
                <HiArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Right Column - Testimonial Card */}
          <div className="lg:col-span-7 flex flex-col justify-between lg:pl-12 lg:border-l border-white/10 min-h-[320px]">
            {/* Top Indicator */}
            <div
              ref={indexRef}
              className="text-xs font-semibold tracking-wider text-gray-500 uppercase mb-6"
            >
              0{activeIndex + 1} &mdash; 0{testimonials.length}
            </div>

            {/* Quote Body */}
            <div className="flex-grow flex items-center mb-8">
              <p
                ref={quoteRef}
                className="text-xl md:text-3xl lg:text-[32px] font-medium leading-[1.4] text-white/90"
              >
                &ldquo;{testimonials[activeIndex].quote}&rdquo;
              </p>
            </div>

            {/* Author Details */}
            <div ref={authorRef} className="mt-auto border-t border-white/10 pt-6">
              <h4 className="text-lg font-bold text-white mb-0.5">
                {testimonials[activeIndex].author}
              </h4>
              <p className="text-sm text-gray-500 font-medium">
                {testimonials[activeIndex].role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
