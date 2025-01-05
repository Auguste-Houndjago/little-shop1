'use client'

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AosAnimate: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200, 
      offset: 50, 
    });
  }, []);

  return (
    <div className="flex flex-col justify-center gap-6 py-10 px-10">
      <div
        className="w-full h-screen flex items-center justify-center bg-blue-500 text-white text-2xl font-bold rounded-lg shadow-lg"
        data-aos="fade-up"
      >
        1
      </div>
      <div
        className="w-1/2 h-40 flex items-center justify-center bg-green-500 text-white text-2xl font-bold rounded-lg shadow-lg"
        data-aos="fade-down"
      >
        2
      </div>
      <div
        className="w-full h-40 flex items-center justify-center bg-red-500 text-white text-2xl font-bold rounded-lg shadow-lg"
        data-aos="fade-right"
      >
        3
      </div>
      <div
        className="w-1/2 h-40 flex items-center justify-center bg-yellow-500 text-white text-2xl font-bold rounded-lg shadow-lg"
        data-aos="fade-left"
      >
        4
      </div>
      <div
        className="w-full h-40 flex items-center justify-center bg-purple-500 text-white text-2xl font-bold rounded-lg shadow-lg"
        data-aos="zoom-in"
      >
        5
      </div>
      <div
        className="w-full h-40 flex items-center justify-center bg-pink-500 text-white text-2xl font-bold rounded-lg shadow-lg"
        data-aos="zoom-out"
      >
        6
      </div>
    </div>
  );
};

export default AosAnimate;
