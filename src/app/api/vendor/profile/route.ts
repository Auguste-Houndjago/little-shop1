import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";

import { NextResponse } from "next/server";


export async function POST(req: Request) {
  const supabase = createClient();

  try {

    const { data: { user } } = await supabase.auth.getUser();
    const  userId  = user?.id;
    const body = await req.json();

    const { businessName, description, whatsappNumber, address } = body;

    if (!userId) {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    if (!businessName || !description || !whatsappNumber || !address) {
      return new NextResponse("Tous les champs sont requis", { status: 400 });
    }

  const vendor = await prisma.user.findUnique({
    where:{id: userId},
    select:{roles:true}
  })

if (!vendor?.roles.includes('VENDOR')) {



  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      roles: {
        push: "VENDOR"
      }
    }
  }); 
}



    // create=> vendor profile
    const vendorProfile = await prisma.vendorProfile.create({
      data: {
        userId,
        businessName,
        description,
        whatsappNumber,
        address,
      }
    });

    

    return NextResponse.json(vendorProfile);
  } catch (error) {
    console.log('[VENDOR_PROFILE_POST]', error);
    return new NextResponse("Erreur interne", { status: 500 });
  }
}
