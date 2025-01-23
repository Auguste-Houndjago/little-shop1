

import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


export async function vendorMiddleware(request: NextRequest) {
  try {
    const supabase = createClient();

    // Verify user authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user?.id) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Verify vendor role using Prisma (via API route to avoid edge function limitations)
    const verifyVendorResponse = await fetch(`${request.nextUrl.origin}/api/auth/verify-vendor`, {
      headers: {
        'Authorization': `Bearer ${await supabase.auth.getSession().then(res => res.data.session?.access_token)}`,
      },
    });

    if (!verifyVendorResponse.ok) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Vendor middleware error:', error);
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: ['/vendors/:path*'],
};