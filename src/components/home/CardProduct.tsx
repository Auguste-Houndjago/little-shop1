'use client';

import React from 'react';
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
import { ShoppingCart, Eye } from 'lucide-react';

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
  const { setTriggerUseEffect } = useTriggerUseEffect();

  return (
    <Card className="group overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-300 hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden">
          <Image
            src={product.images[0].url || "/placeholder.svg"}
            alt={product.title}
            width={300}
            height={260}
            className="w-full h-[260px] object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="space-x-2">
              <Button
                size="sm"
                variant="secondary"
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"
                onClick={() => addItemToStorage(product, startTransition, setTriggerUseEffect)}
                disabled={isPending}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {isPending ? 'Adding...' : 'Add to Cart'}
              </Button>
<span className=' absolute top-4 right-4 '>
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
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link href={`/p/${product.id}`} className="hover:underline">
            <CardTitle className="text-lg font-semibold line-clamp-1">{product.title}</CardTitle>
          </Link>
          <Badge variant="secondary" className="capitalize">
            {product.category.name}
          </Badge>
        </div>
        <CardDescription className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <CardTitle className="text-xl font-bold text-primary">{formatPrice(product.price)}</CardTitle>
        <Button
          size="sm"
          className={cn(recursive.className, 'tracking-wider')}
          onClick={() => addItemToStorage(product, startTransition, setTriggerUseEffect)}
          disabled={isPending}
        >
          {isPending ? 'Adding...' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardProduct;

