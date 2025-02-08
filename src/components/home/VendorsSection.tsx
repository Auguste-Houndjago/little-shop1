'use client';

import React, { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchVendorsWithProducts } from '@/lib/vendors'; 
import { Skeleton } from '@/components/ui/skeleton';
import HeadingTitle from './HeadingTitle';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

const VendorProductCard = ({ product }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all hover:scale-105">
    <div className="relative h-48 w-full">
      <Image 
        src={product.images[0]?.url || '/placeholder-product.png'} 
        alt={product.title} 
        fill 
        className="object-cover"
      />
      {product.isFeatured && (
        <Badge variant="secondary" className="absolute top-2 right-2">
          Mis en avant
        </Badge>
      )}
    </div>
    <div className="p-4">
      <h3 className="text-lg font-semibold truncate">{product.title}</h3>
      <p className="text-muted-foreground text-sm">{product.category.name}</p>
      <div className="flex justify-between items-center mt-2">
        <span className="text-primary font-bold">{product.price.toFixed(2)} €</span>
        <Button size="sm" variant="outline">
          <ShoppingCart className="mr-2 h-4 w-4" /> Acheter
        </Button>
      </div>
    </div>
  </div>
);

const VendorCard = ({ vendor }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 space-y-4 hover:shadow-xl transition-shadow">
    <div className="flex items-center space-x-4">
      <div className="relative h-16 w-16 rounded-full overflow-hidden">
        <Image 
          src={vendor.avatar_url || '/default-avatar.png'} 
          alt={vendor.name} 
          fill 
          className="object-cover"
        />
      </div>
      <div>
        <h2 className="text-xl font-bold">{vendor.name}</h2>
        <p className="text-muted-foreground text-sm">{vendor.vendorProfile?.businessName}</p>
      </div>
    </div>
    
    <div className="grid grid-cols-2 gap-4">
      {vendor.products.slice(0, 2).map(product => (
        <VendorProductCard key={product.id} product={product} />
      ))}
    </div>
    
    <div className="flex justify-between items-center mt-4">
      <Badge variant="outline">{vendor.products.length} produits</Badge>
      <Link href={`/vendors/${vendor.id}`}>
        <Button variant="link">Voir la boutique</Button>
      </Link>
    </div>
  </div>
);

const VendorsSectionContent = async () => {
  try {
    const vendors = await fetchVendorsWithProducts();
    
    if (vendors.length === 0) {
      return (
        <div className="text-center text-muted-foreground py-8">
          Aucune boutique disponible pour le moment.
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {vendors.map((vendor) => (
          <VendorCard 
            key={vendor.id} 
            vendor={vendor} 
          />
        ))}
      </div>
    );
  } catch (error) {
    console.error('Failed to fetch vendors:', error);
    return (
      <div className="text-center text-destructive py-8">
        Erreur lors du chargement des boutiques. Veuillez réessayer plus tard.
      </div>
    );
  }
};

const VendorsSectionSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {[1, 2, 3].map((_, index) => (
      <Skeleton key={index} className="h-[500px] w-full rounded-xl" />
    ))}
  </div>
);

const VendorsSection = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <HeadingTitle title="Nos boutiques" />
      
      <Suspense fallback={<VendorsSectionSkeleton />}>
        <VendorsSectionContent />
      </Suspense>
    </div>
  );
};

export default VendorsSection;
