'use client';

import { useState, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';

import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';

interface ImageCarouselProps {
  images: (string | StaticImageData)[];
  autoPlayInterval?: number;
  showDots?: boolean;
}

export const ImageCarousel = ({
  images,
  showDots = true,
}: ImageCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const updateCurrent = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on('select', updateCurrent);
    updateCurrent();

    return () => {
      api.off('select', updateCurrent);
    };
  }, [api]);

  if (images.length === 0) return null;

  return (
    <div className="relative h-[264px] w-full">
      <Carousel
        setApi={setApi}
        className="h-full w-full"
        opts={{
          align: 'start',
          loop: true,
        }}
      >
        <CarouselContent className="-ml-0 h-full">
          {images.map((image, index) => (
            <CarouselItem key={index} className="h-full pl-0">
              <div className="relative h-[264px] w-full">
                <Image
                  src={image}
                  alt={`Booth image ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {images.length > 1 && (
          <div className="font-manrope absolute right-4 bottom-4 z-10 rounded-[3px] bg-black/50 px-[11px] py-1 text-xs font-bold text-white">
            {current + 1} / {images.length}
          </div>
        )}

        {showDots && images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={cn(
                  'h-2 w-2 rounded-full transition-all duration-300',
                  index === current ? 'bg-white' : 'bg-white/50',
                )}
                onClick={() => api?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </Carousel>
    </div>
  );
};
