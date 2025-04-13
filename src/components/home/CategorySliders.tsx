"use client"

import useEmblaCarousel from "embla-carousel-react"
import { useCallback } from "react"
import { CategoryCard } from "./CategoryCard"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import { CategoryCarde } from "./CategoryCarde"

interface Category {
  id: string
  name: string
  billboard: string | null
}

interface CategorySliderProps {
  categories: Category[]
}

export function CategorySliders({ categories }: CategorySliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    skipSnaps: false,
    dragFree: true,
    containScroll: "trimSnaps"
  })

  return (
    <div className="relative w-full flex items-center px-4 py-8">
      <div className="overflow-hidden" ref={emblaRef}>


  
        <div className="flex py-4 gap-6 gap-x-4  ">
        {categories.map((category, index) => (
            <div key={category.id} className="flex-none">
              <CategoryCarde 
                category={category} 
                isOffset={index % 2 === 1} 
              />
            </div>
          ))}
        </div>
    
      </div>
    </div>
  )
}