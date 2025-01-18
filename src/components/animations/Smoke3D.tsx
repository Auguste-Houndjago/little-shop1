'use client'
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Smoke3D = () => {
  const smokeRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!smokeRef.current) return;

    let camera: THREE.PerspectiveCamera;
    let scene: THREE.Scene;
    let renderer: THREE.WebGLRenderer;
    let smokeParticles: THREE.Mesh[] = [];
    let clock: THREE.Clock;

    const init = () => {
      // Setup de base
      clock = new THREE.Clock();
      scene = new THREE.Scene();
      
      // Configuration du renderer
      renderer = new THREE.WebGLRenderer({ 
        canvas: smokeRef.current!,
        alpha: true 
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Configuration de la caméra
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
      camera.position.z = 1000;
      scene.add(camera);

      // Ajout de la lumière
      const light = new THREE.DirectionalLight(0xffffff, 0.5);
      light.position.set(-1, 0, 1);
      scene.add(light);

      // Création des particules de fumée
      const smokeTexture = new THREE.TextureLoader().load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/Smoke-Element.png');
      const smokeMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        map: smokeTexture,
        transparent: true
      });
      const smokeGeo = new THREE.PlaneGeometry(300, 300);

      // Génération des particules
      for (let p = 0; p < 150; p++) {
        const particle = new THREE.Mesh(smokeGeo, smokeMaterial);
        particle.position.set(
          Math.random() * 500 - 250,  // Position X aléatoire entre -250 et 250
          Math.random() * 500 - 250,  // Position Y aléatoire entre -250 et 250
          Math.random() * 1000 - 100  // Position Z aléatoire entre -100 et 900
        );
        particle.rotation.z = Math.random() * 360;
        scene.add(particle);
        smokeParticles.push(particle);
      }
    };

    // Animation de la fumée
    const evolveSmoke = (delta: number) => {
      smokeParticles.forEach(particle => {
        particle.rotation.z += delta * 0.2;
      });
    };

    // Boucle d'animation
    const animate = () => {
      const delta = clock.getDelta();
      requestAnimationFrame(animate);
      evolveSmoke(delta);
      renderer.render(scene, camera);
    };

    // Gestion du redimensionnement
    const handleResize = () => {
      if (!smokeRef.current) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    // Initialisation et démarrage
    init();
    animate();
    window.addEventListener('resize', handleResize);

    // Nettoyage
    return () => {
      window.removeEventListener('resize', handleResize);
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full opacity-20  h-full pointer-events-none bg-transparent">
      <canvas ref={smokeRef} className="w-full h-full overflow-visible" />
    </div>
  );
};

export default Smoke3D;