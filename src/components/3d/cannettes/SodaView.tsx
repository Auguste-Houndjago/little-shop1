"use client";

import { Canvas } from "@react-three/fiber";

import { Environment } from "@react-three/drei";
import SodaScene from "../SkyDive/SodaScene";

export default function SodaView() {
  return (
    <div id="sodaView" className="h-88   w-full ">
      <Canvas
      camera={{ position: [0, 0, 10], fov: 45 }}
      style={{ width: "100vw", height: "100vh" }}
        shadows
      >

<spotLight position={[1, 10, 10]} angle={0.15} penumbra={1} />
<SodaScene flavor="smartshop"/>
          <Environment files={"/hdr/lobby.hdr"} environmentIntensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

 
      </Canvas>
    </div>
  );
}