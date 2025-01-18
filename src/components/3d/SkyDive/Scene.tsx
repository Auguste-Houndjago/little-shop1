"use client";

import { Cloud, Clouds, Environment, OrbitControls, PresentationControls, Text } from "@react-three/drei";
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
  sentences: string[];
  flavor: "smartshop"| "lemonLime" | "grape" | "blackCherry" | "strawberryLemonade" | "watermelon" | undefined;
};

export default function Scene({ sentences, flavor }: SkyDiveProps) {
  const groupRef = useRef<Group>(null);
  const canRef = useRef<Group>(null);
  const cloud1Ref = useRef<Group>(null);
  const cloud2Ref = useRef<Group>(null);
  const cloudsRef = useRef<Group>(null);
  const textGroupsRef = useRef<(Group | null)[]>([]);
  
  // accesoires
  const phoneRef = useRef<Group>(null);
  const watchRef = useRef<Group>(null);
  const cartRef = useRef<Group>(null);
  const shoesRef = useRef<Group>(null);
  const bagRef = useRef<Group>(null);

  //camera

  const {camera} = useThree();
  const camRef = useRef<Group>(null)

//size

  const isMobile = useMediaQuery("(max-width: 640px)", false);
  const isTablet = useMediaQuery("(max-width: 1024px)", false);
  const isDesktop = !isTablet && !isMobile;


  const getScale = () => {
    if (isMobile) return 0.3; 
    if (isTablet) return 0.5; 
    return 0.5; 
  };

  const getPositionOffset = () => {
    if (isMobile) return 1.5; 
    if (isTablet) return 1; 
    return 0; 
  };

  const scale = getScale();
  const positionOffset = getPositionOffset();


  useGSAP(() => {
    if (!canRef.current || !phoneRef.current || !watchRef.current || !shoesRef.current || !bagRef.current || !groupRef.current ) return;




    const principal = gsap.timeline({
      scrollTrigger:{
        trigger:"#canvas-container",
        start: "25% top",
        end : " bottom bottom",
        scrub: 20,
        // pin: true, 
        markers:true 
      }
    })

    const group = groupRef.current;


  
    const objectPaths = [
      { 
        ref: phoneRef.current, 
        startPosition: { x: -2, y: 6, z: 0 },
        endPosition: {  x: 1, y: 1.5, z: 0},  
      },
      { 
        ref: watchRef.current, 
        startPosition: { x: 2, y: 6, z: 0 },
        endPosition: {  x: 1, y: 1, z: 1 },
      },
      { 
        ref: shoesRef.current, 
        startPosition: { x: -3, y: 6, z: 0 },
        endPosition: { x: -0.8, y: 1, z: 1 },
      },
      { 
        ref: bagRef.current, 
        startPosition: { x: 2, y: 6, z: 0 },
        endPosition: { x: -1.5, y: 1.5, z: 0 },
      }
    ];

    objectPaths.forEach(({ ref, startPosition, endPosition }, index) => {
      gsap.set(ref.position, startPosition);
  
      principal.to(
        ref.position,
        {
          x: endPosition.x,
          y: endPosition.y,
          z: endPosition.z,
          duration: 20,
          ease: "sine.out",
          delay: index * 0.3,
        },
        index * 0.8
      );
    });
  
    // Ajout du mouvement de cart synchronisé
    principal.to(
      canRef.current.position,
      {
        y: 1,
        duration: 2,
        ease: "sine.inOut",

      },
      `+=0.5` 
    ).to(
      groupRef.current.position,
      {
        y: 1,
        duration: 2,
        ease: "sine.inOut",

      },
      `+=0.01` 
    ).to(
      canRef.current.rotation,
      {
        y:10,
     
      
        duration: 1.5,
        ease: "sine.inOut",

      },
      `<` 
    ).to(
      canRef.current.scale,
      {
        y: 0.8,
        x: 0.8,
        z: 0.8,
        duration: 0.5,
        ease: "sine.inOut",

      },
       
    )
    
    ;



  


    const phoneMove = gsap.timeline({
      scrollTrigger:{
        trigger:"#quality-products",
       start: "center center",
       end: "bottom bottom",
       scrub: true,
       markers:true,
      }
    })
    // .to("#quality-products", {
   
    //   y: "50%",
    //   transformOrigin: "center center"
    // });
      


   ScrollTrigger.matchMedia({
   
      "(min-width: 950px)": () => {
        phoneMove.to(phoneRef.current!.position, {
          y: "-2",
          x:"-1",
          duration: 1,
          ease: "sine.inOut",
        },
        `+=0.1` 
      ).to(
        phoneRef.current!.rotation,
        {
          y: "-=0.3",
          z:"-0.6",
          duration: 0.5,
          repeat: 2,
          ease: "sine.inOut",
    
        },
       `<`
      )
      },
      
      "(max-width: 949px)": () => {
        phoneMove.to(phoneRef.current!.position, {
          y: "-2",
          x:"-1",
          duration: 1,
          ease: "sine.inOut",
        },
        `+=0.1` 
      ).to(
        phoneRef.current!.rotation,
        {
          y: "-=0.3",
          z:"-0.6",
          duration: 0.5,
          repeat: 2,
          ease: "sine.inOut",
    
        },
       `<`
      )
      },
    });

    
// const canMove = gsap.timeline({
//   scrollTrigger:{
//     trigger:"#section2",
//    start: "90% 60%",
//    end: "bottom bottom",
//    scrub: true,
//    pin:true,
//    markers:true,
//   }
// }).to("#sky", {

// });

// canMove.to(canRef.current.position, {
//   y:1,
//   duration:2,
//   ease: "sine.inOut",
// })




return () => {

  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};
  }, []);


  return (
    <group ref={groupRef} scale={scale} >
  
      <group scale={1}  rotation={[0, 1, 0]} renderOrder={4}>

      
        <FloatingCan
          ref={canRef}
          flavor={flavor}
          rotationIntensity={0.05}
          floatIntensity={0.8}
          floatSpeed={1.5}
          floatingRange={[-0.1, 0.1]}
        >
          <pointLight intensity={20} color="#8C0413" decay={0.6} />
        </FloatingCan>


      </group>
{/* 
      <Clouds ref={cloudsRef}>
        <Cloud ref={cloud1Ref} bounds={[20, 20, 1]} />
        <Cloud ref={cloud2Ref} bounds={[20, 20, 1]} />
      </Clouds> */}

  
      <group ref={phoneRef} position={[0.5, 0, 1]}>
        <FloatingModel>
          <Phone />
        </FloatingModel>
      </group>

      <group ref={watchRef} position={[0.3, 0.9, 0]}>
        <FloatingModel>
          <AppleWatch1 />
        </FloatingModel>
      </group>

      {/* <group ref={cartRef} scale={0.5} position={[0, 0, 1]}>
        <FloatingModel>
          <ShoopingCart />
        </FloatingModel>
      </group> */}

      <group ref={shoesRef} position={[-0.8, 0.2, 0]} scale={2}>
        <FloatingModel>
          <Shoes />
        </FloatingModel>
      </group>

      <group ref={bagRef} position={[-1, 1, 0]}>
        <FloatingModel>
          <Bag />
        </FloatingModel>
      </group>

      <ambientLight intensity={2} color="#9DDEFA" />
      <Environment files="/hdr/field.hdr" environmentIntensity={1.5} />
    </group>
  );
}
