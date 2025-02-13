"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/react";
import { InfoIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TagCertifiersProps {
  tagId: string;
  productId: string;
  tagName: string;
}

export const TagCertifiersVendor: React.FC<TagCertifiersProps> = ({
  tagId,
  productId,
  tagName,
}) => {
  const [tagCertifications, setTagCertifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTagCertifications = async () => {
      try {
        const response = await fetch(
          `/api/vendor/products/${productId}/certifications?tagId=${tagId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch tag certifications");
        }

        const certifications = await response.json();
        setTagCertifications(certifications);
      } catch (error) {
        console.error("Error fetching tag certifications:", error);
        setError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTagCertifications();
  }, [tagId, productId]);

  if (isLoading) return <div>...</div>;
  if (error || tagCertifications.length === 0) return null;

  return (
        
    <div className="tag-certifiers">
    <Popover placement="bottom" showArrow>
      <PopoverTrigger>
      <InfoIcon className='w-4 h-4'/>
      </PopoverTrigger>

      <PopoverContent className="bg-white/50 px-1 ">
      <p className="font-semibold">{tagName} </p>
      <div className="flex items-center rounded-full border border-border bg-background p-1 shadow shadow-black/5 cursor-pointer">
     
          <div className="flex -space-x-1.5">
            {tagCertifications.slice(0, 4).map((certification, index) => (
              <Avatar className="w-6 h-6 border cursor-pointer ring-1 ring-background" key={certification.user.id} >
              <AvatarImage 
                src={certification.user.avatar_url|| '/default-avatar.png'} 
                alt={certification.user.name || 'User'} 
                width={20}
                height={20}
              />
              <AvatarFallback >
                {certification.user.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            ))}
          </div>
          <p className="px-2 text-xs text-muted-foreground">
          Trusted by <strong className="font-medium text-foreground">{tagCertifications.length}</strong> user{tagCertifications.length > 1 ? 's' : ''}.
          </p>
       
        </div>
      
      </PopoverContent>
    </Popover>
        </div>
  );
};

export default TagCertifiersVendor;
