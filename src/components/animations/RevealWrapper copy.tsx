'use client'
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const RevealWrapper = ({ children, delay = 0.5 }:{children: React.ReactNode , delay: number}) => {
  const containerRef = useRef(null);
  const topCoverRef = useRef(null);
  const bottomCoverRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const topCover = topCoverRef.current;
    const bottomCover = bottomCoverRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top center",
        end: "bottom center",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo([topCover, bottomCover], 
      {
        height: "50%",
      },
      {
        height: "0%",
        duration: 1,
        ease: "power4.inOut",
        delay: delay,
      }
    );

    return () => {
      tl.kill();
    };
  }, [delay]);

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {/* Top cover */}
      <div 
        ref={topCoverRef}
        className="absolute top-0 left-0 w-full h-1/2 bg-black z-10"
      />
      
      {/* Bottom cover */}
      <div 
        ref={bottomCoverRef}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-black z-10"
      />
      
      {/* Content */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
};

export default RevealWrapper;