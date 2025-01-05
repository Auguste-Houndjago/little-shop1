'use client'
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ShoppingCart, Heart, Package, ArrowRight, Star, Clock, Shield, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';

const WelcomePage: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: false,
      mirror: true,
      offset: 100,
    });
  }, []);

  const featuredProducts = [
    {
      id: 1,
      name: "Sneakers Premium",
      price: "129.99€",
      rating: 4.8,
      image: "/api/placeholder/300/300"
    },
    {
      id: 2,
      name: "Sac Fashion",
      price: "89.99€",
      rating: 4.6,
      image: "/api/placeholder/300/300"
    },
    {
      id: 3,
      name: "Montre Élégante",
      price: "199.99€",
      rating: 4.9,
      image: "/api/placeholder/300/300"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section Animée */}
      <section className="h-screen relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-[size:200%] animate-[gradient_8s_ease-in-out_infinite]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
        
        <div className="relative h-full flex items-center justify-center px-4">
          <div className="text-center">
            <div 
              data-aos="zoom-in"
              data-aos-duration="1500"
              className="mb-6"
            >
              <Sparkles size={48} className="text-white/80 mx-auto animate-pulse" />
            </div>
        
            <h1 
              data-aos="fade-up"
              data-aos-duration="1000"
              className="text-7xl font-bold text-white mb-8"
            >
              Bienvenue sur  <span className='block text-5xl text-black'>Litle - Shop</span>
            </h1>
            
            <div 
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-duration="1000"
              className="space-y-8"
            >
              <p className="text-2xl text-white/90">Commencez votre voyage shopping exclusif</p>
              
              <button className="group bg-white text-purple-600 px-10 py-4 rounded-full font-bold hover:bg-purple-50 transition-all duration-300 transform hover:scale-105">
                <span className="flex items-center gap-3">
                  Découvrir nos produits
                  <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section Avantages avec Rotation 3D */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <h2 
            data-aos="flip-up"
            className="text-4xl font-bold text-center mb-16"
          >
            Vos Avantages Premium
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: ShoppingCart, title: "Livraison Gratuite", desc: "Sur toutes vos commandes dès 50€" },
              { icon: Heart, title: "Points Fidélité x2", desc: "Doublez vos points ce mois-ci" },
              { icon: Package, title: "Retours Gratuits", desc: "30 jours pour changer d'avis" }
            ].map((item, index) => (
              <div
                key={index}
                data-aos="flip-left"
                data-aos-delay={index * 200}
                data-aos-duration="1500"
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 transform -skew-y-3 group-hover:skew-y-0 transition-transform duration-500 rounded-xl" />
                <div className="relative bg-white p-8 rounded-xl transform hover:scale-105 transition-transform duration-500 hover:shadow-2xl">
                  <item.icon size={48} className="text-purple-600 mb-6 transform group-hover:rotate-12 transition-transform duration-500" />
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Produits avec Animation Cascade */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div 
          data-aos="fade-up"
          data-aos-duration="1000"
          className="max-w-6xl mx-auto px-4"
        >
          <h2 className="text-4xl font-bold text-center mb-16">Sélection Exclusive</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                data-aos="fade-up"
                data-aos-delay={index * 300}
                data-aos-duration="1500"
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-72 object-cover transform transition-transform duration-700 group-hover:scale-110"
                    />
                    <Button className="absolute top-4 right-4 bg-white/90 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <Heart className="text-purple-600 hover:fill-purple-600 transition-colors duration-300" size={20} />
                    </Button>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">{product.rating}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                    <p className="text-purple-600 font-bold text-2xl mb-4">{product.price}</p>
                    <button className="w-full bg-purple-600 text-white py-3 rounded-lg transform hover:translate-y-[-2px] hover:shadow-lg transition-all duration-300">
                      Ajouter au panier
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Garanties Flottante */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Clock, title: "Livraison Express", desc: "En 24h/48h" },
              { icon: Shield, title: "Paiement Sécurisé", desc: "Transactions cryptées" },
              { icon: Star, title: "Service VIP", desc: "Support 24/7" }
            ].map((item, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 200}
                data-aos-duration="1200"
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-xl transform group-hover:scale-110 transition-transform duration-500 rounded-xl" />
                <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-xl hover:shadow-xl transition-all duration-500">
                  <item.icon size={40} className="text-purple-600 mb-4 animate-bounce" />
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final Animé */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-[size:200%] animate-[gradient_8s_ease-in-out_infinite]" />
        
        <div 
          data-aos="zoom-in-up"
          data-aos-duration="1500"
          className="relative max-w-4xl mx-auto text-center px-4"
        >
          <h2 className="text-5xl font-bold text-white mb-8">
            -10% sur votre première commande
          </h2>
          <p className="text-2xl text-white/90 mb-12">
            Code promo : BIENVENUE10
          </p>
          <button className="group bg-white text-purple-600 px-12 py-5 rounded-full font-bold text-lg hover:bg-purple-50 transform hover:scale-110 transition-all duration-300">
            <span className="flex items-center gap-3">
              Commencer mon shopping
              <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
            </span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default WelcomePage;