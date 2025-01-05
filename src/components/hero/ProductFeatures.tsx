'use client'
import { motion } from "framer-motion";
import FloatingCan  from "../3d/cannettes/FloatingCan";
import { Canvas } from "@react-three/fiber";

export const ProductFeatures = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative h-screen flex items-center justify-center"
    >
      <div className="absolute w-64 h-64">
        <Canvas>
          <FloatingCan  />
        </Canvas>
      </div>
      <div className="ml-72 max-w-md">
        <h2 className="text-3xl font-bold mb-4">Achetez en toute simplicité</h2>
        <motion.ul className="space-y-3">
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            🛍️ Large gamme de produits divers
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            ❤️ Créez votre Wishlist personnalisée
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            📍 Localisez les produits sur la carte
          </motion.li>
        </motion.ul>
      </div>
    </motion.div>
  );
};
