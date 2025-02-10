import prisma from "@/lib/prisma";
import { TagCategory } from "@prisma/client";


export async function getVendorData(userId: string) {
  try {
    const vendor = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        vendorProfile: {
          include: {
            address: true,
          },
        },
      },
    });

    if (!vendor?.vendorProfile) {
      return null;
    }

    const unreadNotifications = await prisma.notification.count({
      where: {
        userId: userId,
        read: false,
      },
    });

    return {
      vendor: {
        id: vendor.id,
        businessName: vendor.vendorProfile.businessName || 'Ma Boutique',
        businessLogo: vendor.vendorProfile.businessLogo || '/placeholder.png',
        description: vendor.vendorProfile.description || 'Description de la boutique',
        banner:vendor.vendorProfile.banner,
        whatsappNumber: vendor.vendorProfile.whatsappNumber,
        isVerified: vendor.vendorProfile.isVerified,
        address: vendor.vendorProfile.address ? {
          country: vendor.vendorProfile.address.country,
          region: vendor.vendorProfile.address.region,
          city: vendor.vendorProfile.address.city,
        } : null,
      },
      unreadNotifications,
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des données du vendeur:', error);
    return null;
  }
}

// Récupérer les produits du vendeur
export async function getVendorProducts(vendorId: string) {
  try {
    const products = await prisma.product.findMany({
      where: {
        userId: vendorId,
        isArchived: false,
      },
      include: {
        images: true,
        reviews: {
          select: {
            rating: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Calculate average rating for each product
    return products.map(product => ({
      ...product,
      averageRating: product.reviews.length > 0
        ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length
        : 0
    }));
  } catch (error) {
    console.error("Error fetching vendor products:", error);
    return [];
  }
}

// Récupérer les statistiques du vendeur
export async function getVendorStats(vendorId: string) {
  try {

    const activeProducts = await prisma.product.count({
      where: {
        userId: vendorId,
        isArchived: false,
      },
    });

    // Récupérer les commandes
    const orders = await prisma.order.findMany({
      where: {
        orderItems: {
          some: {
            product: {
              userId: vendorId,
            },
          },
        },
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    // Calculer les statistiques des commandes
    const completedOrders = orders.filter(order => order.isPaid).length;
    const pendingOrders = orders.length - completedOrders;

    // Calculer le nombre de produits vendus
    const soldProducts = orders.reduce((acc, order) => {
      return acc + order.orderItems.reduce((sum, item) => sum + item.total, 0);
    }, 0);

    // Récupérer la moyenne des notes
    const ratings = await prisma.review.aggregate({
      where: {
        product: {
          userId: vendorId,
        },
      },
      _avg: {
        rating: true,
      },
    });

    return {
      activeProducts,
      soldProducts,
      averageRating: ratings._avg.rating || 0,
      completedOrders,
      pendingOrders,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques:", error);
    return {
      activeProducts: 0,
      soldProducts: 0,
      averageRating: 0,
      completedOrders: 0,
      pendingOrders: 0,
    };
  }
}


export async function getTagCertifications(tagId: string, productId: string) {
  // Validate input parameters
  if (!tagId || !productId) {
    console.error("Tag ID and Product ID are required");
    return [];
  }

  try {
    const tagCertifications = await prisma.tagCertification.findMany({
      where: {
        tagId,
        productId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar_url: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return tagCertifications;

  } catch (error) {
    console.error("Error fetching tag certifications:", error);

    return [];
  }
}



// Ajouter un tag à un produit
export async function addTagToProduct(productId: string, tagId: string) {
  try {
    return await prisma.product.update({
      where: { id: productId },
      data: {
        tags: {
          connect: { id: tagId }
        }
      },
      include: {
        tags: true
      }
    });
  } catch (error) {
    console.error("Error adding tag to product:", error);
    throw error;
  }
}

// Retirer un tag d'un produit
export async function removeTagFromProduct(productId: string, tagId: string) {
  try {
    return await prisma.product.update({
      where: { id: productId },
      data: {
        tags: {
          disconnect: { id: tagId }
        }
      }
    });
  } catch (error) {
    console.error("Error removing tag from product:", error);
    throw error;
  }
}

// Récupérer tous les tags disponibles
export async function getAllTags() {
  try {
    return await prisma.tag.findMany({
      orderBy: {
        name: 'asc'
      },
      include: {
        _count: {
          select: {
            products: true
          }
        }
      }
    });
  } catch (error) {
    console.error("Error fetching tags:", error);
    return [];
  }
}

// Récupérer les tags d'un produit spécifique
export async function getProductTags(productId: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        tags: true
      }
    });
    return product?.tags || [];
  } catch (error) {
    console.error("Error fetching product tags:", error);
    return [];
  }
}

// Créer un nouveau tag
export async function createTag(data: {
  name: string;
  category: TagCategory;
  description?: string;
  createdById: string;
}) {
  try {
    return await prisma.tag.create({
      data
    });
  } catch (error) {
    console.error("Error creating tag:", error);
    throw error;
  }
}

// + un tag à un produit
export async function assignTagToProduct(productId: string, tagId: string) {
  try {
    return await prisma.product.update({
      where: { id: productId },
      data: {
        tags: {
          connect: { id: tagId }
        }
      },
      include: {
        tags: true
      }
    });
  } catch (error) {
    console.error("Error assigning tag to product:", error);
    throw error;
  }
}




// Types pour les données du vendeur
export interface VendorData {
  vendor: {
    id: string;
    businessName: string;
    businessLogo: string;
    description: string;
    whatsappNumber: string;
    isVerified: boolean;
    address: {
      country: string | null;
      region: string | null;
      city: string | null;
    } | null;
  };
  unreadNotifications: number;
}

export interface VendorStats {
  activeProducts: number;
  soldProducts: number;
  averageRating: number;
  completedOrders: number;
  pendingOrders: number;
}
