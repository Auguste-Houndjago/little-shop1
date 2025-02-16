"use client"

import { Bell, MapPin, ShoppingBag,CornerDownLeft,  PhoneIcon as WhatsApp } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import VendorIcon from "./VendorIcon"

interface VendorHeaderProps {
  vendor: {
    id: string
    businessName: string
    businessLogo: string
    description: string
    whatsappNumber: string
    banner: string | null
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
  // Determine background image with fallbacks
  const backgroundImage = `url('${vendor.banner || vendor.businessLogo || "/images/cover.webp"}')`

  return (
    <div 
      className="min-h-[200px] max-h-[350px] md:max-h-full relative w-full bg-gradient-to-br from-red-100 to-red-200"
      style={{
        backgroundImage,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-red-100/80 to-red-200/80" />

      <div className="relative z-10 pb-2 md:pb-4">
        <div className="mx-auto flex flex-col max-w-3xl">
          <div className="relative md:absolute pt-2 md:left-16 md:mt-10">
            <VendorIcon
              businessName={vendor.businessName}
              businessLogo={vendor.businessLogo}
              isVerified={vendor.isVerified}
        
              onLogoUpdate={()=>{}}
            />
          </div>

          <div className="md:mt-2">
            <h2 className=" text-xl text-center sm:text-2xl font-bold">
              {vendor.businessName}
            </h2>
            {vendor.address && (
              <p className="mt-1 flex items-center justify-center text-sm sm:text-base text-muted-foreground">
                <MapPin className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                {[vendor.address.city, vendor.address.region, vendor.address.country]
                  .filter(Boolean)
                  .join(", ")}
              </p>
            )}
          </div>

          <p className="my-1 text-sm sm:text-base text-gray-700 text-center [word-spacing:5px] max-w-xl mx-auto">
            {vendor.description}
          </p>

          <div className="md:my-2 flex justify-center gap-3">
            <Button 
              size="sm" 
              className="bg-white text-gray-800 hover:bg-gray-50 shadow-md transition-all duration-300 gap-2"
            >
              <WhatsApp className="h-4 w-4" />
              <span className="hidden sm:inline">Contact</span>
            </Button>
            
            <Link href="#">
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
              <Link href={"/vendors/notifications"}>
                <Bell className="h-4 w-4" />
                {unreadNotifications > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                    {unreadNotifications}
                  </span>
                )}
              </Link>
            </Button>
          </div>
          <div className="absolute top-1"> <Link href={"/"}> <CornerDownLeft className="w-4 h-4"/>  </Link> </div>
        </div>
      </div>
    </div>
  )
}