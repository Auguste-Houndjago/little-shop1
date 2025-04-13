"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextSplitter } from "@/components/3d/TextSpliter";
import { useGSAP } from "@gsap/react";
import { Bounded } from "./Bounded";

import HLogo from "../ux/HomeLogo";
import { useRef } from "react";

// Animation GSAP
gsap.registerPlugin(ScrollTrigger);

const Hero = (): JSX.Element => {
  const titleRef = useRef(null)
  const sloganRef = useRef(null)
  const featuresRef = useRef(null)

  // Animation GSAP
  useGSAP(() => {
    const introTl = gsap.timeline();
  
    introTl
      .set(".hero", { opacity: 1 })
      .set(".titleup", { y: 0 })
      .set(".titleh1", { mixBlendMode: "normal" })
      
      .from(".welcome", {
        // scale: 1.5,
        opacity: 0,
        ease: "power4.in",
        duration:1.5,
        delay: 0.5,
        stagger: 1,
      })
      .to(".welcome", {
        // scale: 1.5,
        opacity: 0,
        ease: "power2.in",
        duration:0.5,
        stagger: 1,
      } ,"-=0.2" )
      .from(".titleh1", {
        // scale: 1.2,
        y: 10,
        opacity: 0,
        ease: "power2.in",
        duration:0.8,
        stagger: 0.5,
      }, "-=0.2")
      .to(".titleh1", {

        scale: 1.2,
        letterSpacing: "20px",
        marginInline: "30px",
        ease: "power2.inOut",

        delay: 0.1,
      })
      .to(".titleh1", {

           y: -90, 
        mixBlendMode: "difference",
        ease: "power2.inOut",
duration:2,
        delay: 0.1,
      })
      
      .from(titleRef.current, {
        y: 30,
        opacity: 0,
        ease: "power2.out",
        duration: 1,
      }, "+=0.3")
      .from(sloganRef.current, {
        y: 20,
        opacity: 0,
        ease: "power2.out",
        duration: 1,
      }, "-=0.5")
      .from(featuresRef.current, {
        y: 15,
        opacity: 0,
        scale: 0.9,
        ease: "power2.out",
        duration: 0.8,
        stagger: 0.3,
      }, "-=0.5");
  }, []);

  return (
    <Bounded className="hero w-full flex flex-col">
      <div className="mt-12 lg:mt-8 ">


        <span className="hero-header text-xl relative left-0 lg:text-2xl font-black uppercase leading-[.8]">
          <TextSplitter
            text="Bienvenue sur"
            wordDisplayStyle="block"
            className="welcome text-white"
          />
        </span>

        <span className="titleup">
          <div className="title flex justify-center ml-4 md:ml-0 gap-x-2 md:gap-x-4 lg:gap-x-20">
            <h1 className="text-white titleh1 bg-transparent uppercase text-2xl md:text-4xl lg:text-6xl font-black leading-[.8] ">
              Smart
            </h1>
            <h1 className="text-white titleh1 uppercase text-2xl md:text-4xl lg:text-6xl font-black leading-[.8]">
              Shop
            </h1>
          </div>
          {/* absolute left-[48%] md:left-1/2 mt-24 md:mt-10 */}
            <div className="flex flex-col justify-center ml-8 md:ml-10 relative top-20 items-center">
              <HLogo/>
            </div>
        </span>

        <span className="mt-20 md:mt-0 ">
          <span className="text-white text-xl md:text-4xl lg:text-6xl font-black leading-[.8]">
            <h2 ref={titleRef} className="text-3xl font-bold   text-center mt-32 md:mt-18 mb-2 md:mb-4">
              Découvrez des produits uniques
            </h2>
          </span>
          <p ref={sloganRef} className="text-center text-white md:mb-12 text-xl md:text-4xl lg:text-6xl font-black leading-[.8]">
            L'élégance à portée de main
          </p>

        </span>
      </div>
    </Bounded>
  );
};

export default Hero;