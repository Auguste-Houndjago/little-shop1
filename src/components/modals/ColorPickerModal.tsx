'use client';

import React from 'react';
import { HexColorPicker } from "react-colorful";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';

interface ColorPickerModalProps {
  open: boolean;
  onClose: () => void;
  onColorSelect: (color: string) => void;
  initialColor?: string;
}

const ColorPickerModal = ({
  open,
  onClose,
  onColorSelect,
  initialColor = "#000000"
}: ColorPickerModalProps) => {
  const [color, setColor] = React.useState(initialColor);

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
  };

  const handleSubmit = () => {
    onColorSelect(color);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Choose a Color</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-4">
          <HexColorPicker color={color} onChange={handleColorChange} />
          <div className="flex items-center gap-2 mt-4">
            <div 
              className="w-10 h-10 rounded-full border"
              style={{ backgroundColor: color }}
            />
            <span className="text-sm font-medium">{color}</span>
          </div>
          <div className="flex justify-end gap-2 w-full mt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              Select Color
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ColorPickerModal;
