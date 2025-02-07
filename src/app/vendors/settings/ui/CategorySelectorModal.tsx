"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { saveCategory } from "@/dashboard/categories/_utils/actions";

interface CategoryCreationModalProps {
  open: boolean;
  onClose: () => void;
  onCategoryCreated?: (categoryName: string) => void;
}

const CategoryCreationModal: React.FC<CategoryCreationModalProps> = ({
  open,
  onClose,
  onCategoryCreated,
}) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryTitle, setCategoryTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateCategory = async () => {
    if (!categoryName || !categoryTitle) {
      toast.error("Veuillez remplir le nom et le titre de la catégorie");
      return;
    }

    setIsLoading(true);
    try {
      const result = await saveCategory({ 
        name: categoryName, 
        title: categoryTitle, 
        url: "/default-category.jpg" 
      });

      if (result.success) {
        toast.success("Catégorie créée avec succès");
        onCategoryCreated?.(categoryName);
        onClose();
        setCategoryName("");
        setCategoryTitle("");
      } else {
        toast.error( "Échec de la création de la catégorie");
      }
    } catch (error) {
      toast.error("Une erreur s'est produite lors de la création de la catégorie");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Créer une nouvelle catégorie</DialogTitle>
          <DialogDescription>Ajouter une nouvelle catégorie de produit</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nom
            </Label>
            <Input
              id="name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="col-span-3"
              placeholder="Entrez le nom de la catégorie (ex: électronique)"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Titre
            </Label>
            <Input
              id="title"
              value={categoryTitle}
              onChange={(e) => setCategoryTitle(e.target.value)}
              className="col-span-3"
              placeholder="Entrez le titre de la catégorie"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button 
            onClick={handleCreateCategory} 
            disabled={isLoading || !categoryName || !categoryTitle}
          >
            {isLoading ? "Création en cours..." : "Créer la catégorie"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryCreationModal;