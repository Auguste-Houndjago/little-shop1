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

    const wishlist = await prisma.wishlist.findMany({
      where: {
        user: {
          email: session.user.email,
        },
      },
      include: {
        products: {
          include: {
            images: true,
          },
        },
      },
    });

    const products = wishlist.map((item) => item.products);

    return NextResponse.json(products);
  } catch (error) {
    console.error("[WISHLIST_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
