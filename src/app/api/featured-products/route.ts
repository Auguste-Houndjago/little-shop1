import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: {
        isArchived: false,
        isFeatured: true,
        images: {
          some: {},
        },
      },
      include: {
        images: true,
        category: {
          select: {
            name: true,
          },
        },
        color: true,
        size: true,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
