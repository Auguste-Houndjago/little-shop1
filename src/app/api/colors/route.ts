
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const colors = await prisma.color.findMany();
    return NextResponse.json(colors);
  } catch (error) {
    return new NextResponse("Erreur interne", { status: 500 });
  }
} 