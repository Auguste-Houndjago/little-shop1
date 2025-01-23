import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const sizes = await prisma.size.findMany();
    return NextResponse.json(sizes);
  } catch (error) {
    return new NextResponse("Erreur interne", { status: 500 });
  }
} 