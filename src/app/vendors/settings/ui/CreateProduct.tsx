"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Loader2 } from "lucide-react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";


import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";


import CategoryAdd from "./CategoryAdd";
import SizeAdd from "./SizeAdd";
import ColorAdd from "./ColorAdd";

const productSchema = z.object({
  title: z.string().min(3, "Le titre doit contenir au moins 3 caractères"),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères"),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Le prix doit être un nombre positif",
  }),
  stock: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Le stock doit être un nombre positif ou zéro",
  }),
  category: z.string().min(1, "Veuillez sélectionner une catégorie"),
  size: z.string().min(1, "Veuillez sélectionner une taille"),
  color: z.string().min(1, "Veuillez sélectionner une couleur"),
});



export default function CreateProduct() {
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter();
  const supabase = createClient();

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      stock: "",
      category: "",
      size: "",
      color: "",
    },
  });



  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + images.length > 5) {
      alert("Maximum 5 images autorisées");
      return;
    }

  
    const newImageUrls = files.map((file) => URL.createObjectURL(file));
    setImageUrls([...imageUrls, ...newImageUrls]);
    setImages([...images, ...files]);
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(imageUrls[index]); // Libérer l'URL
    setImages(images.filter((_, i) => i !== index));
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  const onSubmit = async (values: z.infer<typeof productSchema>) => {
    try {
      setIsUploading(true);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error("Non authentifié");
      }

      // 1. Upload des images vers Supabase Storage
      const imagePromises = images.map(async (image) => {
        const fileName = `${Date.now()}-${image.name}`;
        const { data, error } = await supabase.storage
          .from('products')
          .upload(`${session.user.id}/${fileName}`, image, {
            cacheControl: '3600',
            upsert: false
          });

        if (error) throw error;

        // Obtenir l'URL publique
        const { data: { publicUrl } } = supabase.storage
          .from('products')
          .getPublicUrl(`${session.user.id}/${fileName}`);

        return publicUrl;
      });

      const uploadedImageUrls = await Promise.all(imagePromises);

  
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          ...values,
          price: Number(values.price),
          stock: Number(values.stock),
          images: uploadedImageUrls,
          userId: session.user.id
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erreur lors de la création du produit");
      }

      router.push("/vendors/products");
      router.refresh();
    } catch (error) {
      console.error("Erreur:", error);
      alert("Une erreur est survenue lors de la création du produit");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-xl backdrop-blur-md 
      bg-white/30 border mb-2 border-white/20 shadow-xl">
      <h2 className="text-2xl font-semibold text-center">Créer un nouveau produit</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Images Upload Section */}
          <div className="space-y-4">
            <FormLabel>Images du produit (max 5)</FormLabel>
            <div className="grid grid-cols-5 gap-4">
              {imageUrls.map((url, index) => (
                <div key={index} className="relative aspect-square">
                  <Image
                    src={url}
                    alt={`Preview ${index + 1}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                  <button title="remove"
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 p-1 rounded-full bg-red-500 text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {images.length < 5 && (
                <label className="aspect-square flex items-center justify-center 
                  border-2 border-dashed border-gray-300 rounded-lg cursor-pointer
                  hover:border-gray-400 transition-colors">
                  <input title="image"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Upload className="w-6 h-6 text-gray-400" />
                </label>
              )}
            </div>
          </div>

          {/* Product Details */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titre</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white/50" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} className="bg-white/50" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prix</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" step="0.01" className="bg-white/50" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" className="bg-white/50" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-2 md:gap-4">
          <FormField
  control={form.control}
  name="category"
  render={({ field }) => (
    <CategoryAdd 

      field={field} 
    />
  )}
/>

      


<FormField
  control={form.control}
  name="size"
  render={({ field }) => (
    <SizeAdd

      field={field} 
    />
  )}
/>

<FormField
  control={form.control}
  name="color"
  render={({ field }) => (
    <ColorAdd 

      field={field} 
    />
  )}
/>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Création en cours...
              </>
            ) : (
              "Créer le produit"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
} 