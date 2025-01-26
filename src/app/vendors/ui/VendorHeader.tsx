"use client"

import { Bell, ShoppingBag, PhoneIcon as WhatsApp } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

import VendorStats from "./VendorStats"
import VendorIcon from "./VendorIcon"

interface VendorHeaderProps {
  vendor: {
    id: string
    businessName: string
    businessLogo: string
    description: string
    whatsappNumber: string
    isVerified: boolean
    address: {
      country: string | null
      region: string | null
      city: string | null
    } | null
  }
  unreadNotifications: number
}

export default function VendorHeader({ vendor, unreadNotifications }: VendorHeaderProps) {
  return (
    <div className="min-h-[250px] relative w-full overflow-hidden bg-gradient-to-br from-red-100 to-red-200">
      {/* Fond géométrique triangulaire */}
      <div 
        className="absolute inset-0 w-full h-full opacity-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ef4444' fill-opacity='0.1'%3E%3Cpath d='M50 50.12L0 0h50l50 50-50 50z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 px-4 pt-6 pb-8">
        <div className="mx-auto max-w-3xl">
          {/* Cercle blanc derrière l'icône */}
          <div className="relative">

            <VendorIcon
              businessName={vendor.businessName}
              businessLogo={vendor.businessLogo}
              isVerified={vendor.isVerified}
              address={vendor.address}
            />
          </div>

          <p className="mt-4 text-sm sm:text-base text-gray-700 text-center max-w-xl mx-auto">
            {vendor.description}
          </p>

  

          {/* Action Buttons avec style modernisé */}
          <div className="mt-6 flex justify-center gap-3">
            <Button 
              size="sm" 
              className="bg-white text-gray-800 hover:bg-gray-50 shadow-md transition-all duration-300 gap-2"
            >
              <WhatsApp className="h-4 w-4" />
              <span className="hidden sm:inline">Contact</span>
            </Button>
            
            <Link href="/orders">
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-300 gap-2"
              >
                <ShoppingBag className="h-4 w-4" />
                <span className="hidden sm:inline">Orders</span>
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="relative bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-300"
            >
              <Bell className="h-4 w-4" />
              {unreadNotifications > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                  {unreadNotifications}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

