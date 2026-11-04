import {Image} from '@shopify/hydrogen';
import type {HeroWithCtaFragment} from 'types/storefrontapi.generated';
import {LANDING_PRODUCT_ID} from './LandingProduct';

/**
 * Landing-page hero built from a `hero_with_cta` entry. Centred title (first
 * line light italic, the rest bold). When a CTA is attached, its button
 * scrolls down to the add-to-cart section; the CTA only sets the label.
 */
export default function LandingHero({
  reference,
}: {
  reference: HeroWithCtaFragment;
}) {
  const {title, desktopImage, mobileImage, cta} = reference;
  const [firstLine, ...restLines] = (title?.value ?? '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
  const desktop = desktopImage?.reference?.image;
  const mobile = mobileImage?.reference?.image ?? desktop;

  const scrollToProduct = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById(LANDING_PRODUCT_ID);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({behavior: 'smooth', block: 'start'});
  };

  return (
    <section className="relative w-full h-[80svh] min-h-[480px] max-h-[760px] overflow-clip bg-black">
      {desktop && (
        <Image
          data={desktop}
          sizes="100vw"
          className="hidden md:block absolute inset-0 w-full h-full object-cover"
          loading="eager"
          draggable={false}
        />
      )}
      {mobile && (
        <Image
          data={mobile}
          sizes="100vw"
          className="md:hidden absolute inset-0 w-full h-full object-cover"
          loading="eager"
          draggable={false}
        />
      )}
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative h-full flex flex-col items-center justify-center gap-6 px-6 text-center text-white">
        <h1 className="typo-h1 uppercase">
          {firstLine && (
            <span className="block font-light italic">{firstLine}</span>
          )}
          {restLines.map((line) => (
            <span key={line} className="block font-semibold">
              {line}
            </span>
          ))}
        </h1>
        {cta?.reference && (
          <a
            href={`#${LANDING_PRODUCT_ID}`}
            onClick={scrollToProduct}
            className="inline-flex items-center min-h-10 px-5 rounded-md bg-mint text-black typo-caption-responsive-uppercase font-semibold hover:bg-white transition-colors"
          >
            {cta.reference.label?.value || 'Buy now'}
          </a>
        )}
      </div>
    </section>
  );
}
