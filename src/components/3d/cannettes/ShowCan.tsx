"use client";
import React, { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FloatingCan from "./FloatingCan";

gsap.registerPlugin(ScrollTrigger);

export default function ProductShowcase() {
  const containerRef = useRef(null);
  const canRef = useRef(null);

 


  return (
    <div ref={containerRef} id="container" className="relative min-h-screen">
      {/* Canvas couvrant toute la page */}
      <div className="fixed inset-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }} id="canvas3d"
        >
          <ambientLight intensity={1.5} />
          <group ref={canRef} position={[0, 0, 0]}>
            <FloatingCan />
          </group>
        </Canvas>
      </div>

      {/* Content Sections */}
      <div className="relative z-10 pt-24 px-8">
        <div className="content-block max-w-2xl mx-auto mb-32">
          <h2 className="text-4xl font-bold mb-6">Bold Thinking as Aegis</h2>
          <p className="text-xl mb-4 text-gray-700">
            Refresh your business identity with our innovative digital branding
            solutions.
          </p>
        </div>

        <div className="content-block max-w-2xl mx-auto mb-32 bg-gray-100 p-8 rounded-lg">
          <h2 className="text-4xl font-bold mb-6">Digital Products</h2>
          <p className="text-xl text-gray-700">
            Build solutions that adapt to modern consumer needs and drive
            engagement.
          </p>
        </div>

        <div className="content-block max-w-2xl mx-auto mb-32">
          <h2 className="text-4xl font-bold mb-6">Our Approach</h2>
          <p className="text-xl text-gray-700">
            Specialized in creating user-focused and visually stunning digital
            experiences.
          </p>
        </div>

        <div className="content-block max-w-2xl mx-auto mb-32 bg-gray-100 p-8 rounded-lg">
          <h2 className="text-4xl font-bold mb-6">Our Vision</h2>
          <p className="text-xl text-gray-700">
            Empower brands with cutting-edge solutions that redefine their
            digital presence.
          </p>
        </div>
      </div>
    </div>
  );
}
