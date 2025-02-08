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
import ColorCreationModal from "./ColorCreationModal";
import { fetchColors } from "@/lib/products";


interface ColorAddProps {
  field: {
    onChange: (value: string) => void;
    value?: string;
  };
}

export function ColorAdd({ field }: ColorAddProps) {
  const [colors, setColors] = useState<{ id: string; name: string; color: string }[]>([]);
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);

 
  useEffect(() => {
    const loadColors = async () => {
      const fetchedColors = await fetchColors();
      setColors(fetchedColors);
    };
    loadColors();
  }, []);

  const handleColorCreated = async (newColorName: string) => {

    const updatedColors = await fetchColors();
    setColors(updatedColors);
    setIsCreationModalOpen(false);
  };

  return (
    <FormItem className="md:w-full">
      <FormLabel>Couleur</FormLabel>
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
            {colors.map((color) => (
              <SelectItem key={color.id} value={color.id} className="flex items-center space-x-2">
                <div 
                  className="w-5 h-5 rounded-full border" 
                  style={{ backgroundColor: color.color }}
                />
                <span>{color.name}</span>
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

      <ColorCreationModal 
        open={isCreationModalOpen}
        onClose={() => setIsCreationModalOpen(false)}
        onColorCreated={handleColorCreated}
      />
    </FormItem>
  );
}

export default ColorAdd;