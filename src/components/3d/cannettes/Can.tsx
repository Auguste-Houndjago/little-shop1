"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import FloatingCan from "@/components/3d/cannettes/FloatingCan";


const Can = () => {



  return (
    <Canvas className="fixed  inset-0 bg-transparent p-0 m-0 "
      camera={{ position: [0, 0, 10], fov: 45 }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <FloatingCan flavor="smartshop" scale={5} floatingRange={[-1.5,1.5]} rotationIntensity={0.1}  />
      {/* <OrbitControls /> */}
      <Environment files={"/hdr/lobby.hdr"} environmentIntensity={1.5} />
    </Canvas>
  );
};

export default Can;
