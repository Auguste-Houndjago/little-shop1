import React, { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';

interface PageTransitionProps {
  isHorizontal?: boolean;
  children: ReactNode;
  onComplete?: () => void;
}

const PageTransition: React.FC<PageTransitionProps> = ({ 
  isHorizontal = false, 
  children, 
  onComplete 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const content = contentRef.current;

    if (!overlay || !content) return;

    // Timeline principale pour la séquence d'animation
    const tl = gsap.timeline({
      onComplete: () => onComplete?.()
    });

    // Configuration initiale
    gsap.set(overlay, {
      [isHorizontal ? 'xPercent' : 'yPercent']: -100,
      opacity: 0
    });
    gsap.set(content, { opacity: 0 });

    // Séquence d'animation
    tl
      // Phase 1: Apparition de l'overlay avec effet de rebond
      .to(overlay, {
        opacity: 1,
        duration: 0.3
      })
      .to(overlay, {
        [isHorizontal ? 'xPercent' : 'yPercent']: 0,
        duration: 0.6,
        ease: "back.out(1.7)"
      })
      
      // Phase 2: Animation de pulsation
      .to(overlay, {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.inOut"
      })
      .to(overlay, {
        scale: 1,
        duration: 0.3,
        ease: "power2.inOut"
      })
      
      // Phase 3: Transition du contenu avec fondu
      .to(content, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.inOut"
      })
      
      // Phase 4: Sortie de l'overlay avec effet de distorsion
      .to(overlay, {
        [isHorizontal ? 'xPercent' : 'yPercent']: 100,
        skewX: isHorizontal ? 10 : 0,
        skewY: isHorizontal ? 0 : 10,
        duration: 0.8,
        ease: "power4.inOut"
      })
      .to(overlay, {
        opacity: 0,
        duration: 0.2
      });

    return () => {
      tl.kill();
    };
  }, [isHorizontal, onComplete]);

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden">
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-500"
        style={{
          zIndex: 50,
          transformOrigin: 'center center'
        }}
      />
      <div ref={contentRef} className="relative z-40">
        {children}
      </div>
    </div>
  );
};

export default PageTransition;