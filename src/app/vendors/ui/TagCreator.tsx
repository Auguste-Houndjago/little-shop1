'use client';

import React, { useState } from 'react';
import { TagCategory } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const TAG_CATEGORIES: TagCategory[] = [
  'PRODUCT_QUALITY',
  'SHIPPING_SERVICE', 
  'CUSTOMER_SERVICE', 
  'PRICE_VALUE', 
  'AUTHENTICITY', 
  'CUSTOM'
];

export function TagCreator() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<TagCategory>('CUSTOM');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateTag = async () => {
    // Validate inputs
    if (!name.trim()) {
      toast.error('Tag name is required');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          category,
          description: description.trim() || undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create tag');
      }

      const newTag = await response.json();
      
      // Reset form
      setName('');
      setCategory('CUSTOM');
      setDescription('');

      // Show success toast
      toast.success(`Tag "${newTag.name}" created successfully`);
    } catch (error) {
      console.error('Tag creation error:', error);
      toast.error(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Create New Tag</h2>
      
      <div className="space-y-2">
        <label htmlFor="tag-name" className="block text-sm font-medium text-gray-700">
          Tag Name
        </label>
        <Input
          id="tag-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter tag name"
          disabled={isLoading}
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="tag-category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <Select 
          value={category} 
          onValueChange={(value: TagCategory) => setCategory(value)}
          disabled={isLoading}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select tag category" />
          </SelectTrigger>
          <SelectContent>
            {TAG_CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat.replace('_', ' ').toLowerCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label htmlFor="tag-description" className="block text-sm font-medium text-gray-700">
          Description (Optional)
        </label>
        <Textarea
          id="tag-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Provide a brief description of the tag"
          disabled={isLoading}
          rows={3}
        />
      </div>

      <Button 
        onClick={handleCreateTag} 
        disabled={isLoading || !name.trim()}
        className="w-full"
      >
        {isLoading ? 'Creating Tag...' : 'Create Tag'}
      </Button>
    </div>
  );
}