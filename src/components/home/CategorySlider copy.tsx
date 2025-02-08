
"use client"

import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

import { CategoryCard } from "./CategoryCard";


import { useCallback } from "react"

interface Category {
  id: string
  name: string
  billboard: string | null
}

interface CategorySliderProps {
  categories: Category[]
}

export function CategorySliderx({ categories }: CategorySliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    skipSnaps: false,
    dragFree: true,
  })

  // const categories = await fetchCategory();

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className="relative w-full px-4 py-8">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {categories.map((category) => (
            <div key={category.id} className="flex-[0_0_auto]">
           <CategoryCard key={category.id} category={category} />
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-background shadow-md"
        onClick={scrollPrev}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full bg-background shadow-md"
        onClick={scrollNext}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}



