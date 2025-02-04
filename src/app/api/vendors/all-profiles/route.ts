
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const vendorProfiles = await prisma.vendorProfile.findMany({
      select: {
        id: true,
        businessName: true,
        businessLogo: true
      }
    })

    return NextResponse.json(vendorProfiles)
  } catch (error) {
    console.error('Error fetching vendor profiles:', error)
    return NextResponse.json({ error: 'Failed to fetch vendor profiles' }, { status: 500 })
  }
}


