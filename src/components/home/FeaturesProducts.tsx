'use client';

import React, { useEffect, useState } from 'react';
import CardProduct from './CardProduct';
import { Color, Image, Product, Size } from '@prisma/client';

type ProductFeatured = {
  images: Image[];
  category: {
    name: string;
  };
  color: Color;
  size: Size;
} & Product;

const FeaturesProducts = () => {
  const [products, setProducts] = useState<ProductFeatured[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/featured-products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-48 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-nowrap overflow-x-auto gap-5 pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {products.map((product) => (
          <div key={product.id} className="w-[430px] sm:w-[300px] md:w-[430px]">
            <CardProduct product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesProducts;
