
import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request, 
  { params }: { params: { productId: string } }
) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Get the query parameters for tagId
    const { searchParams } = new URL(request.url);
    const tagId = searchParams.get('tagId');

    if (!tagId) {
      return new NextResponse('Tag ID is required', { status: 400 });
    }

    // Fetch tag certifications
    const tagCertifications = await prisma.tagCertification.findMany({
      where: {
        tagId,
        productId: params.productId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar_url: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(tagCertifications);
  } catch (error) {
    console.error('Error fetching tag certifications:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}