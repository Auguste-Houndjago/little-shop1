"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation"; // Import de useRouter pour la navigation
import HLogo from "../ux/HomeLogo";
import Smoke3D from "./Smoke3D";

gsap.registerPlugin(ScrollTrigger);

const TransitionEffect = () => {
  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  const router = useRouter(); // Hook pour la navigation

  useEffect(() => {
    // Configuration initiale des animations
    gsap.set(overlayRef.current, {
      clipPath: "circle(0% at center)",
    });
    gsap.set(".blurxl", { opacity: 1 });

    // Animation de la classe '.blurxl'
    gsap.to(".blurxl", {
      opacity: 0.5,
      filter: "blur(20px)",
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: ".blurxl",
        start: "50% center",
        end: "+=100%",
        scrub: 1,
      },
    });

    // Animation de la classe '.xlogo'
    gsap.to(".xlogo", {
      opacity: 0,
      filter: "blur(20px)",
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: ".blurxl",
        start: "50% center",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Animation de l'overlay sombre
    gsap.to(overlayRef.current, {
      clipPath: "circle(150% at center)",
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=100%",
        scrub: 1,
      },
    });

    // Création d'une timeline pour l'animation du contenu
    const contentTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "center center",
        end: "+=50%",
        scrub: 1,
      },
    });

    // Animation du contenu
    gsap.set(".hA", { scale: 0.8, ease: "power2.out" });
    gsap.set(".hA2", { opacity: 0, scale: 1, ease: "power2.out" });

    contentTimeline
      .to(contentRef.current, {
        opacity: 1,
        scale: 1,
        ease: "power2.out",
      })
      .to(".hA", {
        y: 200,
        ease: "power2.out",
      })
      .to(
        ".hA",
        {
          scale: 1,
          ease: "power2.out",
        },
        "-=0.5"
      )
      .to(
        ".hA2",
        {
          scale: 1,
          opacity: 1,
          ease: "power2.out",
        },
        "-=0.5"
      );

    // Redirection à la fin du scroll
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "bottom bottom", // Début de la détection
      onEnter: () => {
        // Ajout d'une animation de transition avant la redirection
        gsap.to(overlayRef.current, {
          opacity: 1,
          duration: 1,
          onComplete: () => {
            router.push("/"); // Redirection vers la page d'accueil
          },
        });
      },
    });

    // Nettoyage des animations lors du démontage
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [router]);

  return (
    <main className="relative w-full">
      {/* Conteneur de fumée en arrière-plan */}
      <div className="w-full h-full z-0">
        <Smoke3D />
      </div>

      {/* Contenu principal */}
      <div ref={containerRef} className="relative w-full min-h-screen bg-transparent">
        <div ref={overlayRef} className="absolute inset-0 bg-black z-10" />

        {/* Contenu par-dessus */}
        <div className="relative z-20">
          {/* Première section */}
          <section className="h-screen flex items-center flex-col justify-center blurxl overflow-visible">
            <h1 className="text-3xl font-bold text-center mb-4 text-white">Votre boutique de vente en ligne</h1>
            <HLogo className="xlogo" />
            <h1 className="mt-4 text-2xl font-bold text-white">Bienvenue sur smart-shop</h1>
          </section>

          {/* Section de transition */}
          <section className="h-screen flex items-center justify-center">
            <div ref={contentRef} className="relative z-20 w-full text-white opacity-0 scale-90 transform transition-all">
              <h2 className="text-6xl font-bold mb-8 text-center">Decouvrez une nouvelle facon d'acheter</h2>
              <p className="text-xl max-w-2xl text-center px-4">
                Smart-Shop est une boutique moderne
              </p>

              <span className="w-full">
                <h4 className="text-center hA">
                  <p className="p-2 text-2xl">Notre objectif : Fournir à nos clients des produits de qualité</p>
                </h4>
              </span>
              <h4 className="text-center hA2">
                <p>Nous sélectionnons avec soin les meilleurs articles</p>
                <p>Qualité, simplicité et satisfaction client sont au cœur de nos priorités</p>
              </h4>
            </div>
          </section>

          {/* Section finale */}
          <section className="h-screen flex items-center justify-center">
            <div className="relative z-20 text-white">
              <h1>Découvrez une expérience d'achat unique</h1>
              <h2 className="text-4xl font-bold">Des articles conçus pour sublimer vos envies</h2>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default TransitionEffect;
