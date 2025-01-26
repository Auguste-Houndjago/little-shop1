'use client'
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Enregistrement de ScrollTrigger avec GSAP
gsap.registerPlugin(ScrollTrigger);

interface DarkFrameWrapperProps {
  children: React.ReactNode;
}

const DarkFrameWrapper: React.FC<DarkFrameWrapperProps> = ({ children }) => {
  const frameRef = useRef<HTMLDivElement>(null); 
  useEffect(() => {
    if (frameRef.current) {

      gsap.to(frameRef.current, {
        height: 0, 
        ease: "power2.out", 
        scrollTrigger: {
          trigger: frameRef.current, 
          start: "top top", 
          end: "bottom top", 
          scrub: 1, 
        },
      });
    }
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Cadre sombre animé */}
      <div
        ref={frameRef}
        className="absolute inset-0 bg-black z-50"
        style={{ height: "100%", width: "100%" }}
      />
      {/* Contenu de la page */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default DarkFrameWrapper;
