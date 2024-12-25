import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  try {

    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const orders = await prisma.order.findMany({
      where: {
        user: {
          email: session.user.email,
        },
      },
      include: {
        orderItems: {
          include: {
            product: {
              include: {
                images: true,
              },
            },
          },
        },
        delivery: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const formattedOrders = orders.map((order) => ({
      id: order.id,
      status: order.delivery?.status || 'PENDING',
      total: order.total,
      createdAt: order.createdAt.toISOString(),
      items: order.orderItems.map((item) => ({
        id: item.id,
        quantity: item.total,
        price: item.amount,
        product: {
          name: item.product.title,
          images: item.product.images.map((image) => image.url),
        },
      })),
    }));

    return NextResponse.json(formattedOrders);
  } catch (error) {
    console.error("[ORDERS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
