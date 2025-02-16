

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { CategoryCard } from "./CategoryCard"
import { fetchCategory } from '@/lib/products'

export async function CategorySlider() {
  const categories = await fetchCategory()

  return (
    <div className="  w-full py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Browse Categories</h2>
      
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-4 py-4">
          {categories.map((category) => (
        
              <CategoryCard key={category.id} category={category} />
   
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}






