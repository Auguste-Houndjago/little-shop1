"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShoppingCart, Heart } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { addItemToStorage, formatPrice } from "@/lib/utils";
import { ProductModal } from "@/components/products/ProductModal";
import useTriggerUseEffect from "@/hooks/useTriggerUseEffect";
import { ProductFeatured } from '../../app/(home)/page';



export const ProductCards = ({ product }: { product: ProductFeatured }) => {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();
  const { setTriggerUseEffect } = useTriggerUseEffect();
  const [isLiked, setIsLiked] = useState(false);

  return (
    <Card className="group p-1 hover:border-blue-700 transition-colors duration-1000 hover:shadow-[0_2px_15px_rgba(0,0,0,0.5)]">
      <CardHeader className="p-0 relative">
        <Image
          src={product.images[0]?.url || "/placeholder.svg"}
          alt={product.title}
          width={300}
          height={260}
          className="w-full h-[260px] object-cover transition-transform duration-500 ease-in-out group-hover:scale-95"
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
              <ShoppingCart className="w-4 h-4" />
              {isPending ? "Adding..." : "Add to Cart"}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-current text-red-500" : "text-white"}`} />
            </Button>
          </div>
          <div className="absolute top-4 right-4">
            <ProductModal
              product={{
                name: product.title,
                description: product.description || "",
                price: product.price,
                images: product.images.map((img) => img.url),
                category: product.category.name,
             
              }}
            />
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
          variant="secondary"
          onClick={() => addItemToStorage(product, startTransition, setTriggerUseEffect)}
          disabled={isPending}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {isPending ? "Adding..." : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
};
