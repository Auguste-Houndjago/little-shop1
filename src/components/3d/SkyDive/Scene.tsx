"use client";

import { Cloud, Clouds, Environment, Text } from "@react-three/drei";
import { useRef, RefObject } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import FloatingCan from "../cannettes/FloatingCan";
import { Group } from "three";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type SkyDiveProps = {
  sentences: string[];
  flavor: "lemonLime" | "grape" | "blackCherry" | "strawberryLemonade" | "watermelon" | undefined;
};

export default function Scene({ sentences, flavor }: SkyDiveProps) {
  const groupRef = useRef<Group>(null);
  const canRef = useRef<Group>(null);
  const cloud1Ref = useRef<Group>(null);
  const cloud2Ref = useRef<Group>(null);
  const cloudsRef = useRef<Group>(null);
  const textGroupsRef = useRef<(Group | null)[]>([]);

  useGSAP(() => {
    if (!cloudsRef.current || !canRef.current || !cloud1Ref.current || !cloud2Ref.current) return;

    const can = canRef.current;
    const clouds = cloudsRef.current;
    const cloud1 = cloud1Ref.current;
    const cloud2 = cloud2Ref.current;

    // Définir les limites de mouvement sûres
    const SAFE_BOUNDS = {
      xMin: -2,
      xMax: 2,
      yMin: -1,
      yMax: 2
    };

    // Position initiale
    gsap.set(can.position, {
      x: 0,
      y: SAFE_BOUNDS.yMax ,
      z: 0
    });

    // Position initiale des textes
    textGroupsRef.current.forEach((textGroup) => {
      if (textGroup) {
        gsap.set(textGroup.position, {
          x: -3,
          y: SAFE_BOUNDS.yMax,
          z: 0,
          opacity: 0
        });
      }
    });

    // Rotation continue
    gsap.to(can.rotation, {
      y: Math.PI * 2,
      duration: 2,
      repeat: -1,
      ease: "none",
    });

    // Animation des nuages
    gsap.to([cloud1.position, cloud2.position], {
      y: "-=15",
      duration: 20,
      repeat: -1,
      ease: "none",
      stagger: 10
    });

    gsap.to(can.scale, {
      x: 1.05,
      y: 1.05,
      z: 1.05,
      duration: 2,
      repeat: -1,
      yoyo: true, 
      ease: "power1.inOut",
    });

    // Timeline principale
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".skydive",
        pin: true,
        start: "top top",
        end: `+=${5000 * (sentences.length + 0.5)}`, 
        scrub: 3,
      },
    });
    

    // Animation principale (zigzag)
    sentences.forEach((_, index) => {
      let progress = index / (sentences.length - 1);
      const isEven = index % 2 === 0;
      progress = progress === 0 ? 1 : progress
      const xPos = isEven ? SAFE_BOUNDS.xMax : SAFE_BOUNDS.xMin;
      const yPos = SAFE_BOUNDS.yMax - (progress * (SAFE_BOUNDS.yMax - SAFE_BOUNDS.yMin));

      scrollTl
        .to(can.position, {
          x: xPos,
          y: yPos,
          duration: 5,
          ease: "power1.inOut"
        })
        .to(can.rotation, {
          z: isEven ? Math.PI * 0.05 : -Math.PI * 0.05,
          duration: 0.5
        }, "<")
  


      // Animation des textes
      textGroupsRef.current.forEach((textGroup, textIndex) => {
        if (textGroup) {
          if (textIndex === index) {
            scrollTl.to(textGroup.position, {
              x: isEven ? -2 : 2,
              y: yPos + 0.5,
              opacity: 1,
              duration: 1
              
            }, "<");
          } else if (textIndex === index - 1) {
            scrollTl.to(textGroup.position, {
              opacity: 0,
              duration: 0.3
            }, "<");
          }
        }
      });
    });

    // Animation de sortie dynamique
    const exitTl = scrollTl.to(can.position, {
      x: "+=4",  // Déplacement vers la droite
      y: "+=2",  // Légère montée
      z: "-=2",  // Effet de profondeur
      duration: 1,
      ease: "power2.in"
    })
    .to(can.rotation, {
      x: Math.PI * 0.5,  // Rotation en X
      y: Math.PI * 2,    // Rotation complète en Y
      z: Math.PI * 0.25, // Légère rotation en Z
      duration: 1,
      ease: "power2.in"
    }, "<")
    .to(can.scale, {
      x: 0.5,
      y: 0.5,
      z: 0.5,
      duration: 1,
      ease: "power2.in"
    }, "<")
    .to(textGroupsRef.current.filter(Boolean), {
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power1.in"
    }, "<");

  });

  
  const setTextGroupRef = (index: number) => (el: Group | null) => {
    textGroupsRef.current[index] = el;
  };

  return (
    <group ref={groupRef}>
      <group rotation={[0, 0, 0.2]}>
        <FloatingCan
          ref={canRef}
          flavor={flavor}
          rotationIntensity={0.05}
          floatIntensity={0.8}
          floatSpeed={1.5}
          floatingRange={[-0.05, 0.05]}
          
        >
          <pointLight intensity={20} color="#8C0413" decay={0.6} />
        </FloatingCan>
      </group>

      <Clouds ref={cloudsRef}>
        <Cloud ref={cloud1Ref} bounds={[8, 8, 2]} />
        <Cloud ref={cloud2Ref} bounds={[8, 8, 2]} />
      </Clouds>

      {sentences.map((sentence, index) => (
        <group 
          key={`text-group-${index}`}
          ref={setTextGroupRef(index)}
        >
          <ThreeText sentence={sentence} color="#F97315" />
        </group>
      ))}

      <ambientLight intensity={2} color="#9DDEFA" />
      <Environment files="/hdr/field.hdr" environmentIntensity={1.5} />
    </group>
  );
}

function ThreeText({
  sentence,
  color = "white",
}: {
  sentence: string;
  color?: string;
}) {
  const words = sentence.split(" ");
  const material = new THREE.MeshLambertMaterial({depthTest:false});
  const isDesktop = useMediaQuery("(min-width: 950px)", true);

  return words.map((word: string, wordIndex: number) => (
    <Text
    key={`${wordIndex}-${word}`}
    renderOrder={2}
    scale={isDesktop ? 0.2 : 0.1}      // Taille du texte ajustée
    color={color}
      material={material}
      fontWeight={900}
      anchorX="center"
      anchorY="middle"
      characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ!,.?'"
  
    >
      {word}
    </Text>
  ));
}