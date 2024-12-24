
'use server';

import { stripe } from "@/lib/stripe";
import type { ProductStorage } from "@/components/home/CardProduct";
import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";



interface CreateProductData {
  title: string;
  description?: string;
  price: number;
  stock: number;
  categoryId: string;
  colorId: string;
  sizeId: string;
  images: { url: string }[];
}

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

export async function createProduct(data: CreateProductData) {
  const { appUser } = await getUserFromSupabase();

  if (!appUser.roles.some(role => role === 'VENDOR' || role === 'ADMIN')) {
    throw new Error('Unauthorized: Only vendors and admins can create products');
  }

  try {
    const product = await prisma.product.create({
      data: {
        ...data,
        userId: appUser.id,
        images: {
          createMany: {
            data: data.images
          }
        }
      }
    });
    return product;
  } catch (error) {
    console.error('Error creating product:', error);
    throw new Error('Failed to create product');
  }
}

export async function updateProduct(productId: string, data: Partial<CreateProductData>) {
  const { appUser } = await getUserFromSupabase();

  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: { userId: true }
  });

  const isAdmin = appUser.roles.includes('ADMIN');
  const isOwner = product && product.userId === appUser.id;

  if (!isAdmin && !isOwner) {
    throw new Error('Unauthorized: You can only edit your own products');
  }

  try {
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        ...data,
        images: data.images ? {
          deleteMany: {},
          createMany: {
            data: data.images
          }
        } : undefined
      }
    });
    return updatedProduct;
  } catch (error) {
    console.error('Error updating product:', error);
    throw new Error('Failed to update product');
  }
}

export async function deleteProduct(productId: string) {
  const { appUser } = await getUserFromSupabase();

  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: { userId: true }
  });

  const isAdmin = appUser.roles.includes('ADMIN');
  const isOwner = product && product.userId === appUser.id;

  if (!isAdmin && !isOwner) {
    throw new Error('Unauthorized: You can only delete your own products');
  }

  try {
    await prisma.product.delete({
      where: { id: productId }
    });
    return { success: true };
  } catch (error) {
    console.error('Error deleting product:', error);
    throw new Error('Failed to delete product');
  }
}

export const createCheckoutSession = async (products: ProductStorage[]) => {
  const { supabaseUser, appUser } = await getUserFromSupabase();

  const totalPrice: number = products.reduce((total, curr) => total + curr.amount, 0) || 0;
  const qty: number = products.reduce((total, curr) => total + curr.total, 0) || 0;
  const orderItems = products.map((item) => ({
    amount: item.amount,
    total: item.total,
    productId: item.product.id,
  }));

  const order = await prisma.order.create({
    data: {
      userId: appUser.id,
      amount: totalPrice,
      total: qty,
      isPaid: false,
      orderItems: {
        createMany: {
          data: orderItems
        }
      }
    }
  });

  // STRIPE
  const createProductPromises = products.map(({ product }) => {
    return stripe.products.create({
      name: product.title,
      images: product.images.map(value => value.url),
      default_price_data: {
        currency: 'USD',
        unit_amount: product.price * 100,
      }
    })
  });
  
  const productsCreated = await Promise.all(createProductPromises);

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
    mode: 'payment',
    shipping_address_collection: {
      allowed_countries: ['US', 'ID']
    },
    metadata: {
      userId: supabaseUser.id,
      orderId: order.id
    },
    line_items: productsCreated.map((product) => {
      const quantity = products.find(({ product: currProduct }) => currProduct.title === product.name)?.total || 1;
      return {
        price: product.default_price as string,
        quantity
      }
    })
  });

  return { url: stripeSession.url }
}