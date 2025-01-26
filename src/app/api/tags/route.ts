import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a new tag
export async function POST(req: NextRequest) {
  try {
    const { name, category, description, userId } = await req.json();

    // Validate input
    if (!name) {
      return NextResponse.json({ error: 'Tag name is required' }, { status: 400 });
    }

    // Create tag
    const tag = await prisma.tag.create({
      data: {
        name,
        category: category || 'CUSTOM',
        description,
      }
    });

    return NextResponse.json(tag, { status: 201 });
  } catch (error) {
    console.error('Error creating tag:', error);
    return NextResponse.json({ error: 'Failed to create tag' }, { status: 500 });
  }
}

// Get tags (optionally filter by user or product)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get('productId');
    const userId = searchParams.get('userId');

    if (productId) {
      // Fetch tags for a specific product
      const product = await prisma.product.findUnique({
        where: { id: productId },
        include: { tags: true }
      });

      return NextResponse.json(product?.tags || [], { status: 200 });
    }

    if (userId) {
      // Note: Since tags are not directly linked to users, 
      // this would require additional logic depending on your requirements
      // For now, we'll return an empty array
      return NextResponse.json([], { status: 200 });
    }

    // Fetch all tags if no filter is provided
    const tags = await prisma.tag.findMany();
    return NextResponse.json(tags, { status: 200 });
  } catch (error) {
    console.error('Error fetching tags:', error);
    return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 });
  }
}

// Link tags to a product
export async function PUT(req: NextRequest) {
  try {
    const { productId, tagIds } = await req.json();

    if (!productId || !tagIds || !Array.isArray(tagIds)) {
      return NextResponse.json({ error: 'Product ID and Tag IDs are required' }, { status: 400 });
    }

    // Update product with tags
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        tags: {
          connect: tagIds.map((tagId: string) => ({ id: tagId }))
        }
      },
      include: { tags: true }
    });

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error('Error linking tags to product:', error);
    return NextResponse.json({ error: 'Failed to link tags to product' }, { status: 500 });
  }
}

// Create a product with tags
export async function PATCH(req: NextRequest) {
  try {
    const { title, description, price, userId, categoryId, colorId, sizeId, tagIds, ...otherProductData } = await req.json();

    // Validate required fields
    if (!title || !price || !userId || !categoryId || !colorId || !sizeId) {
      return NextResponse.json({ error: 'Missing required product fields' }, { status: 400 });
    }

    // Create product with optional tags
    const product = await prisma.product.create({
      data: {
        title,
        description,
        price,
        userId,
        categoryId,
        colorId,
        sizeId,
        ...otherProductData,
        tags: tagIds ? {
          connect: tagIds.map((tagId: string) => ({ id: tagId }))
        } : undefined
      },
      include: { tags: true }
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product with tags:', error);
    return NextResponse.json({ error: 'Failed to create product with tags' }, { status: 500 });
  }
}