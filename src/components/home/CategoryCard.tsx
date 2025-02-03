

import Image from 'next/image';

import Link from 'next/link';
import { cn } from '@/lib/utils';



interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    billboard: string | null;
  }
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link 
    href={`/${encodeURIComponent(category.id)}`}
      className={cn(
        // "group block overflow-hidden rounded-md aspect-square shadow-lg border-2 border-white/30",

        "hover:scale-105 hover:shadow-xl",
      
        "group relative w-40 h-40 md:w-52 md:h-52 bg-gray-[#F1F1F1] rounded-3xl overflow-hidden shadow-lg border-2 border-white transition-all duration-1000  ease-in-out"
      )}
    >
          
      <div className="relative w-full h-fit aspect-[6.5/5]  ">
      <div className="absolute inset-0 bg-gradient-to-r from-[#4159d07a] via-[#c850c082] to-[#ffcd70a0]"></div>
        {category.billboard ? (
          <Image 
            src={category.billboard} 
            alt={category.name} 
            fill
            className="object-contain p-2 transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <span className="text-gray-500 dark:text-gray-300">No Image</span>
          </div>
        )}
      </div>
      
      <div className="p-0 z-50 text-center">
        <h3 className={cn(
          "text-lg font-semibold",
          "text-gray-800  rounded-md dark:text-gray-200",
          "group-hover:text-primary transition-colors"
        )}>
          {category.name} 
        </h3>
      </div>
    </Link>
  );
}
