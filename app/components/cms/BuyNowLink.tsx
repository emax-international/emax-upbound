import {useAbEvent} from '~/lib/abTracking';
import {cn} from '~/lib/utils';
import {LANDING_PRODUCT_ID} from './LandingProduct';

/**
 * "Buy now" button for the A/B landing pages: smooth-scrolls to the
 * add-to-cart section. Falls back to a plain hash link without JS.
 * Each click is tracked as `cta_click` with its label and `position`.
 */
export default function BuyNowLink({
  label,
  position,
  className,
}: {
  label?: string | null;
  /** Where the button sits on the page, e.g. "hero", "comparison" */
  position: string;
  className?: string;
}) {
  const pushAbEvent = useAbEvent();
  const text = label || 'Buy now';

  const scrollToProduct = (event: React.MouseEvent<HTMLAnchorElement>) => {
    pushAbEvent('cta_click', {cta_label: text, cta_position: position});
    const target = document.getElementById(LANDING_PRODUCT_ID);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({behavior: 'smooth', block: 'start'});
  };

  return (
    <a
      href={`#${LANDING_PRODUCT_ID}`}
      onClick={scrollToProduct}
      className={cn(
        'inline-flex items-center justify-center min-h-10 rounded-md bg-mint text-black typo-caption-responsive-uppercase font-semibold transition-colors',
        className,
      )}
    >
      {text}
    </a>
  );
}
