import {cn} from '~/lib/utils';
import {LANDING_PRODUCT_ID} from './LandingProduct';

/**
 * "Buy now" button for the A/B landing pages: smooth-scrolls to the
 * add-to-cart section. Falls back to a plain hash link without JS.
 */
export default function BuyNowLink({
  label,
  className,
}: {
  label?: string | null;
  className?: string;
}) {
  const scrollToProduct = (event: React.MouseEvent<HTMLAnchorElement>) => {
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
      {label || 'Buy now'}
    </a>
  );
}
