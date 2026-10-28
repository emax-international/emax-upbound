import {useEffect} from 'react';
import type {AbTestingPageCmsQuery} from 'types/storefrontapi.generated';
import MediaCarousel from '~/components/cms/MediaCarousel';
import HeroAccordion from '~/components/cms/HeroAccordion';

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

  return (
    <div className="abTestingPage">
      {page.gallery?.reference && (
        <MediaCarousel reference={page.gallery.reference} />
      )}

      {/* TODO: "Hydration that keeps your head in the game" comparison section (on hold) */}

      {page.review?.reference && (
        <MediaCarousel reference={page.review.reference} />
      )}

      {page.faq?.reference && (
        <div className="page-px my-[60px] md:my-[100px]">
          <HeroAccordion reference={page.faq.reference} />
        </div>
      )}
    </div>
  );
}
