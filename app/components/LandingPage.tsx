import {useEffect, useRef} from 'react';
import type {LandingPageFragment} from 'types/storefrontapi.generated';
import MediaCarousel from '~/components/cms/MediaCarousel';
import HeroAccordion from '~/components/cms/HeroAccordion';
import ComparisonTable from '~/components/cms/ComparisonTable';
import LandingProduct from '~/components/cms/LandingProduct';
import ClubFooter from '~/components/cms/ClubFooter';
import LandingHero from '~/components/cms/LandingHero';
import {isAbVariant} from '~/lib/abTestingPage';
import {AbPageContext, pushAbEvent, saveAbContext} from '~/lib/abTracking';
import {landingUsesClubFooter} from '~/lib/landingPage';

interface LandingPageProps {
  page: LandingPageFragment;
  /** "split" when served from /loved-by, "direct" from the variant's own URL.
   * Only used for A/B test versions. */
  source?: 'split' | 'direct';
  /** Show the "Join the Upbound Club" footer when the entry has no
   * `club_footer` set: on for standalone pages, off on product pages
   * (which keep the site footer). With `club_footer` set it always shows.
   * Must match the route handle's fallback so exactly one footer shows. */
  clubFooter?: boolean;
}

/**
 * Landing page template for `ab_testing_page` and `landing_page` entries
 * (A/B pages and product pages). Only the A/B test versions (AB_VARIANTS of
 * the ab_testing_page type) are tracked as part of the test.
 */
export default function LandingPage({
  page,
  source = 'direct',
  clubFooter = true,
}: LandingPageProps) {
  const isAbPage = page.type === 'ab_testing_page' && isAbVariant(page.handle);

  // Lets GTM/GA4 compare the variants. The context (version + ad source) is
  // remembered so later events and the cart/order carry it too.
  // The ref sends it once per view: in development React's StrictMode runs
  // effects twice, which showed up as duplicate ab_test_view events.
  const sentView = useRef<string | null>(null);
  useEffect(() => {
    if (!isAbPage || !isAbVariant(page.handle)) return;
    const key = `${page.handle}:${source}`;
    if (sentView.current === key) return;
    sentView.current = key;
    const context = saveAbContext(page.handle, source);
    pushAbEvent('ab_test_view', {}, context);
  }, [isAbPage, page.handle, source]);

  const productSection = page.productSection?.reference;

  return (
    <AbPageContext.Provider value={isAbPage}>
      <div className="landingPage">
        {page.hero?.reference && (
          <LandingHero reference={page.hero.reference} />
        )}

        {productSection?.product?.reference && (
          <LandingProduct
            product={productSection.product.reference}
            subtitle={productSection.subtitle?.value}
            highlights={productSection.highlights?.value}
            info={productSection.info?.reference}
            images={page.productImages?.references?.nodes.flatMap((node) =>
              'image' in node && node.image ? [node.image] : [],
            )}
          />
        )}

        {page.gallery?.reference && (
          <MediaCarousel reference={page.gallery.reference} />
        )}

        {page.comparison?.reference && (
          // flow-root keeps the table's margins inside the white band
          <div className="flow-root bg-white">
            <ComparisonTable reference={page.comparison.reference} buyNow />
          </div>
        )}

        {page.review?.reference && (
          <MediaCarousel reference={page.review.reference} />
        )}

        {page.faq?.reference && (
          <div className="page-px py-[60px] md:py-[100px] bg-white">
            <HeroAccordion
              reference={page.faq.reference}
              titleClassName="font-medium md:font-medium"
            />
          </div>
        )}

        {/* Replaces the site footer on standalone pages (hidden via the
            route handle) */}
        {landingUsesClubFooter(page, clubFooter) && (
          <ClubFooter
            content={page.clubFooter?.reference}
            image={
              page.clubFooter?.reference?.backgroundImage?.reference?.image
            }
            logo={footerLogoOf(page.clubFooter?.reference?.logo?.reference)}
          />
        )}
      </div>
    </AbPageContext.Provider>
  );
}

/** The footer logo file: an image, or an SVG stored as a generic file. */
function footerLogoOf(
  reference:
    | {image?: {url: string; altText?: string | null} | null}
    | {url?: string | null; alt?: string | null}
    | null
    | undefined,
) {
  if (!reference) return null;
  if ('image' in reference && reference.image) {
    return {url: reference.image.url, alt: reference.image.altText};
  }
  if ('url' in reference && reference.url) {
    return {url: reference.url, alt: reference.alt};
  }
  return null;
}
