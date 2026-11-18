import {Image} from '@shopify/hydrogen';
import {Link} from 'react-router';
import type {PeopleCardFragment} from 'types/storefrontapi.generated';
import {CarouselNav} from '~/components/cms/MediaCarousel';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '~/components/ui/carousel';

/**
 * "The People Who Choose Upbound": the homepage `blog` articles as portrait
 * cards (name + role on the photo) in a carousel, with the same arrows and
 * dots as the brands carousel. Each card opens the article on /community.
 */
export default function PeopleCarousel({
  articles,
}: {
  articles: PeopleCardFragment[];
}) {
  const items = articles.filter((article) => article.image);
  if (items.length === 0) return null;

  return (
    <section className="py-15 md:py-25 bg-white">
      <h2 className="page-px typo-h1 text-center mb-8 md:mb-12">
        The People Who Choose
        <span className="block typo-h1 font-medium md:font-medium">Upbound</span>
      </h2>

      {/* Side padding on the wrapper (not the track, which would throw off
          Embla's snap points); the next card peeks in at the right */}
      <Carousel
        opts={{align: 'start', loop: false}}
        className="max-w-content px-6 md:px-10"
      >
        <CarouselContent>
          {items.map((article) => (
            <CarouselItem
              key={article.id}
              className="basis-[85%] sm:basis-[55%] md:basis-[42%] lg:basis-[32%]"
            >
              <PeopleCard article={article} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNav className="md:w-1/2 lg:w-2/5 md:mx-auto" />
      </Carousel>
    </section>
  );
}

function PeopleCard({article}: {article: PeopleCardFragment}) {
  const url = `/community/${article.handle}`;

  return (
    <Link
      to={url}
      prefetch="intent"
      className="group relative block aspect-4/5 overflow-hidden rounded-2xl bg-neutral-100"
    >
      {article.image && (
        <Image
          data={article.image}
          sizes="(min-width: 1024px) 32vw, (min-width: 768px) 42vw, 85vw"
          className="absolute inset-0 w-full h-full object-cover transition-[scale] duration-700 ease-out group-hover:scale-[1.03]"
        />
      )}
      {/* Darkens the bottom so the white text stays readable */}
      <div className="absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-black/90 via-black/50 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-5 md:p-7 text-white">
        <h3 className="text-2xl md:text-3xl font-medium md:font-medium leading-tight">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="mt-2 text-sm! md:text-base! text-white line-clamp-2">
            {article.excerpt}
          </p>
        )}
        <span className="inline-block mt-4 rounded-full bg-[#D9D9D9] px-4 py-1.5 text-sm font-medium text-black transition-colors group-hover:bg-mint">
          Read More
        </span>
      </div>
    </Link>
  );
}
