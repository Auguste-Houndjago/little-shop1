import { NextResponse } from 'next/server'
import { assignTagToProduct, removeTagFromProduct, getProductTags } from '@/app/vendors/vendor'

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const tags = await getProductTags(params.productId)
    return NextResponse.json(tags)
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function POST(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const { tagId } = await req.json()
    const product = await assignTagToProduct(params.productId, tagId)
    return NextResponse.json(product)
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const { tagId } = await req.json()
    const product = await removeTagFromProduct(params.productId, tagId)
    return NextResponse.json(product)
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
} 