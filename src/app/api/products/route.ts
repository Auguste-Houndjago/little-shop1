import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return new NextResponse("Non authentifié", { status: 401 });
    }

    const body = await req.json();
    const { 
      title, 
      description, 
      price, 
      stock, 
      category,
      size,
      color,
      images,
      userId 
    } = body;

    // Vérifier que l'utilisateur est bien le propriétaire
    if (userId !== session.user.id) {
      return new NextResponse("Non autorisé", { status: 403 });
    }

    const product = await prisma.product.create({
      data: {
        title,
        description,
        price,
        stock,
        categoryId: category,
        sizeId: size,
        colorId: color,
        userId: session.user.id,
        images: {
          create: images.map((url: string) => ({
            url
          })),
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("[PRODUCTS_POST]", error);
    return new NextResponse("Erreur interne", { status: 500 });
  }
} 