import React from 'react';
import Can from './Can';

const ParallaxSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Can />
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Bienvenue chez Smart Shop
          </h2>
          
          <p className="text-xl text-gray-800 mb-8">
            Découvrez une sélection variée de produits 
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-4 bg-white/90 rounded-lg shadow-lg">
              <h3 className="font-bold mb-2">Produits de Qualité</h3>
              <p>Une large gamme sélectionnée avec soin.</p>
            </div>
            <div className="p-4 bg-white/90 rounded-lg shadow-lg">
              <h3 className="font-bold mb-2">Livraison Rapide</h3>
              <p>Recevez vos commandes en un temps record.</p>
            </div>
            <div className="p-4 bg-white/90 rounded-lg shadow-lg">
              <h3 className="font-bold mb-2">Prix Compétitifs</h3>
              <p>Des offres imbattables sur tous nos produits.</p>
            </div>
          </div>
          
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all">
            Explorer la Boutique
          </button>
        </div>
      </div>
    </section>
  );
};

export default ParallaxSection;
