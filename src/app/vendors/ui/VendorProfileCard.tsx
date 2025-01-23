"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin, Phone, Mail, Edit, CheckCircle } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"

interface VendorProfileCardProps {
  vendor: {
    businessName: string
    businessLogo: string
    description: string
    whatsappNumber: string
    email: string
    isVerified: boolean
    address?: {
      city?: string
      country?: string
    }
  }
}

export default function VendorProfileCard({ vendor }: VendorProfileCardProps) {
  return (
    <Card className="overflow-hidden">
      {/* Cover Image */}
      <div className="h-32 bg-gradient-to-r from-primary/20 to-primary/10" />
      
      <div className="p-6">
        <div className="flex flex-col items-center -mt-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative"
          >
            <Image
              src={vendor.businessLogo}
              alt={vendor.businessName}
              width={100}
              height={100}
              className="rounded-full border-4 border-background shadow-xl"
            />
            {vendor.isVerified && (
              <Badge className="absolute -right-2 -bottom-2">
                <CheckCircle className="w-4 h-4 mr-1" />
                Vérifié
              </Badge>
            )}
          </motion.div>

          <h2 className="mt-4 text-2xl font-bold flex items-center gap-2">
            {vendor.businessName}
          </h2>

          <p className="mt-2 text-muted-foreground text-center max-w-md">
            {vendor.description}
          </p>

          <div className="mt-4 space-y-2 w-full max-w-md">
            {vendor.address && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{vendor.address.city}, {vendor.address.country}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="w-4 h-4" />
              <span>{vendor.whatsappNumber}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="w-4 h-4" />
              <span>{vendor.email}</span>
            </div>
          </div>

          <Button className="mt-6" variant="outline">
            <Edit className="w-4 h-4 mr-2" />
            Modifier le profil
          </Button>
        </div>
      </div>
    </Card>
  )
} 