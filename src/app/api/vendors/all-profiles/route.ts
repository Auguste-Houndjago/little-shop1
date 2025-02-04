import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const vendorProfiles = await prisma.vendorProfile.findMany({
      select: {
        id: true,
        businessName: true,
        businessLogo: true,
        description: true,
        whatsappNumber: true,
        createdAt: true,
        address: {
          select: {
            country: true,
            region: true,
            city: true,
          }
        },
        user: {
          select: {
            products: {
              where: {
                isArchived: false
              },
              take: 1,
              select: {
                id: true
              }
            }
          }
        }
      },
      where: {
        user: {
          products: {
            some: {
              isArchived: false
            }
          }
        }
      }
    })

    // Transform the data to ensure all expected fields are present
    const transformedProfiles = vendorProfiles.map(vendor => ({
      id: vendor.id,
      businessName: vendor.businessName || '',
      businessLogo: vendor.businessLogo,
      description: vendor.description,
      whatsappNumber: vendor.whatsappNumber,
      createdAt: vendor.createdAt,
      address: vendor.address ? {
        country: vendor.address.country || '',
        region: vendor.address.region || '',
        city: vendor.address.city || ''
      } : null,
      hasProducts: vendor.user.products.length > 0
    }))

    return NextResponse.json(transformedProfiles)
  } catch (error) {
    console.error('Error fetching vendor profiles:', error)
    return NextResponse.json({ error: 'Failed to fetch vendor profiles' }, { status: 500 })
  }
}