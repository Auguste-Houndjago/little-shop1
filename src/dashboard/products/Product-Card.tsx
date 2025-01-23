"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Share2, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { FaWhatsapp } from "react-icons/fa";
import { Product, Image } from "@prisma/client";

interface ProductWithImages extends Product {
  images: Image[];
}

export function ProductCard({ product }: { product: ProductWithImages }) {
  const [isWished, setIsWished] = useState(false);

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

  const price = Number(product.price.toString());

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="group relative overflow-hidden">
        <CardHeader>
          <div className="aspect-square overflow-hidden rounded-lg">
            <img
              src={product.images[0]?.url || "/placeholder-image.jpg"} // Utilisation de l'URL de l'image
              alt={product.title}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
          <div className="absolute right-4 top-4 flex gap-2">
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsWished(!isWished)}
            >
              <Heart
                className={`h-4 w-4 ${isWished ? "fill-current text-red-500" : ""}`}
              />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" /> 
            </Button>
            {product.whatsappLink && (
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8"
                onClick={handleWhatsApp}
              >
                <FaWhatsapp className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <CardTitle className="mb-2 line-clamp-2">{product.title}</CardTitle>
          <p className="text-xl font-bold">${price}</p>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
