import prisma from "@/lib/prisma";
import { TagCategory } from "@prisma/client";

// Récupérer les données du vendeur
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

// Récupérer les produits avec leurs tags
export async function getVendorProductsWithTags(vendorId: string) {
  try {
    const products = await prisma.product.findMany({
      where: {
        userId: vendorId,
        isArchived: false,
      },
      include: {
        images: true,
        tags: {
          include: {
            _count: {
              select: {
                certifiedBy: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return products.map(product => ({
      id: product.id,
      title: product.title,
      images: product.images,
      tags: product.tags.map(tag => ({
        id: tag.id,
        name: tag.name,
        _count: {
          certifiedBy: tag._count.certifiedBy
        }
      }))
    }));
  } catch (error) {
    console.error("Error fetching vendor products with tags:", error);
    return [];
  }
}

// Récupérer tous les produits du vendeur pour la gestion des tags
export async function getVendorProductsForTagging(vendorId: string) {
  try {
    const products = await prisma.product.findMany({
      where: {
        userId: vendorId,
        isArchived: false,
      },
      include: {
        images: true,
        tags: true, 
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return products;
  } catch (error) {
    console.error("Error fetching vendor products:", error);
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

// Assigner un tag à un produit
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

// Récupérer les tags d'un produit avec le nombre de certifications
export async function getProductTagsWithCertifications(productId: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        tags: {
          include: {
            _count: {
              select: {
                certifiedBy: true
              }
            }
          }
        }
      }
    });

    return product?.tags.map(tag => ({
      id: tag.id,
      name: tag.name,
      _count: {
        certifiedBy: tag._count.certifiedBy
      }
    })) || [];
  } catch (error) {
    console.error("Error fetching product tags:", error);
    return [];
  }
}

// Vérifier si un utilisateur a certifié un tag
export async function getUserTagCertifications(userId: string, productId: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        tags: {
          include: {
            certifiedBy: {
              where: {
                userId: userId
              }
            }
          }
        }
      }
    });

    return new Set(
      product?.tags
        .filter(tag => tag.certifiedBy.length > 0)
        .map(tag => tag.id) || []
    );
  } catch (error) {
    console.error("Error fetching user certifications:", error);
    return new Set();
  }
}

// Certifier ou décertifier un tag
export async function toggleTagCertification(userId: string, tagId: string) {
  try {
    const existingCertification = await prisma.userTag.findFirst({
      where: {
        userId,
        tagId
      }
    });

    if (existingCertification) {
      await prisma.userTag.delete({
        where: {
          userId_tagId: {
            userId: userId,
            tagId: tagId
          }
        }
      });
      return false; // Tag décertifié
    } else {
      await prisma.userTag.create({
        data: {
          userId,
          tagId
        }
      });
      return true; // Tag certifié
    }
  } catch (error) {
    console.error("Error toggling tag certification:", error);
    throw error;
  }
}

// Récupérer les reviews et tags d'un produit
export async function getProductReviewsAndTags(productId: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        reviews: {
          include: {
            user: {
              select: {
                name: true,
                email: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        tags: {
          include: {
            _count: {
              select: {
                certifiedBy: true
              }
            }
          }
        }
      }
    });

    if (!product) {
      console.error(`Product not found: ${productId}`);
      return null;
    }

    console.log('Product found:', {
      reviewCount: product.reviews.length,
      tagCount: product.tags.length
    });

    return {
      reviews: product.reviews.map(review => ({
        id: review.id,
        message: review.comment,
        createdAt: review.createdAt,
        user: {
          name: review.user.name || review.user.email,
          email: review.user.email
        }
      })),
      tags: product.tags.map(tag => ({
        id: tag.id,
        name: tag.name,
        _count: {
          certifiedBy: tag._count.certifiedBy
        }
      }))
    };
  } catch (error) {
    console.error("Error fetching product reviews and tags:", error);
    return null;
  }
}

// Fonction simple pour récupérer les tags d'un produit
export async function getSimpleProductTags(productId: string) {
  try {
    console.log("Fetching tags for product:", productId);
    
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: {
        tags: {
          select: {
            id: true,
            name: true,
            category: true,
            _count: {
              select: {
                certifiedBy: true
              }
            }
          }
        }
      }
    });

    console.log("Found product with tags:", product);
    
    if (!product) {
      console.log("No product found with ID:", productId);
      return [];
    }

    return product.tags;
  } catch (error) {
    console.error("Error in getSimpleProductTags:", error);
    return [];
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
