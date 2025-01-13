"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import FloatingCan from "./FloatingCan";
import { Group } from "three";

const AnimatedSodaScene = () => {
  const canRef = useRef<Group>(null);

  useEffect(() => {
    if (!canRef.current) return;

    // Animation initiale
    gsap.from(canRef.current.position, {
      y: -10,
      duration: 1.5,
      ease: "elastic.out(1, 0.5)",
    });

    gsap.from(canRef.current.rotation, {
      y: Math.PI * 2,
      duration: 2,
      ease: "power2.out",
    });

    // Animation continue
    gsap.to(canRef.current.position, {
      y: "+=0.2",
      duration: 1.5,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut",
    });
  }, []);





  return (
    <group
    >
      <FloatingCan
        ref={canRef}
        flavor="lemonLime"
        floatSpeed={0}
        rotationIntensity={0}
        floatIntensity={0}
      />
    </group>
  );
};

export default AnimatedSodaScene;