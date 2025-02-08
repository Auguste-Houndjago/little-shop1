"use server"

import { revalidatePath } from "next/cache";
import prisma from "./prisma";
import { utapi } from "./utapi";
import { SaveCategory } from "@/dashboard/categories/_utils/types";


export async function fetchCategoriesWithProducts() {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          images: true,
          size: true,
          color: true,
        },
        take: 4, // Limite à 4 produits par catégorie
        where: {
          isArchived: false,
          isFeatured: true,
        },
      },
    },
  });
  
  return categories;
} 



export const addCategory = async ({
  name,
  url,
  title,
  image
}: {
  name: string;
  url?: string;
  title: string;
  image?: File;
}): Promise<SaveCategory> => {
  try {


    let imageUrl = "/default-category.jpg";
    

    if (image) {
      const uploadResponse = await utapi.uploadFiles(image);
      if (uploadResponse.data) {
        imageUrl = uploadResponse.data.url;
      }
    } else if (url) {
      imageUrl = url;
    }

    await prisma.category.create({
      data: {
        name: name.toLowerCase(),
        billboard: imageUrl,
        title
      },
    });

    return { success: true };
  } catch (err) {
    throw err;
  } finally {
    revalidatePath('/dashboard/categories');
  }
}