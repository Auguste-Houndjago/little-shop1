"use client";

import Scene from "./Scene";
import { View } from "@react-three/drei";
import { Bounded } from "../Bounded";
import SodaCanSwitcher from "../cannettes/SodaCanSwitcher";
import { SodaCan } from "../cannettes/SodaCan";
import { Suspense } from "react";





const SkyDive = () => {

  const sentences = [
    " ",
    " ",
    "Veunez",
    "Achetter ",
  ];
  return (

      <div className="relative w-full mt-20 ">
      <section className="skydive h-screen w-full">
        
        <View className="h-screen w-full">
          <Suspense fallback={null}>
            <Scene 
              sentences={sentences}
              flavor="lemonLime"
            />
          </Suspense>
          </View>
      </section>

      {/* Section suivante qui apparaîtra après le scroll */}
      <section className="bg-white min-h-screen w-full relative z-10">
        <h2 className="text-3xl font-bold p-8">Section Suivante</h2>
        <p className="p-8">
          Cette section apparaîtra après l'animation de la canette.
        </p>
      </section>
    </div>
  );
};

export default SkyDive;
