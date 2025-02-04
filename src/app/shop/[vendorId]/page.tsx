
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { MapPin, Link as LinkIcon, Calendar, Phone, Package, ShoppingCart, Star } from 'lucide-react';
import { fetchVendors, fetchVendorStats, fetchVendorProducts } from '@/lib/vendors';

export default async function VendorShopPage({ 
  params 
}: { 
  params: { vendorId: string } 
}) {
  const vendors = await fetchVendors();
  const vendor = vendors.find(v => v.id === params.vendorId);

  if (!vendor) {
    return ("/");
  }

  const [stats, products] = await Promise.all([
    fetchVendorStats(vendor.id),
    fetchVendorProducts(vendor.id)
  ]);

  const fullAddress = vendor.address 
    ? `${vendor.address.country || ''}, ${vendor.address.region || ''} ${vendor.address.city || ''}`.trim() 
    : null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Vendor Profile Header */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md">
        <div className="h-48 bg-gray-200 dark:bg-gray-700 relative">
          {vendor.businessLogo && (
            <Image 
              src={vendor.businessLogo} 
              alt={`${vendor.businessName} cover`} 
              fill 
              className="object-cover"
            />
          )}
        </div>

        <div className="px-4 pb-4 relative">
          <div className="-mt-16 flex items-end">
            <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-900 overflow-hidden">
              <Image 
                src={vendor.businessLogo || '/default-avatar.png'} 
                alt={vendor.businessName || "shop"} 
                width={128} 
                height={128} 
                className="object-cover"
              />
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold">{vendor.businessName}</h1>
              {fullAddress && (
                <div className="flex items-center text-gray-600 dark:text-gray-300 mt-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{fullAddress}</span>
                </div>
              )}
            </div>
          </div>

          {/* Vendor Stats */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
              <Package className="w-6 h-6 mx-auto mb-2 text-gray-600 dark:text-gray-300" />
              <p className="text-sm text-gray-600 dark:text-gray-300">Active Products</p>
              <p className="text-xl font-bold">{stats.activeProducts}</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
              <ShoppingCart className="w-6 h-6 mx-auto mb-2 text-gray-600 dark:text-gray-300" />
              <p className="text-sm text-gray-600 dark:text-gray-300">Total Orders</p>
              <p className="text-xl font-bold">{stats.completedOrders}</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
              <Star className="w-6 h-6 mx-auto mb-2 text-gray-600 dark:text-gray-300" />
              <p className="text-sm text-gray-600 dark:text-gray-300">Average Rating</p>
              <p className="text-xl font-bold">{stats.averageRating.toFixed(1)}</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
             
              <p className="text-sm text-gray-600 dark:text-gray-300">Total Sales</p>
           
            </div>
          </div>

          {/* Vendor Products */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {products.map((product) => (
                <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                  <Image 
                    src={product.images[0].url || "/background1.jpg"} 
                    alt={product.title} 
                    width={300} 
                    height={300} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold">{product.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}