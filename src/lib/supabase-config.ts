import { createClient } from "@/utils/supabase/client";

export async function initializeStorage() {
  const supabase = createClient();
  
  // Créer le bucket products s'il n'existe pas
  const { data: buckets } = await supabase.storage.listBuckets();
  
  if (!buckets?.find(bucket => bucket.name === 'products')) {
    const { data, error } = await supabase.storage.createBucket('products', {
      public: true, // Les images seront publiquement accessibles
      fileSizeLimit: 1024 * 1024 * 2, // Limite de 2MB par fichier
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp']
    });
    
    if (error) {
      console.error('Erreur lors de la création du bucket:', error);
    }
  }
} 