import {Image} from '@shopify/hydrogen';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import {useEffect, useState} from 'react';
import type {LandingProductFragment} from 'types/storefrontapi.generated';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '~/components/ui/carousel';
import {cn} from '~/lib/utils';

type GalleryImage = LandingProductFragment['images']['nodes'][number];

/** Product images: main slider with prev/next arrows and a thumbnail row. */
export default function LandingProductGallery({
  images,
  className,
}: {
  images: GalleryImage[];
  className?: string;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!api) return;
    const update = () => setSelected(api.selectedScrollSnap());
    update();
    api.on('select', update);
    api.on('reInit', update);
    return () => {
      api.off('select', update);
      api.off('reInit', update);
    };
  }, [api]);

  if (images.length === 0) return null;

  const arrowButton =
    'absolute top-1/2 -translate-y-1/2 flex items-center justify-center size-8 rounded-full bg-white/90 text-black shadow-sm cursor-pointer transition-opacity disabled:opacity-0';

  return (
    <div className={cn('space-y-3', className)}>
      <div className="relative">
        <Carousel opts={{loop: false}} setApi={setApi}>
          <CarouselContent className="ml-0">
            {images.map((image, index) => (
              <CarouselItem key={image.id ?? index} className="pl-0">
                <div className="aspect-[9/10] rounded-xl overflow-clip bg-neutral-100">
                  <Image
                    data={image}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="w-full h-full object-cover"
                    loading={index === 0 ? 'eager' : 'lazy'}
                    draggable={false}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => api?.scrollPrev()}
              disabled={selected === 0}
              className={cn(arrowButton, 'left-3')}
              aria-label="Previous image"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => api?.scrollNext()}
              disabled={selected === images.length - 1}
              className={cn(arrowButton, 'right-3')}
              aria-label="Next image"
            >
              <ChevronRight className="size-4" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {images.map((image, index) => (
            <button
              key={image.id ?? index}
              type="button"
              onClick={() => api?.scrollTo(index)}
              className={cn(
                'shrink-0 size-14 lg:size-16 rounded-md overflow-clip cursor-pointer border-2 transition-colors',
                index === selected
                  ? 'border-black'
                  : 'border-transparent opacity-70 hover:opacity-100',
              )}
              aria-label={`Show image ${index + 1}`}
              aria-current={index === selected}
            >
              <Image
                data={image}
                width={128}
                height={128}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
