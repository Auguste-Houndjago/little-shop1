import { ProductModal } from "@/components/products/ProductModal";
import React from "react";


const sampleProduct = {
  name: "Montre Connectée",
  description: "Une montre connectée élégante avec de nombreuses fonctionnalités pour le suivi de votre santé.",
  price: 199,
  images: [
    "/images/watch1.jpg",
    "/images/watch2.jpg",
    "/images/watch3.jpg",
  ],
  category: "Accessoires",
  whatsappLink: "1234567890", // Remplacez par un numéro valide pour tester.
  localisation: {
    lat: 48.8566,
    lng: 2.3522,
    address: "Paris, France",
  },
};

export default function App() {
  return (
    <div className="h-screen">
      <h1 className="text-2xl font-bold mb-6">Démonstration de ProductModal</h1>
      <ProductModal product={sampleProduct} />
    </div>
  );
}
