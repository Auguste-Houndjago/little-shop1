"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { saveColor } from "@/dashboard/colors/_utils/actions"; // You'll need to create this action

interface ColorCreationModalProps {
  open: boolean;
  onClose: () => void;
  onColorCreated?: (colorName: string) => void;
}

const ColorCreationModal: React.FC<ColorCreationModalProps> = ({
  open,
  onClose,
  onColorCreated,
}) => {
  const [colorName, setColorName] = useState("");
  const [colorHex, setColorHex] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateColor = async () => {
    if (!colorName || !colorHex) {
      toast.error("Veuillez remplir le nom et le code couleur");
      return;
    }

    setIsLoading(true);
    try {
      const result = await saveColor({ 
        name: colorName, 
        color: colorHex 
      });

      if (result.success) {
        toast.success("Couleur créée avec succès");
        onColorCreated?.(colorName);
        onClose();
        setColorName("");
        setColorHex("");
      } else {
        toast.error("Échec de la création de la couleur");
      }
    } catch (error) {
      toast.error("Une erreur s'est produite lors de la création de la couleur");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Créer une nouvelle couleur</DialogTitle>
          <DialogDescription>Ajouter une nouvelle couleur de produit</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nom
            </Label>
            <Input
              id="name"
              value={colorName}
              onChange={(e) => setColorName(e.target.value)}
              className="col-span-3"
              placeholder="Entrez le nom de la couleur (ex: Rouge, Bleu)"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="hex" className="text-right">
              Code Couleur
            </Label>
            <Input
              id="hex"
              type="color"
              value={colorHex}
              onChange={(e) => setColorHex(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button 
            onClick={handleCreateColor} 
            disabled={isLoading || !colorName || !colorHex}
          >
            {isLoading ? "Création en cours..." : "Créer la couleur"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ColorCreationModal;