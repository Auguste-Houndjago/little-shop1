"use client";

import { Card } from "@/components/ui/card";
import { fetchVendorStats } from "@/lib/vendors";

import { useEffect, useState } from "react";

interface VendorStats {
  activeProducts: number;
  soldProducts: number;
  averageRating: number;
  completedOrders: number;
  pendingOrders: number;
}

interface VendorStatsProps {
  vendorId: string;
}

export default function VendorStats({ vendorId }: VendorStatsProps) {
  const [stats, setStats] = useState<VendorStats | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      const vendorStats = await fetchVendorStats(vendorId);
      setStats(vendorStats);
    };
    loadStats();
  }, [vendorId]);

  if (!stats) return null;

  return (
    <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-4">
      <Card className="p-1 sm:p-4 text-center">
        <h3 className="text-lg sm:text-2xl font-bold">{stats.activeProducts}</h3>
        <p className="text-xs sm:text-sm text-muted-foreground">Active Products</p>
      </Card>
      <Card className="p-1 sm:p-4 text-center">
        <h3 className="text-lg sm:text-2xl font-bold">{stats.soldProducts}</h3>
        <p className="text-xs sm:text-sm text-muted-foreground">Products Sold</p>
      </Card>
      <Card className="p-1 sm:p-4 text-center">
        <h3 className="text-lg sm:text-2xl font-bold">
          {stats.averageRating.toFixed(1)}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground">Rating</p>
      </Card>
      <Card className="p-1 sm:p-4 text-center">
        <div className="flex flex-col">
          <h3 className="text-lg sm:text-2xl font-bold">{stats.completedOrders}</h3>
          <p className="text-xs sm:text-sm text-muted-foreground">Completed Orders</p>
        </div>
        <div className="my-1 text-xs text-muted-foreground">
          {stats.pendingOrders} ----
        </div>
      </Card>
    </div>
  );
} 