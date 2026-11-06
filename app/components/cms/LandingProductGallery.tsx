import {Image} from '@shopify/hydrogen';
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
    // Half-pill tabs flush with the image edge
    'absolute top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-8 bg-white/50 backdrop-blur-sm text-black cursor-pointer transition-opacity disabled:opacity-0';

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
              className={cn(arrowButton, 'left-0 rounded-r-full pr-1')}
              aria-label="Previous image"
            >
              <ArrowIcon className="-scale-x-100" />
            </button>
            <button
              type="button"
              onClick={() => api?.scrollNext()}
              disabled={selected === images.length - 1}
              className={cn(arrowButton, 'right-0 rounded-l-full pl-1')}
              aria-label="Next image"
            >
              <ArrowIcon />
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

/** Thin right-pointing chevron; mirror it with -scale-x-100 for "previous". */
function ArrowIcon({className}: {className?: string}) {
  return (
    <svg
      viewBox="0 0 12 21"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
      className={cn('h-3.5 w-auto', className)}
    >
      <path d="M0.866217 19.6673L10.7907 9.40059" />
      <path d="M10.8027 10.8028L0.707079 0.70723" />
    </svg>
  );
}
