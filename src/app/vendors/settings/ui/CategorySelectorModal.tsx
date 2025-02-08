"use client";

import React, { useState, useRef, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ImagePlus, Trash } from "lucide-react";
import { saveCategory } from "@/dashboard/categories/_utils/actions";
import { createClient } from '@/utils/supabase/client';
import imageCompression from 'browser-image-compression';

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
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const supabase = createClient();

  const compressImage = async (file: File) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    };
    try {
      return await imageCompression(file, options);
    } catch (error) {
      console.error('Image compression error:', error);
      return file;
    }
  };

  const handlePreview = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentFile = e.target.files?.[0];
    if (!currentFile) return null;

    if (currentFile.size < 4 * 1024 * 1024) {
      try {
        const compressedFile = await compressImage(currentFile);
        setPreview(URL.createObjectURL(compressedFile));
        setFile(compressedFile);
      } catch (error) {
        toast.error("Image processing failed");
      }
    } else {
      toast.error("Maximum file size is 4MB");
    }
  }, []);

  const resetForm = () => {
    setCategoryName("");
    setCategoryTitle("");
    setFile(null);
    setPreview(null);
  };

  const handleCreateCategory = async () => {
    if (!categoryName || !categoryTitle) {
      toast.error("Please fill in both name and title");
      return;
    }

    if (!file) {
      toast.error("Please select an image");
      return;
    }

    setIsLoading(true);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error("Not authenticated");
      }

      // Upload image to Supabase Storage
      const fileName = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from('categories')
        .upload(`${session.user.id}/${fileName}`, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('categories')
        .getPublicUrl(`${session.user.id}/${fileName}`);

      const { success } = await saveCategory({ 
        name: categoryName, 
        title: categoryTitle, 
        url: publicUrl 
      });

      if (success) {
        toast.success("Category created successfully", {
          duration: 1500,
          position: 'top-center'
        });
        onCategoryCreated?.(categoryName);
        resetForm();
        onClose();
      }
    } catch (error) {
      console.error('Category creation error:', error);
      toast.error("An error occurred while creating the category", {
        duration: 2000,
        position: 'top-center'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Category</DialogTitle>
          <DialogDescription>Add a new product category to your store</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="flex flex-col space-y-3">
            <Label htmlFor="images" className="w-fit">
              Images <Badge className="ml-1.5">PNG, JPG, JPEG, WEBP - MAX 4MB</Badge>
            </Label>

            {file && preview ? (
              <div className="relative flex justify-center w-fit">
                <img
                  src={preview}
                  alt="preview img"
                  className="w-[220px] h-[220px] rounded-lg object-cover"
                />
                <div className="absolute top-3 right-3">
                  <Button
                    size="sm"
                    variant="destructive"
                    disabled={isLoading}
                    onClick={() => {
                      setFile(null);
                      setPreview(null);
                    }}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : null}

            <input
              type="file"
              hidden
              accept="image/png, image/jpg, image/jpeg, image/webp"
              id="images"
              name="images"
              multiple={false}
              onChange={handlePreview}
              ref={fileInputRef}
            />

            <Button
              className="w-fit"
              variant="secondary"
              disabled={isLoading}
              onClick={() => fileInputRef.current?.click()}
            >
              <ImagePlus className="mr-1.5 w-4 h-4" />
              Upload an Image
            </Button>
          </div>

          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="col-span-3"
                placeholder="Enter category name"
                disabled={isLoading}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={categoryTitle}
                onChange={(e) => setCategoryTitle(e.target.value)}
                className="col-span-3"
                placeholder="Enter category title"
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button 
            onClick={handleCreateCategory} 
            disabled={isLoading || !categoryName || !categoryTitle || !file}
          >
            {isLoading ? "Creating..." : "Create Category"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryCreationModal;
