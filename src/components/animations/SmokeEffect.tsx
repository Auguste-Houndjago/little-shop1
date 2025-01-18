'use client'
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const SmokeEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const text = "Harry Potter";
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    let camera: THREE.PerspectiveCamera;
    let scene: THREE.Scene;
    let renderer: THREE.WebGLRenderer;
    let smokeParticles: THREE.Mesh[] = [];
    let clock: THREE.Clock;

    const init = () => {
      clock = new THREE.Clock();
      
      renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current! });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
      camera.position.z = 1000;
      scene.add(camera);

      const light = new THREE.DirectionalLight(0xffffff, 0.5);
      light.position.set(-1, 0, 1);
      scene.add(light);

      // Création de la texture de fumée
      const smokeTexture = new THREE.TextureLoader().load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/Smoke-Element.png');
      const smokeMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        map: smokeTexture,
        transparent: true
      });
      const smokeGeo = new THREE.PlaneGeometry(300, 300);

      // Création des particules de fumée
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
      smokeParticles.forEach(particle => {
        particle.rotation.z += delta * 0.2;
      });
    };

    const animate = () => {
      const delta = clock.getDelta();
      requestAnimationFrame(animate);
      evolveSmoke(delta);
      renderer.render(scene, camera);
    };

    // Gestion du redimensionnement
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

    return () => {
      window.removeEventListener('resize', handleResize);
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="w-full h-screen bg-black overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          {text.split('').map((char, index) => (
            <span
              key={index}
              className="inline-block text-8xl font-['Finger_Paint'] text-transparent"
              style={{
                animation: `${index % 2 === 0 ? 'smoky' : 'smoky-mirror'} 5s ${3 + (index * 0.1)}s both`,
                textShadow: '0 0 0 whitesmoke'
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes smoky {
          60% {
            text-shadow: 0 0 40px whitesmoke;
          }
          to {
            transform: translate3d(15rem, -8rem, 0) rotate(-40deg) skewX(70deg) scale(1.5);
            text-shadow: 0 0 20px whitesmoke;
            opacity: 0;
          }
        }

        @keyframes smoky-mirror {
          60% {
            text-shadow: 0 0 40px whitesmoke;
          }
          to {
            transform: translate3d(18rem, -8rem, 0) rotate(-40deg) skewX(-70deg) scale(2);
            text-shadow: 0 0 20px whitesmoke;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default SmokeEffect;