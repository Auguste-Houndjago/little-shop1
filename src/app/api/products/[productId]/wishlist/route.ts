import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { createClient } from '@/utils/supabase/server'

export async function POST(
  request: Request, 
  { params }: { params: { productId: string } }
) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const existingWishlist = await prisma.wishlist.findFirst({
      where: {
        userId: user.id
      },
      include: {
        products: true
      }
    })

    if (existingWishlist) {
      // Check if product is already in wishlist
      const isProductInWishlist = existingWishlist.products.some(
        product => product.id === params.productId
      )

      if (isProductInWishlist) {
        // Remove product from wishlist
        await prisma.wishlist.update({
          where: { id: existingWishlist.id },
          data: {
            products: {
              disconnect: { id: params.productId }
            }
          }
        })
        return NextResponse.json({ action: 'removed' })
      } else {
        // Add product to existing wishlist
        await prisma.wishlist.update({
          where: { id: existingWishlist.id },
          data: {
            products: {
              connect: { id: params.productId }
            }
          }
        })
        return NextResponse.json({ action: 'added' })
      }
    } else {
      // Create new wishlist with the product
      await prisma.wishlist.create({
        data: {
          userId: user.id,
          products: {
            connect: { id: params.productId }
          }
        }
      })
      return NextResponse.json({ action: 'added' })
    }
  } catch (error) {
    console.error('Error managing wishlist:', error)
    return NextResponse.json({ error: 'Failed to manage wishlist' }, { status: 500 })
  }
}