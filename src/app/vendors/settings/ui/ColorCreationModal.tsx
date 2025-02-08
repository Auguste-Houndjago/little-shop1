"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { saveColor } from "@/dashboard/colors/_utils/actions"
import { Paintbrush } from "lucide-react"
import { MdFormatColorFill } from "react-icons/md"

interface ColorCreationModalProps {
  open: boolean
  onClose: () => void
  onColorCreated?: (colorName: string) => void
}

const ColorCreationModal: React.FC<ColorCreationModalProps> = ({ open, onClose, onColorCreated }) => {
  const [colorName, setColorName] = useState("")
  const [colorHex, setColorHex] = useState("#000000")
  const [isLoading, setIsLoading] = useState(false)

  const handleCreateColor = async () => {
    if (!colorName || !colorHex) {
      toast.error("Veuillez remplir le nom et le code couleur")
      return
    }

    setIsLoading(true)
    try {
      const result = await saveColor({
        name: colorName,
        color: colorHex,
      })

      if (result.success) {
        toast.success("Couleur créée avec succès")
        onColorCreated?.(colorName)
        onClose()
        setColorName("")
        setColorHex("#000000")
      } else {
        toast.error("Échec de la création de la couleur")
      }
    } catch (error) {
      toast.error("Une erreur s'est produite lors de la création de la couleur")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Paintbrush className="h-6 w-6" />
            Nouvelle Couleur
          </DialogTitle>
          <DialogDescription>Ajoutez une nouvelle couleur à votre palette de produits</DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Nom de la couleur
            </Label>
            <Input
              id="name"
              value={colorName}
              onChange={(e) => setColorName(e.target.value)}
              className="col-span-3"
              placeholder="ex: Rouge Cerise, Bleu Océan"
            />
          </div>
          <div className="grid gap-2 ">
            <Label htmlFor="hex" className="text-sm font-medium">
              Code Couleur
            </Label>
            <div className="flex items-center rounded-lg gap-4">
              <Input
                id="hex"
                type="color"
                value={colorHex}
                onChange={(e) => setColorHex(e.target.value)}
                className="h-10 w-20 p-1 rounded-md cursor-pointer"
              />
              <Input
                value={colorHex}
                onChange={(e) => setColorHex(e.target.value)}
                className="flex-grow"
                placeholder="#RRGGBB"
              />
            </div>
          </div>
          <div className="h-24 rounded-md" style={{ backgroundColor: colorHex }}>
            <div className="flex h-full items-center justify-center">
              <span className="text-lg font-semibold" style={{ color: getContrastColor(colorHex) }}>
             <MdFormatColorFill />
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleCreateColor} disabled={isLoading || !colorName || !colorHex} className="min-w-[120px]">
            {isLoading ? "Création..." : "Créer"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Helper function to determine text color based on background
function getContrastColor(hexColor: string) {
  const r = Number.parseInt(hexColor.slice(1, 3), 16)
  const g = Number.parseInt(hexColor.slice(3, 5), 16)
  const b = Number.parseInt(hexColor.slice(5, 7), 16)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? "#000000" : "#FFFFFF"
}

export default ColorCreationModal

