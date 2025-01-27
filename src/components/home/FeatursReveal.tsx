'use client'

import React from 'react';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import { ProductWithRelations } from '@/app/(home)/search/types';


async function fetchFeaturedProducts() {
  try {
    const featuredProducts = await prisma.product.findMany({
      // where: {
      //   isFeatured: true
      // },
      include: {
        images: true,
        category: true,
        tags: true,
        user: {
          include: {
            vendorProfile: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 8
    });

    return featuredProducts as ProductWithRelations[];
  } catch (error) {
    console.error('Failed to fetch featured products:', error);
    return [];
  }
}

export async function FeaturedReveal() {
  const featuredProducts = await fetchFeaturedProducts();


  


  return (


<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-2'>




{featuredProducts.map((product) => (

              

    
              <div>
                <div className="relative  aspect-square flex items-center justify-center overflow-hidden rounded-2xl border-2 bg-gray-100 w-40 h-40 md:w-[250px] md:h-[250px]" >
                  {product.images.length > 0 ? (
                    <Image
                      src={product.images[0].url}
                      alt={product.title}
                      fill
                      className="object-contain transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-gray-500 dark:text-gray-300">No Image</span>
                    </div>
                  )}
                </div>


                <div className="relative  aspect-square flex items-center justify-center overflow-hidden rounded-2xl border-2 bg-gray-100 w-40 md:w-[250px] h-[30px]" >
<h1>{product.title}</h1>
                  
                </div>
              </div>

              

      
       
        ))}
   

    </div>
  );
};





