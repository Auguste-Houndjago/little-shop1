import { supabase } from "./supabase";

export const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des produits");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erreur :", error);
      return [];
    }
  };
  

  export async function uploadProductImage(file: File) {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${Date.now()}_${fileName}`;
  
      const { data, error } = await supabase.storage
        .from('products')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });
  
      if (error) throw error;
  
      const { data: { publicUrl } } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);
  
      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }