import {Link} from 'react-router';
import type {HeroWithCtaFragment} from 'types/storefrontapi.generated';

/**
 * Homepage hero, image design: the desktop / tablet / mobile image (any words are
 * part of the picture) at its own shape, so nothing gets cropped, with a
 * mint button from the entry's CTA: bottom right on desktop, bottom left
 * on mobile. The entry's title and description aren't shown.
 * The alternative text design is HomeHero; see ~/lib/siteDesign.
 */
export default function HomeHeroClassic({
  reference,
}: {
  reference: HeroWithCtaFragment;
}) {
  const {desktopImage, tabletImage, mobileImage, cta} = reference;
  const desktop = desktopImage?.reference?.image;
  const tablet = tabletImage?.reference?.image ?? desktop;
  const mobile = mobileImage?.reference?.image ?? desktop;
  const button = cta?.reference;
  const label = button?.label?.value?.trim() || 'Shop now';
  const internalUrl = button?.internalUrl?.value?.trim();
  const externalUrl = button?.externalUrl?.value?.trim();

  return (
    <section className="relative w-full bg-white">
      {/* <picture>: the browser downloads only the image for the current
          screen (desktop ≥1024px, tablet 768–1023px, else mobile). Each
          shows at its own shape (width/height on every source). */}
      {mobile && (
        <picture>
          {desktop && (
            <source
              media="(min-width: 1024px)"
              srcSet={srcSet(desktop.url)}
              sizes="100vw"
              width={desktop.width ?? undefined}
              height={desktop.height ?? undefined}
            />
          )}
          {tablet && (
            <source
              media="(min-width: 768px)"
              srcSet={srcSet(tablet.url)}
              sizes="100vw"
              width={tablet.width ?? undefined}
              height={tablet.height ?? undefined}
            />
          )}
          <img
            src={sized(mobile.url, 828)}
            srcSet={srcSet(mobile.url)}
            sizes="100vw"
            width={mobile.width ?? undefined}
            height={mobile.height ?? undefined}
            alt={mobile.altText ?? ''}
            loading="eager"
            draggable={false}
            className="block w-full h-auto"
          />
        </picture>
      )}

      {(internalUrl || externalUrl) && (
        <div className="absolute bottom-6 left-6 md:left-auto md:right-10 md:bottom-10">
          {internalUrl ? (
            <Link to={internalUrl} prefetch="intent" className={BUTTON_CLASS}>
              {label}
            </Link>
          ) : (
            <a href={externalUrl} className={BUTTON_CLASS}>
              {label}
            </a>
          )}
        </div>
      )}
    </section>
  );
}

const WIDTHS = [640, 828, 1080, 1440, 1920, 2560];

/** Shopify CDN url resized to `width` (keeps its other params, e.g. ?v=). */
function sized(url: string, width: number) {
  const resized = new URL(url);
  resized.searchParams.set('width', String(width));
  return resized.toString();
}

function srcSet(url: string) {
  return WIDTHS.map((width) => `${sized(url, width)} ${width}w`).join(', ');
}

const BUTTON_CLASS =
  'inline-flex items-center justify-center px-8 py-4 md:px-10 md:py-5 bg-mint text-black text-sm md:text-base font-semibold uppercase tracking-wide leading-none transition-colors hover:bg-black hover:text-mint';
