import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

type Category = {
  id: string;
  name: string;
  billboard: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

interface CategoryDropdownProps {
  categories: Category[];
  onSelect?: (categoryId: string) => void;
}

const CategoryList = ({ categories, onSelect }: CategoryDropdownProps) => {

    const pathname = usePathname();
  return (
    <div  className="w-fit bg-transparent p-0">
      <Select  onValueChange={(value) => onSelect?.(value)}>
        <SelectTrigger className="w-fit bg-transparent p-0">
          <SelectValue placeholder="catégorie" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem 
              key={category.id} 
              value={category.id}
              className="cursor-pointer"
            >
<Link
href={`/${encodeURIComponent(category.id)}`}
className={cn(
  'text-zinc-900 tracking-tight text-sm capitalize',
  pathname === `/${encodeURIComponent(category.id)}`
    ? 'font-semibold'
    : 'font-normal'
)}
>
{category.name}
</Link>
          
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategoryList;

