"use client"

import { DollarSign, PackageSearch, Weight, TrendingUp, Users } from 'lucide-react'
import { motion } from 'framer-motion'

interface StatsCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  trend?: number
}

const StatsCard = ({ title, value, icon, trend }: StatsCardProps) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 p-6"
  >
    <div className="flex justify-between">
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <h3 className="text-2xl font-bold mt-2">{value}</h3>
        {trend && (
          <div className="flex items-center mt-2 text-sm">
            <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
            <span className="text-green-500">+{trend}%</span>
          </div>
        )}
      </div>
      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
        {icon}
      </div>
    </div>
  </motion.div>
)

export default function StatsOverview({ stats }: { 
  stats: {
    revenue: number
    products: number
    sales: number
    customers: number
  }
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="Revenue Total"
        value={`$${stats.revenue.toLocaleString()}`}
        icon={<DollarSign className="w-6 h-6 text-primary" />}
        trend={12}
      />
      <StatsCard
        title="Produits Actifs"
        value={stats.products}
        icon={<PackageSearch className="w-6 h-6 text-primary" />}
      />
      <StatsCard
        title="Ventes"
        value={stats.sales}
        icon={<Weight className="w-6 h-6 text-primary" />}
        trend={8}
      />
      <StatsCard
        title="Clients"
        value={stats.customers}
        icon={<Users className="w-6 h-6 text-primary" />}
        trend={15}
      />
    </div>
  )
} 