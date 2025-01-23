"use client";

import { Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useVendorNotifications } from "@/hooks/useVendorNotifications";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export default function NotificationBell({ vendorId }: { vendorId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const { unreadCount } = useVendorNotifications(vendorId);

  return (
    <div className="relative">
      <motion.button
        whileTap={{ scale: 0.95 }}
        className="relative p-2 rounded-full backdrop-blur-md bg-white/30 border border-white/20 
          hover:bg-white/40 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="w-5 h-5 text-gray-700" />
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 
              flex items-center justify-center text-xs text-white font-medium"
          >
            {unreadCount}
          </motion.div>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-2 w-80 rounded-xl backdrop-blur-md bg-white/30 
              border border-white/20 shadow-xl overflow-hidden"
          >
            <div className="p-4 border-b border-white/10">
              <h3 className="font-semibold text-gray-800">Notifications</h3>
            </div>
            <div className="max-h-[400px] overflow-y-auto">
              {/* Notification items would go here */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 