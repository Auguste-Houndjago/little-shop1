import { NextRequest, NextResponse } from 'next/server';
import { createClient } from "@/utils/supabase/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {

    const supabase = createClient();

  
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    // Check if there's a session error or no session
    if (sessionError || !session) {
      return NextResponse.json({ 
        error: 'Non authentifié', 
        details: sessionError?.message 
      }, { status: 401 });
    }


    const userEmail = session.user.email;

   
    const user = await prisma.user.findUnique({
      where: { email: userEmail! }
    });

    if (!user) {
      return NextResponse.json({ 
        error: 'Utilisateur non trouvé' 
      }, { status: 404 });
    }

 
    const body = await req.json();
    const { country, region, city, postalCode } = body;


    const address = await prisma.address.create({
      data: {
        userId: user.id,
        country,
        region,
        city,
        postalCode
      }
    });

    return NextResponse.json(address, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création de l\'adresse:', error);
    return NextResponse.json({ 
      error: 'Erreur lors de la création de l\'adresse',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
}