'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Recursive } from 'next/font/google';
import { Star } from 'lucide-react';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { cn, formatPrice } from '@/lib/utils';
import { createClient } from '@/utils/supabase/client';
const supabase = createClient();


const recursive = Recursive({ subsets: ['latin'] });


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

const ProductsCard = () => {
    const [products, setProducts] = useState<ProductDetail[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    


  
    useEffect(() => {
        const fetchProducts = async () => {
            try {
          
                const { data, error } = await supabase
                    .rpc('get_all_product_details')
                    .select('*')
                    .throwOnError();
                
                if (error) throw error;
                
           
        const formattedProducts = data.map(product => ({
            ...product,
            images: Array.isArray(product.images) ? product.images : [product.images].filter(Boolean),
        }));

                setProducts(formattedProducts);
            } catch (err: any) {
                console.error('Error fetching products:', err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

 
    const calculateAverageRating = (reviews: ProductDetail['reviews']) => {
        if (!reviews || reviews.length === 0) return 0;
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        return Math.round(totalRating / reviews.length);
    };

    if (isLoading) return (
        <div className="flex justify-center items-center h-64">
            <p>...</p>
        </div>
    );

    if (error) return (
        <div className="flex justify-center items-center h-64 text-red-500">
            <p>Erreur de chargement: {error}</p>
        </div>
    );

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {products.map((product) => (
                <Card 
                    key={product.id} 
                    className='group p-1 hover:border-blue-700 transition-colors duration-1000 hover:shadow-[0_2px_15px_rgba(0,0,0,0.5)]'
                >
                    <CardHeader className='p-2'>
                        <div className='relative'>
                            <Image
                                src={product.images?.[0] || '/placeholder.png'}
                                alt={product.title}
                                width={300}
                                height={260}
                                className="w-full h-[260px] transition-transform duration-500 ease-in-out object-cover rounded-lg group-hover: group-hover:-translate-y-2"
                                priority
                            />
                            {product.is_featured && (
                                <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs">
                                    Featured
                                </div>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent className='p-2 bg-[rgba(80,240,240,0.7)]
 '>
                        <CardContent className='flex  gap-x-2 justify-between items-center'>
                            <Link
                                href={`/p/${product.id}`}
                                className='hover:underline flex-grow'
                            >
                                <CardTitle className='text-xl'>{product.title}</CardTitle>
                            </Link>
                            <div className="flex items-center space-x-1 text-yellow-500">
                                {[...Array(calculateAverageRating(product.reviews))].map((_, i) => (
                                    <Star key={i} size={16} fill="currentColor" />
                                ))}
                                <span className="text-gray-500 text-sm ml-1">
                                    ({product.reviews?.length || 0})
                                </span>
                            </div>
                        </CardContent>
                        <CardDescription className='capitalize'>
                            {product.category_name} • {product.color_name} • {product.size_value}
                        </CardDescription>
                        <CardDescription className="text-sm p-0 text-gray-500 line-clamp-2">
                            {product.description}
                        </CardDescription>
                    </CardContent>
                    <CardFooter className='p-2 flex justify-between items-center'>
                        <CardTitle className='text-lg'>{formatPrice(product.price)}</CardTitle>
                        <div className="flex items-center space-x-2">
                            {product.stock > 0 ? (
                                <Button
                                    className={cn(
                                        recursive.className,
                                        'tracking-[.1rem] rounded-sm'
                                    )}
                                    disabled={product.stock === 0}
                                >
                                    Ajouter au panier
                                </Button>
                            ) : (
                                <span className="text-red-500 text-sm">Rupture de stock</span>
                            )}
                            {product.whatsapp_link && (
                                <Link 
                                    href={product.whatsapp_link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-green-500 hover:underline"
                                >
                                    WhatsApp
                                </Link>
                            )}
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
};

export default ProductsCard;