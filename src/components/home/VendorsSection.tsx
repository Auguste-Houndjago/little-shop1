'use client';

import React, { Suspense } from 'react';
import MiniCardProduct, { Vendor } from './MiniCardProduct';
import HeadingTitle from './HeadingTitle';
import { fetchVendors } from '@/lib/vendors'; 
import { Skeleton } from '@/components/ui/skeleton';

const VendorsSectionContent = async () => {
  try {
    const vendors = await fetchVendors();
    
    if (vendors.length === 0) {
      return (
        <div className="text-center text-muted-foreground py-8">
          Aucune boutique disponible pour le moment.
        </div>
      );
    }

    return (
<div className="flex flex-col gap-y-6">
  {vendors.map((vendor) => (
    <MiniCardProduct 
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
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[1, 2, 3].map((_, index) => (
      <Skeleton key={index} className="h-[400px] w-full rounded-xl" />
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
