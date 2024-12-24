'use server';

import { revalidatePath } from 'next/cache';

import type { SaveProduct, GetTotalProduct, GetProducts, GetProduct, DeleteProductImage, UpdateProduct } from './types';

import type { Category, Color, Size } from '@prisma/client';

import { getFileKey } from '@/lib/utils';
import { utapi } from '@/lib/utapi';
import prisma from '@/lib/prisma';
import { createClient } from '@/utils/supabase/server';

export const getTotalProduct = async (): Promise<GetTotalProduct> => {
  try {
    const totalProduct = await prisma.product.count({});
    return totalProduct;
  } catch (err) {
    console.error(`[ERROR_GET_TOTAL_PRODUCT]: ${err}`);
  }
}

export const getProducts = async ({
  page = 0,
  per_page = 10,
  q,
}: {
  page?: number;
  per_page?: number;
  q?: string;
}): Promise<GetProducts> => {
  try {
    const skip = per_page * page;

    const whereClause: any = {};

    if (q) {
      const searchTerm = q.toLowerCase();

      whereClause.OR = [
        { title: { contains: searchTerm, mode: "insensitive" } }
      ]
    }

    const products = await prisma.product.findMany({
      include: {
        category: true,
        size: true,
        color: true,
        images: true,
      },
      skip,
      take: per_page,
      where: whereClause,
    });

    const totalCount = await prisma.product.count({ where: whereClause });
    const hasNext = Boolean(totalCount - skip - products.length);

    return { data: products, hasNext };
  } catch (err) {
    console.error(`[ERROR_GET_PRODUCTS]: ${err}`);
  }
};

export const getProduct = async ({
  id
}: {
  id: string;
}): Promise<GetProduct> => {
  try {
    const existingProduct = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        size: true,
        color: true,
        images: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });
    if (!existingProduct) {
      throw new Error('Product not found.');
    }

    return existingProduct;
  } catch (err) {
    console.error(`[ERROR_GET_PRODUCT]: ${err}`);
  }
}

export const saveProduct = async ({
  title,
  price,
  categoryId,
  colorId,
  sizeId,
  isFeatured,
  isArchived,
  whatsappNumber,
  whatsappMessage,
  localisation,
}: {
  title: string;
  price: string;
  categoryId: string;
  colorId: string;
  sizeId: string;
  isFeatured: boolean;
  isArchived: boolean;
  whatsappNumber?: string;
  whatsappMessage?: string;
  localisation?: {
    lat: number;
    lng: number;
    address: string;
  } | null;
}): Promise<SaveProduct> => {
  try {
    const supabase = createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    if (!user || user.email !== process.env.ADMIN_EMAIL) {
      throw new Error('You do not have access to this area');
    }

    const whatsappLink = whatsappNumber && whatsappMessage
      ? `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMessage)}`
      : null;

    const product = await prisma.product.create({
      data: {
        title,
        price: parseFloat(price),
        categoryId,
        colorId,
        sizeId,
        userId: user.id,
        isFeatured,
        isArchived,
        whatsappLink,
        localisation: localisation ? localisation : undefined,
      },
    });

    return {
      data: product,
      success: true,
    };
  } catch (err) {
    console.error(`[ERROR_SAVE_PRODUCT]: ${err}`);
    throw err;
  } finally {
    revalidatePath('/dashboard/products');
  }
}

export const updateProduct = async ({
  id,
  title,
  price,
  categoryId,
  colorId,
  sizeId,
  isFeatured,
  isArchived,

  onlyUpdateImages,

  path
}: {
  id?: string;
  title?: string;
  price?: string;
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
  isArchived?: boolean;

  onlyUpdateImages?: boolean;

  path?: string;
}): Promise<UpdateProduct> => {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    


    if (!user || user.email !== process.env.ADMIN_EMAIL) {
      throw new Error('You do not have access to this area');
    }

    // If onlyUpdateImages is true, then we only have to revalidate the products page
    if (onlyUpdateImages) {
      revalidatePath('/dashboard/products');
      return { success: true };
    }

    const existingProduct = await prisma.product.findUnique({ where: { id } });
    if (!existingProduct) {
      throw new Error('Product not found.');
    }

    const newProduct = await prisma.product.update({
      where: { id },
      data: {
        title,
        price: Number(price),
        categoryId,
        colorId,
        sizeId,
        isFeatured,
        isArchived
      }
    });

    return { success: true, data: newProduct };
  } catch (err) {
    throw err;
  } finally {
    revalidatePath(path || '/dashboard/products');
  }
}

export const deleteProductImage = async ({
  id,
  url
}: {
  id: string;
  url: string;
}): Promise<DeleteProductImage> => {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user || user.email !== process.env.ADMIN_EMAIL) {
      throw new Error('You do not have access to this area');
    }

    const existingImage = await prisma.image.findUnique({ where: { id } });
    if (!existingImage || existingImage.url !== url) {
      throw new Error('Image not found.');
    }

    const key = getFileKey(url);
    await utapi.deleteFiles([key]);

    await prisma.image.delete({ where: { id } });

    return { success: true };
  } catch (err) {
    throw err;
  } finally {
    revalidatePath('/dashboard/products');
  }
}

export const getCategories = async (): Promise<Category[] | undefined> => {
  try {
    const categories = await prisma.category.findMany({});
    return categories;
  } catch (err) {
    console.error(`[ERROR_GET_CATEGORIES]: ${err}`);
  }
}

export const getColors = async (): Promise<Color[] | undefined> => {
  try {
    const colors = await prisma.color.findMany({});
    return colors;
  } catch (err) {
    console.error(`[ERROR_GET_COLORS]: ${err}`);
  }
}

export const getSizes = async (): Promise<Size[] | undefined> => {
  try {
    const sizes = await prisma.size.findMany({});
    return sizes;
  } catch (err) {
    console.error(`[ERROR_GET_SIZES]: ${err}`);
  }
}
