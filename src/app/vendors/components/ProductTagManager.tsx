"use client";

import { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Tag {
  id: string;
  name: string;
  category: string;
}

export default function ProductTagManager({ productId }: { productId: string }) {
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [productTags, setProductTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadTags = async () => {
      try {
        const tagsResponse = await fetch("/api/vendor/tags");
        const allTags = await tagsResponse.json();
        setAvailableTags(allTags);

        const productTagsResponse = await fetch(`/api/vendor/products/${productId}/tags`);
        const currentTags = await productTagsResponse.json();
        setProductTags(currentTags);
      } catch (error) {
        toast.error("Erreur lors du chargement des tags");
      }
    };
    loadTags();
  }, [productId]);

  const handleAddTag = async (tagId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/vendor/products/${productId}/tags`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tagId })
      });

      if (!response.ok) throw new Error("Failed to add tag");

      const updatedProduct = await response.json();
      setProductTags(updatedProduct.tags);
      toast.success("Tag ajouté avec succès");
    } catch (error) {
      toast.error("Erreur lors de l'ajout du tag");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveTag = async (tagId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/vendor/products/${productId}/tags`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tagId })
      });

      if (!response.ok) throw new Error("Failed to remove tag");

      const updatedProduct = await response.json();
      setProductTags(updatedProduct.tags);
      toast.success("Tag retiré avec succès");
    } catch (error) {
      toast.error("Erreur lors du retrait du tag");
    } finally {
      setIsLoading(false);
    }
  };

  const unassignedTags = availableTags.filter(
    tag => !productTags.some(pt => pt.id === tag.id)
  );

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Tags actuels</h3>
        <div className="flex flex-wrap gap-2">
          {productTags.map((tag) => (
            <Badge 
              key={tag.id}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {tag.name}
              <button
                onClick={() => handleRemoveTag(tag.id)}
                disabled={isLoading}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Tags disponibles</h3>
        <div className="flex flex-wrap gap-2">
          {unassignedTags.map((tag) => (
            <Button
              key={tag.id}
              variant="outline"
              size="sm"
              onClick={() => handleAddTag(tag.id)}
              disabled={isLoading}
              className="flex items-center gap-1"
            >
              <Plus className="h-3 w-3" />
              {tag.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
} 