
import { notFound } from 'next/navigation';
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

  console.log('All vendors:', vendors);
  console.log('Vendor ID from params:', params.vendorId);
  console.log('Matching vendor:', vendor);

  if (!vendor) {
    console.error(`No vendor found with ID: ${params.vendorId}`);
    return notFound();
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
            <div className="ml-4 flex-grow">
              <Button variant="outline" className="float-right">Suivre</Button>
            </div>
          </div>

          <div className="mt-4">
            <h1 className="text-2xl font-bold">{vendor.businessName}</h1>
            <p className="text-gray-500 dark:text-gray-400">
              {vendor.whatsappNumber && (
                <span className="flex items-center">
                  <Phone className="w-4 h-4 mr-1" />
                  <span>{vendor.whatsappNumber}</span>
                </span>
              )}
              @{vendor.businessName?.toLowerCase().replace(/\s+/g, '_')}
            </p>

            {vendor.description && (
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                {vendor.description}
              </p>
            )}

            <div className="mt-4 flex items-center space-x-4 text-gray-500 dark:text-gray-400">
              {fullAddress && (
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{fullAddress}</span>
                </div>
              )}
          
              <div className="flex items-center">
                <LinkIcon className="w-4 h-4 mr-1" />
                <a 
                  href={"#"} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:underline"
                >
                  Site Web
                </a>
              </div>
              
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>Inscrit depuis {new Date(vendor.createdAt).getFullYear()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vendor Stats */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 mt-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="flex flex-col items-center">
            <Package className="w-6 h-6 text-blue-500 mb-2" />
            <h3 className="text-lg font-semibold">{stats.activeProducts}</h3>
            <p className="text-gray-500 dark:text-gray-400">Produits actifs</p>
          </div>
          <div className="flex flex-col items-center">
            <ShoppingCart className="w-6 h-6 text-green-500 mb-2" />
            <h3 className="text-lg font-semibold">{stats.completedOrders}</h3>
            <p className="text-gray-500 dark:text-gray-400">Commandes</p>
          </div>
          <div className="flex flex-col items-center">
            <Star className="w-6 h-6 text-yellow-500 mb-2" />
            <h3 className="text-lg font-semibold">{stats.averageRating.toFixed(1)}/5</h3>
            <p className="text-gray-500 dark:text-gray-400">Note moyenne</p>
          </div>
        </div>
      </div>

      {/* Vendor Products */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Nos Produits</h2>
        {products.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            Aucun produit disponible pour le moment
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <div 
                key={product.id} 
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                {product.images[0] && (
                  <div className="relative h-48 w-full">
                    <Image 
                      src={product.images[0].url} 
                      alt={product.title} 
                      fill 
                      className="object-cover" 
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-2">
                    {product.category.name}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-blue-600">
                      {product.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                    </span>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon" className="text-red-500">
                        <Star className="w-4 h-4" />
                      </Button>
                      <Button className="flex items-center space-x-2">
                        <ShoppingCart className="w-4 h-4" />
                        <span>Ajouter</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}