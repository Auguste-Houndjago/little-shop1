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
  const frameRef = useRef<HTMLDivElement>(null); // Référence au cadre sombre

  useEffect(() => {
    if (frameRef.current) {
      // Configuration de l'animation au scroll
      gsap.to(frameRef.current, {
        height: 0, // Réduit la hauteur du cadre sombre
        ease: "power2.out", // Courbe d'accélération
        scrollTrigger: {
          trigger: frameRef.current, // Élément déclencheur
          start: "top top", // Début de l'animation (au haut de la page)
          end: "bottom top", // Fin de l'animation
          scrub: 1, // Synchronisation avec le défilement
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
