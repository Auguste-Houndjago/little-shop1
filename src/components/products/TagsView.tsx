'use client';

import React, { useState, useEffect } from 'react';
import { Tag, TagCertification } from '@prisma/client';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle,
  DollarSign,
  Truck,
  Wrench,
  PackageOpen,
  MessagesSquare,
  ShieldCheck,
} from 'lucide-react';
import { toast } from 'sonner';

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
  const [productTags, setProductTags] = useState<(Tag & { certifications?: TagCertification[] })[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductTags = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/tags?productId=${productId}&withCertifications=true`);

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

  const handleTagCertification = async (tagId: string) => {
    try {
      const response = await fetch('/api/tags/certify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          tagId, 
          productId  
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to certify/de-certify tag');
      }

      const updatedTag = await response.json();

      // Update the tags state to reflect the new certification status
      setProductTags(prevTags => 
        prevTags.map(tag => 
          tag.id === tagId 
            ? { 
                ...tag, 
                certifications: updatedTag.certifications,
                certified: updatedTag.certified 
              } 
            : tag
        )
      );

   
      const isCertified = updatedTag.certifications && updatedTag.certifications.length > 0;
      toast.success(
        isCertified 
          ? 'Tag certified successfully!' 
          : 'Tag certification removed.'
      );
    } catch (err) {
      console.error('Error processing tag certification:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to process tag certification');
    }
  };

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
          const isCertified = tag.certifications && tag.certifications.length > 0;

          return (
            <Badge
              key={tag.id}
              variant={"secondary"}
              onClick={() => handleTagCertification(tag.id)}
              className={`relative px-2 py-1 
                text-[10px]
                text-gray-700
                flex items-center gap-1 cursor-pointer group
                hover:bg-blue-100 transition-colors duration-200 ${tag.certified !== 0? 'shadow-md shadow-blue-200': ''}  `}
            >
              <span className={` inline-flex items-center justify-center  gap-1 `}>
                {tag.name}
                {Icon && <Icon className="ml-1 drop-shadow-sm" size={10} />}
              
                  <span className="ml-0 text-black/80 font-bold">
                    {tag.certified || 0} 
                  </span>
            
              </span>
            </Badge>
          );
        })}
      </div>
    </div>
  );
} 
