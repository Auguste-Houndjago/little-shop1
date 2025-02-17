"use client"

import HLogo from "@/components/ux/HomeLogo";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export default  function Overlay() {
    const overlayRef = useRef<HTMLDivElement>(null)
    const [isVisible, setisVisible] = useState( true
        
    //     ()=> {
    //     return localStorage.getItem("overlayHidden") !== "true"; 

    // }


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
            end: "40% top",
            scrub:2,
            markers:true,
            // once:true,
         },
        //  onComplete: () => {gsap.set(overlayRef.current, { display: "none" })},
        // onComplete:()=> setisVisible(false)
        }
        

    )

      }, [isVisible]);

if (!isVisible) return null;

  return (
	<div ref={overlayRef} className="absolute overlay w-full h-screen z-[99] top-0 flex flex-col justify-center items-center bg-[linear-gradient(360deg,#e8e8e8_50%,#E5E7EB_50%,#6B7280_100%)]  ">
      <h1 className="my-4 text-2xl font-bold">Bienvenue sur smart</h1>
        <HLogo/>
    </div>
  )
}

