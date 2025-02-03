import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Parse request body
    const { tagId, productId } = await req.json();

    // Validate input
    if (!tagId || !productId) {
      return new NextResponse('Tag ID and Product ID are required', { status: 400 });
    }

    // Check if the tag and product exist
    const [existingTag, existingProduct] = await Promise.all([
      prisma.tag.findUnique({
        where: { id: tagId },
        include: { 
          certifications: {
            where: { productId }
          }
        }
      }),
      prisma.product.findUnique({
        where: { id: productId },
        include: { user: true } // Include the vendor information
      })
    ]);

    if (!existingTag) {
      return new NextResponse('Tag not found', { status: 404 });
    }

    if (!existingProduct) {
      return new NextResponse('Product not found', { status: 404 });
    }

    // Check if the tag is already certified by this user for this product
    const existingCertification = existingTag.certifications.find(
      cert => cert.userId === user.id
    );

    // Transaction to handle certification/de-certification
    const result = await prisma.$transaction(async (tx) => {
      let certification;
      let updatedTag;

      if (existingCertification) {
        // De-certification: remove the existing certification
        await tx.tagCertification.delete({
          where: { 
            id: existingCertification.id 
          }
        });

        // Decrement certified count
        updatedTag = await tx.tag.update({
          where: { id: tagId },
          data: { 
            certified: { decrement: 1 }
          },
          include: { 
            certifications: {
              where: { productId }
            }
          }
        });

        // Notification for de-certification
        await tx.notification.create({
          data: {
            userId: existingProduct.userId,
            type: 'PRODUCT_UPDATE',
            message: 'Un utilisateur a retiré sa certification de tag',
            metadata: {
              tagId: tagId,
              productId: productId
            }
          }
        });
      } else {
        // Certification: create a new tag certification
        certification = await tx.tagCertification.create({
          data: {
            tagId: tagId,
            userId: user.id,
            productId: productId
          }
        });

        // Increment certified count
        updatedTag = await tx.tag.update({
          where: { id: tagId },
          data: { 
            certified: { increment: 1 }
          },
          include: { 
            certifications: {
              where: { productId }
            }
          }
        });

        // Notification for certification
        await tx.notification.create({
          data: {
            userId: existingProduct.userId,
            type: 'PRODUCT_UPDATE',
            message: 'Un utilisateur a certifié votre tag',
            metadata: {
              tagId: tagId,
              productId: productId,
              certificationId: certification.id
            }
          }
        });
      }

      return { certification, updatedTag };
    });

    return NextResponse.json(result.updatedTag);
  } catch (error) {
    console.error('Error processing tag certification:', error);
    return new NextResponse('Failed to process tag certification', { status: 500 });
  }
}