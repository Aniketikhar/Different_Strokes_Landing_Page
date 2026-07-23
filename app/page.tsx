"use client";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import TrackRecord from "./components/TrackRecord";
import WhatWeDo from "./components/WhatWeDo";
import VideoBar from "./components/VideoBar";
import Projects from "./components/Projects";
import Resources from "./components/Resources";
import Inspiration from "./components/Inspiration";
import Services from "./components/Services";
import PreFooter from "./components/PreFooter";
import Clients from "./components/Clients";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import { useEffect, useState } from "react";
import Lenis from "lenis";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prevent scroll during loading
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) return;

    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isLoading]);

  return (
    <main className="w-full min-h-screen bg-white">
      {/* Loader — unmounts after animation completes */}
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

      {/* Sticky hero block — pins while content scrolls over it */}
      <div className="sticky top-0 z-0 w-full bg-white">
        <Navbar />
        <Hero animate={!isLoading} />
      </div>

      {/* Scrolling content — slides up and overlaps the hero */}
      <div className="relative z-10 w-full bg-white">
        <VideoBar />

        {/* ── L1 undercard: About pins while TrackRecord+ slides over ── */}
        <div className="sticky top-0 z-[5] bg-white">
          <About />
        </div>

        {/* ── L1 overcard: TrackRecord+ slides over About ────────────── */}
        <div className="relative z-[10] w-full">
          <TrackRecord />

          {/* ── L2 undercard: WhatWeDo pins while Projects+ slides over ── */}
          <div className="sticky top-0 z-[5]">
            <WhatWeDo />
          </div>

          {/* ── L2 overcard: Projects+ slides over WhatWeDo ─────────────── */}
          <div className="relative z-[10]">

            {/* ── L3 undercard: Projects pins while Resources+ slides over ── */}
            <div className="sticky bottom-0 z-[5]">
              <Projects />
            </div>

            <div className="relative z-[10]">
              {/* ── L4 undercard: Clients pins while Testimonials+ slides over ── */}
              <div className="sticky bottom-0 z-[5]">
                <Clients />
              </div>

              {/* ── L4 overcard: Testimonials+ slides over Clients ── */}
              <div className="relative z-[10]">
                <Testimonials />
                {/* <Resources /> */}
                {/* <Inspiration /> */}
                {/* <Services /> */}
                <PreFooter />
                {/* <Footer /> */}
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
