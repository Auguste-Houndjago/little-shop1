"use client";

import { useState, useEffect } from "react";
import { Plus, X, Check } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

type TagCategory = 'PRODUCT_QUALITY' | 'SHIPPING_SERVICE' | 'CUSTOMER_SERVICE' | 'PRICE_VALUE' | 'AUTHENTICITY' | 'CUSTOM';

interface Tag {
  id: string;
  name: string;
  category: TagCategory;
  usageCount: number;
  _count?: {
    certifiedBy: number;
  }
}

interface ProductTagManagerProps {
  productId: string;
}

export default function ProductTagManager({ productId }: ProductTagManagerProps) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [newTag, setNewTag] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("CUSTOM");
  const supabase = createClient();

  const categories = [
    { id: "PRODUCT_QUALITY", label: "Qualité du produit" },
    { id: "SHIPPING_SERVICE", label: "Service de livraison" },
    { id: "CUSTOMER_SERVICE", label: "Service client" },
    { id: "PRICE_VALUE", label: "Rapport qualité-prix" },
    { id: "AUTHENTICITY", label: "Authenticité" },
    { id: "CUSTOM", label: "Personnalisé" },
  ];

  useEffect(() => {
    loadProductTags();
  }, [productId]);

  const loadProductTags = async () => {
    const { data, error } = await supabase
      .from('products')
      .select(`
        tags (
          id,
          name,
          category,
          usageCount,
          certifiedBy:user_tags(count)
        )
      `)
      .eq('id', productId)
      .single();

    if (error) {
      toast.error("Erreur lors du chargement des tags");
      return;
    }

    setTags(data?.tags || []);
  };

  const handleAddTag = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTag.trim()) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("Vous devez être connecté");
      return;
    }

    // Créer le tag s'il n'existe pas
    const { data: tagData, error: tagError } = await supabase
      .from('tags')
      .upsert([{
        name: newTag.trim().toLowerCase(),
        category: selectedCategory,
        createdById: user.id
      }], {
        onConflict: 'name'
      })
      .select()
      .single();

    if (tagError) {
      toast.error("Erreur lors de la création du tag");
      return;
    }

    // Associer le tag au produit
    const { error: linkError } = await supabase
      .from('products')
      .update({
        tags: [...tags.map(t => t.id), tagData.id]
      })
      .eq('id', productId);

    if (linkError) {
      toast.error("Erreur lors de l'association du tag");
      return;
    }

    toast.success("Tag ajouté avec succès");
    setNewTag("");
    loadProductTags();
  };

  const removeTag = async (tagId: string) => {
    const { error } = await supabase
      .from('products')
      .update({
        tags: tags.filter(t => t.id !== tagId).map(t => t.id)
      })
      .eq('id', productId);

    if (error) {
      toast.error("Erreur lors de la suppression du tag");
      return;
    }

    toast.success("Tag supprimé");
    loadProductTags();
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleAddTag} className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Nouveau tag..."
            className="flex-1 px-3 py-2 border rounded-lg"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </form>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <div
            key={tag.id}
            className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full"
          >
            <span>{tag.name}</span>
            <span className="text-xs text-gray-500">
              ({tag._count?.certifiedBy || 0})
            </span>
            <button
              onClick={() => removeTag(tag.id)}
              className="p-1 hover:text-red-500"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 