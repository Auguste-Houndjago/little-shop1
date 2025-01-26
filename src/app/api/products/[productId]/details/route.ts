import { NextResponse } from 'next/server'
import { getProductReviewsAndTags } from '@/app/vendors/vendor'

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const data = await getProductReviewsAndTags(params.productId)
    if (!data) {
      return new NextResponse('Product not found', { status: 404 })
    }
    return NextResponse.json(data)
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
} 