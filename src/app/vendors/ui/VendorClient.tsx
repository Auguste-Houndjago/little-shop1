import React from 'react';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/server';
import prisma from '@/lib/prisma';

interface Follower {
  user: {
    id: string;
    name: string | null;
    email: string;
    avatar_url: string | null;
  };
  createdAt: string;
}

export default async function VendorClient() {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session?.user) {
    return <div>You must be logged in to view this page.</div>;
  }

  const vendorProfile = await prisma.vendorProfile.findUnique({
    where: { userId: session.user.id },
    select: { id: true }
  });

  if (!vendorProfile) {
    return <div>You do not have a vendor profile</div>;
  }

  const followers = await prisma.follow.findMany({
    where: { vendorId: vendorProfile.id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          avatar_url: true,
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Followers</h1>
      {followers.length === 0 ? (
        <p>No followers</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {followers.map((follow) => (
            <div 
              key={follow.user.id} 
              className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4"
            >
              {follow.user.avatar_url ? (
                <Image 
                  src={follow.user.avatar_url} 
                  alt={follow.user.name || 'User'} 
                  width={50} 
                  height={50} 
                  className="rounded-full"
                />
              ) : (
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  {follow.user.name ? follow.user.name[0] : '?'}
                </div>
              )}
              <div>
                <h3 className="font-semibold">{follow.user.name || 'Anonymous'}</h3>
                <p className="text-sm text-gray-500">{follow.user.email}</p>
                <p className="text-xs text-gray-400">
                  Followed on {new Date(follow.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
