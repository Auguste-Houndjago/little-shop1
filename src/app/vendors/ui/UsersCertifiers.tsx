import Image from 'next/image';
import { getUsersCertifiedTag } from '../vendor';

interface TagCertifiersProps {
  tagId: string;
  productId: string;
}

export const TagUsersCertifiers = async ({ tagId, productId }: TagCertifiersProps) => {
  const tagCertifications = await getUsersCertifiedTag(tagId, productId);

  if (!tagCertifications.length) return null;

  return (
    <div className="tag-certifiers">
      <div className="flex items-center space-x-2 mb-2">
        <span className="text-sm text-gray-600">for this tag on this product</span>
      </div>

      <div className="flex space-x-2">
        {tagCertifications.map((user) => (
          <div key={user.id} className="flex items-center space-x-1 bg-gray-100 rounded-full px-2 py-1">
            {user.avatar_url && (
              <Image
                src={user.avatar_url}
                alt={user.name || 'User'}
                width={24}
                height={24}
                className="rounded-full"
              />
            )}
            <span className="text-xs truncate">{user.name}</span>
          </div>
        ))}
      </div>

      <p className="px-2 text-xs text-muted-foreground">
        Trusted by <strong className="font-medium text-foreground">{tagCertifications.length}</strong>{' '}
        user{tagCertifications.length > 1 ? 's' : ''}.
      </p>
    </div>
  );
};
