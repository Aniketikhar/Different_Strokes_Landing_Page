import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface HeroProps {
  animate: boolean;
}

const Hero = ({ animate }: HeroProps) => {
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  // Set initial hidden state immediately on mount — no flash
  useEffect(() => {
    gsap.set(eyebrowRef.current, { y: 20, opacity: 0 });
    gsap.set([line1Ref.current, line2Ref.current], { y: "100%" });
    gsap.set(subheadRef.current, { y: 20, opacity: 0 });
    gsap.set(buttonsRef.current, { y: 20, opacity: 0 });
  }, []);

  // Animate TO visible only after loader completes
  useEffect(() => {
    if (!animate) return;

    const tl = gsap.timeline();

    tl.to(eyebrowRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power3.out",
    })
      .to(
        [line1Ref.current, line2Ref.current],
        { y: "0%", duration: 0.9, ease: "power4.out", stagger: 0.12 },
        "-=0.3"
      )
      .to(
        subheadRef.current,
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.5"
      )
      .to(
        buttonsRef.current,
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      );
  }, [animate]);

  return (
    <div className="w-full lg:min-h-[calc(100vh-130px)] md:h-[60vh] flex flex-col justify-center text-black lg:pl-34 md:pl-14 px-6 lg:pr-14 md:pr-14 lg:py-10 py-16 tracking-tight">
      <div
        ref={eyebrowRef}
        className="mb-4 text-xs md:text-sm font-bold tracking-[0.2em] text-gray-500 uppercase"
      >
        SINCE 1997 · AHMEDABAD, INDIA
      </div>

      <h1 className="text-[40px] md:text-6xl lg:text-[80px] font-bold leading-[1.1] mb-6 max-w-6xl">
        <div className="overflow-hidden">
          <span ref={line1Ref} className="block">
            Trade Show On Your Cards?
          </span>
        </div>
        <div className="overflow-hidden">
          <span ref={line2Ref} className="block">
            Leave Everything On Us.
          </span>
        </div>
      </h1>

      <div className="flex items-center gap-4">
        <div className="herovid w-34 h-24 rounded-full overflow-hidden md:flex hidden">
          <video
            src="/videos/herovideo.mp4"
            className="object-cover"
            muted
            autoPlay
            loop
          ></video>
        </div>
        <p
          ref={subheadRef}
          className="text-lg md:text-2xl text-gray-700 font-medium max-w-3xl mb-10 leading-relaxed"
        >
          End-to-end exhibition stall design, for brands who show up on the world stage.
        </p>
      </div>

      <div ref={buttonsRef} className="flex flex-wrap gap-4 md:gap-6">
        <button className="px-8 py-4 bg-black text-white rounded-full font-medium text-lg hover:bg-gray-800 transition-all active:scale-95">
          View Our Work
        </button>
        <button className="px-8 py-4 bg-transparent border-2 border-black text-black rounded-full font-medium text-lg hover:bg-black hover:text-white transition-all active:scale-95">
          Get a Design Proposal
        </button>
      </div>
    </div>
  );
};

export default Hero;
