import { NextResponse } from 'next/server'
import { getProductReviewsAndTags } from '@/app/vendors/vendor'
import { createClient } from '@/utils/supabase/server'

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const data = await getProductReviewsAndTags(params.productId)
    if (!data) {
      return new NextResponse('Product not found', { status: 404 })
    }
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error:', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
} 