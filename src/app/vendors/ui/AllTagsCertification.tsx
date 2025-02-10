import React from 'react';
import { getTagCertifications } from '../vendor';
import { TagCertifiers } from './TagCertifiers';

interface AllTagsCertificationProps {
  productId: string;
  tags: { id: string; name: string }[];
}

export const AllTagsCertification: React.FC<AllTagsCertificationProps> = async ({ 
  productId, 
  tags 
}) => {

  if (!tags || tags.length === 0) {
    return null;
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
        
        return null;
      })}
    </div>
  );
};