import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Check if user is a vendor
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: { vendorProfile: true },
    });

    if (!dbUser?.roles.includes('VENDOR') || !dbUser.vendorProfile) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    return NextResponse.json({ isVendor: true });
  } catch (error) {
    console.error('Verify vendor error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 