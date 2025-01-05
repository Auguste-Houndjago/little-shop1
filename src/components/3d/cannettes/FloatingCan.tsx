"use client";

import { forwardRef, ReactNode } from "react";
import {  Float, PresentationControls } from "@react-three/drei";

import { SodaCan, SodaCanProps } from "@/components/3d/cannettes/SodaCan";
import { Group } from "three";

type FloatingCanProps = {
  flavor?: SodaCanProps["flavor"];
  floatSpeed?: number;
  rotationIntensity?: number;
  floatIntensity?: number;
  floatingRange?: [number, number];
  children?: ReactNode;
};

const FloatingCan = forwardRef<Group, FloatingCanProps>(
  (
    {
      flavor = "lemonLime",
      floatSpeed = 1.5,
      rotationIntensity = 4,
      floatIntensity = 1,
      floatingRange = [-0.1, 0.1],
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <group ref={ref} {...props}>
        <Float
          speed={floatSpeed}
          rotationIntensity={rotationIntensity}
          floatIntensity={floatIntensity}
          floatingRange={floatingRange}
          
        >
          {children}
 
      

        <PresentationControls
        global
        config={{ mass: 2, tension: 800 }}
        snap={{ mass: 4, tension: 800 }}
        // rotation={[0, 0.1, 0]}
        polar={[-Math.PI / 2.4, Math.PI / 2.4]}
        azimuth={[-Math.PI / 0.002, Math.PI / 0.02]}       
        >


                {children}
                <SodaCan flavor={flavor} scale={1} />
      </PresentationControls>


      </Float>
      </group>
    );
  },
);

FloatingCan.displayName = "FloatingCan";

export default FloatingCan;
