"use client";

import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";

import { Suspense, useRef } from "react";
import { Bounded } from "../Bounded";
import FloatingCan from "../cannettes/FloatingCan";

import { OrbitControls } from "@react-three/drei";
import AIntroduction from "./Presentation";

const SkyDive = () => {
  const containerRef = useRef(null);
  const canRef = useRef(null);


  const sentences = [

    "Veunez",
    "Achetter ",
  ];
  return (
    <div  ref={containerRef} id="container" className="relative  w-full mt-20  ">

 
  <div className="fixed  inset-0 ">
    <Canvas id="canvas3d" className="bg-transparent ">
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <Suspense fallback={null}>

        <Scene flavor={"smartshop"} sentences={sentences} />
      </Suspense>
    </Canvas>
  </div>
   
  <section id="section2" className="bg-white h-[400px] w-full relative z-10">
        <h2 className="text-3xl font-bold p-8 text-center">Section Suivante</h2>
        <p className="p-8">
          Cette section apparaîtra après l'animation de la canette.
        </p>
      </section>




      {/* Section suivante qui apparaîtra après le scroll */}
      <section className="bg-white min-h-screen w-full relative z-10">
        <h2 className="text-3xl font-bold p-8">Section Suivante</h2>
        <p className="p-8">
          Cette section apparaîtra après l'animation de la canette.
        </p>

      </section>

      <section className="bg-transparent min-h-screen w-full relative z-10">
        <h2 className="text-3xl font-bold p-8 text-center">Smart Shop</h2>
        <p className="p-8">
          Cette section apparaîtra après l'animation de la canette.
        </p>
      </section>
 <AIntroduction/>
    </div>
  );
};

export default SkyDive;
