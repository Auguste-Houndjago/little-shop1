

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { CategoryCard } from "./CategoryCard"
import { fetchCategory } from '@/lib/products'

export async function CategorySlider() {
  const categories = await fetchCategory()

  return (
    <div className="container mx-auto px-4 py-8">
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




async function CategorySlider01() {
  const categories = await fetchCategory();

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Browse Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.slice(0,3).map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}




