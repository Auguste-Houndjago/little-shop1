"use client"

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TransitionEffect = () => {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const darkBackgroundRef = useRef(null);
  const textContentRef = useRef(null);

  useEffect(() => {
    // Initial states
    gsap.set(darkBackgroundRef.current, {
      height: "0%",
      backgroundColor: "#000"
    });
    
    gsap.set(textContentRef.current, {
      opacity: 0,
      y: 50
    });

    // Animation pour le fond sombre
    gsap.to(darkBackgroundRef.current, {
      height: "100%",
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: contentRef.current,
        start: "top center",
        end: "+=300",
        scrub: 1,
      }
    });

    // Animation pour le contenu
    gsap.to(textContentRef.current, {
      opacity: 1,
      y: 0,
      ease: "power2.out",
      scrollTrigger: {
        trigger: contentRef.current,
        start: "top center",
        end: "+=400",
        scrub: 1,
      }
    });

    // Pin section
    ScrollTrigger.create({
      trigger: contentRef.current,
      start: "top top",
      end: "+=200%",
      pin: true,
      pinSpacing: true,
    });
  }, []);

  return (
    <div className="relative">
      {/* Section initiale */}
      <section className="h-screen flex items-center justify-center bg-white">
        <h1 className="text-4xl font-bold">Scrollez vers le bas</h1>
      </section>

      {/* Section de transition */}
      <section ref={contentRef} className="h-screen relative overflow-hidden">
        {/* Fond sombre qui se dévoile */}
        <div 
          ref={darkBackgroundRef}
          className="absolute inset-0 w-full"
        />

        {/* Contenu qui apparaît */}
        <div 
          ref={textContentRef}
          className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4"
        >
          <h2 className="text-6xl font-bold mb-8">Votre Contenu</h2>
          <p className="text-xl max-w-2xl text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </section>

      {/* Section finale */}
      <section className="h-screen flex items-center justify-center bg-black text-white">
        <h2 className="text-4xl font-bold">Section Finale</h2>
      </section>
    </div>
  );
};

export default TransitionEffect;