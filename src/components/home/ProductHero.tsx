"use client"

import React, { useState } from 'react';
import { Card, CardFooter, Button } from "@heroui/react";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { toast } from 'sonner';
import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';

interface ProductHeroProps {
  products?: {
    id: string;
    title: string;
    price: number;
    images: { url: string }[];
    isFeatured?: boolean;
    reviews?: { rating?: number }[];
  }[];
}

export const HeroProduct = ({ product }: { product: NonNullable<ProductHeroProps['products']>[number] }) => {
  const [isLiked, setIsLiked] = useState(false);
  const supabase = createClient();

  // Calculate average rating
  const averageRating = product.reviews && product.reviews.length > 0
    ? product.reviews.reduce((sum, review) => sum + (review.rating || 0), 0) / product.reviews.length
    : 0;

  const imageUrl = product.images.length > 0 
    ? product.images[0].url 
    : '/background1.jpg';

  const handleWishlist = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('Vous devez être connecté');
        return;
      }

      const response = await fetch(`/api/products/${product.id}/wishlist`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to toggle wishlist');
      }

      setIsLiked(prev => !prev);
      toast.success(isLiked ? 'Retiré des favoris' : 'Ajouté aux favoris');
    } catch (error) {
      console.error('Error toggling wishlist:', error);
      toast.error('Impossible de modifier les favoris');
    }
  };

  return (
    <Card 
      isFooterBlurred 
      className={`
         bg-blue-400 border-2  black:border-black w-[200px] h-[200px]
        ${product.isFeatured ? ' border-primary' : 'border-primary'}


      `} 
      radius="lg"
    
    >
                  <div className="flex absolute top-1 left-2 items-center">
            
                <FaStar   className='text-yellow-400'
                 
                />
         
              <span className="text-xs text-white/60 ml-1">
                ({averageRating.toString()}) 
              </span>
            </div>
      <Image
        alt={product.title}
        className="object-cover "
        src={imageUrl}
        width={200}
        height={200}
       

      />

      <pre className='z-50 '> {imageUrl} </pre>


      <CardFooter 
        className="
          justify-between 
          before:bg-white/10 
          border-white/20 
          border-1 
          overflow-hidden 
          py-1 
          absolute 
          before:rounded-xl 
          rounded-large 
          bottom-1 
          w-[calc(100%_-_12px)] 
          shadow-small 
          ml-1 
          z-10
        "
      >
        <div className="flex flex-col">
          <p className="text-small font-bold text-white truncate max-w-[150px]">
            {product.title}
          </p>
          <div className="flex items-center">
            <p className="text-tiny text-white/80 mr-2">
           {product.price.toFixed(2)} Fcfa
            </p>

          </div>
        </div>
        <Button
          isIconOnly
          className="text-default-900/60 data-[hover]:bg-foreground/10"
          radius="full"
          variant="light"
          onPress={handleWishlist}
        >
          {isLiked ? (
            <FaHeart className="text-red-500" />
          ) : (
            <FaRegHeart />
          )}
        </Button>
      </CardFooter>
    </Card>


  )
};

export default function ProductHero({ products }: ProductHeroProps) {
  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      {products && products.map((product) => (
        <HeroProduct key={product.id} product={product} />
      ))}
    </div>
  );
}
