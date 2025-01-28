"use client"

import { Heart, Share2, Send } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { createClient } from '@/utils/supabase/client';
import TagsView from './TagsView';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Review {
  id: string;
  comment: string;
  createdAt: string;
  user: {
    id: string;
    name: string | null;
    email: string | null;
    avatar_url: string | null;
  };
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/products/${productId}/reviews`);
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        toast.error('Impossible de charger les commentaires');
      }
    };

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

    fetchReviews();
    fetchTags();
  }, [productId]);

  const handleSubmitReview = async () => {
    if (!message.trim()) {
      toast.error('Le commentaire ne peut pas être vide');
      return;
    }

    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('Vous devez être connecté pour commenter');
        return;
      }

      const response = await fetch(`/api/products/${productId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          comment: message,
          userId: user.id
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      const newReview = await response.json();
      setReviews(prev => [newReview, ...prev]);
      setMessage('');
      toast.success('Commentaire ajouté avec succès');
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Impossible d\'ajouter le commentaire');
    } finally {
      setIsSubmitting(false);
    }
  };

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

  const handleWishlist = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('Vous devez être connecté');
        return;
      }

      const response = await fetch(`/api/products/${productId}/wishlist`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to toggle wishlist');
      }

      setIsWishlisted(prev => !prev);
      toast.success(isWishlisted ? 'Retiré des favoris' : 'Ajouté aux favoris');
    } catch (error) {
      console.error('Error toggling wishlist:', error);
      toast.error('Impossible de modifier les favoris');
    }
  };

  return (
    <div className="absolute z-20 flex flex-col max-w-[260px] w-full">
      <div className="relative flex bg-gradient-to-br from-gray-100/50 via-gray-200/40 to-gray-300/30 backdrop-blur-xl border border-white/20 rounded-2xl p-[1.5px] shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-50"></div>
        
        <div className="flex flex-col bg-white/10 backdrop-blur-lg rounded-2xl w-full overflow-hidden relative border-[0.5px] border-white/20 shadow-inner">
          {/* Liste des reviews */}
          <div className="max-h-60 overflow-y-auto p-2.5 space-y-2">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white/5 rounded-lg p-2">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-6 h-6 border ">
                      <AvatarImage 
                        src={review.user.avatar_url || '/default-avatar.png'} 
                        alt={review.user.name || 'Utilisateur'} 
                      />
                      <AvatarFallback >
                        {review.user.name?.charAt(0) || review.user.email?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-medium">
                      {review.user.name || review.user.email?.split('@')[0] || 'Utilisateur'}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm">{review.comment}</p>
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
                className="bg-transparent border-none w-full h-12 text-gray-800 text-xs p-2.5 resize-none outline-none placeholder-stone-800/70 focus:placeholder-stone-500/70 transition-colors duration-300"
              />
            </div>
            
            <div className="flex justify-between items-end p-2.5">
              <div className="flex gap-2">
                <button  title='wish'
                  onClick={handleWishlist} 
                  className="flex opacity-50 hover:opacity-100 hover:translate-y-[-5px] transition-all duration-300"
                >
                  <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current text-red-500" : ""}`} />
                </button>
                <button title="button"
                  onClick={handleShare} 
                  className="flex opacity-50 hover:opacity-100 hover:translate-y-[-5px] transition-all duration-300"
                >
                  <Share2 />
                </button>
              </div>

              <Button 
                variant="ghost"
                size="icon"
                onClick={handleSubmitReview}
                disabled={isSubmitting || !message.trim()}
                className="p-0.5 bg-white/20 backdrop-blur-md rounded-lg border border-white/30 shadow-md hover:bg-white/40 active:scale-90 transition-all duration-150"
              >
                <Send className="h-4 w-4" />
              </Button>
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