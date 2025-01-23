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