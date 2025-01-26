import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
    request: Request, 
    { params }: { params: { productId: string } }
  ) {
    try {
      const tags = await prisma.tag.findMany({
        where: { 
          products: { 
            some: { 
              id: params.productId 
            } 
          }
        },
        select: {
          id: true,
          name: true,
          category: true,
        }
      });
  
      console.log('Tags récupérés :', JSON.stringify(tags, null, 2));
  
      return NextResponse.json(tags);
    } catch (error) {
      console.error('Erreur récupération tags:', error);
      return NextResponse.json({ error: 'Échec récupération' }, { status: 500 });
    }
  }