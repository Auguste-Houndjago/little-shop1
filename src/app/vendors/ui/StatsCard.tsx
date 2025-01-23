"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: string;
}

export default function StatsCard({ title, value, icon: Icon, trend, color = "rose" }: StatsCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`relative overflow-hidden rounded-xl backdrop-blur-md bg-white/30 border border-white/20 shadow-xl
        before:absolute before:inset-0 before:w-full before:h-full before:bg-gradient-to-r 
        before:from-${color}-500/20 before:to-transparent before:opacity-60`}
    >
      <div className="relative p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <div className={`p-2 rounded-lg bg-${color}-500/10`}>
            <Icon className={`w-5 h-5 text-${color}-600`} />
          </div>
        </div>
        
        <div className="flex items-end justify-between">
          <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
          {trend && (
            <div className={`flex items-center space-x-1 text-sm ${
              trend.isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              <span>{trend.isPositive ? '↑' : '↓'}</span>
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
} 