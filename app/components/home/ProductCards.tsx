import { Image } from '@shopify/hydrogen';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import type { ProductCardFragment } from 'types/storefrontapi.generated';
import {CarouselNav} from '~/components/cms/MediaCarousel';
import TextField from '~/components/cms/TextField';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '~/components/ui/carousel';
import { cn } from '~/lib/utils';

/**
 * "Hydrate up" section: one card per `product_card` entry, in the order set
 * on the homepage entry. Desktop: cards side by side. Mobile: carousel.
 */
export default function ProductCards({
  title = 'Hydrate up',
  cards,
}: {
  title?: string;
  cards: ProductCardFragment[];
}) {
  const items = cards.filter((card) => card.product?.reference);
  if (items.length === 0) return null;

  return (
    <section className="bg-white py-15 md:py-25 lg:px-10 xl:px-16">
      <div className="max-w-content">
        <h1 className="typo-h1 font-medium md:font-medium text-center md:text-left mb-6 md:mb-10">
          {title}
        </h1>
        {/* Mobile: one card at a time with space at the sides, arrows +
            dots below (same as the other carousels). From md up the
            carousel is switched off and the cards sit side by side. */}
        <Carousel
          opts={{
            align: 'center',
            loop: false,
            breakpoints: {'(min-width: 768px)': {active: false}},
          }}
          className="px-8 md:px-0"
        >
          <CarouselContent className="md:grid md:grid-cols-2 md:gap-6 md:ml-0">
            {items.map((card) => (
              <CarouselItem key={card.id} className="md:pl-0">
                <ProductCard card={card} />
              </CarouselItem>
            ))}
          </CarouselContent>
          {items.length > 1 && <CarouselNav className="md:hidden" />}
        </Carousel>
      </div>
    </section>
  );
}

function ProductCard({ card }: { card: ProductCardFragment }) {
  const product = card.product?.reference;
  if (!product) return null;

  const cardImages = (card.image?.references?.nodes ?? []).flatMap((node) =>
    'image' in node && node.image ? [node.image] : [],
  );
  const images =
    cardImages.length > 0
      ? cardImages
      : product.featuredImage
        ? [product.featuredImage]
        : [];
  // The product's own title (the card's `name` is just the entry's label)
  const name = product.title;
  const label = card.label?.value?.trim();
  const url = `/products/${product.handle}`;
  // The frame takes the first image's own shape (no cropping)
  const first = images[0];
  const frameRatio =
    first?.width && first?.height ? `${first.width} / ${first.height}` : '4 / 3';

  return (
    <article className="group flex flex-col h-full">
      <Link
        to={url}
        prefetch="intent"
        className="relative block overflow-hidden rounded-2xl bg-neutral-100"
        style={{ aspectRatio: frameRatio }}
      >
        <CardImages images={images} />
        {label && (
          <span
            className="absolute top-4 left-4 md:top-6 md:left-6 rounded-full bg-mint px-4 py-1.5 md:px-6 md:py-2 text-sm md:text-lg font-semibold uppercase tracking-wide text-black"
            style={
              card.labelColor?.value
                ? { backgroundColor: card.labelColor.value }
                : undefined
            }
          >
            {label}
          </span>
        )}
      </Link>

      <div className="flex flex-col flex-1 pt-5 px-5 md:pt-6">
        {/* Same size as the section headings ("Brands we've worked with") */}
        <h2 className="typo-h2 font-medium md:font-medium">
          <Link to={url} prefetch="intent">
            {name}
          </Link>
        </h2>
        {card.description?.value && (
          <h3 className="font-medium md:font-medium text-sm md:text-base [&_p]:text-sm md:[&_p]:text-base mt-3">{card.description.value}</h3>
        )}
        {/* Rich text, usually a bullet list */}
        <TextField
          value={card.info?.value}
          className={cn(
            'my-5 text-sm md:text-base [&_p]:text-sm md:[&_p]:text-base',
            '[&_ul]:space-y-1.5 [&_ol]:space-y-1.5 [&_ol]:list-decimal [&_ol]:pl-5',
            '[&_ul>li]:flex [&_ul>li]:items-center [&_ul>li]:gap-2.5',
            "[&_ul>li]:before:content-[''] [&_ul>li]:before:size-2 [&_ul>li]:before:rounded-full [&_ul>li]:before:bg-black [&_ul>li]:before:shrink-0",
          )}
        />
        {/* mt-auto pins the button to the bottom so the buttons line up
            across cards whatever the text length (cards share the row
            height); pt-8 keeps the gap above it */}
        <div className="mt-auto pt-8">
          <Link
            to={url}
            prefetch="intent"
            className="inline-flex items-center rounded-[80px] bg-black px-8 py-3 md:px-10 md:py-4 uppercase leading-none! text-white transition-colors hover:bg-mint hover:text-black"
          >
            Shop now
          </Link>
        </div>
      </div>
    </article>
  );
}

type CardImage = NonNullable<
  NonNullable<ProductCardFragment['product']>['reference']
>['featuredImage'];

const SLIDE_INTERVAL_MS = 3000;

/**
 * The card's images stacked on top of each other.
 * - Mouse: shows the first, fades to the second on hover.
 * - Touch (no hover): cycles through all images while the card is the one
 *   on screen (swiped into view and the section scrolled into view).
 */
function CardImages({ images }: { images: NonNullable<CardImage>[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const count = images.length;

  // "Active display": most of the card is visible. The observer also counts
  // the horizontal scroll row's clipping, so a half-swiped card isn't active.
  useEffect(() => {
    const element = ref.current;
    if (!element || count < 2) return;
    const touchOnly = window.matchMedia('(hover: none)').matches;
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (!touchOnly || reducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.6 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [count]);

  useEffect(() => {
    if (!inView) return;
    const timer = window.setInterval(
      () => setActive((index) => (index + 1) % count),
      SLIDE_INTERVAL_MS,
    );
    return () => window.clearInterval(timer);
  }, [inView, count]);

  return (
    <div ref={ref} className="absolute inset-0">
      {images.map((image, index) => (
        <Image
          key={`${index}-${image.url}`}
          data={image}
          sizes="(min-width: 768px) 50vw, 85vw"
          aria-hidden={index > 0}
          className={cn(
            // Tailwind v4's scale-* sets the `scale` property (not
            // `transform`), so that's what has to transition
            'absolute inset-0 w-full h-full object-cover transition-[opacity,scale] duration-700 ease-out group-hover:scale-[1.03]',
            // The first image stays underneath; later ones fade in over it
            index > 0 && (active === index ? 'opacity-100' : 'opacity-0'),
            index === 1 && 'group-hover:opacity-100',
          )}
        />
      ))}
    </div>
  );
}
