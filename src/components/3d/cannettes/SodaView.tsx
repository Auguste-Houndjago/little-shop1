"use client";

import { Canvas } from "@react-three/fiber";
import SodaScene from "./AnimatedSodaScene";
import { Environment } from "@react-three/drei";

export default function SodaView() {
  return (
    <div className="h-screen w-full z-50">
      <Canvas
      camera={{ position: [0, 0, 10], fov: 45 }}
      style={{ width: "100vw", height: "100vh" }}
        shadows
      >

<spotLight position={[1, 10, 10]} angle={0.15} penumbra={1} />
          <Environment files={"/hdr/lobby.hdr"} environmentIntensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

 
      </Canvas>
    </div>
  );
}