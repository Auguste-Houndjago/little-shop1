'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { VerifiedIcon } from 'lucide-react'
import Link from 'next/link'

interface VendorIconProps {
  id: string
  businessName: string | null
  businessLogo: string | null
  isVerified: boolean
}

export default function VendorIcon({
  id,
  businessName,
  businessLogo,
  isVerified,
}: VendorIconProps) {
  return (
    <Link
      href={`/shop/${id}`}
      className="relative hover:opacity-80 transition-opacity"
    >
      <Avatar className="shadow-sm hover:border-2 hover:border-blue-100/60 shadow-blue-300">
        <AvatarImage src={businessLogo || "/default-logo.png"} alt={businessName || "Vendor"} />
        <AvatarFallback>{businessName?.charAt(0).toUpperCase() || "V"}</AvatarFallback>
      </Avatar>

      {isVerified && (
        <span className="absolute top-0 -right-2">
          <VerifiedIcon
            className="text-blue-400 dark:text-white bg-background rounded-full"
            size={15}
          />
        </span>
      )}
    </Link>
  )
}
