'use server';


import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";



export const getAuthStatus = async () => {
  const supabase =  createClient();

  const {
    data: { user },
    } = await supabase.auth.getUser();
  
  if (!user?.id || !user?.email) {
    return { success: false }
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      id: user.id,
      email: user.email
    }
  })
  if (!existingUser) {
    await prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        name: `${user.user_metadata.full_name || user.email}`
      }
    });
  }

  return { success: true };
}