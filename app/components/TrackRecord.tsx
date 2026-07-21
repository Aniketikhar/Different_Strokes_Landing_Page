import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 27, suffix: "+", label: "Years building brands a stage to shine" },
  { value: 500, suffix: "+", label: "Stalls designed and delivered, not just rendered" },
  { value: 15, suffix: "+", label: "Countries our booths have travelled to" },
  { value: 100, suffix: "%", label: "In-house design-to-execution control" },
  { value: 60, suffix: "+", label: "Repeat clients who keep coming back" },
];

const TrackRecord = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const rowRefs = useRef<HTMLDivElement[]>([]);
  const numberRefs = useRef<HTMLSpanElement[]>([]);

  useGSAP(() => {
    // Heading slide up
    gsap.from(headingRef.current, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
    });

    // Staggered row entry
    gsap.from(rowRefs.current, {
      y: 80,
      opacity: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      },
    });

    // Count-up animation for each number
    numberRefs.current.forEach((el, i) => {
      const target = stats[i].value;
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        onUpdate: () => {
          if (el) el.textContent = Math.round(obj.val).toString();
        },
      });
    });
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full bg-white text-black lg:px-40 md:px-14 px-6 lg:py-32 py-20 tracking-tight"
    >
      {/* Two-column layout on desktop */}
      <div className="flex lg:flex-row flex-col lg:gap-20 gap-14 lg:items-start">

        {/* Left: Heading */}
        <div className="lg:w-[40%] w-full lg:sticky lg:top-32 self-start">
          <p className="text-sm font-bold tracking-[0.2em] text-gray-500 uppercase mb-5">
            TRACK RECORD
          </p>
          <h2
            ref={headingRef}
            className="text-4xl md:text-5xl lg:text-[56px] font-bold leading-tight"
          >
            We'll let the numbers do the talking.
          </h2>
        </div>

        {/* Right: Stats list */}
        <div className="lg:w-[60%] w-full flex flex-col">
          {stats.map((stat, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) rowRefs.current[i] = el;
              }}
              className="group flex items-center justify-between border-t border-black/15 py-7 md:py-8 cursor-default transition-all hover:pl-3 duration-300"
            >
              {/* Stat number */}
              <div className="flex-shrink-0 w-36 md:w-44">
                <span
                  className="text-5xl md:text-6xl lg:text-7xl font-bold tabular-nums group-hover:scale-110 inline-block transition-transform duration-300 origin-left"
                >
                  <span
                    ref={(el) => {
                      if (el) numberRefs.current[i] = el;
                    }}
                  >
                    0
                  </span>
                  <span>{stat.suffix}</span>
                </span>
              </div>

              {/* Label */}
              <div className="flex-1 pl-4 md:pl-8">
                <p className="text-lg md:text-xl lg:text-2xl font-medium text-gray-700 leading-snug group-hover:text-black transition-colors duration-300">
                  {stat.label}
                </p>
              </div>

              {/* Arrow indicator */}
              <div className="ml-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-8px] group-hover:translate-x-0">
                <span className="text-2xl font-light text-black">→</span>
              </div>
            </div>
          ))}

          {/* Bottom border */}
          <div className="border-t border-black/15" />
        </div>
      </div>
    </div>
  );
};

export default TrackRecord;
