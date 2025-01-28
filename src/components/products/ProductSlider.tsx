import React from "react";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { fetchFeaturedProducts } from "@/lib/products";
import { ProductFeatured } from "@/app/(home)/page";
import CardProduct from "../home/CardProduct";


interface ProductSliderProps {
  itemsToShow?: number;
  autoplayInterval?: number;
}

export default async function ProductSlider({ itemsToShow = 3, autoplayInterval = 3000 }: ProductSliderProps) {
  // Récupération des produits côté serveur
  const products: ProductFeatured[] = await fetchFeaturedProducts();

  if (products.length === 0) {
    return <p>Aucun produit en vedette trouvé.</p>;
  }

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full max-w-sm md:max-w-2xl lg:max-w-4xl mx-auto"
    >
      <CarouselContent>
        {products.map((product, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1 ">
              <CardProduct product={product} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
