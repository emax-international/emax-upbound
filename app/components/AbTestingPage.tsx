import {useEffect, useRef} from 'react';
import type {AbTestingPageCmsQuery} from 'types/storefrontapi.generated';
import MediaCarousel from '~/components/cms/MediaCarousel';
import HeroAccordion from '~/components/cms/HeroAccordion';
import ComparisonTable from '~/components/cms/ComparisonTable';
import LandingProduct from '~/components/cms/LandingProduct';
import ClubFooter from '~/components/cms/ClubFooter';
import LandingHero from '~/components/cms/LandingHero';
import type {AbVariant} from '~/lib/abTestingPage';
import {pushAbEvent, saveAbContext} from '~/lib/abTracking';

interface AbTestingPageProps {
  page: NonNullable<AbTestingPageCmsQuery['abTestingPage']>;
  /** "split" when served from /loved-by, "direct" from the variant's own URL */
  source: 'split' | 'direct';
}

export default function AbTestingPage({page, source}: AbTestingPageProps) {
  // Lets GTM/GA4 compare the variants. The context (version + ad source) is
  // remembered so later events and the cart/order carry it too.
  // The ref sends it once per view: in development React's StrictMode runs
  // effects twice, which showed up as duplicate ab_test_view events.
  const sentView = useRef<string | null>(null);
  useEffect(() => {
    const key = `${page.handle}:${source}`;
    if (sentView.current === key) return;
    sentView.current = key;
    const context = saveAbContext(page.handle as AbVariant, source);
    pushAbEvent('ab_test_view', {}, context);
  }, [page.handle, source]);

  const productSection = page.productSection?.reference;

  return (
    <div className="abTestingPage">
      {page.hero?.reference && <LandingHero reference={page.hero.reference} />}

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

      {/* Replaces the site footer (hidden via the route handle) */}
      <ClubFooter image={page.footerImage?.reference?.image} />
    </div>
  );
}
