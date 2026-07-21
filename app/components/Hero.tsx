import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Hero = () => {
  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    tl.from(".hero-eyebrow", { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" })
      .from(".hero-headline-line", { y: "100%", duration: 0.8, ease: "power4.out", stagger: 0.1 }, "-=0.3")
      .from(".hero-subheadline", { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.5")
      .from(".hero-buttons", { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.4");
  }, []);

  return (
    <div className="w-full lg:min-h-[calc(100vh-130px)] md:h-[60vh] flex flex-col justify-center text-black lg:pl-34 md:pl-14 px-6 lg:pr-14 md:pr-14 lg:py-10 py-16 tracking-tight">
      <div className="hero-eyebrow mb-4 text-xs md:text-sm font-bold tracking-[0.2em] text-gray-500 uppercase">
        SINCE 1997 · AHMEDABAD, INDIA
      </div>

      <h1 className="hero-headline text-[40px] md:text-6xl lg:text-[80px] font-bold leading-[1.1] mb-6 max-w-6xl">

        <div className="overflow-hidden">
          <span className="hero-headline-line block">Trade Show On Your Cards?</span>
        </div>

        <div className="overflow-hidden">
          <span className="hero-headline-line block">Leave Everything On Us.</span>
        </div>

      </h1>
      <div className="flex items-center gap-4">
        <div className="herovid w-34 h-24 rounded-full overflow-hidden md:flex hidden">
          <video src="/videos/herovideo.mp4" className="object-cover" muted autoPlay loop></video>
        </div>
        <p className="hero-subheadline text-lg md:text-2xl text-gray-700 font-medium max-w-3xl mb-10 leading-relaxed">
          End-to-end exhibition stall design, for brands who show up on the world stage.
        </p>
      </div>

      <div className="hero-buttons flex flex-wrap gap-4 md:gap-6">
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
