import React from 'react';
import Link from 'next/link';
import { ProductWithRelations } from '../types';


interface ProductResultsGridProps {
  searchResults: ProductWithRelations[];
}

export function ProductResultsGrid({ searchResults }: ProductResultsGridProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">
        {searchResults.length} Product{searchResults.length !== 1 ? 's' : ''} Found
      </h2>
      {searchResults.length === 0 ? (
        <p>No results found. Try adjusting your search filters.</p>
      ) : (
        <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {searchResults.map((product) => (
            <Link 
              href={`/p/${product.id}`} 
              key={product.id} 
              className="border-2 border-slate-100/80 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
            >
              {product.images && product.images.length > 0 ? (
                <img 
                  src={product.images[0].url} 
                  alt={product.title} 
                  width={300} 
                  height={200} 
                  className="w-full h-48 object-contain mb-2 rounded"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 mb-2 rounded flex items-center justify-center">
                  No Image
                </div>
              )}
              <h3 className="font-bold">{product.title}</h3>
              <p className="text-gray-600">{product.price.toFixed(2)} FCFA</p>
              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {product.tags.map((tag) => (
                    <span 
                      key={tag.id} 
                      className="text-xs bg-gray-100 px-2 py-1 rounded"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}