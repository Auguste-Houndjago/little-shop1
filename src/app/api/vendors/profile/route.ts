import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const vendorProfile = await prisma.vendorProfile.findUnique({
      where: { userId: user.id },
    });

    if (!vendorProfile) {
      return new NextResponse('Vendor profile not found', { status: 404 });
    }

    return NextResponse.json({ vendorProfile });
  } catch (error) {
    console.error('Get vendor profile error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 