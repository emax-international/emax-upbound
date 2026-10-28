import { type MappedProductOptions, Money } from '@shopify/hydrogen';
import type {
  Maybe,
  ProductOptionValueSwatch,
} from '@shopify/hydrogen/storefront-api-types';
import { Link, useNavigate } from 'react-router';
import type { ProductFragment, SellingPlanFragment } from 'types/storefrontapi.generated';
import { AddToCartButton } from './AddToCartButton';
import { useAside } from './Aside';
import { ProductQuantityControl } from './ProductQuantityControl';
import { Button } from './ui/button';
import { cn } from '~/lib/utils';
import { useState, useEffect } from 'react';
import {
  SellingPlanSelector,
  type SellingPlanGroup,
} from '~/components/SellingPlanSelector';


function parseGiftValue(raw: string): string[] {
  const stripped = raw.trim().replace(/^'([\s\S]*)'$/, '$1');
  try {
    const parsed = JSON.parse(stripped);
    return Array.isArray(parsed) ? (parsed as string[]) : [parsed as string];
  } catch {
    try {
      const parsed = JSON.parse(stripped.replace(/'/g, '"'));
      return Array.isArray(parsed) ? (parsed as string[]) : [parsed as string];
    } catch {
      return raw.trim() ? [raw.trim()] : [];
    }
  }
}

export function ProductForm({
  productId,
  productTitle,
  productOptions,
  selectedVariant,
  sellingPlanGroups,
  selectedSellingPlan,
  purchaseType,
  setPurchaseType,
  giftImages = {},
}: {
  productId: string;
  productTitle: string;
  productOptions: MappedProductOptions[];
  selectedVariant: ProductFragment['selectedOrFirstAvailableVariant'];
  selectedSellingPlan: SellingPlanFragment | null;
  sellingPlanGroups: ProductFragment['sellingPlanGroups'];
  purchaseType: 'one-time' | 'subscription';
  setPurchaseType: (type: 'one-time' | 'subscription') => void;
  giftImages?: Record<string, {url: string | null; altText: string | null; width: number; height: number; title: string; selectedOptions: {name: string; value: string}[]; sizeChartUrl: string | null}>;
}) {
  const navigate = useNavigate();
  useAside();

  const [quantity, setQuantity] = useState(1);

  const hasSubscription = (selectedVariant?.sellingPlanAllocations?.nodes?.length ?? 0) > 0;

  useEffect(() => {
    if (!hasSubscription) {
      setPurchaseType('one-time');
    }
  }, [hasSubscription]);


  const firstAllocation = selectedVariant?.sellingPlanAllocations?.nodes?.[0];

  const subPrice = firstAllocation?.priceAdjustments?.[0]?.price;
  const originalPrice = selectedVariant?.price;

  // Calculate the discount safely
  const discountPercent = subPrice && originalPrice
    ? Math.round(
      ((parseFloat(originalPrice.amount) - parseFloat(subPrice.amount)) /
        parseFloat(originalPrice.amount)) * 100
    )
    : 0;

  const activeSellingPlanId =
    selectedSellingPlan?.id ||
    selectedVariant?.sellingPlanAllocations?.nodes?.[0]?.sellingPlan?.id;

  // Read gift config from variant metafields
  const variantAny = selectedVariant as any;
  const freeGiftId: string | null = variantAny?.freeGift?.value ?? null;
  const freeGiftSubRaw: string | null = variantAny?.freeGiftSubscription?.value ?? null;
  const isSubscription = purchaseType === 'subscription';

  // Parse both metafields — each can be a single GID or an array of GIDs
  const freeGiftIds: string[] = freeGiftId ? parseGiftValue(freeGiftId) : [];
  const freeGiftSubIds: string[] = freeGiftSubRaw ? parseGiftValue(freeGiftSubRaw) : [];

  // Pick the active gift based on purchase type
  const activeGiftIds = isSubscription ? freeGiftSubIds : freeGiftIds;
  const giftVariantId: string | null = activeGiftIds[0] ?? null;

  // Size selector shown when there are multiple variants (e.g. T-Shirt S/M/L)
  const giftSizeOptions: {label: string; variantId: string}[] =
    activeGiftIds.length > 1
      ? activeGiftIds.map((id) => ({
          label:
            giftImages[id]?.selectedOptions?.find((o) => o.name === 'Size')?.value ?? id,
          variantId: id,
        }))
      : [];

  const freeGiftSelectedVariant = giftVariantId
    ? ({
        id: giftVariantId,
        title: giftImages[giftVariantId]?.title ?? 'Free Gift',
        availableForSale: true,
        price: {amount: '0.00', currencyCode: 'MYR'},
        compareAtPrice: null,
        selectedOptions: [],
        image: null,
        product: {title: giftImages[giftVariantId]?.title ?? 'Free Gift', handle: ''},
      } as any)
    : null;

  return (
    <div className="product-form">
      {productOptions.map((option) => {
        // If there is only a single value in the option values, don't display the option
        if (option.optionValues.length === 1) return null;

        return (
          <div className="product-options" key={option.name}>
            <p className="typo-caption-responsive-uppercase pb-3">
              {option.name} 12
            </p>
            <div className="product-options-grid">
              {option.optionValues.map((value) => {
                const {
                  name,
                  handle,
                  variantUriQuery,
                  selected,
                  available,
                  exists,
                  isDifferentProduct,
                  swatch,
                } = value;

                if (isDifferentProduct) {
                  // SEO
                  // When the variant is a combined listing child product
                  // that leads to a different url, we need to render it
                  // as an anchor tag
                  return (
                    <Link
                      className="product-options-item"
                      key={option.name + name}
                      prefetch="intent"
                      preventScrollReset
                      replace
                      to={`/products/${handle}?${variantUriQuery}`}
                      style={{
                        border: selected
                          ? '1px solid black'
                          : '1px solid transparent',
                        opacity: available ? 1 : 0.3,
                      }}
                    >
                      <ProductOptionSwatch swatch={swatch} name={name} />
                    </Link>
                  );
                } else {
                  // SEO
                  // When the variant is an update to the search param,
                  // render it as a button with javascript navigating to
                  // the variant so that SEO bots do not index these as
                  // duplicated links
                  return (
                    <Button
                      variant="default"
                      type="button"
                      className={cn(
                        'rounded-none',
                        selected ? 'border border-black' : 'border-none',
                        available ? 'opacity-100' : 'opacity-30',
                      )}
                      key={option.name + name}
                      disabled={!exists}
                      onClick={() => {
                        if (!selected) {
                          navigate(`?${variantUriQuery}`, {
                            replace: true,
                            preventScrollReset: true,
                          });
                        }
                      }}
                    >
                      <ProductOptionSwatch swatch={swatch} name={name} />
                    </Button>
                  );
                }
              })}
            </div>
            <br />
          </div>
        );
      })}

      <div className="flex flex-col flex-wrap lg:flex-row gap-4">
        <ProductQuantityControl
          quantity={quantity}
          onQuantityChange={setQuantity}
          className="flex-1"
        />

        <AddToCartButton
          variant="mint-black"
          disabled={
            !selectedVariant ||
            !selectedVariant.availableForSale ||
            (purchaseType === 'subscription' && !activeSellingPlanId)
          }
          lines={
            selectedVariant
              ? [
                  ...(giftVariantId
                    ? [{
                        merchandiseId: giftVariantId,
                        quantity: quantity,
                        selectedVariant: freeGiftSelectedVariant,
                        attributes: [{key: '_is_free_gift', value: 'true'}],
                      }]
                    : []),
                  {
                    merchandiseId: selectedVariant.id,
                    quantity,
                    selectedVariant,
                    ...(isSubscription && activeSellingPlanId && {
                      sellingPlanId: activeSellingPlanId,
                    }),
                    attributes: [
                      ...(giftVariantId ? [{key: '_free_gift_variant_id', value: giftVariantId}] : []),
                      ...(giftSizeOptions.length > 0 ? [{key: '_free_gift_size_options', value: JSON.stringify(giftSizeOptions)}] : []),
                      ...(giftVariantId && giftImages[giftVariantId]?.sizeChartUrl ? [{key: '_free_gift_size_chart_url', value: giftImages[giftVariantId]!.sizeChartUrl!}] : []),
                    ],
                  },
                ]
              : []
          }
          buttonClassName="rounded-none w-full"
          containerClassName="flex-1"
          quantity={quantity}
          page="Product Page"
          trackingItem={
            selectedVariant
              ? {
                  id: productId,
                  name: productTitle,
                  variant: selectedVariant.title,
                  price: parseFloat(selectedVariant.price.amount),
                  currency: selectedVariant.price.currencyCode,
                }
              : undefined
          }
        >
          {selectedVariant?.availableForSale
            ? purchaseType === 'subscription'
              ? 'Subscribe'
              : 'Add to cart'
            : 'Sold out'}
        </AddToCartButton>
      </div>

      <div>
        {selectedVariant?.availableForSale && hasSubscription && sellingPlanGroups.nodes.length > 0 && (
          <div className="mt-6 border-t pt-6">
            <p className="typo-caption-responsive-uppercase pb-4">
              Purchase Options
            </p>

            <div className="flex flex-col gap-5">

              {/* ONE TIME CARD */}
              <div
                onClick={() => setPurchaseType('one-time')}
                className={cn(
                  'border p-4 cursor-pointer transition-all',
                  purchaseType === 'one-time'
                    ? 'border-black'
                    : 'border-gray-200'
                )}
              >
                <div className="flex items-start justify-between w-full">

                  {/* LEFT SIDE */}
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      checked={purchaseType === 'one-time'}
                      readOnly
                    />

                    <div className="flex flex-col">
                      <span className="font-medium uppercase">
                        ONE TIME
                      </span>
                    </div>
                  </div>

                  {/* RIGHT SIDE (PRICE) */}
                  <div className="text-right">
                    <span className="font-medium">
                      RM
                      <Money withoutCurrency data={selectedVariant?.price} className="inline" />
                    </span>
                    {selectedVariant?.compareAtPrice ? (<s>
                      <span className="typo-h2">
                        RM
                        <Money
                          withoutCurrency
                          data={selectedVariant?.compareAtPrice ?? undefined}
                          className={'inline'}
                        />
                      </span>
                    </s>) : null}
                  </div>
                </div>
              </div>

              {/* SUBSCRIPTION CARD */}
              <div
                onClick={() => setPurchaseType('subscription')}
                className={cn(
                  'relative border p-4 cursor-pointer transition-all',
                  purchaseType === 'subscription' ? 'border-black' : 'border-gray-200'
                )}
              >
                <div className="absolute -top-3 right-4 bg-mint text-[10px] font-bold uppercase tracking-wide px-3 py-1 rounded-full">
                  Most Chosen
                </div>
                <div className="flex items-start justify-between w-full">
                  {/* LEFT SIDE */}
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      checked={purchaseType === 'subscription'}
                      readOnly
                    />
                    <div className="flex flex-col">

                      {/* TITLE & BADGE ROW */}
                      <div className="flex items-center gap-2">
                        <span className="font-medium uppercase">Subscribe & Save</span>

                        {/* Save % Badge */}
                        {discountPercent > 0 && (
                          <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide text-center">
                            Save {discountPercent}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* RIGHT SIDE (SUBSCRIPTION PRICE) */}
                  <div className="text-right">
                    {subPrice ? (
                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-2">
                          {/* Slashed Original Price */}
                          <s className="text-gray-400 text-sm">
                            RM <Money withoutCurrency data={originalPrice!} className="inline" />
                          </s>
                          {/* New Subscription Price */}
                          <span className="font-bold text-black">
                            RM <Money withoutCurrency data={subPrice} className="inline" />
                          </span>
                        </div>


                      </div>
                    ) : (
                      /* Fallback if no allocations found */
                      <span className="font-medium">
                        RM <Money withoutCurrency data={selectedVariant?.price} className="inline" />
                      </span>
                    )}
                  </div>
                </div>

                {/* SUBSCRIPTION BENEFITS LIST */}
                {purchaseType === 'subscription' && (
                  <div className="mt-4 flex flex-col gap-2 pl-7 text-sm text-gray-600">

                    {/* Benefit 1: Dynamic Recurring Discount */}
                    {discountPercent > 0 && (
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-black">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                        <span>{discountPercent}% off on 30-day subscription</span>
                      </div>
                    )}

                    {/* Benefit 2: Delivery */}
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-black">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                      </svg>
                      <span>Free auto-delivery</span>
                    </div>

                    {/* Benefit 3: Cancel Anytime */}
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-black">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Cancel, pause or skip anytime</span>
                    </div>

                  </div>
                )}

                {/* SELLING PLAN SELECTOR */}
                <div className="mt-3">
                  {purchaseType === 'subscription' && (
                    <SellingPlanSelector
                      sellingPlanGroups={sellingPlanGroups}
                      selectedSellingPlan={selectedSellingPlan}
                      selectedVariant={selectedVariant}
                    >
                      {({ sellingPlanGroup }) => (
                        <SellingPlanGroup
                          key={sellingPlanGroup.name}
                          sellingPlanGroup={sellingPlanGroup}
                        />
                      )}
                    </SellingPlanSelector>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}
      </div>

      {giftVariantId && selectedVariant?.availableForSale && (
        <div className="mt-6 border-t pt-6">
          <p className="typo-caption-responsive-uppercase pb-4">Free Gift</p>
          <div className="border border-black p-4 flex items-center gap-4">
            <div className="relative shrink-0 w-16 h-16 bg-gray-100 flex items-center justify-center overflow-hidden">
              {Object.entries(giftImages).map(([variantId, imgData]) =>
                imgData.url ? (
                  <img
                    key={variantId}
                    src={imgData.url}
                    alt={imgData.altText ?? imgData.title}
                    className={cn(
                      'object-cover w-full h-full absolute inset-0 transition-opacity duration-200',
                      variantId === giftVariantId ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                ) : null,
              )}
              {!giftImages[giftVariantId ?? '']?.url && (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1012 10.125a2.625 2.625 0 000-5.25zM4.875 9.375A2.625 2.625 0 107.5 12H4.875A2.625 2.625 0 002.25 9.375zm14.25 0A2.625 2.625 0 1019.125 12H16.5a2.625 2.625 0 00-2.625-2.625z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25M3.375 12h17.25" />
                </svg>
              )}
            </div>
            <div className="flex flex-col flex-1">
              <span className="font-medium uppercase text-sm">
                {giftImages[giftVariantId]?.title ?? 'Free Gift'}
              </span>
              <span className="text-xs text-gray-500 mt-0.5">
                FEW UNITS LEFT
              </span>
            </div>
            <span className="text-xs bg-mint px-2 py-1 font-bold uppercase tracking-wide rounded-full shrink-0">
              Free
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function ProductOptionSwatch({
  swatch,
  name,
}: {
  swatch?: Maybe<ProductOptionValueSwatch> | undefined;
  name: string;
}) {
  const image = swatch?.image?.previewImage?.url;
  const color = swatch?.color;

  if (!image && !color) return name;

  return (
    <div
      aria-label={name}
      className="product-option-label-swatch"
      style={{
        backgroundColor: color || 'transparent',
      }}
    >
      {!!image && <img src={image} alt={name} />}
    </div>
  );
}

// Update as you see fit to match your design and requirements
function SellingPlanGroup({
  sellingPlanGroup,
}: {
  sellingPlanGroup: SellingPlanGroup;
}) {
  const plans = sellingPlanGroup.sellingPlans.nodes;

  // If there is only 1 plan, hide the UI, but let the logic keep running
  if (plans.length <= 1) return null;
  return (
    <div className="selling-plan-group" key={sellingPlanGroup.name}>
      <p className="selling-plan-group-title">
        {sellingPlanGroup.name}
      </p>

      <div className="selling-plan-options">
        {sellingPlanGroup.sellingPlans.nodes.map((sellingPlan) => {
          return (
            <Link
              key={sellingPlan.id}
              prefetch="intent"
              to={sellingPlan.url}
              preventScrollReset
              replace
              className={`selling-plan-card ${sellingPlan.isSelected ? 'selected' : ''
                }`}
            >
              <span className="plan-text">
                {sellingPlan.options.map((option) => option.value).join(' ')}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
