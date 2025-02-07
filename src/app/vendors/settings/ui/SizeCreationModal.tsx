"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { saveSize } from "@/dashboard/sizes/_utils/actions"; // You'll need to create this action

interface SizeCreationModalProps {
  open: boolean;
  onClose: () => void;
  onSizeCreated?: (sizeName: string) => void;
}

const SizeCreationModal: React.FC<SizeCreationModalProps> = ({
  open,
  onClose,
  onSizeCreated,
}) => {
  const [sizeName, setSizeName] = useState("");
  const [sizeValue, setSizeValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateSize = async () => {
    if (!sizeName || !sizeValue) {
      toast.error("Veuillez remplir le nom et la valeur de la taille");
      return;
    }

    setIsLoading(true);
    try {
      const result = await saveSize({ 
        name: sizeName, 
        value: sizeValue 
      });

      if (result.success) {
        toast.success("Taille créée avec succès");
        onSizeCreated?.(sizeName);
        onClose();
        setSizeName("");
        setSizeValue("");
      } else {
        toast.error("Échec de la création de la taille");
      }
    } catch (error) {
      toast.error("Une erreur s'est produite lors de la création de la taille");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Créer une nouvelle taille</DialogTitle>
          <DialogDescription>Ajouter une nouvelle taille de produit</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nom
            </Label>
            <Input
              id="name"
              value={sizeName}
              onChange={(e) => setSizeName(e.target.value)}
              className="col-span-3"
              placeholder="Entrez le nom de la taille (ex: S, M, L)"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="value" className="text-right">
              Valeur
            </Label>
            <Input
              id="value"
              value={sizeValue}
              onChange={(e) => setSizeValue(e.target.value)}
              className="col-span-3"
              placeholder="Entrez la valeur de la taille (ex: 38, 40)"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button 
            onClick={handleCreateSize} 
            disabled={isLoading || !sizeName || !sizeValue}
          >
            {isLoading ? "Création en cours..." : "Créer la taille"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SizeCreationModal;