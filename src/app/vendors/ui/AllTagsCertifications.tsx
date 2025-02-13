"use server"
import React from 'react';
import { getTagCertifications, getProductTags } from '../vendor';
import { TagCertifiers } from './TagCertifiers';

interface AllTagsCertificationProps {
  productId: string;
}

export const AllTagsCertifications: React.FC<AllTagsCertificationProps> = async ({ 
  productId 
}) => {
 
  const tags = await getProductTags(productId);

  if (!tags || tags.length === 0) {
    return <div>ma bitee</div> ;
  }

  return (
    <div className="all-tags-certification space-y-2">
      <h3 className="text-sm font-semibold mb-2">Tag Certifications</h3>
      {tags.map(async (tag) => {
        const tagCertifications = await getTagCertifications(tag.id, productId);
        
        // Only render if there are certifications
        if (tagCertifications.length > 0) {
          return (
            <div key={tag.id} className="tag-certification-item">
              <div className="text-xs font-medium text-gray-600 mb-1">
                {tag.name}
              </div>
              <TagCertifiers tagId={tag.id} productId={productId} />
            </div>
          );
        }
        
        return <div>ma petite</div>;
      })}
    </div>
  );
};