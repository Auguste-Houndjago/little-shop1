

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { fetchFeaturedProducts } from "@/lib/products";
import { ProductFeatured } from "@/app/(home)/page";
import ProductHero, { HeroProduct } from "../home/ProductHero";


interface ProductSliderProps {
  itemsToShow?: number;
  autoplayInterval?: number;
}

export default async function ProductSlider({ itemsToShow = 3, autoplayInterval = 3000 }: ProductSliderProps) {

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
      className="w-full  md:max-w-full mx-0 "
      
    >
      <CarouselContent className="mx-0 px-0">
        {products.map((product, index) => (
          <CarouselItem key={index} className="basis-[54%]  lg:basis-1/5">
            <div className="p-1 ">
              <HeroProduct product={product} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <span className="hidden lg:block">
      <CarouselPrevious />
      <CarouselNext />
      </span>
 
    </Carousel>
  );
}
