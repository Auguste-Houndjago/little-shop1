import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";

import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user?.id) {
      return new NextResponse('Non autorisé', { status: 401 });
    }

    const body = await req.json();
    const { businessName, description, whatsappNumber, businessLogo, addressId } = body;

    // Validation des données requises
    if (!businessName || !description || !whatsappNumber || !addressId) {
      return new NextResponse('Données manquantes', { status: 400 });
    }

    // Vérifier si l'utilisateur a déjà un profil vendeur
    const existingProfile = await prisma.vendorProfile.findUnique({
      where: { userId: user.id },
    });

    // Utiliser une transaction pour la création/mise à jour du profil et la gestion du rôle
    const result = await prisma.$transaction(async (tx) => {
      let profile;

      if (existingProfile) {
        // Mise à jour du profil existant
        profile = await tx.vendorProfile.update({
          where: { userId: user.id },
          data: {
            businessName,
            description,
            whatsappNumber,
            businessLogo: businessLogo || "",
            addressId,
          },
        });
      } else {
        // Création d'un nouveau profil
        profile = await tx.vendorProfile.create({
          data: {
            userId: user.id,
            businessName,
            description,
            whatsappNumber,
            businessLogo: businessLogo || "",
            addressId,
          },
        });

        // Ajouter le rôle VENDOR si l'utilisateur ne l'a pas déjà
        const currentUser = await tx.user.findUnique({
          where: { id: user.id },
          select: { roles: true }
        });

        if (!currentUser?.roles.includes('VENDOR')) {
          await tx.user.update({
            where: { id: user.id },
            data: {
              roles: {
                push: 'VENDOR'
              }
            }
          });
        }
      }

      return profile;
    });

    const message = existingProfile ? 'Profil vendeur mis à jour' : 'Profil vendeur créé';
    return NextResponse.json({ message, profile: result }, { status: 200 });

  } catch (error) {
    console.error('Vendor profile operation error:', error);
    return new NextResponse(
      JSON.stringify({ 
        error: 'Erreur lors de l\'opération sur le profil vendeur',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      }), 
      { status: 500 }
    );
  }
}

