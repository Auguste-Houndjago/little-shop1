"use client";

import { forwardRef, ReactNode } from "react";
import {  Float, PresentationControls } from "@react-three/drei";


import { Group } from "three";

type FloatingCanProps = {

  floatSpeed?: number;
  rotationIntensity?: number;
  floatIntensity?: number;
  floatingRange?: [number, number];
  children?: ReactNode;
};

const FloatingModel = forwardRef<Group, FloatingCanProps>(
  (
    {

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
 
      



      </Float>
      </group>
    );
  },
);

FloatingModel.displayName = "FloatingModel";

export default FloatingModel;
