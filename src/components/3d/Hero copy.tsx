"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextSplitter } from "@/components/3d/TextSpliter";
import {Button} from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import { Bounded } from "./Bounded";
import { View } from "@react-three/drei";
import { Bubbles } from "./Bublles";
import Scene from "./MainScene";

// Animation GSAP
gsap.registerPlugin(ScrollTrigger);

const Hero = (): JSX.Element => {
  const isDesktop = true; 

  // Animation GSAP
  useGSAP(() => {
    const introTl = gsap.timeline();

    introTl
      .set(".hero", { opacity: 1 })
      .from(".welcome", {
        scale: 1.5,
        opacity: 0,
        ease: "power4.in",
        delay: 0.5,
        stagger: 1,
      })
      .from(
        ".hero-subheading",
        {
          opacity: 0,
          y: 30,
        },
        "+=.8",
      )
      .from(".hero-body", {
        opacity: 0,
        y: 10,
      })
      .from(".hero-button", {
        opacity: 0,
        y: 10,
        duration: 0.6,
      });

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    scrollTl
      .fromTo(
        "body",
        {
          backgroundColor: "#FEE832",
        },
        {
          backgroundColor: "#F6BFE4",
          overwrite: "auto",
        },
        1,
      )
      .from(".text-side-heading .split-char", {
        scale: 1,
        y: 40,
        rotate: -25,
        opacity: 0,
        stagger: 0.1,
        ease: "back.out(3)",
        duration: 0.5,
      })
      .from(".text-side-body", {
        y: 20,
        opacity: 0,
      });
  }, []);

  return (
    <Bounded className="hero opacity-0" >
  
        {/* <View
          className="hero-scene pointer-events-none sticky z-50 h-screen w-screen"
        
        >
        <Scene />
        <Bubbles count={300} speed={2} repeat={true} />
      </View> */}
  
      <div className="grid">
        {/* <div className="grid h-screen place-items-center">
          <div className="grid auto-rows-min place-items-center text-center">
            <h1 className="hero-header text-7xl font-black uppercase leading-[.8] text-[#EF9709] md:text-[9rem] lg:text-[11rem]">
              <TextSplitter
                text="Bienvenue sur"
                wordDisplayStyle="block"
                className="hero-header-word"
              />
                   <TextSplitter
                text=" smart shop"
                wordDisplayStyle="block"
                className="hero-header-word text-5xl text-blue-600 md:text-[9rem] lg:text-[11rem] uppercase"
              />
            </h1>
       
            <div className="hero-subheading mt-12 text-5xl font-semibold text-[#d741a7] lg:text-6xl">
              Votre marketplace, réinventée pour répondre à tous vos besoins.
            </div>
            <div className="hero-body text-2xl font-normal px-20 text-[#4c494b]">
            <TextSplitter
                text=" Achetez et vendez en toute simplicité"
                wordDisplayStyle="inline-block"
                className="hero-header-word text-blue-600 md:text-[9rem] lg:text-[4rem] uppercase"
              />
            </div>
 
            <Button
        
              className="hero-button mt-12"
            >
                here
            </Button>
          </div>
        </div>
        <div className="text-side relative z-[80] grid h-screen items-center gap-4 md:grid-cols-2">
          <img
            className="w-full md:hidden"
            src="/placeholder-image.jpg"
            alt="Illustration"
          />
          <div>
            <h2 className="text-side-heading text-balance text-6xl font-black uppercase text-[#3a1772] lg:text-8xl">
              <TextSplitter text="Tout ce dont vous avez besoin, au même endroit." />
            </h2>
            <div className="text-side-body mt-4 max-w-xl text-balance text-xl font-normal text-[#3a1772]">
              Rejoignez une communauté de milliers d'acheteurs et de vendeurs passionnés. Profitez de nos fonctionnalités avancées pour transformer votre expérience d'achat ou de vente.
            </div>
          </div>
        </div> */}
 <span className="hero-header text-xl lg:text-2xl font-black uppercase leading-[.8]   ">
              <TextSplitter
                text="Bienvenue sur"
                wordDisplayStyle="block"
                className="welcome text-white"
              />
                   <TextSplitter
                text=" smart shop"
                wordDisplayStyle="inline-block"
                className="hero-header-word mt-4  uppercase"
              />
            </span>

      </div>

    </Bounded>
  );
};

export default Hero;
