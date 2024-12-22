'use server';

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from 'next/cache';
import type { SaveProduct, GetTotalProduct, GetProducts, GetProduct, DeleteProductImage, UpdateProduct } from './types';
import type { Category, Color, Size } from '@prisma/client';
import { getFileKey } from '@/lib/utils';
import { utapi } from '@/lib/utapi';
import prisma from '@/lib/prisma';

async function getUserFromSupabase() {
  const supabase = createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    throw new Error('You must be logged in');
  }

  const appUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { id: true, roles: true }
  });

  if (!appUser) {
    throw new Error('User not found in database');
  }

  return { supabaseUser: user, appUser };
}

export const getTotalProduct = async (): Promise<GetTotalProduct> => {
  try {
    const { appUser } = await getUserFromSupabase();
    
    if (!appUser.roles.some(role => role === 'VENDOR' || role === 'ADMIN')) {
      throw new Error('Unauthorized: Only vendors and admins can view total products');
    }

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
    const { appUser } = await getUserFromSupabase();
    
    if (!appUser.roles.some(role => role === 'VENDOR' || role === 'ADMIN')) {
      throw new Error('Unauthorized: Only vendors and admins can view products');
    }

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
    const { appUser } = await getUserFromSupabase();
    
    if (!appUser.roles.some(role => role === 'VENDOR' || role === 'ADMIN')) {
      throw new Error('Unauthorized: Only vendors and admins can view products');
    }

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
}: {
  title: string;
  price: string;
  categoryId: string;
  colorId: string;
  sizeId: string;
  isFeatured: boolean;
  isArchived: boolean;
}): Promise<SaveProduct> => {
  try {
    const { appUser } = await getUserFromSupabase();
    
    if (!appUser.roles.some(role => role === 'VENDOR' || role === 'ADMIN')) {
      throw new Error('Unauthorized: Only vendors and admins can create products');
    }

    const newProduct = await prisma.product.create({
      data: {
        title,
        price: Number(price),
        categoryId,
        colorId,
        sizeId,
        isFeatured,
        isArchived,
        userId: appUser.id // Associate product with the creator
      }
    });

    return { data: newProduct, success: true };
  } catch (err) {
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
    const { appUser } = await getUserFromSupabase();
    
    if (!appUser.roles.some(role => role === 'VENDOR' || role === 'ADMIN')) {
      throw new Error('Unauthorized: Only vendors and admins can update products');
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
    const { appUser } = await getUserFromSupabase();
    
    if (!appUser.roles.some(role => role === 'VENDOR' || role === 'ADMIN')) {
      throw new Error('Unauthorized: Only vendors and admins can delete product images');
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
    const { appUser } = await getUserFromSupabase();
    
    if (!appUser.roles.some(role => role === 'VENDOR' || role === 'ADMIN')) {
      throw new Error('Unauthorized: Only vendors and admins can view categories');
    }

    const categories = await prisma.category.findMany({});
    return categories;
  } catch (err) {
    console.error(`[ERROR_GET_CATEGORIES]: ${err}`);
  }
}

export const getColors = async (): Promise<Color[] | undefined> => {
  try {
    const { appUser } = await getUserFromSupabase();
    
    if (!appUser.roles.some(role => role === 'VENDOR' || role === 'ADMIN')) {
      throw new Error('Unauthorized: Only vendors and admins can view colors');
    }

    const colors = await prisma.color.findMany({});
    return colors;
  } catch (err) {
    console.error(`[ERROR_GET_COLORS]: ${err}`);
  }
}

export const getSizes = async (): Promise<Size[] | undefined> => {
  try {
    const { appUser } = await getUserFromSupabase();
    
    if (!appUser.roles.some(role => role === 'VENDOR' || role === 'ADMIN')) {
      throw new Error('Unauthorized: Only vendors and admins can view sizes');
    }

    const sizes = await prisma.size.findMany({});
    return sizes;
  } catch (err) {
    console.error(`[ERROR_GET_SIZES]: ${err}`);
  }
}
