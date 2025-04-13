"use client";

import { Cloud, Clouds, Environment, OrbitControls,  } from "@react-three/drei";
import { useRef, RefObject } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import FloatingCan from "../cannettes/FloatingCan";
import { Group } from "three";
import {Phone} from '@/components/3d/model/Phone'
import FloatingModel from "../FloatingModel";
import { AppleWatch1 } from "../model/Apple_watch";
import { Shoes } from "../model/Shoes";
import { Bag } from "../model/Bag";
import { ShoopingCart } from "../model/ShoopingCart";


import { useThree } from "@react-three/fiber";
gsap.registerPlugin(useGSAP, ScrollTrigger);

type SkyDiveProps = {
  flavor: "smartshop"| "lemonLime" | "grape" | "blackCherry" | "strawberryLemonade" | "watermelon" | undefined;
};

export default function SodaScene({ flavor }: SkyDiveProps) {
  const canRef = useRef<Group>(null);

  



//size

  const isMobile = useMediaQuery("(max-width: 640px)", false);
  const isTablet = useMediaQuery("(max-width: 1024px)", false);
  const isDesktop = !isTablet && !isMobile;


  const getScale = () => {
    if (isMobile) return 2; 
    if (isTablet) return 2; 
    return 3; 
  };

  const getPositionOffset = () => {
    if (isMobile) return 1.5; 
    if (isTablet) return 1; 
    return 0; 
  };

  const scale = getScale();
  const positionOffset = getPositionOffset();


  useGSAP(() => {
    if (!canRef.current ) return;

 
    
const canMove = gsap.timeline({
  // scrollTrigger:{
  //   trigger:"#overlayRef",
  //  start: "top 90%",
  //  end: "bottom top",
  //  scrub: 1,
  // //  pin:true,  
  //  markers:true,
  // }
});

gsap.set(canRef.current , {opacity:0 })

gsap.set(canRef.current.position , {position:0})
canMove.to(
      canRef.current.position,
      {
        y: 2,
        opacity:1,
        delay:1,
        duration: 1,
        ease: "sine.inOut",

      },
    
    ).to(
      canRef.current.position,
      {
       
        opacity:0,
        duration: 0.5,
        ease: "sine.inOut",

      },
    
    )
    ;


return () => {

  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};
  }, []);


  return (
    <group
    >
      <FloatingCan
        ref={canRef}
        flavor={flavor}
        floatSpeed={0}
        rotationIntensity={0}
        floatIntensity={0}
        scale={2}
      />
    </group>
  );
}
