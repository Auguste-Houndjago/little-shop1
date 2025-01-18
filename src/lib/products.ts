import { supabase } from "./supabase";
import prisma from "./prisma";

export const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des produits");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erreur :", error);
      return [];
    }
};

export const fetchFeaturedProducts = async () => {
  try {
    const featuredProducts = await prisma.product.findMany({
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

    return featuredProducts;
  } catch (error) {
    console.error("Erreur lors de la récupération des produits en vedette :", error);
    return [];
  }
};

export async function uploadProductImage(file: File) {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${Date.now()}_${fileName}`;
  
      const { data, error } = await supabase.storage
        .from('products')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });
  
      if (error) throw error;
  
      const { data: { publicUrl } } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);
  
      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
}