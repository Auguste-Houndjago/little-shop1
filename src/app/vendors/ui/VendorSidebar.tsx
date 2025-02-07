"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  LayoutDashboard, Package, ShoppingCart, MessageSquare,
  Bell, Settings, Star, Users, BarChart, Archive, ChevronLeft, Badge
} from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/vendors",
    color: "text-sky-500",
  },
  {
    label: "Products",
    icon: Package,
    href: "/vendors/products",
    color: "text-violet-500",
  },
  {
    label: "Tag",
    icon: Badge,
    href: "/vendors/tag",
    color: "text-violet-200",
  },
  {
    label: "Orders",
    icon: ShoppingCart,
    href: "/vendors/orders",
    color: "text-pink-700",
  },
  {
    label: "Messages",
    icon: MessageSquare,
    href: "/vendors/messages",
    color: "text-green-700",
  },
  {
    label: "Reviews",
    icon: Star,
    href: "/vendors/reviews",
    color: "text-yellow-500",
  },
  {
    label: "Customers",
    icon: Users,
    href: "/vendors/customers",
    color: "text-orange-700",
  },
  {
    label: "Analytics",
    icon: BarChart,
    href: "#",
    // href: "/vendors/analytics",
    color: "text-blue-700",
  },
  {
    label: "Archive",
    icon: Archive,
    href: "#",
    // href: "/vendors/archive",
    color: "text-gray-700",
  },
  {
    label: "Notifications",
    icon: Bell,
    href: "/vendors/notifications",
    color: "text-rose-500",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/vendors/settings",
    color: "text-gray-700",
  },
];

export default function VendorSidebar() {
  const pathname = usePathname();
  const isSmallScreen = useMediaQuery("(max-width: 640px)", false); 
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.div
      initial={{ width: "16rem" }}
      animate={{
       
        width:  isCollapsed ? "5rem" : (isSmallScreen ? "10rem" : "16rem")  ,
  
      }}
      className="relative h-full bg-white/30 backdrop-blur-lg border-r border-white/20 shadow-xl rounded-md overflow-hidden"
    >
      {/* Bouton de toggle */}
      <button title="sidebar-toggle"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-5 p-1.5 rounded-md bg-white/50 backdrop-blur-sm border border-white/30 shadow-md hover:bg-white/70 transition-colors z-10"
      >
        <motion.div
          animate={{ rotate: isCollapsed ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronLeft className="w-4 h-4 text-gray-700" />
        </motion.div>
      </button>

      <div className="px-3 py-8 flex flex-col h-full">
        <div className="space-y-2">
          {routes.map((route) => (
            <div 
              key={route.href} 
              className="relative group"
            >
              <Link
                href={route.href}
                className={cn(
                  "relative flex items-center p-3 rounded-lg transition-all duration-300",
                  pathname === route.href 
                    ? "bg-white/50 backdrop-blur-sm" 
                    : "hover:bg-white/30 backdrop-blur-sm"
                )}
              >
                <motion.div
                  animate={{ 
                    width: isCollapsed ? "2rem" : "100%",
                    justifyContent: isCollapsed ? "center" : "flex-start" 
                  }}
                  className="flex items-center w-full"
                >
                  <route.icon className={cn(
                    "w-5 h-5 transition-transform duration-300",
                    route.color,
                    isCollapsed && "group-hover:scale-110"
                  )} />
                  
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="ml-3 text-sm font-medium text-gray-800"
                    >
                      {route.label}
                    </motion.span>
                  )}
                </motion.div>
              </Link>

              {/* Tooltip pour état réduit */}
              {isCollapsed && (
                <div className="absolute left-full ml-4 z-50 
                  bg-gray-800/80 backdrop-blur-sm 
                  text-white px-3 py-2 rounded-md text-sm 
                  opacity-0 group-hover:opacity-100 
                  transition-opacity duration-300 
                  pointer-events-none">
                  {route.label}
                </div>
              )}

              {/* Indicateur actif */}
              {pathname === route.href && (
                <motion.div
                  layoutId="activeRoute"
                  className="absolute inset-0 border-2 border-primary/50 rounded-lg pointer-events-none"
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}