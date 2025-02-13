'use server'

import { createClient } from "@/utils/supabase/server";
import prisma from "./prisma";







export const fetchProducts = async () => {

  try {
    const products = await prisma.product.findMany({
      where: {
        isArchived: false,
        images: {
          some: {},
        },
      },
      include: {
        images: true,
        category: {
          select: { name: true },
        },
        user:{
          select: { id: true , name:true },
         
        }
      },
    });
    return products;
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    return [];
  }
};



export const fetchAllProducts = async () => {
  try {
    const featuredProducts = await prisma.product.findMany({
      where: {
        isArchived: false,
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


export const fetchUsualProducts = async () => {
  try {
    const featuredProducts = await prisma.product.findMany({
      where: {
        isArchived: false,
        isFeatured: false,
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


export const fetchFeaturedProducts = async () => {
  try {
    const featuredProducts = await prisma.product.findMany({
      where: {
        isArchived: false,
        isFeatured: false,
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
  const supabase = createClient();
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


export async function fetchCategory() {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        billboard: true,
      },
      orderBy: {
        name: 'asc'
      }
    });
    return categories;
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
}


export const fetchCategories = async () => {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return categories;
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories:", error);
    return [];
  }
};

export const fetchColors = async ()=>{
  try{
const colors = await prisma.color.findMany({
  select:{
    id:true , 
    name:true,
    color:true,
  },
 
})

return colors;
  }
  catch (error){
console.error("Erreur : recuperation des couleurs : ", error );
return[];
  }

}

export const fetchSizes = async ()=>{
  try{
const sizes = await prisma.size.findMany({
  select:{
    id:true,
    name:true,
  },
});

return sizes;
  }
  catch(error){
console.error("erreur dans la recuperation des sizes : " , error)
  };
  return[];
}


export const fetchSellers = async () => {
  try {
    const sellers = await prisma.vendorProfile.findMany({
      select: {
        id: true,
        businessName: true,
      },
    });
    console.log("seller", sellers)
    return sellers;
  } catch (error) {
    console.error("Erreur lors de la récupération des vendeurs:", error);
    return [];
  }
};



export const fetchLocations = async () => {
  try {
    const locations = await prisma.product.findMany({
      select: {
        id: true,
        localisation:true
      },
    });
    return locations;
  } catch (error) {
    console.error("Erreur lors de la récupération des emplacements:", error);
    return [];
  }
};

export const prepareProductModalData = (product: any) => {
  return {
    name: product.title,
    description: product.description || undefined,
    price: product.price,
    images: product.images.map((img: { url: any; }) => img.url),
    category: product.category.name,
    localisation: product.localisation ? {
      lat: product.localisation.lat || 0,
      lng: product.localisation.lng || 0,
      address: product.localisation.address || ''
    } : undefined,
    whatsappLink: product.user?.name ? `${product.user.name}` : undefined
  };
};

interface ProductAttributes {
  categories: { id: string; name: string; }[];
  sizes: { id: string; name: string; value: string; }[];
  colors: { id: string; name: string; color: string; }[];
}

export const fetchProductAttributes = async (): Promise<ProductAttributes> => {
  try {
 
    const [categories, sizes, colors] = await Promise.all([
      prisma.category.findMany({
        select: {
          id: true,
          name: true,
        },
      }),
      prisma.size.findMany({
        select: {
          id: true,
          name: true,
          value: true,
        },
      }),
      prisma.color.findMany({
        select: {
          id: true,
          name: true,
          color: true,
        },
      }),
    ]);

    return {
      categories,
      sizes,
      colors,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des attributs produit:", error);
    return {
      categories: [],
      sizes: [],
      colors: [],
    };
  }
};

export const fetchProductsWithReviews = async () => {
  try {
    const products = await prisma.product.findMany({
      where: {
        isArchived: false,
        images: {
          some: {},
        },
      },
      include: {
        images: true,
        reviews: {
          select: {
            rating: true,
          },
        },
        category: {
          select: { name: true },
        },
        user: {
          select: { id: true, name: true },
        },
      },
      orderBy: {
        createdAt: 'desc', 
      },
    });
    return products;
  } catch (error) {
    console.error("Erreur lors de la récupération des produits avec leurs reviews:", error);
    return [];
  }
};



export const fetchProductsByCategory = async (categoryId?: string) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        isArchived: false,
        categoryId: categoryId ? categoryId : undefined,
        images: {
          some: {},
        },
      },
      include: {
        images: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        reviews: {
          select: {
            rating: true,
          },
        },
        color: true,
        size: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return products;
  } catch (error) {
    console.error("Erreur lors de la récupération des produits par catégorie:", error);
    return [];
  }
};