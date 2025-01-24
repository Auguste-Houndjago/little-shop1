"use client"
import { Heart, Share2 } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { createClient } from '@/utils/supabase/client';

interface Review {
  id: string;
  message: string;
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
}

interface WishlistStatus {
  isWishlisted: boolean;
}

interface Tag {
  id: string;
  name: string;
  _count?: {
    certifiedBy: number;
  }
}

const Chat = ({ productId }: { productId: string }) => {
  const [message, setMessage] = useState('');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [productTags, setProductTags] = useState<Tag[]>([]);
  const [userCertifications, setUserCertifications] = useState<Set<string>>(new Set());
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    loadReviews();
    checkWishlistStatus();
    loadProductTags();
  }, [productId]);

  const loadReviews = async () => {
    const { data: reviews, error } = await supabase
      .from('Review')
      .select(`
        id,
        message,
        createdAt,
        user:userId (
          name,
          email
        )
      `)
      .eq('productId', productId)
      .order('createdAt', { ascending: false });

    if (error) {
      toast.error("Erreur lors du chargement des commentaires");
      return;
    }

    setReviews(reviews?.map(review => ({
      id: review.id,
      message: review.message,
      createdAt: review.createdAt,
      user: {
        name: review.user[0].name,
        email: review.user[0].email
      }
    })) || []);
  };

  const checkWishlistStatus = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('Wishlist')
      .select()
      .eq('userId', user.id)
      .eq('productId', productId)
      .single();

    if (!error) {
      setIsWishlisted(!!data);
    }
  };

  const handleSubmit = async () => {
    if (!message.trim()) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("Veuillez vous connecter pour laisser un commentaire");
      return;
    }

    const { error } = await supabase
      .from('Review')
      .insert({
        message: message.trim(),
        productId,
        userId: user.id
      });

    if (error) {
      toast.error("Erreur lors de l'envoi du commentaire");
      return;
    }

    setMessage('');
    loadReviews();
    toast.success("Commentaire ajouté avec succès");
  };

  const toggleWishlist = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("Veuillez vous connecter pour ajouter à vos favoris");
      return;
    }

    if (isWishlisted) {
      // Retirer de la wishlist
      const { error } = await supabase
        .from('Wishlist')
        .delete()
        .eq('userId', user.id)
        .eq('productId', productId);

      if (error) {
        toast.error("Erreur lors du retrait des favoris");
        return;
      }
      toast.success("Retiré des favoris");
    } else {
      // Ajouter à la wishlist
      const { error } = await supabase
        .from('Wishlist')
        .insert({
          userId: user.id,
          productId
        });

      if (error) {
        toast.error("Erreur lors de l'ajout aux favoris");
        return;
      }
      toast.success("Ajouté aux favoris");
    }

    setIsWishlisted(!isWishlisted);
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

  const loadProductTags = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data: tags, error } = await supabase
      .from('products')
      .select(`
        tags (
          id,
          name,
          certifiedBy:user_tags(count)
        )
      `)
      .eq('id', productId)
      .single();

    if (error) return;

    setProductTags(tags?.tags || []);

    // Charger les certifications de l'utilisateur
    if (user) {
      const { data: certifications } = await supabase
        .from('user_tags')
        .select('tagId')
        .eq('userId', user.id)
        .eq('certified', true);

      setUserCertifications(new Set(certifications?.map(c => c.tagId)));
    }
  };

  const toggleTagCertification = async (tagId: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("Veuillez vous connecter pour certifier un tag");
      return;
    }

    const isCertified = userCertifications.has(tagId);

    if (isCertified) {
      // Supprimer la certification
      const { error } = await supabase
        .from('user_tags')
        .delete()
        .eq('userId', user.id)
        .eq('tagId', tagId);

      if (error) {
        toast.error("Erreur lors de la décertification");
        return;
      }
    } else {
      // Ajouter la certification
      const { error } = await supabase
        .from('user_tags')
        .insert({
          userId: user.id,
          tagId,
          certified: true
        });

      if (error) {
        toast.error("Erreur lors de la certification");
        return;
      }
    }

    loadProductTags();
    toast.success(isCertified ? "Tag décertifié" : "Tag certifié");
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
                <p className="text-sm mt-1">{review.message}</p>
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
                <button 
                  onClick={toggleWishlist} 
                  className="flex opacity-50 hover:opacity-100 hover:translate-y-[-5px] transition-all duration-300"
                >
                  <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current text-red-500" : ""}`} />
                </button>
                <button 
                  onClick={handleShare} 
                  className="flex opacity-50 hover:opacity-100 hover:translate-y-[-5px] transition-all duration-300"
                >
                  <Share2 />
                </button>
              </div>

              <button 
                onClick={handleSubmit}
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
      {/* Tag destinne qu tag */}
      <div className="flex gap-1 py-3.5 text-gray-700 text-[10px]">
        {productTags.map((tag) => (
          <button
            key={tag.id}
            onClick={() => toggleTagCertification(tag.id)}
            className={`px-2 py-1 
              ${userCertifications.has(tag.id) 
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-white/10'} 
              backdrop-blur-sm 
              border border-white/30 
              rounded-lg 
              cursor-pointer 
              hover:bg-white/20 
              transition-all 
              dark:border-[#363636]
              dark:bg-[#1b1b1b]
              duration-300
              flex items-center gap-1`}
          >
            <span>{tag.name}</span>
            <span className="text-xs opacity-50">
              ({tag._count?.certifiedBy || 0})
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Chat;