"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import FloatingCan from "@/components/3d/cannettes/FloatingCan";

const CanvasWrapper = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 45 }}
      style={{ width: "100vw", height: "100vh" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <FloatingCan flavor="lemonLime" />
      <OrbitControls />
    </Canvas>
  );
};

export default CanvasWrapper;
