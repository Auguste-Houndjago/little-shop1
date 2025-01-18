'use client'
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SmokeEffect = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const text = "Harry Potter";
  
  useEffect(() => {
    if (!canvasRef.current || !textRef.current) return;
    
    let camera: THREE.PerspectiveCamera;
    let scene: THREE.Scene;
    let renderer: THREE.WebGLRenderer;
    let smokeParticles: THREE.Mesh[] = [];
    let clock: THREE.Clock;
    let isAnimating = false;

    const init = () => {
      clock = new THREE.Clock();
      
      renderer = new THREE.WebGLRenderer({ 
        canvas: canvasRef.current!,
        alpha: true 
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
      camera.position.z = 1000;
      scene.add(camera);

      const light = new THREE.DirectionalLight(0xffffff, 0.5);
      light.position.set(-1, 0, 1);
      scene.add(light);

      const smokeTexture = new THREE.TextureLoader().load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/Smoke-Element.png');
      const smokeMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        map: smokeTexture,
        transparent: true,
        opacity: 0
      });
      const smokeGeo = new THREE.PlaneGeometry(300, 300);

      for (let p = 0; p < 150; p++) {
        const particle = new THREE.Mesh(smokeGeo, smokeMaterial);
        particle.position.set(
          Math.random() * 500 - 250,
          Math.random() * 500 - 250,
          Math.random() * 1000 - 100
        );
        particle.rotation.z = Math.random() * 360;
        scene.add(particle);
        smokeParticles.push(particle);
      }
    };

    const evolveSmoke = (delta: number) => {
      if (!isAnimating) return;
      smokeParticles.forEach(particle => {
        particle.rotation.z += delta * 0.2;
        const material = particle.material as THREE.MeshLambertMaterial;
        material.opacity = Math.min(material.opacity + delta * 0.2, 0.6);
      });
    };

    const animate = () => {
      const delta = clock.getDelta();
      requestAnimationFrame(animate);
      evolveSmoke(delta);
      renderer.render(scene, camera);
    };

    const handleResize = () => {
      if (!canvasRef.current) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    init();
    animate();
    window.addEventListener('resize', handleResize);

    // Configuration de GSAP ScrollTrigger
    const letters = textRef.current.children;
    
    gsap.set(letters, {
      opacity: 0,
      y: 100,
      textShadow: "none"
    });

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top center",
      onEnter: () => {
        isAnimating = true;
        
        gsap.to(letters, {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 1,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(letters, {
              delay: 1,
              duration: 3,
              stagger: 0.1,
              textShadow: "0 0 40px whitesmoke",
              transform: (index) => 
                index % 2 === 0 
                  ? "translate3d(15rem, -8rem, 0) rotate(-40deg) skewX(70deg) scale(1.5)"
                  : "translate3d(18rem, -8rem, 0) rotate(-40deg) skewX(-70deg) scale(2)",
              opacity: 0,
              ease: "power2.inOut"
            });
          }
        });
      },
      onLeaveBack: () => {
        isAnimating = false;
        gsap.set(letters, {
          opacity: 0,
          y: 100,
          textShadow: "none",
          transform: "none"
        });
      }
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      scene.clear();
      renderer.dispose();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen">
      <div className="h-screen bg-black overflow-hidden relative">
        <canvas ref={canvasRef} className="absolute inset-0 z-0" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div ref={textRef} className="text-center">
            {text.split('').map((char, index) => (
              <span
                key={index}
                className="inline-block text-8xl font-['Finger_Paint'] text-white"
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmokeEffect;