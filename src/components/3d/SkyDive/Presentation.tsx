import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const AIntroduction = () => {
  // Références pour les sections à animer
  const sectionRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Animation d'entrée pour chaque section
    gsap.fromTo(
      sectionRefs.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power2.out",
      }
    );
  }, []);

  const sections = [
    {
      id: "quality-products",
      title: "Produits de qualité",
      description:
        "Découvrez une large gamme de produits soigneusement sélectionnés pour répondre à vos besoins.",
      image: "/background1.jpg",
    },
    {
      id: "fast-delivery",
      title: "Livraisons rapides",
      description:
        "Nous livrons vos commandes en un temps record, partout dans le monde.",
      image: "/background1.jpg",
    },
    {
      id: "trusted-reviews",
      title: "Avis de confiance",
      description:
        "Lisez les avis de nos clients pour choisir les meilleurs produits.",
      image: "/background1.jpg",
    },
    {
      id: "support-service",
      title: "Support 24/7",
      description:
        "Notre équipe est disponible 24h/24 pour répondre à toutes vos questions.",
      image: "/background1.jpg",
    },
  ];

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center mb-6">
          Bienvenue sur notre site e-commerce
        </h1>
        <h2 className="text-center mb-4">smart shop</h2>
        <div className="space-y-20">
          {sections.map((section, index) => (
            <div
              key={index}
              id={section.id}
              ref={(el) => {
                if (el) sectionRefs.current[index] = el;
              }}
              className="relative flex items-center gap-8 sm:gap-16"
            >
              {/* Conteneur vide à gauche */}
              <div className="flex-1 hidden  sm:block bg-gray-200 rounded-lg h-40"></div>

              {/* Contenu principal */}
              <div className="flex  flex-col items-center sm:w-1/2 sm:items-start sm:flex-row gap-6">
                <img
                  src={section.image}
                  alt={section.title}
                  className={`w-52 h-52 object-cover rounded-lg shadow-lg sm:w-64 sm:h-64`}
                />
                <div className="text-center sm:text-left">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                    {section.title}
                  </h2>
                  <p className="text-gray-600">{section.description}</p>
                </div>
              </div>

              {/* Conteneur vide à droite */}
              <div className="flex-1  hidden sm:block bg-gray-200 rounded-lg h-40"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIntroduction;
