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
import SizeCreationModal from "./SizeCreationModal";
import { fetchSizes } from "@/lib/products";


interface SizeAddProps {
  field: {
    onChange: (value: string) => void;
    value?: string;
  };
}

export function SizeAdd({ field }: SizeAddProps) {
  const [sizes, setSizes] = useState<{ id: string; name: string }[]>([]);
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);

  // Fetch sizes on component mount
  useEffect(() => {
    const loadSizes = async () => {
      const fetchedSizes = await fetchSizes();
      setSizes(fetchedSizes);
    };
    loadSizes();
  }, []);

  const handleSizeCreated = async (newSizeName: string) => {
    // Refetch sizes to ensure latest data
    const updatedSizes = await fetchSizes();
    setSizes(updatedSizes);
    setIsCreationModalOpen(false);
  };

  return (
    <FormItem>
      <FormLabel>Taille</FormLabel>
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
            {sizes.map((size) => (
              <SelectItem key={size.id} value={size.id}>
                {size.name}
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

      <SizeCreationModal 
        open={isCreationModalOpen}
        onClose={() => setIsCreationModalOpen(false)}
        onSizeCreated={handleSizeCreated}
      />
    </FormItem>
  );
}

export default SizeAdd;