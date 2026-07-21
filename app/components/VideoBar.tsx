import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VideoBar = () => {
  const vidbarRef = useRef(null);

  useGSAP(() => {
    gsap.from(vidbarRef.current, {
      scale: 0.95,
      opacity: 0.6,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: vidbarRef.current,
        start: "top 95%",
      },
    });
  }, []);

  return (
    <div
      ref={vidbarRef}
      className="videobar w-full lg:min-h-screen md:h-[50vh] h-[60vh] relative lg:rounded-t-[60px] rounded-t-[40px] overflow-hidden cursor-none"
    >
      <video
        src="/videos/videobar.mp4"
        className="object-cover absolute w-full h-full top-0 left-0"
        muted
        autoPlay
        loop
      ></video>
    </div>
  );
};

export default VideoBar;
