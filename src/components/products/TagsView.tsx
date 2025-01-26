'use client';

import React, { useState, useEffect } from 'react';
import { Tag } from '@prisma/client';
import { Badge } from '@/components/ui/badge';

interface TagsViewProps {
  productId: string;
}

export default function TagsView({ productId }: TagsViewProps) {
  const [productTags, setProductTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductTags = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/tags?productId=${productId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch product tags');
        }

        const tags = await response.json();
        setProductTags(tags);
        setError(null);
      } catch (err) {
        console.error('Error fetching product tags:', err);
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        setProductTags([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      fetchProductTags();
    }
  }, [productId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-3.5">
        <span className="text-sm text-gray-500">Loading tags...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-3.5">
        <span className="text-sm text-red-500">{error}</span>
      </div>
    );
  }

  if (productTags.length === 0) {
    return (
      <div className="flex justify-center items-center py-3.5">
        <span className="text-sm text-gray-500">No tags found</span>
      </div>
    );
  }

  return (
    <div>
<div className="flex flex-wrap gap-1 py-3.5">
  {productTags.map((tag) => (
    <Badge 
      key={tag.id} 
      variant="secondary"
      className="relative px-2 py-1 
        text-[10px]
        text-gray-700
        flex items-center gap-1 cursor-pointer"
    >
      {tag.name} 
      <span 
        className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-1 
         text-black/50 text-xs rounded-md opacity-0 
        group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      >
        {tag.category.toLowerCase().replace('_', ' ')}
      </span>
    </Badge>
  ))}
</div>

    </div>
  );
}