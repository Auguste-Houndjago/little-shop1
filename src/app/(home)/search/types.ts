import { 
    Product, 
    Category, 
    Tag, 
    VendorProfile, 
    Image 
  } from '@prisma/client';
  
  export type ProductWithRelations = Product & {
    images: Image[];
    tags: Tag[];
    category: Category;
    user: {
      vendorProfile?: VendorProfile & {
        address?: {
          country?: string | null;
          region?: string | null;
          city?: string | null;
        } | null;
      } | null;
    };
  };