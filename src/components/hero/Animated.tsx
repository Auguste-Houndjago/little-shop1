'use client'
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Anime2: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center bg-blue-500 text-white">
        <div 
          data-aos="fade-up"
          className="text-center"
        >
          <h1 className="text-6xl font-bold mb-4">Bienvenue</h1>
          <p className="text-xl">Scrollez pour découvrir les animations</p>
        </div>
      </section>

      {/* Cards Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            data-aos="fade-right"
            data-aos-delay="100"
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4">Carte 1</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>

          <div 
            data-aos="fade-up"
            data-aos-delay="200"
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4">Carte 2</h2>
            <p>Consectetur adipisicing elit lorem ipsum dolor sit amet.</p>
          </div>

          <div 
            data-aos="fade-left"
            data-aos-delay="300"
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4">Carte 3</h2>
            <p>Sit amet consectetur adipisicing elit lorem ipsum dolor.</p>
          </div>
        </div>
      </section>

      {/* Image Section */}
      <section className="py-20 bg-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <div 
            data-aos="zoom-in"
            className="aspect-video bg-gray-300 rounded-lg"
          >
            <img 
              src="/api/placeholder/800/450" 
              alt="placeholder" 
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div 
              data-aos="flip-left"
              data-aos-duration="1200"
              className="space-y-4"
            >
              <h3 className="text-3xl font-bold">Fonctionnalité 1</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, quisquam.</p>
            </div>

            <div 
              data-aos="flip-right"
              data-aos-duration="1200"
              data-aos-delay="200"
              className="space-y-4"
            >
              <h3 className="text-3xl font-bold">Fonctionnalité 2</h3>
              <p>Consectetur adipisicing elit lorem ipsum dolor sit amet voluptates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-blue-500 text-white">
        <div 
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
          className="max-w-2xl mx-auto text-center px-4"
        >
          <h2 className="text-4xl font-bold mb-8">Contactez-nous</h2>
          <p className="text-xl mb-8">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <button className="bg-white text-blue-500 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors">
            En savoir plus
          </button>
        </div>
      </section>
    </div>
  );
};

export default Anime2;