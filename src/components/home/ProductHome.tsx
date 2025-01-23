"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import { Share2, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

import { createClient } from '@/utils/supabase/client';
const supabase = createClient();

interface ProductDetail {
  id: string;
  title: string;
  description: string;
  price: number;
  is_featured: boolean;
  is_archived: boolean;
  stock: number;
  whatsapp_link: string;
  localisation: Record<string, any>;
  category_name: string;
  color_name: string;
  size_value: string;
  created_at: string;
  updated_at: string;
  images: string[];
  reviews: Array<{
    rating: number;
    comment: string;
    user: string;
  }>;
}

export const ProductHome = () => {
  const [products, setProducts] = useState<ProductDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase.rpc("get_all_product_details").select("*").throwOnError();

        if (error) throw error;

        const formattedProducts = data.map((product: ProductDetail) => ({
          ...product,
          images: Array.isArray(product.images) ? product.images : [product.images].filter(Boolean),
        }));

        setProducts(formattedProducts);
      } catch (err: any) {
        console.error("Error fetching products:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {products.map((Product) => (
        <div key={Product.id} className="group relative rounded-3xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
          <div className="p-3 space-y-4">
            <div className="aspect-square rounded-2xl bg-gray-100 relative overflow-hidden">
              <Image src={Product.images?.[0] || "/placeholder.svg"} alt={Product.title} fill className="object-cover" />
              <div className="absolute inset-x-0 top-0 p-3 flex justify-between items-start">
                <div className="flex items-center bg-white/80 rounded-full px-2 py-1">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-xs font-semibold">
                  
                  </span>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-white/80 hover:bg-white">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="font-medium rounded-full px-3 bg-gray-100 hover:bg-gray-200">
                  {Product.category_name}
                </Badge>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
              <h3 className="font-semibold text-lg truncate">{Product.title}</h3>
              <div className="flex items-center justify-between pt-2">
                <p className="font-semibold text-xl">{formatPrice(Product.price)}</p>
                <Badge variant={Product.is_featured ? "default" : "destructive"} className="rounded-full px-3">
                  {Product.is_featured ? "Featured" : "Regular"}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
