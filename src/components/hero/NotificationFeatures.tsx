'use client'
import { motion } from "framer-motion";
import  SodaCanSwitcher  from "../3d/cannettes/SodaCanSwitcher";
import { Canvas } from "@react-three/fiber";

export const NotificationFeatures = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative h-screen flex items-center justify-center"
    >
      <div className="absolute w-64 h-64">
        <Canvas>
          <SodaCanSwitcher autoRotate />
        </Canvas>
      </div>
      <div className="ml-72 max-w-md">
        <h2 className="text-3xl font-bold mb-4">Restez connecté</h2>
       
        <motion.ul className="space-y-3">
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            🔔 Notifications en temps réel
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            💬 Messagerie intégrée
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            ⭐ Système d'avis et évaluations
          </motion.li>
        </motion.ul>
      </div>
    </motion.div>
  );
};
