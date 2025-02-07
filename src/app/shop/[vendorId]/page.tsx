
import { fetchVendorById } from '@/lib/vendors';
import { redirect } from 'next/navigation';
import { VendorHeader } from './VendorHeader';
import { ProductGrid } from './ProductGrid';

export default async function VendorShopPage({ 
  params 
}: { 
  params: { vendorId: string } 
}) {
  const vendor = await fetchVendorById(params.vendorId);


if (!vendor){
  redirect('/')
}
 


  return (


    <div className="container mx-auto px-4  py-8 max-w-4xl bg-gradient-to-l from-gray-200 via-fuchsia-200 to-stone-100">
      <VendorHeader vendor={vendor} />
      <ProductGrid products={vendor.products} />

    </div>

  );
}

