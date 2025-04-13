"use client"

import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import Hero from "@/components/3d/Hero";
import SodaView from "@/components/3d/cannettes/SodaView";

// import SodaView from "@/components/3d/cannettes/SodaView";

gsap.registerPlugin(ScrollTrigger);

export default  function Overlay() {
    const overlayRef = useRef<HTMLDivElement>(null)
    const [isVisible, setisVisible] = useState( 
        
        ()=> {
        return localStorage.getItem("overlayHidden") !== "true"; 

    }

);



useEffect(() => {

    
if (!isVisible) {
    localStorage.setItem("overlayHidden", "true" );

}


}, [isVisible]);


    useGSAP(() => {

  if (!overlayRef.current) return ;
    // gsap.set(overlayRef.current, {opacity:1} )

    gsap.to(overlayRef.current , 
        
        {y:-50,
         opacity: 0,
         z:0,
         duration:1,   
         ease:"power2.out",
         
         scrollTrigger:{
            trigger:overlayRef.current,

            start:"top top",
            end: "60% top",
            scrub:6,
            markers:true,
            once:true,
         },
        //  onComplete: () => {gsap.set(overlayRef.current, { display: "none" })},

        onComplete:()=> setisVisible(false)
        }
        

    )

      }, [isVisible]);

if (!isVisible) return null;

  return (
	<div id="overlayRef" ref={overlayRef} className="absolute overlay w-full h-svh z-[99] top-0 flex flex-col justify-center   ">
     <div className="absolute flex justify-center top-0 left-0 w-full h-full bg-[url('/images/hero/girl_01.jpeg')] bg-cover bg-center bg-no-repeat z-[-1]" />


    <Hero/>
    </div>
  )
}

