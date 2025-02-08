import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    billboard: string | null;
  };
  isOffset?: boolean;
}

export function CategoryCarde({ category, isOffset = false }: CategoryCardProps) {
  return (
    <Link 
      href={`/${encodeURIComponent(category.id)}`}
      className={cn(
        "group relative",
        "w-40",
        "flex flex-col",
        "transition-all duration-300 p-2 hover:scale-[1.08] rounded-sm ease-in-out border-2 bg-secondary text-secondary-foreground hover:bg-secondary/80",
        isOffset ? "mt-16" : "mt-0"
      )}
    >
   
      {category.name.toLowerCase().includes('new') && (
        <span className="absolute -top-6 left-0 text-sm text-blue-600 font-medium z-20">
          New {category.name.replace('New', '').trim()}
        </span>
      )}

      <div className="relative w-full h-[200px] overflow-hidden">
        {category.billboard ? (
          <Image 
            src={category.billboard} 
            alt={category.name} 
            fill
            className={cn(
              "object-contain",
              "transition-transform duration-300",
              "group-hover:scale-105"
            )}
            // sizes="(max-width: 250px) 150px, 90px"
            sizes='150px'
          />
        ) : (
          <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <span className="text-gray-400 dark:text-gray-500">No Image</span>
          </div>
        )}
      </div>
      
      <h3 className={cn(
        "mt-2 text-sm font-medium",
        "text-black"
      )}>
        {category.name.replace('New', '').trim()}
      </h3>
    </Link>
  );
}