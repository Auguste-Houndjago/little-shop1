// "use client"

// import { useState, useEffect } from 'react';
// import { Tag as TagIcon, Plus, Check } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { TagCategory } from '@prisma/client';

// interface TagProps {
//   productId: string;
//   reviewId?: string;
//   isVendor?: boolean;
// }

// export default function TagManager({ productId, reviewId, isVendor }: TagProps) {
//   const [tags, setTags] = useState<any[]>([]);
//   const [suggestedTags, setSuggestedTags] = useState<any[]>([]);
//   const [newTagName, setNewTagName] = useState('');

//   useEffect(() => {
//     loadTags();
//     loadSuggestedTags();
//   }, [productId]);

//   const loadTags = async () => {
//     // Charger les tags existants
//   };

//   const loadSuggestedTags = async () => {
//     // Charger les tags suggérés
//   };

//   const handleAddTag = async () => {
//     // Ajouter un nouveau tag
//   };

//   const handleCertifyTag = async (tagId: string) => {
//     // Certifier un tag
//   };

//   return (
//     <div className="space-y-4">
//       {/* Tags existants */}
//       <div className="flex flex-wrap gap-2">
//         {tags.map((tag) => (
//           <div
//             key={tag.id}
//             className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full text-sm"
//           >
//             <TagIcon className="w-3 h-3" />
//             <span>{tag.name}</span>
//             {!isVendor && (
//               <Button
//                 size="sm"
//                 variant="ghost"
//                 onClick={() => handleCertifyTag(tag.id)}
//               >
//                 <Check className="w-3 h-3" />
//               </Button>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Ajouter un nouveau tag (vendeurs uniquement) */}
//       {isVendor && (
//         <div className="flex gap-2">
//           <Input
//             value={newTagName}
//             onChange={(e) => setNewTagName(e.target.value)}
//             placeholder="Nouveau tag..."
//             className="text-sm"
//           />
//           <Button size="sm" onClick={handleAddTag}>
//             <Plus className="w-4 h-4" />
//           </Button>
//         </div>
//       )}

//       {/* Tags suggérés */}
//       <div className="flex flex-wrap gap-2">
//         {suggestedTags.map((tag) => (
//           <Button
//             key={tag.id}
//             size="sm"
//             variant="outline"
//             onClick={() => handleAddTag(tag.id)}
//           >
//             {tag.name}
//           </Button>
//         ))}
//       </div>
//     </div>
//   );
// } 