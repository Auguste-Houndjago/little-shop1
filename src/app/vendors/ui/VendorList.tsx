'use client'

import React, { useState, useEffect } from 'react'
import VendorIcon from '../ux/VendorIcon'


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

  if (isLoading) return <div>...</div>
  if (error) return <div>{error}</div>

  return (
    <div className="flex gap-4 items-center">
      {vendorProfiles.map((vendor) => (
        <VendorIcon key={vendor.id} {...vendor} />
      ))}
    </div>
  )
}
