'use client';

import React, { useState, useEffect } from 'react';
import { Tag } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface ProductTagsProps {
  productId: string;
  initialTags?: Tag[];
}

export function ProductTags({ productId, initialTags = [] }: ProductTagsProps) {
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [productTags, setProductTags] = useState<Tag[]>(initialTags);
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch available tags
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch('/api/tags');
        if (!response.ok) {
          throw new Error('Failed to fetch tags');
        }
        const tags = await response.json();
        
        // Filter out tags already associated with the product
        const unassignedTags = tags.filter(
          (tag: Tag) => !productTags.some(productTag => productTag.id === tag.id)
        );
        
        setAvailableTags(unassignedTags);
      } catch (error) {
        console.error('Error fetching tags:', error);
        toast.error('Failed to load available tags');
      }
    };

    fetchTags();
  }, [productTags]);

  // Add tag to product
  const handleAddTag = async () => {
    if (!selectedTagId) {
      toast.error('Please select a tag');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/tags', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          tagIds: [selectedTagId]
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add tag');
      }

      const updatedProduct = await response.json();
      
      // Update local state
      setProductTags(updatedProduct.tags);
      setSelectedTagId(null);

      toast.success('Tag added successfully');
    } catch (error) {
      console.error('Error adding tag:', error);
      toast.error(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Remove tag from product
  const handleRemoveTag = async (tagId: string) => {
    setIsLoading(true);
    try {
      // Note: This would require a new API endpoint to remove tags
      // For now, we'll simulate the removal
      const updatedTags = productTags.filter(tag => tag.id !== tagId);
      
      const response = await fetch('/api/tags', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          tagIds: updatedTags.map(tag => tag.id)
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to remove tag');
      }

      setProductTags(updatedTags);
      toast.success('Tag removed successfully');
    } catch (error) {
      console.error('Error removing tag:', error);
      toast.error(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {productTags.map((tag) => (
          <Badge 
            key={tag.id} 
            variant="secondary" 
            className="flex items-center"
          >
            {tag.name}
            <Button
              variant="ghost"
              size="icon"
              className="ml-2 h-4 w-4"
              onClick={() => handleRemoveTag(tag.id)}
              disabled={isLoading}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            <Plus className="mr-2 h-4 w-4" /> Add Tag
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Tag to Product</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <Select 
              value={selectedTagId || undefined}
              onValueChange={setSelectedTagId}
              disabled={isLoading || availableTags.length === 0}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a tag" />
              </SelectTrigger>
              <SelectContent>
                {availableTags.length === 0 ? (
                  <div className="p-2 text-center text-muted-foreground">
                    No available tags
                  </div>
                ) : (
                  availableTags.map((tag) => (
                    <SelectItem key={tag.id} value={tag.id}>
                      {tag.name} ({tag.category})
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>

            <Button 
              onClick={handleAddTag} 
              disabled={isLoading || !selectedTagId}
              className="w-full"
            >
              {isLoading ? 'Adding Tag...' : 'Add Tag'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}