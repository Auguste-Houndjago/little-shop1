

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
      href={`/category/${category.id}`} 
      className={cn(
        "group block overflow-hidden rounded-md aspect-square shadow-lg border-2 border-white/30",
        "transform transition-all duration-300",
        "hover:scale-105 hover:shadow-xl",
        "bg-white dark:bg-gray-800"
      )}
    >
      <div className="relative w-full h-fit aspect-[6.5/5]  ">
        {category.billboard ? (
          <Image 
            src={category.billboard} 
            alt={category.name} 
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <span className="text-gray-500 dark:text-gray-300">No Image</span>
          </div>
        )}
      </div>
      
      <div className="p-4 text-center">
        <h3 className={cn(
          "text-lg font-semibold",
          "text-gray-800 dark:text-gray-200",
          "group-hover:text-primary transition-colors"
        )}>
          {category.name}
        </h3>
      </div>
    </Link>
  );
}
