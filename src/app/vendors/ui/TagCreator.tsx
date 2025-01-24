// "use client"
// import { useState, useEffect } from 'react';
// import { Tag as TagIcon, Plus, X } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import { createClient } from '@/utils/supabase/client';
// import { toast } from 'sonner';

// // Définition de l'enum TagCategory puisqu'on ne peut pas importer directement de Prisma côté client
// export enum TagCategory {
//   PRODUCT_QUALITY = "PRODUCT_QUALITY",
//   SHIPPING_SERVICE = "SHIPPING_SERVICE",
//   CUSTOMER_SERVICE = "CUSTOMER_SERVICE",
//   PRICE_VALUE = "PRICE_VALUE",
//   AUTHENTICITY = "AUTHENTICITY",
//   CUSTOM = "CUSTOM"
// }

// interface TagCreatorProps {
//   productId: string;
// }

// interface Tag {
//   id: string;
//   name: string;
//   category: TagCategory;
//   usageCount: number;
//   _count?: {
//     certifiedBy: number;
//   }
// }

// export default function TagCreator({ productId }: TagCreatorProps) {
//   const [tags, setTags] = useState<Tag[]>([]);
//   const [newTag, setNewTag] = useState('');
//   const [category, setCategory] = useState<TagCategory>(TagCategory.CUSTOM);
//   const supabase = createClient();
//   const [selectedCategory, setSelectedCategory] = useState("CUSTOM");

//   useEffect(() => {
//     loadProductTags();
//   }, [productId]);

//   const loadProductTags = async () => {
//     const { data, error } = await supabase
//       .from('products')
//       .select(`
//         tags (
//           id,
//           name,
//           category,
//           usageCount,
//           certifiedBy:user_tags(count)
//         )
//       `)
//       .eq('id', productId)
//       .single();

//     if (error) {
//       toast.error("Erreur lors du chargement des tags");
//       return;
//     }

//     setTags(data?.tags || []);
//   };

//   const handleAddTag = async () => {
//     if (!newTag.trim()) return;

//     const { data: { user } } = await supabase.auth.getUser();
//     if (!user) {
//       toast.error("Vous devez être connecté");
//       return;
//     }

//     // Créer le tag s'il n'existe pas
//     const { data: tagData, error: tagError } = await supabase
//       .from('tags')
//       .upsert([{
//         name: newTag.trim().toLowerCase(),
//         category: selectedCategory,
//         createdById: user.id
//       }], {
//         onConflict: 'name'
//       }).select()
//       .single();

//     if (tagError || !tagData?.[0]) {
//       toast.error("Erreur lors de la création du tag");
//       return;
//     }

//     // Récupérer les tags actuels du produit
//     const { data: currentProduct, error: productError } = await supabase
//       .from('products')
//       .select('tags')
//       .eq('id', productId)
//       .single();

//     if (productError) {
//       toast.error("Erreur lors de la récupération des tags du produit");
//       return;
//     }

//     // Créer un nouveau tableau de tags en ajoutant le nouveau
//     const updatedTags = [...(currentProduct?.tags || []), tagData.id];

//     // Associer le tag au produit
//     const { error: linkError } = await supabase
//       .from('products')
//       .update({ tags: updatedTags })
//       .eq('id', productId);

//     if (linkError) {
//       toast.error("Erreur lors de l'association du tag");
//       return;
//     }

//     toast.success("Tag ajouté avec succès");
//     setNewTag('');
//     loadProductTags();
//   };

//   const handleRemoveTag = async (tagId: string) => {
//     // Récupérer d'abord les tags actuels
//     const { data: currentProduct, error: fetchError } = await supabase
//       .from('products')
//       .select('tags')
//       .eq('id', productId)
//       .single();

//     if (fetchError) {
//       toast.error("Erreur lors de la récupération des tags");
//       return;
//     }

//     // Filtrer le tag à supprimer
//     const updatedTags = (currentProduct?.tags || []).filter(id => id !== tagId);

//     // Mettre à jour le produit avec les nouveaux tags
//     const { error } = await supabase
//       .from('products')
//       .update({ tags: updatedTags })
//       .eq('id', productId);

//     if (error) {
//       toast.error("Erreur lors de la suppression du tag");
//       return;
//     }

//     toast.success("Tag supprimé");
//     loadProductTags();
//   };

//   return (
//     <div className="space-y-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
//       <h3 className="text-lg font-semibold">Gérer les tags du produit</h3>
      
//       {/* Liste des tags existants */}
//       <div className="flex flex-wrap gap-2">
//         {tags.map((tag) => (
//           <div
//             key={tag.id}
//             className="flex items-center gap-2 px-3 py-1.5 bg-white/20 rounded-full text-sm"
//           >
//             <TagIcon className="w-4 h-4" />
//             <span>{tag.name}</span>
//             <span className="text-xs opacity-50">
//               ({tag._count?.certifiedBy || 0})
//             </span>
//             <button
//               onClick={() => handleRemoveTag(tag.id)}
//               className="hover:text-red-500 transition-colors"
//             >
//               <X className="w-4 h-4" />
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Formulaire d'ajout */}
//       <div className="flex gap-2">
//         <Select
//           value={category}
//           onValueChange={(value: TagCategory) => setCategory(value)}
//         >
//           <SelectTrigger className="w-[180px]">
//             <SelectValue placeholder="Catégorie" />
//           </SelectTrigger>
//           <SelectContent>
//             {Object.values(TagCategory).map((cat) => (
//               <SelectItem key={cat} value={cat}>
//                 {cat.replace('_', ' ')}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
        
//         <Input
//           value={newTag}
//           onChange={(e) => setNewTag(e.target.value)}
//           placeholder="Nouveau tag..."
//           className="flex-1"
//         />
        
//         <Button onClick={handleAddTag}>
//           <Plus className="w-4 h-4" />
//         </Button>
//       </div>
//     </div>
//   );
// } 