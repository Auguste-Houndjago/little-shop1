"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Share2, ShoppingCart, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { FaWhatsapp } from "react-icons/fa";
import { Product, Image } from "@prisma/client";


interface ProductWithImages extends Product {
  images: Image[];
}

export function WishCard({ 
  product, 
  onRemoveFromWishlist 
}: { 
  product: ProductWithImages, 
  onRemoveFromWishlist?: (productId: string) => void 
}) {
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

  const handleWhatsApp = () => {
    if (product.whatsappLink) {
      const message = encodeURIComponent(`Hi! I'm interested in ${product.title}`);
      window.open(`https://wa.me/${product.whatsappLink}?text=${message}`, "_blank");
    }
  };

  const handleRemoveFromWishlist = () => {
    if (onRemoveFromWishlist) {
      onRemoveFromWishlist(product.id);
      toast.success(`${product.title} removed from wishlist`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="group relative overflow-hidden">
        <CardHeader>
          <div className="aspect-square overflow-hidden rounded-lg relative">
            <img
              src={product.images[0]?.url || '/placeholder-image.png'}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            {onRemoveFromWishlist && (
              <Button 
                variant="destructive" 
                size="icon" 
                className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handleRemoveFromWishlist}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="p-4 space-y-2">
          <CardTitle className="text-lg font-semibold truncate">{product.title}</CardTitle>
          <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-primary">
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(product.price))}
            </span>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 flex justify-between gap-2">
          <Button 
            variant="outline" 
            className="flex-1" 
            onClick={handleShare}
          >
            <Share2 className="mr-2 h-4 w-4" /> Share
          </Button>
          <Button 
            variant="secondary" 
            className="flex-1" 
            onClick={handleWhatsApp}
          >
            <FaWhatsapp className="mr-2 h-4 w-4" /> WhatsApp
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
