'use client'

import { ReactNode, useEffect, useRef } from "react";
import { gsap } from "gsap";

type PageTransitionProps = {
  children: ReactNode;
};

export default function PageTransition({ children }: PageTransitionProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animation d'entrée
    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrapperRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );
    }, wrapperRef);

    return () => {
      // Nettoyage du contexte GSAP
      ctx.revert();
    };
  }, []);

  return <div ref={wrapperRef}>{children}</div>;
}
