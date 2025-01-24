'use client'
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface CategorySectionProps {
  category: any;
}

const CategorySection = ({ category }: CategorySectionProps) => {
  return (
    <div className="mb-12">
      <div className="backdrop-blur-md bg-white/10 rounded-xl p-6 shadow-xl border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            {category.name}
          </h2>
          <Link 
            href={`/categories/${category.id}`}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Voir plus →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {category.products.map((product: any) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.05 }}
              className="relative group"
            >
              <Link href={`/product/${product.id}`}>
                <div className="relative h-48 overflow-hidden rounded-lg">
                  <Image
                    src={product.images[0]?.url || '/placeholder.png'}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="backdrop-blur-sm bg-white/10 rounded-lg p-3 border border-white/20">
                    <h3 className="text-white text-sm font-semibold truncate">
                      {product.name}
                    </h3>
                    <p className="text-gray-200 text-xs mt-1">
                      {product.price.toLocaleString('fr-FR', {
                        style: 'currency',
                        currency: 'EUR'
                      })}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection; 