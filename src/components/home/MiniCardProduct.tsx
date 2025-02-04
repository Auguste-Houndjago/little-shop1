import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import VendorProfile from '@/app/vendors/ui/VendorProfile';
import CardProduct from './CardProduct';
import { Button } from '@/components/ui/button';

interface VendorProductProps {
  vendor: {
    id: string;
    businessName: string;
    businessLogo?: string | null;
    description?: string | null;
    products: Array<{
      id: string;
      title: string;
      price: number;
      images: Array<{ 
        id: string;
        url: string; 
        productId: string;
        createdAt: Date;
        updatedAt: Date;
      }>;
      isFeatured: boolean;
      category: { name: string };
      color: { 
        id: string; 
        name: string; 
        color: string; 
        createdAt: Date; 
        updatedAt: Date; 
      };
      size: { 
        id: string; 
        name: string; 
        value: string; 
        createdAt: Date; 
        updatedAt: Date; 
      };
    }>;
  };
}

const MiniCardProduct: React.FC<VendorProductProps> = ({ vendor }) => {
  // Get the last two products for the vendor
  const lastTwoProducts = vendor.products.slice(-2);

  return (
    <Card className="w-full max-w-sm bg-background/80 hover:shadow-lg transition-shadow duration-300 rounded-xl overflow-hidden">
      <CardContent className="p-0">
        {/* Vendor Header */}
        <div className="flex flex-col items-center p-4 bg-muted/30">
          <VendorProfile 
            businessLogo={vendor.businessLogo || null} 
            businessName={vendor.businessName} 
            isVerified
          />
          <h3 className="text-xl font-semibold text-foreground">
            {vendor.businessName}
          </h3>
          {vendor.description && (
            <p className="text-sm text-muted-foreground text-center mt-2 line-clamp-2">
              {vendor.description}
            </p>
          )}
        </div>

        {/* Vendor Products */}
        <div className="grid grid-cols-2 gap-2 p-4">
          {lastTwoProducts.map((product) => (
            <CardProduct 
              key={product.id} 
              product={product} 
            />
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Link href={`/vendor/${vendor.id}`} className="w-full">
          <Button variant="outline" className="w-full">
            Voir plus de produits
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default MiniCardProduct;