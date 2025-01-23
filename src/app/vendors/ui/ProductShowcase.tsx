"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Share2, Star } from "lucide-react";

interface ProductShowcaseProps {
  product: {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    rating: number;
    likes: number;
  };
}

export default function ProductShowcase({ product }: ProductShowcaseProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative rounded-xl overflow-hidden backdrop-blur-md 
        bg-white/30 border border-white/20 shadow-xl"
    >
      <div className="relative aspect-square">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 
          group-hover:opacity-100 transition-opacity">
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
            <div>
              <h3 className="text-white font-semibold">{product.title}</h3>
              <p className="text-white/90 font-medium">${product.price}</p>
            </div>
            <div className="flex gap-2">
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-white/20 backdrop-blur-sm 
                  hover:bg-white/30 transition-colors"
              >
                <Heart className="w-4 h-4 text-white" />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-white/20 backdrop-blur-sm 
                  hover:bg-white/30 transition-colors"
              >
                <Share2 className="w-4 h-4 text-white" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 
        rounded-full bg-white/20 backdrop-blur-sm">
        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        <span className="text-sm font-medium text-white">{product.rating}</span>
      </div>
    </motion.div>
  );
} 