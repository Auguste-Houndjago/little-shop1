'use client'
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styled from 'styled-components';

// Enregistrer ScrollTrigger comme plugin GSAP
gsap.registerPlugin(ScrollTrigger);

const Track = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const Overlay = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const TextWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  overflow: hidden;
`;

const TextInner = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: white;
  transform: translateX(-100%);
`;

const ShapeWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Scale = styled.div`
  transform-origin: center;
`;

const Rotate = styled.div`
  transform-origin: center;
`;

const Gradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%);
  z-index: 1;
`;

interface RevealEffectProps {
  text: string;
}

const RevealEffect: React.FC<RevealEffectProps> = ({ text }) => {
  const textRef = useRef<HTMLDivElement>(null);
  const shapeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const textElement = textRef.current;
    const shapeElement = shapeRef.current;
    
    if (!textElement || !shapeElement) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trackRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    });

    tl.to(shapeElement, {
      duration: 1,
      scale: 30,
      rotate: 240,
      ease: 'expo.easeIn',
    })
    .to(textElement, {
      duration: 1,
      x: 0,
      ease: 'power2.easeIn',
    }, 0);

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <Track ref={trackRef}>
      <Overlay>
        <TextWrapper>
          <TextInner ref={textRef}>
            {text}
          </TextInner>
        </TextWrapper>
        <ShapeWrapper>
          <Scale>
            <Rotate ref={shapeRef}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 162 162" style={{backgroundAttachment: 'new 0 0 162 162'}}>
                <path 
                  className="hsc-img-path" 
                  d="M108 88.7c-10.8 0-19.7 8.8-19.7 19.7v47.4c0 1.9-1.5 3.4-3.4 3.4h-8.6c-1.9 0-3.4-1.5-3.4-3.4v-47.4c0-10.8-8.8-19.7-19.7-19.7H6.4c-1.9 0-3.4-1.5-3.4-3.4v-8c0-1.9 1.5-3.4 3.4-3.4h46.9c10.8 0 19.7-8.8 19.6-19.7V6.4c0-1.9 1.5-3.4 3.4-3.4H85c1.9 0 3.4 1.5 3.4 3.4v47.8c0 10.8 8.8 19.7 19.7 19.7h46.6c1.9 0 3.4 1.5 3.4 3.4v8c0 1.9-1.5 3.4-3.4 3.4H108z" 
                  style={{fillRule: 'evenodd', clipRule: 'evenodd'}} 
                  fill="#000"
                />
              </svg>
            </Rotate>
          </Scale>
        </ShapeWrapper>
        <Gradient />
      </Overlay>
    </Track>
  );
};

export default RevealEffect;   