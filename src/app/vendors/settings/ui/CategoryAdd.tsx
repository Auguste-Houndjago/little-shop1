"use client";

import React, { useState, useEffect } from "react";
import { 
  FormControl, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import CategoryCreationModal from "./CategorySelectorModal";
import { fetchCategories } from "@/lib/products";


interface CategoryAddProps {
  field: {
    onChange: (value: string) => void;
    value?: string;
  };
}

export function CategoryAdd({ field }: CategoryAddProps) {
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
    };
    loadCategories();
  }, []);

  const handleCategoryCreated = async (newCategoryName: string) => {
  
    const updatedCategories = await fetchCategories();
    setCategories(updatedCategories);
    setIsCreationModalOpen(false);
  };

  return (
    <FormItem>
      <FormLabel>Catégorie</FormLabel>
      <div className="flex items-center space-x-2">
        <Select 
          onValueChange={field.onChange} 
          defaultValue={field.value}
        >
          <FormControl>
            <SelectTrigger className="bg-white/50 flex-grow">
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button 
          type="button"
          variant="outline" 
          size="icon" 
          onClick={() => setIsCreationModalOpen(true)}
        >
          <PlusIcon className="h-4 w-4" />
        </Button>
      </div>
      <FormMessage />

      <CategoryCreationModal 
        open={isCreationModalOpen}
        onClose={() => setIsCreationModalOpen(false)}
        onCategoryCreated={handleCategoryCreated}
      />
    </FormItem>
  );
}

export default CategoryAdd;