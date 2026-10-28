import { CartForm, type OptimisticCartLineInput, useAnalytics } from '@shopify/hydrogen';
import { VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { type FetcherWithComponents } from 'react-router';
import { useEffect, useRef } from 'react';
import { cn } from '~/lib/utils';
import { Button, buttonVariants } from './ui/button';
import { useAside } from './Aside';
import { pushCartEvent, type TrackedItem } from '~/lib/tracking';
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
  open,
  loadingChildren,
  children,
}: {
  fetcher: FetcherWithComponents<any>;
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
  open: (mode: AsideType) => void;
  loadingChildren?: React.ReactNode;
  children: React.ReactNode;
}) {
  const previousFetcherState = useRef('idle');

  useEffect(() => {
    if (previousFetcherState.current !== 'idle' && fetcher.state === 'idle') {
      const qty = quantity ?? productData?.quantity ?? 1;
      if (trackingItem) {
        pushCartEvent('add_to_cart', {...trackingItem, quantity: qty}, page);
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
      <Button
        type="submit"
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
