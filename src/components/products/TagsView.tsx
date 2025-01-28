'use client';

import React, { useState, useEffect } from 'react';
import { Tag } from '@prisma/client';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle,
  DollarSign,
  Truck,
  Wrench,
  PackageOpen,
  MessagesSquare,
} from 'lucide-react';

interface TagsViewProps {
  productId: string;
}

const categoryIcons = {
  PRODUCT_QUALITY: CheckCircle,
  SHIPPING_SERVICE: Truck,
  CUSTOMER_SERVICE: MessagesSquare,
  PRICE_VALUE: DollarSign,
  AUTHENTICITY: PackageOpen,
  CUSTOM: Wrench,
};

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
        setError(
          err instanceof Error ? err.message : 'An unexpected error occurred'
        );
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
        <span className="text-sm text-gray-500">...</span>
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
        {productTags.map((tag) => { 
          const Icon = categoryIcons[tag.category as keyof typeof categoryIcons];
          return (
            <Badge
              key={tag.id}
              variant="secondary"
              className="relative px-2 py-1 
                text-[10px]
                text-gray-700
                flex items-center gap-1 cursor-pointer group"
            >
              {tag.name}
              <span
  className="absolute -top-3 -left-2  
             text-black/80 text-xs rounded-m opacity-0 
             group-hover:opacity-90 transition-opacity duration-300 
             pointer-events-none flex items-center justify-center "
>
  {Icon && <Icon className='drop-shadow-sm' size={16} />}
</span>

            </Badge>
          );
        })}
      </div>
    </div>
  );
}
