import { NextResponse } from 'next/server'
import { assignTagToProduct, removeTagFromProduct, getProductTags } from '@/app/vendors/vendor'
import { createClient } from '@/utils/supabase/server'

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

export async function GETTags(
  request: Request, 
  { params }: { params: { productId: string } }
) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const product = await prisma.product.findUnique({
      where: { 
        id: params.productId,
        userId: user.id  
      },
      include: {
        tags: true
      }
    });

    if (!product) {
      return new NextResponse('Product not found', { status: 404 });
    }

    return NextResponse.json(product.tags || []);
  } catch (error) {
    console.error('Error fetching product tags:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}