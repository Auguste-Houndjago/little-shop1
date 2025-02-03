"use client"

import React, { useState, useEffect } from 'react';
import ProductHero from './ProductHero';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { fetchCategory, fetchProductsByCategory } from '@/lib/products';

interface Category {
  id: string;
  name: string;
  billboard?: string;
}

export default function ProductsByCategory() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await fetchCategory();
        setCategories(fetchedCategories);
        
        // Select first category by default
        if (fetchedCategories.length > 0) {
          setSelectedCategory(fetchedCategories[0].id);
        }
      } catch (error) {
        console.error('Failed to load categories', error);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      if (selectedCategory) {
        setIsLoading(true);
        try {
          const fetchedProducts = await fetchProductsByCategory(selectedCategory);
          setProducts(fetchedProducts);
        } catch (error) {
          console.error('Failed to load products', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadProducts();
  }, [selectedCategory]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Browse Products by Category</h2>
      
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-2 pb-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                ${selectedCategory === category.id 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }
              `}
            >
              {category.name}
            </button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="mt-6">
        {isLoading ? (
          <div className="text-center text-gray-500">Loading products...</div>
        ) : products.length > 0 ? (
          <ProductHero products={products} />
        ) : (
          <div className="text-center text-gray-500">No products found in this category</div>
        )}
      </div>
    </div>
  );
}