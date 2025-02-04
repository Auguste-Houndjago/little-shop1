'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Recursive } from 'next/font/google';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn, formatPrice, addItemToStorage } from '@/lib/utils';
import type { ProductFeatured } from '@/app/(home)/page';
import useTriggerUseEffect from '@/hooks/useTriggerUseEffect';
import { ProductModal } from '@/components/products/ProductModal';
import { Heart, MessageCircle, ShoppingCart } from 'lucide-react';
import { toast } from "sonner";
import Chat from '../products/Chat';

interface Location {
  lat: number;
  lng: number;
  address: string;
}

const recursive = Recursive({ subsets: ['latin'] });

export interface ProductStorage {
  product: ProductFeatured;
  amount: number;
  total: number;
}

const CardProduct = ({ product }: { product: ProductFeatured }) => {
  const [isPending, startTransition] = React.useTransition();
  const [isWished, setIsWished] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const { setTriggerUseEffect } = useTriggerUseEffect();

  const handleShare = async () => {
    const shareUrl = window.location.href;
    try {
      await navigator.share({
        title: product.title,
        text: `Check out ${product.title}!`,
        url: shareUrl,
      });
    } catch (err) {
      navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard!");
    }
  };

  return (

<Card
  className="group p-1 w-[250px] sm:w-[280px] md:w-[300px] lg:w-[350px] 
             h-[280px] sm:h-[300px] md:h-[320px] lg:h-[360px]
             hover:border-blue-700 transition-colors duration-1000 hover:shadow-[0_2px_15px_rgba(0,0,0,0.5)]"
>
  <CardHeader className="p-0 rounded-md">
    <div className={`relative ${product.isFeatured ? "bg-pink-200" : "bg-orange-200"}`}>
      <Image
        src={product.images?.[0].url}
        alt={product.title}
        width={350}
        height={300}
        className="w-full rounded-md 
                   h-[200px] sm:h-[220px] md:h-[240px] lg:h-[260px] 
                   object-contain bg-blend-saturation transition-transform duration-500 ease-in-out group-hover:scale-95"
        priority
      />
      <div className="absolute right-2 top-2 flex gap-2">
        <Button
          variant="secondary"
          size="icon"
          className="h-7 w-7 sm:h-8 sm:w-8 bg-background/50 opacity-25 group-hover:opacity-95"
          onClick={() => setIsWished(!isWished)}
        >
          <Heart
            className={`h-3 w-3 sm:h-4 sm:w-4 ${isWished ? "fill-current opacity-100 text-red-500" : ""}`}
          />
        </Button>
      </div>
          <span className='absolute bottom-0 -left-4 '>
              <ProductModal
                product={{
                  name: product.title,
                  description: product?.description || '',
                  price: product.price,
                  images: product.images.map(img => img.url),
                  category: product.category.name,
                  localisation: product.localisation ? (product.localisation as unknown as Location) : undefined,
                }}
              />
            </span>
        </div>
      </CardHeader>
      <CardContent className="p-4">
    <div className="flex justify-between items-start mb-2">
      <Link href={`/p/${product.id}`} className="hover:underline">
        <CardTitle className="text-sm sm:text-md md:text-lg font-semibold line-clamp-1">
          {product.title}
        </CardTitle>
      </Link>
      <Badge variant="secondary" className="text-xs sm:text-sm capitalize">
        {product.category.name}
      </Badge>
    </div>
    <CardDescription className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
      {product.description}
    </CardDescription>
  </CardContent>
  <CardFooter className="p-4 pt-0 flex justify-between items-center">
    <CardTitle className="text-md sm:text-lg md:text-xl font-bold text-primary">
      {formatPrice(product.price)}
    </CardTitle>
    <Button
      size="sm"
      variant="secondary"
      className="h-8 w-20 sm:w-24 md:w-28"
      onClick={() => addItemToStorage(product, startTransition, setTriggerUseEffect)}
      disabled={isPending}
    >
      <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
      {isPending ? "Adding..." : "Add"}
    </Button>
    <div className="relative">
      <Button
        variant="secondary"
        size="icon"
        className="h-7 w-7 sm:h-8 sm:w-8 bg-background/50 opacity-25 group-hover:opacity-95 absolute bottom-4 -right-14"
        onClick={() => setShowChat(!showChat)}
      >
        <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>
    </div>
  </CardFooter>
  {showChat && (
    <div className="mt-4 p-4">
      <Chat productId={product.id} />
    </div>
  )}
</Card>
  );
};

export default CardProduct;

