import {Image} from '@shopify/hydrogen';
import type {HeroWithCtaFragment} from 'types/storefrontapi.generated';
import BuyNowLink from './BuyNowLink';

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
            <span className="block font-extralight italic">{firstLine}</span>
          )}
          {restLines.map((line) => (
            <span key={line} className="block font-normal">
              {line}
            </span>
          ))}
        </h1>
        {cta?.reference && (
          <BuyNowLink
            position="hero"
            label={cta.reference.label?.value}
            className="hover:bg-white"
          />
        )}
      </div>
    </section>
  );
}
