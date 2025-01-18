'use client'
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Rideau = () => {
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animation avec ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body, // La page entière agit comme déclencheur
        start: "top top", // Début de l'animation au début de la page
        end: "bottom bottom", // Fin de l'animation à la fin de la page
        scrub: true, // L'animation suit le défilement
      },
    });

    tl.to(leftCurtainRef.current, { height: 0, duration: 1, ease: "power2.out" }, 0) // Rideau gauche
      .to(rightCurtainRef.current, { height: 0, duration: 1, ease: "power2.out" }, 0); // Rideau droit
  }, []);

  return (
    <div style={{ position: "relative", height: "200vh", overflow: "hidden" }}>
      {/* Rideau gauche */}
      <div
        ref={leftCurtainRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "50%",
          height: "100vh",
          backgroundColor: "black",
          transformOrigin: "top",
          zIndex: 10,
        }}
      />
      {/* Rideau droit */}
      <div
        ref={rightCurtainRef}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "50%",
          height: "100vh",
          backgroundColor: "black",
          transformOrigin: "top",
          zIndex: 10,
        }}
      />
      {/* Contenu derrière les rideaux */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "50px",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "white" }}>Bienvenue derrière les rideaux</h1>
        <p style={{ color: "white" }}>
          Faites défiler pour voir les rideaux disparaître progressivement !
        </p>
      </div>
    </div>
  );
};

export default Rideau;
