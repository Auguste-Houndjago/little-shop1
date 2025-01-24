import prisma from "./prisma";


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