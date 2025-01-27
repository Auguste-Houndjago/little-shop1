"use client"

import { Heart, Share2 } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { createClient } from '@/utils/supabase/client';
import TagsView from './TagsView';



interface Review {
  id: string;
  comment: string;
  createdAt: string;
  user: {
    name: string | null;
    email: string | null;
  };
}

interface WishlistStatus {
  isWishlisted: boolean;
}

interface Tag {
  id: string;
  name: string;
}

const Chat = ({ productId }: { productId: string }) => {
  const [message, setMessage] = useState('');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [productTags, setProductTags] = useState<Tag[]>([]);
  const [userCertifications, setUserCertifications] = useState<Set<string>>(new Set());




useEffect(() => {
  const fetchTags = async () => {
    try {
      const response = await fetch(`/api/tags`);
      if (!response.ok) {
        throw new Error('Failed to fetch tags');
      }
      const tags = await response.json();
      setProductTags(tags);
    } catch (error) {
      console.error('Erreur lors de la récupération des tags:', error);
      toast.error('Impossible de charger les tags');
    }
  };

  fetchTags();
}, [productId]);

  

  const handleShare = async () => {
    const url = `${window.location.origin}/p/${productId}`;
    try {
      await navigator.share({
        url,
        title: 'Voir ce produit'
      });
    } catch (err) {
      await navigator.clipboard.writeText(url);
      toast.success("Lien copié dans le presse-papier");
    }
  };

  return (
    <div className="flex flex-col max-w-[260px] w-full">
      <div className="relative flex bg-gradient-to-br from-gray-100/50 via-gray-200/40 to-gray-300/30 backdrop-blur-xl border border-white/20 rounded-2xl p-[1.5px] shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-50"></div>
        
        <div className="flex flex-col bg-white/10 backdrop-blur-lg rounded-2xl w-full overflow-hidden relative border-[0.5px] border-white/20 shadow-inner">
          {/* Liste des reviews */}
          <div className="max-h-60 overflow-y-auto p-2.5 space-y-2">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white/5 rounded-lg p-2">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-medium">{review.user.name || review.user.email}</span>
                  <span className="text-xs text-gray-400">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm mt-1">{review.comment}</p>
              </div>
            ))}
          </div>

          {/* Input et actions */}
          <div className="border-t border-white/10">
            <div className="relative flex">
              <textarea 
                placeholder="Ajouter un commentaire✦˚" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-transparent border-none w-full h-12 text-gray-800 text-xs p-2.5 resize-none outline-none placeholder-gray-500/70 focus:placeholder-gray-300 transition-colors duration-300"
              />
            </div>
            
            <div className="flex justify-between items-end p-2.5">
              <div className="flex gap-2">
                <button title='b' about='b' 
                  // onClick={toggleWishlist} 
                  className="flex opacity-50 hover:opacity-100 hover:translate-y-[-5px] transition-all duration-300"
                >
                  <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current text-red-500" : ""}`} />
                </button>
                <button title='b1' 
                  onClick={handleShare} 
                  className="flex opacity-50 hover:opacity-100 hover:translate-y-[-5px] transition-all duration-300"
                >
                  <Share2 />
                </button>
              </div>

              <button about='b' title='b'
                // onClick={handleSubmit}
                className="flex p-0.5 bg-white/20 backdrop-blur-md rounded-lg border border-white/30 shadow-md hover:bg-white/40 active:scale-90 transition-all duration-150"
              >
                <i className="w-[30px] h-[30px] p-1.5 bg-white/10 rounded-lg backdrop-blur-sm text-gray-700 hover:text-black hover:bg-white/30">
                  <svg viewBox="0 0 512 512">
                    <path fill="currentColor" d="M473 39.05a24 24 0 0 0-25.5-5.46L47.47 185h-.08a24 24 0 0 0 1 45.16l.41.13l137.3 58.63a16 16 0 0 0 15.54-3.59L422 80a7.07 7.07 0 0 1 10 10L226.66 310.26a16 16 0 0 0-3.59 15.54l58.65 137.38c.06.2.12.38.19.57c3.2 9.27 11.3 15.81 21.09 16.25h1a24.63 24.63 0 0 0 23-15.46L478.39 64.62A24 24 0 0 0 473 39.05"/>
                  </svg>
                </i>
              </button>
            </div>
          </div>
        </div>


      </div>
      
      {/* Section des tags */}
<TagsView productId={productId} />
    </div>
  );
};

export default Chat;