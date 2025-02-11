import React from 'react';
import Image from 'next/image';
import { getTagCertifications } from '../vendor';


interface TagCertifiersProps {
  tagId: string;
  productId: string;
}

export const TagCertifiers: React.FC<TagCertifiersProps> = async ({ tagId, productId }) => {

  const tagCertifications = await getTagCertifications(tagId, productId);

  // If no certifications, return null
  if (tagCertifications.length === 0) {
    return null;
  }

  return (
    <div className="tag-certifiers">
      <div className="flex items-center space-x-2 mb-2">

        <span className="text-sm text-gray-600">
          Certification on this product
        </span>
      </div>
      
      <div className="flex space-x-2">
        {tagCertifications.map((certification) => (
          <div 
            key={certification.user.id} 
            className="flex items-center space-x-1 bg-gray-100 rounded-full px-2 py-1"
          >
            {certification.user.avatar_url && (
              <Image 
                src={certification.user.avatar_url} 
                alt={certification.user.name || 'User'} 
                width={24} 
                height={24} 
                className="rounded-full "
              />
            )}
            
            <span className=" transition-all duration-300 overflow-hidden text-xs truncate">{certification.user.name}</span>
          </div>
        ))}
      </div>
      <p className="px-2 text-xs text-muted-foreground">
        Trusted by <strong className="font-medium text-foreground">{tagCertifications.length}</strong> user{tagCertifications.length > 1 ? 's' : ''}.
      </p>
    </div>
  );
};


/* ussage 

<TagCertifiers tagId={tag.id} productId={product.id} />

*/