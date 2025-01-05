'use client'
import { motion } from "framer-motion";
import { SodaCan } from "../3d/cannettes/SodaCan";
import { Canvas } from "@react-three/fiber";

export const SellerFeatures = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative h-screen flex items-center justify-center bg-gray-50"
    >
      <div className="mr-72 max-w-md">
        <h2 className="text-3xl font-bold mb-4">Gérez votre boutique</h2>
        <motion.ul className="space-y-3">
          <motion.li
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            🏪 Créez votre profil vendeur professionnel
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            📱 Intégration WhatsApp pour la communication
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            📊 Suivez vos commandes et avis clients
          </motion.li>
        </motion.ul>
      </div>
      <div className="absolute w-64 h-64">
        <Canvas>
          <SodaCan />
          {/* rotation={[0, -Math.PI / 4, 0]} */}
        </Canvas>
      </div>
    </motion.div>
  );
};
