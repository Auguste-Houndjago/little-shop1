
'use client'
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Button } from "@/components/ui/button";


const World: React.FC = () => {
  const [isNight, setIsNight] = useState(false);
  const [isMusicOn, setIsMusicOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Toggle the night mode
  const toggleNight = () => setIsNight(!isNight);

  // Toggle the music
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicOn) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsMusicOn(!isMusicOn);
    }
  };

  return (
    <div
      className={`relative w-full h-screen overflow-hidden ${
        isNight ? "bg-[#1E0F4C]" : "bg-[#CCDCDA]"
      }`}
    >
      <Canvas>
        <ambientLight intensity={0.9} />
        <spotLight position={[9.5, 8.2, 8.3]} intensity={0.8} />
        <spotLight position={[-15.8, 5.2, 8]} intensity={0.5} />
        <Sheep />
      </Canvas>

      {/* Toggle buttons */}
      <Button
        onClick={toggleNight}
        className={`absolute top-4 left-4 w-12 h-12 rounded-full shadow-lg ${
          isNight
            ? "bg-[#9A96E8] shadow-[#626EC9] bg-center bg-no-repeat bg-contain"
            : "bg-[#F8007E] shadow-[#C40062] bg-center bg-no-repeat bg-contain"
        }`}
        style={{
          backgroundImage: `url(${
            isNight
              ? "https://res.cloudinary.com/elliepooh/image/upload/v1491841746/star_u865qq.svg"
              : "https://res.cloudinary.com/elliepooh/image/upload/v1491841750/sun_nyr4z3.svg"
          })`,
        }}
      ></Button>

      <Button 
        onClick={toggleMusic}
        className={`absolute top-20 left-4 w-12 h-12 bg-center bg-no-repeat bg-contain ${
          isMusicOn
            ? "bg-[url('https://res.cloudinary.com/elliepooh/image/upload/v1491889929/music_s7aiet.svg')]"
            : "bg-[url('https://res.cloudinary.com/elliepooh/image/upload/v1491890054/music-off_nrnsni.svg')]"
        }`}
      ></Button>

      {/* Audio */}
      <audio
        ref={audioRef}
        src="https://res.cloudinary.com/liza/video/upload/v1492853426/sheep_qr3tus.m4a"
        loop
      />
    </div>
  );
};

const Sheep: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [vAngle, setVAngle] = useState(0);
  const [mouseDown, setMouseDown] = useState(false);

  useEffect(() => {
    const handleMouseDown = () => setMouseDown(true);
    const handleMouseUp = () => setMouseDown(false);

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      setVAngle((prev) => prev + (mouseDown ? 0.05 : 0));
      const newY = Math.sin(vAngle) + 1.38;
      groupRef.current.position.y = Math.max(newY, 0.4);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh castShadow receiveShadow>
        <icosahedronGeometry args={[1.7, 0]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  );
};

export default World;
