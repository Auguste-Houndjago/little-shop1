'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import { VerifiedIcon } from 'lucide-react'
import React, { useState, useEffect } from 'react'

interface VendorProfile {
  id: string
  businessName: string | null
  businessLogo: string | null
  isVerified: boolean
}

export default function VendorList() {
  const [vendorProfiles, setVendorProfiles] = useState<VendorProfile[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchVendorProfiles = async () => {
      try {
        const response = await fetch('/api/vendors/all-profiles')

        if (!response.ok) {
          throw new Error('Failed to fetch vendor profiles')
        }

        const data = await response.json()
        setVendorProfiles(data)
        setIsLoading(false)
      } catch (err) {
        console.error('Error fetching vendor profiles:', err)
        setError('Impossible de charger les profils des vendeurs')
        setIsLoading(false)
      }
    }

    fetchVendorProfiles()
  }, [])

  if (isLoading) {
    return <div>...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className="flex gap-4 items-center">
      {vendorProfiles.map((vendor) => (
        <Link
          href={`/shop/${vendor.id}`}
          key={vendor.id}
          className="relative hover:opacity-80 transition-opacity"
        >
          <Avatar className="shadow-sm hover:border-2 hover:border-blue-100/60 shadow-blue-300">
            <AvatarImage src={vendor.businessLogo || "/default-logo.png"} alt={vendor.businessName || "Vendor"} />
            <AvatarFallback>{vendor.businessName?.charAt(0).toUpperCase() || "V"}</AvatarFallback>
          </Avatar>
          
          {vendor.isVerified && (
   <span className="absolute top-0 -right-2">
   <VerifiedIcon className="text-blue-400 dark:text-white  bg-background rounded-full" size={15} />
 </span>
          )}
        </Link>
      ))}
    </div>
  )
}
