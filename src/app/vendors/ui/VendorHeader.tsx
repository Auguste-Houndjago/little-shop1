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
    <div className="min-h-[200px] relative w-full overflow-hidden bg-background">
      {/* Wavy Background Pattern */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='%23374151' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: "100px auto",
        }}
      />

      <div className="relative z-10 px-2 py-4 sm:px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <VendorIcon
            businessName={vendor.businessName}
            businessLogo={vendor.businessLogo}
            isVerified={vendor.isVerified}
            address={vendor.address}
          />

          <p className="mt-2 text-sm sm:text-base text-muted-foreground text-center">
            {vendor.description}
          </p>

          <VendorStats vendorId={vendor.id} />

          {/* Action Buttons */}
          <div className="mt-6 sm:mt-8 flex justify-center gap-2 sm:gap-4">
            <Button size="sm" className="gap-2 sm:size-lg">
              <WhatsApp className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden sm:inline">Contact</span>
            </Button>
            <Link href="/orders">
              <Button variant="outline" size="sm" className="gap-2 sm:size-lg">
                <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden sm:inline">Orders</span>
              </Button>
            </Link>
            <Button variant="outline" size="sm" className="relative sm:size-lg">
              <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
              {unreadNotifications > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
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

