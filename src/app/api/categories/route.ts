import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories);
  } catch (error) {
    return new NextResponse("Erreur interne", { status: 500 });
  }
} 