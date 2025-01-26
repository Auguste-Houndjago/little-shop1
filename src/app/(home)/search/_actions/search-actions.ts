'use server';

import { PrismaClient, Prisma, Product, Category, Tag, VendorProfile, TagCategory } from '@prisma/client';

const prisma = new PrismaClient();

export interface SearchFilters {
  productName?: string;
  categoryId?: string;
  vendorBusinessName?: string;
  vendorCountry?: string;
  vendorRegion?: string;
  vendorCity?: string;
  tagName?: string;
  minPrice?: number;
  maxPrice?: number;
}

export async function searchProducts(filters: SearchFilters) {
  try {
    const where: Prisma.ProductWhereInput = {
      ...(filters.productName && {
        title: {
          contains: filters.productName,
          mode: 'insensitive'
        }
      }),
      ...(filters.categoryId && { categoryId: filters.categoryId }),
      ...(filters.minPrice !== undefined && { price: { gte: filters.minPrice } }),
      ...(filters.maxPrice !== undefined && { price: { lte: filters.maxPrice } }),
      ...(filters.vendorBusinessName && {
        user: {
          vendorProfile: {
            businessName: {
              contains: filters.vendorBusinessName,
              mode: 'insensitive'
            }
          }
        }
      }),
      ...(filters.vendorCountry && {
        user: {
          address: {
            country: {
              contains: filters.vendorCountry,
              mode: 'insensitive'
            }
          }
        }
      }),
      ...(filters.vendorRegion && {
        user: {
          address: {
            region: {
              contains: filters.vendorRegion,
              mode: 'insensitive'
            }
          }
        }
      }),
      ...(filters.vendorCity && {
        user: {
          address: {
            city: {
              contains: filters.vendorCity,
              mode: 'insensitive'
            }
          }
        }
      }),
      ...(filters.tagName && {
        tags: {
          some: {
            name: {
              contains: filters.tagName,
              mode: 'insensitive'
            }
          }
        }
      })
    };

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
        user: {
          include: {
            vendorProfile: true,
            address: true
          }
        },
        tags: true,
        images: true,
        color: true,
        size: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return products;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
}

export async function fetchSearchFilters() {
  try {
    const [categories, tags, vendorProfiles] = await Promise.all([
      prisma.category.findMany({
        select: { 
          id: true, 
          name: true, 
          billboard: true, 
          title: true,
          createdAt: true,
          updatedAt: true
        }
      }),
      prisma.tag.findMany({
        select: { 
          id: true, 
          name: true, 
          category: true,
          description: true,
          createdAt: true,
          updatedAt: true,
          certified: true
        }
      }),
      prisma.vendorProfile.findMany({
        include: {
          user: {
            include: {
              address: true
            }
          }
        }
      })
    ]);

    // Deduplicate locations
    const locations = {
      countries: Array.from(new Set(
        vendorProfiles
          .map(vp => vp.user?.address?.country)
          .filter((country): country is string => country !== null && country !== undefined)
      )),
      regions: Array.from(new Set(
        vendorProfiles
          .map(vp => vp.user?.address?.region)
          .filter((region): region is string => region !== null && region !== undefined)
      )),
      cities: Array.from(new Set(
        vendorProfiles
          .map(vp => vp.user?.address?.city)
          .filter((city): city is string => city !== null && city !== undefined)
      ))
    };

    return {
      categories,
      tags,
      vendorProfiles,
      locations
    };
  } catch (error) {
    console.error('Error fetching search filters:', error);
    throw error;
  }
}

export async function fetchProductById(productId: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        category: true,
        user: {
          include: {
            vendorProfile: true,
            address: true
          }
        },
        tags: true,
        images: true,
        color: true,
        size: true
      }
    });

    return product;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
}