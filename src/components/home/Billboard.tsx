'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";



interface BillboardItem {
  img: string;
  title: string;
  subtitle?: string;
  actionLabel?: string;
  actionUrl?: string;
}

interface BillboardProps {
  items: BillboardItem[];
}

const Billboard = ({ items }: BillboardProps) => {
  return (
    <div className="w-full  ">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="relative w-full "
      >
        <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem key={index} className="relative group ">
              <div className="relative aspect-[2.5/1] md:h-full h-[300px]  rounded-md w-full overflow-hidden">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
        
                  className="  object-cover animate-gentle-zoom transform transition-transform transition-700 scale-100 group-hover:scale-105"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 text-white">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                    {item.title}
                  </h2>
                  {item.subtitle && (
                    <p className="text-lg md:text-xl max-w-2xl mb-8 text-gray-200 opacity-0 translate-y-4 transition-all duration-500 delay-100 group-hover:opacity-100 group-hover:translate-y-0">
                      {item.subtitle}
                    </p>
                  )}
                  {item.actionLabel && item.actionUrl && (
                    <Button
                      variant="outline"
                      size="lg"
                      className="bg-white/90 text-black hover:bg-black hover:text-white transition-all opacity-0 translate-y-4 duration-500 delay-200 group-hover:opacity-100 group-hover:translate-y-0"
                      onClick={() => window.location.href = item.actionUrl!}
                    >
                      {item.actionLabel}
                    </Button>
                  )}
 
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute w-full top-1/2 flex -translate-y-1/2 justify-between ">
          <CarouselPrevious className="relative left-1 md:h-12 w-12 rounded-full border-2 opacity-50 hover:opacity-100 transition-opacity" />
          <CarouselNext className="relative right-1 md:h-12 w-12 rounded-full border-2 opacity-50 hover:opacity-100 transition-opacity" />
        </div>

      </Carousel>
    </div>
  );
};

export default Billboard;
