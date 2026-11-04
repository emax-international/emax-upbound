import {useEffect} from 'react';
import type {AbTestingPageCmsQuery} from 'types/storefrontapi.generated';
import MediaCarousel from '~/components/cms/MediaCarousel';
import HeroAccordion from '~/components/cms/HeroAccordion';
import ComparisonTable from '~/components/cms/ComparisonTable';
import LandingProduct from '~/components/cms/LandingProduct';
import ClubFooter from '~/components/cms/ClubFooter';
import LandingHero from '~/components/cms/LandingHero';

interface AbTestingPageProps {
  page: NonNullable<AbTestingPageCmsQuery['abTestingPage']>;
  /** "split" when served from /loved-by, "direct" from the variant's own URL */
  source: 'split' | 'direct';
}

export default function AbTestingPage({page, source}: AbTestingPageProps) {
  // Lets GTM/GA4 compare the variants
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'ab_test_view',
      ab_test: 'loved_by',
      ab_variant: page.handle,
      ab_source: source,
    });
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
