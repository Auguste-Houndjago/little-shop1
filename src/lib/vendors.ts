import prisma from "./prisma";

export async function fetchVendorStats(vendorId: string) {
  try {
    // Récupérer les produits actifs
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

export async function fetchVendorsWithProducts() {
  try {
    const vendorsWithProducts = await prisma.vendorProfile.findMany({
      select: {
        id: true,
        businessName: true,
        businessLogo: true,
        description: true,
        user: {
          select: {
            products: {
              take: 2,
              orderBy: { createdAt: 'desc' },
              select: {
                id: true,
                title: true,
                price: true,
                isFeatured: true,
                images: {
                  select: {
                    id: true,
                    url: true,
                    productId: true,
                    createdAt: true,
                    updatedAt: true
                  },
                  take: 1
                },
                category: {
                  select: {
                    name: true
                  }
                },
                color: {
                  select: {
                    id: true,
                    name: true,
                    color: true,
                    createdAt: true,
                    updatedAt: true
                  }
                },
                size: {
                  select: {
                    id: true,
                    name: true,
                    value: true,
                    createdAt: true,
                    updatedAt: true
                  }
                }
              }
            }
          }
        }
      },
      where: {
        user: {
          products: {
            some: {} // Ensure the vendor has at least one product
          }
        }
      }
    });

    // Transform the data to match the component's expected structure
    return vendorsWithProducts.map(vendor => ({
      id: vendor.id,
      businessName: vendor.businessName || 'Unnamed Vendor',
      businessLogo: vendor.businessLogo,
      description: vendor.description,
      products: vendor.user.products
    }));
  } catch (error) {
    console.error('Failed to fetch vendors with products:', error);
    return [];
  }
}

export async function fetchVendors(): Promise<any[]> {
  try {
    const vendors = await prisma.vendorProfile.findMany({
      include: {
        user: {
          include: {
            products: {
              include: {
                images: true,
                category: true,
                color: true,
                size: true,
              },
              take: 2, 
              orderBy: {
                createdAt: 'desc'
              }
            }
          }
        }
      },
      take: 6 
    });


    return vendors.map(vendor => ({
      id: vendor.id,
      businessName: vendor.businessName || '',
      businessLogo: vendor.businessLogo,
      description: vendor.description,
      products: vendor.user.products.map(product => ({
        ...product,
        category: { name: product.category.name },
        images: product.images,
        color: product.color,
        size: product.size
      }))
    }));
  } catch (error) {
    console.error('Error fetching vendors:', error);
    return [];
  }
}