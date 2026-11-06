import { CartForm, type OptimisticCartLineInput, useAnalytics } from '@shopify/hydrogen';
import { VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { type FetcherWithComponents } from 'react-router';
import { useEffect, useRef } from 'react';
import { cn } from '~/lib/utils';
import { Button, buttonVariants } from './ui/button';
import { useAside } from './Aside';
import { pushCartEvent, type TrackedItem } from '~/lib/tracking';
import { abCartAttributes } from '~/lib/abTracking';
import type { AsideType } from './Aside';


export function AddToCartButton({
  analytics,
  children,
  loadingChildren,
  disabled,
  lines,
  buttonClassName,
  containerClassName,
  variant,
  size,
  openCartOnSubmit = true,
  productData,
  trackingItem,
  quantity,
  page,
  onSuccess,
  onClick,
}: {
  analytics?: unknown;
  children: React.ReactNode;
  loadingChildren?: React.ReactNode;
  disabled?: boolean;
  lines: Array<OptimisticCartLineInput>;
  buttonClassName?: string;
  containerClassName?: string;
  openCartOnSubmit?: boolean;
  productData?: Record<string, any>;
  trackingItem?: Omit<TrackedItem, 'quantity'>;
  quantity?: number;
  page?: string;
  onSuccess?: () => void;
  /** Called when the button is clicked (e.g. CTA click tracking) */
  onClick?: () => void;
} & VariantProps<typeof buttonVariants> & {
  asChild?: boolean;
}) {
  const { open } = useAside();
  const { shop } = useAnalytics();
  const currencyCode = shop?.currency || 'MYR';

  return (
    <div className={cn('', containerClassName)}>
      <CartForm
        route="/cart"
        inputs={{ lines }}
        action={CartForm.ACTIONS.LinesAdd}
      >
        {(fetcher: FetcherWithComponents<any>) => (
          <CartFormInner
            fetcher={fetcher}
            lines={lines}
            analytics={analytics}
            disabled={disabled}
            buttonClassName={buttonClassName}
            variant={variant}
            size={size}
            openCartOnSubmit={openCartOnSubmit}
            productData={productData}
            trackingItem={trackingItem}
            quantity={quantity}
            page={page}
            currencyCode={currencyCode}
            onSuccess={onSuccess}
            onClick={onClick}
            open={open}
            loadingChildren={loadingChildren}
          >
            {children}
          </CartFormInner>
        )}
      </CartForm>
    </div>
  );
}

function CartFormInner({
  fetcher,
  lines,
  analytics,
  disabled,
  buttonClassName,
  variant,
  size,
  openCartOnSubmit,
  productData,
  trackingItem,
  quantity,
  page,
  currencyCode,
  onSuccess,
  onClick,
  open,
  loadingChildren,
  children,
}: {
  fetcher: FetcherWithComponents<any>;
  lines: Array<OptimisticCartLineInput>;
  analytics?: unknown;
  disabled?: boolean;
  buttonClassName?: string;
  variant?: any;
  size?: any;
  openCartOnSubmit?: boolean;
  productData?: Record<string, any>;
  trackingItem?: Omit<TrackedItem, 'quantity'>;
  quantity?: number;
  page?: string;
  currencyCode: string;
  onSuccess?: () => void;
  /** Called when the button is clicked (e.g. CTA click tracking) */
  onClick?: () => void;
  open: (mode: AsideType) => void;
  loadingChildren?: React.ReactNode;
  children: React.ReactNode;
}) {
  const previousFetcherState = useRef('idle');
  const abAttributesRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (previousFetcherState.current !== 'idle' && fetcher.state === 'idle') {
      const qty = quantity ?? productData?.quantity ?? 1;
      const lineQuantity = cartQuantityOf(lines, fetcher.data?.cart);
      if (trackingItem) {
        pushCartEvent('add_to_cart', {...trackingItem, quantity: qty, lineQuantity}, page);
      } else if (productData) {
        const variant = productData.selectedOrFirstAvailableVariant;
        const price = variant?.price ?? productData.price ?? productData.priceRange?.minVariantPrice;
        pushCartEvent(
          'add_to_cart',
          {
            id: productData.id ?? '',
            name: productData.title ?? productData.product?.title ?? '',
            variant: variant?.title ?? '',
            price: parseFloat(price?.amount ?? '0'),
            quantity: qty,
            currency: price?.currencyCode ?? currencyCode,
            lineQuantity,
          },
          page,
        );
      }

      if (openCartOnSubmit) open('cart');
      onSuccess?.();
    }
    previousFetcherState.current = fetcher.state;
  }, [fetcher.state]);

  const isLoading = fetcher.state === 'loading' || fetcher.state === 'submitting';

  return (
    <div>
      <input
        name="analytics"
        type="hidden"
        value={JSON.stringify(analytics)}
      />
      {/* A/B test context for the cart attributes; filled on click since it
          comes from localStorage/cookies (not available during SSR) */}
      <input ref={abAttributesRef} name="cartAttributes" type="hidden" />
      <Button
        type="submit"
        onClick={() => {
          if (abAttributesRef.current) {
            abAttributesRef.current.value = JSON.stringify(abCartAttributes());
          }
          onClick?.();
        }}
        variant={variant ?? 'gray-mint'}
        size={size}
        disabled={disabled || isLoading}
        className={cn('', buttonClassName)}
      >
        {isLoading
          ? (loadingChildren ?? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Adding Item...
            </div>
          ))
          : children}
      </Button>
    </div>
  );
}

const isGiftAttr = (attrs?: Array<{key: string; value?: string | null}> | null) =>
  !!attrs?.some((a) => a.key === '_is_free_gift' && a.value === 'true');

/**
 * Quantity of the added item in the updated cart (same variant and same
 * subscription plan, free gifts excluded). Undefined if the cart isn't returned.
 */
function cartQuantityOf(lines: Array<OptimisticCartLineInput>, cart: any): number | undefined {
  const added = lines.find((l) => !isGiftAttr(l.attributes));
  const cartLines: any[] | undefined = cart?.lines?.nodes;
  if (!added || !cartLines) return undefined;
  return cartLines
    .filter(
      (l) =>
        l.merchandise?.id === added.merchandiseId &&
        (l.sellingPlanAllocation?.sellingPlan?.id ?? null) === (added.sellingPlanId ?? null) &&
        !isGiftAttr(l.attributes),
    )
    .reduce((sum, l) => sum + l.quantity, 0);
}
