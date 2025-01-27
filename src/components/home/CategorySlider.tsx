'use client'
import React from 'react';

import prisma from '@/lib/prisma';



import { CategoryCard } from "./CategoryCard";

async function fetchCategories() {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        billboard: true,
      },
      orderBy: {
        name: 'asc'
      }
    });
    return categories;
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
}

export async function CategorySlider() {
  const categories = await fetchCategories();

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Browse Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.slice(0.3).map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}