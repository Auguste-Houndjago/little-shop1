'use client';

import React, { useEffect, useRef, ReactNode } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

interface SectionStyles {
  container?: string;
  imageWrapper?: string;
  contentWrapper?: string;
  image?: string;
}

interface Section {
  image: string;
  content: ReactNode;
  styles?: SectionStyles;
  layout: {
    imageWidth: string;
    imagePosition: string;
    contentPosition: string;
    imageParallaxSpeed: number;
    contentParallaxSpeed?: number;
    marginTop?: string;
    marginBottom?: string;
  };
}

interface ParallaxSmootherProps {
  sections: Section[];
  containerClassName?: string;
  scrollMultiplier?: number;
}

const ParallaxSmoother: React.FC<ParallaxSmootherProps> = ({
  sections,
  containerClassName = "",
  scrollMultiplier = 1.2
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<LocomotiveScroll | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    scrollRef.current = new LocomotiveScroll({
      el: containerRef.current,
      smooth: true,
      multiplier: scrollMultiplier,
    });

    return () => {
      scrollRef.current?.destroy();
    };
  }, [scrollMultiplier]);

  return (
    <div
      ref={containerRef}
      data-scroll-container
      className={`relative min-h-screen overflow-hidden ${containerClassName}`}
    >
      {sections.map((section, index) => (
        <section
          key={index}
          className={`relative h-screen overflow-hidden ${section.layout.marginTop || ''} ${
            section.layout.marginBottom || ''
          } ${section.styles?.container || ''}`}
          data-scroll-section
        >
          <div
            className={`absolute top-0 ${section.layout.imagePosition} h-full ${
              section.layout.imageWidth
            } -z-10 ${section.styles?.imageWrapper || ''}`}
            data-scroll
            data-scroll-speed={section.layout.imageParallaxSpeed}
          >
            <img
              src={section.image}
              alt={`Background ${index}`}
              className={`w-full h-full object-cover ${section.styles?.image || ''}`}
            />
          </div>

          <div
            className={`relative z-10 max-w-4xl mx-auto px-8 py-32 flex ${
              section.layout.contentPosition
            } ${section.styles?.contentWrapper || ''}`}
            data-scroll
            data-scroll-speed={section.layout.contentParallaxSpeed || 2}
          >
            {section.content}
          </div>
        </section>
      ))}
    </div>
  );
};

export default ParallaxSmoother;