"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  MessageSquare,
  Bell,
  Settings,
  Star,
  Users,
  BarChart,
  Archive,
  ChevronLeft,
} from "lucide-react";

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
      href: "/vendors/analytics",
      color: "text-blue-700",
    },
    {
      label: "Archive",
      icon: Archive,
      href: "/vendors/archive",
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
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.div 
      initial={{ width: "16rem" }}
      animate={{ width: isCollapsed ? "5rem" : "16rem" }}
      className="relative h-full bg-white border-r shadow-sm"
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 p-1.5 rounded-full bg-white border shadow-sm hover:bg-gray-50 transition-colors"
      >
        <motion.div
          animate={{ rotate: isCollapsed ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronLeft className="w-4 h-4" />
        </motion.div>
      </button>

      <div className="px-3 py-8 flex flex-col h-full">
        <div className="space-y-2">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "relative flex items-center p-3 rounded-lg transition-all duration-300 group",
                pathname === route.href ? "bg-gray-100" : "hover:bg-gray-50",
              )}
            >
              <motion.div
                animate={{ 
                  width: isCollapsed ? "2rem" : "100%",
                  justifyContent: isCollapsed ? "center" : "flex-start" 
                }}
                className="flex items-center"
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
                    className="ml-3 text-sm font-medium text-gray-700"
                  >
                    {route.label}
                  </motion.span>
                )}
              </motion.div>

              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-6 invisible group-hover:visible bg-gray-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {route.label}
                </div>
              )}

              {/* Active indicator */}
              {pathname === route.href && (
                <motion.div
                  layoutId="activeRoute"
                  className="absolute inset-0 border-2 border-primary rounded-lg"
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                  }}
                />
              )}
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}