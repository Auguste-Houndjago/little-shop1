"use client"
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import ProductTagManager from '../components/ProductTagManager'


import TagCertifiersVendor from '../ui/TagCertifiersVendor';

import { TagCategory } from '@prisma/client';
import { getTagCategoryIcon } from '@/lib/tags';



interface Product {
  id: string
  title: string
  images: { url: string }[]
  tags: {
    id: string
    name: string
    category: TagCategory

  }[]
}

export default function TagManagerPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)

  useEffect(() => {
    loadVendorProducts()
  }, [])

  const loadVendorProducts = async () => {
    try {
      const response = await fetch('/api/vendor/products')
      if (!response.ok) throw new Error('Failed to fetch products')
      const products = await response.json()
      setProducts(products)
    } catch (error) {
      console.error("Error loading products:", error)
      toast.error("Erreur lors du chargement des produits")
    }
  }

  

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Gestion des tags</h1>
     
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) =>

     (
          
          <div 
            key={product.id} 
            className="bg-white rounded-lg  shadow-md overflow-hidden p-2"
          >
            {/* Image du produit */}
            <div className='flex '>
              <div className="aspect-square relative overflow-hidden w-1/2  bg-gray-100">
                {product.images?.[0]?.url ? (
                  <img
                    src={product.images[0].url}
                    alt={product.title}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    Pas d'image
                  </div>
                )}
                </div>
                <div className='bg-slate-200 w-1/2 flex justify-center'>
       
                </div>
            </div>

            {/* Informations du produit */}
            <div className="p-4">
        


              <h3 className="font-semibold mb-2">{product.title}</h3>
              
              {/* Tags existants */}
              <div className="mb-4 min-h-[2rem] flex flex-wrap gap-2">
           
                {product.tags?.map((tag) => 
              {  

                const Icon = getTagCategoryIcon(tag.category);
               return (
                  <span 
                    key={tag.id}
                    className="px-2 py-1  cursor-pointer   rounded-full text-sm"
                  >
                 
                 {/* {Icon && <Icon className="ml-1 drop-shadow-sm bg-gray-100"  size={10} />} */}
                  {tag.name}
                   
                    <span className='mt-2'>
                      {product.tags && product.tags.length > 0 && (
                        <TagCertifiersVendor 
                          tagId={tag.id} 
                          productId={product.id} 
                          tagName={tag.name}
                        />
                      )}
                    </span>
                  </span>
                )
                
              }
                )}
              </div>

              {/* Gestionnaire de tags */}
              <div className="border-t pt-4">
                {selectedProduct === product.id ? (
                  <>
                    <ProductTagManager productId={product.id} />
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="mt-2 text-sm text-gray-500 hover:text-gray-700"
                    >
                      Fermer
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setSelectedProduct(product.id)}
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Gérer les tags
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

      </div>

      {products.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          Aucun produit trouvé. Commencez par ajouter des produits à votre boutique.
        </div>
      )}
    </div>
  )
}
