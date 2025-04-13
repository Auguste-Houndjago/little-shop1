'use client'

import React, { useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { SodaCan, SodaCanProps } from './SodaCan';
import { Button } from '@/components/ui/button';
import FloatingCan from './FloatingCan';

type FlavorType = NonNullable<SodaCanProps['flavor']>;

interface SodaCanSwitcherProps {
  autoRotate?: boolean;
}

const RotatingCan: React.FC<{ flavor: FlavorType; autoRotate?: boolean }> = ({ flavor, autoRotate }) => {
  const [rotationY, setRotationY] = useState(0);

  useFrame((state, delta) => {
    if (autoRotate) {
      setRotationY((prev) => prev + delta * 0.5);
    }
  });

  return <FloatingCan flavor={flavor} rotation-y={rotationY} />;
};

const flavorNames: Record<FlavorType, string> = {
  smartshop:"smart-shop",
  lemonLime: "Citron-Lime",
  grape: "Raisin",
  blackCherry: "Cerise Noire",
  strawberryLemonade: "Citronnade aux Fraises",
  watermelon: "Pastèque"
};

export default function SodaCanSwitcher({ autoRotate = false }: SodaCanSwitcherProps) {
  const [currentFlavor, setCurrentFlavor] = useState<FlavorType>('lemonLime');
  const [rotation, setRotation] = useState(0);

  const handleFlavorChange = (newFlavor: FlavorType) => {
    setRotation(rotation + Math.PI);
    setCurrentFlavor(newFlavor);
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full h-[70vh] relative">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.01} />
          <spotLight position={[1, 10, 10]} angle={0.15} penumbra={1} />
          <RotatingCan flavor={currentFlavor} autoRotate={autoRotate} />
          <OrbitControls/>
          <Environment files={"/hdr/lobby.hdr"} environmentIntensity={1.5} />
        </Canvas>
      </div>

      <div className="flex flex-wrap gap-2 p-4 justify-center">
        {(Object.entries(flavorNames) as [FlavorType, string][]).map(([flavorKey, flavorLabel]) => (
          <Button
            key={flavorKey}
            onClick={() => handleFlavorChange(flavorKey)}
            className="min-w-32"
          >
            {flavorLabel}
          </Button>
        ))}
      </div>
    </div>
  );
}