import {
  Analytics,
  getAdjacentAndFirstAvailableVariants,
  getProductOptions,
  Image,
  useOptimisticVariant,
} from '@shopify/hydrogen';
import type {MoneyV2} from '@shopify/hydrogen/storefront-api-types';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router';
import type {
  LandingGiftVariantFragment,
  LandingInfoFragment,
  LandingProductFragment,
} from 'types/storefrontapi.generated';
import {AddToCartButton} from '~/components/AddToCartButton';
import {useAbEvent} from '~/lib/abTracking';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import {cn} from '~/lib/utils';
import LandingProductGallery from './LandingProductGallery';

/** Anchor for "Buy now" buttons elsewhere on the page (e.g. LandingHero). */
export const LANDING_PRODUCT_ID = 'add-to-cart';

type PurchaseType = 'one-time' | 'subscription';
type Variant = LandingProductFragment['selectedOrFirstAvailableVariant'];

interface LandingProductProps {
  product: LandingProductFragment;
  subtitle?: string | null;
  /** list.single_line_text_field value (JSON array of strings) */
  highlights?: string | null;
  /** Accordion metaobject for "Why Upbound?", "Ingredients", ... */
  info?: LandingInfoFragment | null;
  /** Gallery images for this page; the product's own images when empty */
  images?: LandingProductFragment['images']['nodes'];
}

/**
 * Add-to-cart section for landing pages.
 * Desktop: images on the left stay pinned (sticky) while the product details
 * on the right scroll past them. Mobile: images on top, details below.
 */
export default function LandingProduct({
  product,
  subtitle,
  highlights,
  info,
  images,
}: LandingProductProps) {
  const pushAbEvent = useAbEvent();
  const navigate = useNavigate();
  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  );
  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  });

  const allocation = selectedVariant?.sellingPlanAllocations?.nodes?.[0];
  const sellingPlanId = allocation?.sellingPlan.id;
  const hasSubscription = Boolean(sellingPlanId);

  const [purchaseType, setPurchaseType] = useState<PurchaseType>(
    hasSubscription ? 'subscription' : 'one-time',
  );
  useEffect(() => {
    if (!hasSubscription) setPurchaseType('one-time');
  }, [hasSubscription]);
  const isSubscription = purchaseType === 'subscription' && hasSubscription;

  const [quantity, setQuantity] = useState(1);

  const oneTimePrice = selectedVariant?.price;
  const subscriptionPrice = allocation?.priceAdjustments?.[0]?.price;
  const activePrice = isSubscription ? subscriptionPrice : oneTimePrice;
  const activeCompareAt = isSubscription
    ? oneTimePrice
    : selectedVariant?.compareAtPrice;
  const units = unitsOf(selectedVariant);

  const subscriptionSaving =
    oneTimePrice && subscriptionPrice
      ? amount(oneTimePrice) - amount(subscriptionPrice)
      : 0;
  const subscriptionPercent =
    oneTimePrice && subscriptionSaving > 0
      ? Math.round((subscriptionSaving / amount(oneTimePrice)) * 100)
      : 0;

  const gifts = giftsOf(selectedVariant, isSubscription);
  const gift = gifts[0] ?? null;

  const highlightList = parseList(highlights);
  const infoItems = info?.content?.references?.nodes ?? [];

  if (!selectedVariant) return null;

  return (
    <section
      id={LANDING_PRODUCT_ID}
      // Full-width white band; the content inside stays at max-w-content
      className="bg-white py-[60px] md:py-[100px] scroll-mt-(--header-height)"
    >
      <div className="page-px max-w-content mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-16 items-start">
        {/* Images: pinned below the header while the details scroll */}
        <LandingProductGallery
          images={images?.length ? images : product.images.nodes}
          className="md:sticky md:top-[calc(var(--header-height)+24px)]"
        />

        <div className="space-y-6">
          {/* Title, subtitle, highlights */}
          <div className="space-y-3">
            {/* Medium is the heaviest Whyte Inktrap weight loaded (typo-h1 is Light on desktop) */}
            <div className="space-y-1">
              <h1 className="typo-h1 font-medium md:font-medium">
                {product.title}
              </h1>
              {subtitle && (
                <p className="typo-paragraph text-base md:text-lg">
                  {subtitle}
                </p>
              )}
            </div>
            {highlightList.length > 0 && (
              <ul className="space-y-1 text-xs md:text-[13px]">
                {highlightList.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-black shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Price */}
          {activePrice && (
            <p className="flex items-baseline gap-2">
              {activeCompareAt &&
                amount(activeCompareAt) > amount(activePrice) && (
                  <s className="text-mid-grey text-sm">
                    {formatRM(activeCompareAt)}
                  </s>
                )}
              <span className="typo-h2 font-normal">
                {formatRM(activePrice)}
              </span>
            </p>
          )}

          {/* Pack size (e.g. 6 / 24 cans) */}
          {productOptions.map((option) =>
            option.optionValues.length > 1 ? (
              <div key={option.name} className="flex flex-wrap gap-2">
                {option.optionValues.map((value) => (
                  <button
                    key={value.name}
                    type="button"
                    disabled={!value.exists}
                    onClick={() => {
                      if (value.selected) return;
                      navigate(`?${value.variantUriQuery}`, {
                        replace: true,
                        preventScrollReset: true,
                      });
                    }}
                    className={cn(
                      'min-w-[100px] px-4 py-2 rounded-md border text-sm font-medium cursor-pointer transition-colors',
                      value.selected
                        ? 'bg-black border-black text-mint'
                        : 'bg-white border-black text-black hover:bg-neutral-100',
                      !value.available && 'opacity-40',
                    )}
                  >
                    {packLabel(value.name)}
                  </button>
                ))}
              </div>
            ) : null,
          )}

          {/* Purchase options */}
          <div className="space-y-3">
            <p className="text-xs md:text-[13px]">Purchase Option:</p>

            {hasSubscription && (
              <PurchaseCard
                selected={isSubscription}
                onSelect={() => setPurchaseType('subscription')}
                badge="Popular"
                title={
                  <>
                    Subscribe
                    {subscriptionSaving > 0 && (
                      <span className="ml-2 px-2 py-0.5 rounded-full bg-black text-mint text-[10px] font-normal uppercase">
                        Save {formatRM(subscriptionSaving)}
                      </span>
                    )}
                  </>
                }
                price={subscriptionPrice}
                compareAt={oneTimePrice}
                units={units}
                benefits={[
                  ...(subscriptionPercent > 0
                    ? [
                        {
                          icon: <RepeatIcon />,
                          text: `${subscriptionPercent}% off on 30-day subscription`,
                        },
                      ]
                    : []),
                  {icon: <TruckIcon />, text: 'Free delivery'},
                  {icon: <CancelIcon />, text: 'Cancel, pause or skip anytime'},
                ]}
                gift={isSubscription ? gift : null}
                giftHeading="Free gift on 1st order"
              />
            )}

            <PurchaseCard
              selected={!isSubscription}
              onSelect={() => setPurchaseType('one-time')}
              title="One Time"
              price={oneTimePrice}
              compareAt={selectedVariant.compareAtPrice}
              units={units}
              gift={!isSubscription ? gift : null}
              giftHeading="Free gift with your order"
            />
          </div>

          {/* Quantity + add to cart */}
          <div className="flex gap-3">
            <QuantityControl quantity={quantity} onChange={setQuantity} />
            <AddToCartButton
              variant="black-mint"
              containerClassName="flex-1"
              buttonClassName="w-full h-full min-h-11 rounded-md uppercase text-mint hover:text-black"
              disabled={
                !selectedVariant.availableForSale ||
                (isSubscription && !sellingPlanId)
              }
              lines={cartLines({
                variant: selectedVariant,
                quantity,
                sellingPlanId: isSubscription ? sellingPlanId : undefined,
                gifts,
              })}
              quantity={quantity}
              page="Landing Page"
              onClick={() =>
                pushAbEvent('cta_click', {
                  cta_label: 'Add to cart',
                  cta_position: 'product_section',
                })
              }
              trackingItem={{
                id: product.id,
                name: product.title,
                variant: selectedVariant.title,
                price: activePrice ? amount(activePrice) : 0,
                currency: activePrice?.currencyCode ?? 'MYR',
              }}
            >
              {selectedVariant.availableForSale ? 'Add to cart' : 'Sold out'}
            </AddToCartButton>
          </div>

          {/* Why Upbound? / How it helps? / Ingredients / ... */}
          {infoItems.length > 0 && (
            <Accordion type="multiple">
              {infoItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`info-${index}`}
                  className="border-b border-neutral-200 last:border-b"
                >
                  <AccordionTrigger
                    iconVariant="plusMinus"
                    className="py-3 text-xs md:text-[13px] font-medium"
                  >
                    {item.title?.value}
                  </AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <InfoContent item={item} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </div>

      <Analytics.ProductView
        data={{
          products: [
            {
              id: product.id,
              title: product.title,
              price: selectedVariant.price.amount,
              vendor: product.vendor,
              variantId: selectedVariant.id,
              variantTitle: selectedVariant.title,
              quantity: 1,
            },
          ],
        }}
      />
    </section>
  );
}

/** Subscribe / One Time option; details and gift show while selected. */
function PurchaseCard({
  selected,
  onSelect,
  badge,
  title,
  price,
  compareAt,
  units,
  benefits = [],
  gift,
  giftHeading,
}: {
  selected: boolean;
  onSelect: () => void;
  badge?: string;
  title: React.ReactNode;
  price?: MoneyV2 | null;
  compareAt?: MoneyV2 | null;
  units: number | null;
  benefits?: {icon: React.ReactNode; text: string}[];
  gift: LandingGiftVariantFragment | null;
  giftHeading: string;
}) {
  const showCompareAt = price && compareAt && amount(compareAt) > amount(price);

  return (
    <div
      role="radio"
      aria-checked={selected}
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
      className={cn(
        'relative rounded-lg border p-3 md:p-4 cursor-pointer transition-colors text-xs md:text-[13px]',
        selected ? 'border-black bg-white' : 'border-neutral-300 bg-[#F2F2F2]',
      )}
    >
      {badge && (
        <span className="absolute -top-3 right-4 px-3 py-1 rounded-full bg-mint text-[11px] font-normal uppercase">
          {badge}
        </span>
      )}

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              'flex items-center justify-center size-3.5 rounded-full border border-black shrink-0',
            )}
          >
            {selected && <span className="size-2 rounded-full bg-black" />}
          </span>
          <span className="flex items-center font-medium text-sm">{title}</span>
        </div>
        {price && (
          <div className="text-right shrink-0">
            <p className="font-normal text-sm md:text-base">
              {formatRM(price)}
            </p>
            {selected && showCompareAt && (
              <s className="text-mid-grey text-[11px]">{formatRM(compareAt)}</s>
            )}
          </div>
        )}
      </div>

      {selected && (benefits.length > 0 || (units && price)) && (
        <div className="mt-2 flex items-end justify-between gap-3 pl-5.5">
          <ul className="space-y-1">
            {benefits.map((benefit) => (
              <li key={benefit.text} className="flex items-center gap-2">
                <span className="size-3.5 shrink-0">{benefit.icon}</span>
                {benefit.text}
              </li>
            ))}
          </ul>
          {units && price && (
            <span className="shrink-0 px-2 py-0.5 rounded-full bg-black text-mint text-[10px] font-normal">
              {formatRM(amount(price) / units)}/Can
            </span>
          )}
        </div>
      )}

      {selected && gift && <GiftBox gift={gift} heading={giftHeading} />}
    </div>
  );
}

function GiftBox({
  gift,
  heading,
}: {
  gift: LandingGiftVariantFragment;
  heading: string;
}) {
  const worth = gift.compareAtPrice ?? gift.price;

  return (
    <div className="mt-3 rounded-md overflow-clip border border-black">
      <p className="bg-black text-mint px-3 py-1.5 text-[10px] font-normal uppercase">
        {heading}
      </p>
      <div className="p-3 bg-white">
        <div className="flex items-center gap-3 rounded-md bg-[#F2F2F2] p-2">
          {gift.image && (
            <Image
              data={gift.image}
              width={112}
              height={112}
              className="size-14 rounded object-contain bg-white shrink-0"
            />
          )}
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-normal uppercase">Free gift</p>
            <p className="uppercase truncate">{gift.product.title}</p>
            {worth && amount(worth) > 0 && (
              <p className="text-[10px] text-mid-grey">
                Worth {formatRM(worth)}
              </p>
            )}
          </div>
          <span className="self-start text-[10px] text-mid-grey uppercase">
            (Few units left)
          </span>
        </div>
      </div>
    </div>
  );
}

function QuantityControl({
  quantity,
  onChange,
}: {
  quantity: number;
  onChange: (quantity: number) => void;
}) {
  return (
    <div className="flex items-center rounded-md border border-black w-[130px] md:w-[150px] shrink-0">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, quantity - 1))}
        className="px-4 py-2.5 cursor-pointer"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="flex-1 text-center" aria-live="polite">
        {quantity}
      </span>
      <button
        type="button"
        onClick={() => onChange(quantity + 1)}
        className="px-4 py-2.5 cursor-pointer"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}

/**
 * Cart lines, matching the product page: the free gift is added as its own
 * line, and when it comes in several sizes the options are passed on so the
 * cart can offer a size picker.
 */
function cartLines({
  variant,
  quantity,
  sellingPlanId,
  gifts,
}: {
  variant: NonNullable<Variant>;
  quantity: number;
  sellingPlanId?: string;
  gifts: LandingGiftVariantFragment[];
}) {
  const gift = gifts[0];
  const sizeOptions =
    gifts.length > 1
      ? gifts.map((g) => ({
          label:
            g.selectedOptions.find((o) => o.name === 'Size')?.value ?? g.id,
          variantId: g.id,
        }))
      : [];
  const sizeChartUrl = gift?.product.sizeChart?.reference?.image?.url;

  return [
    ...(gift
      ? [
          {
            merchandiseId: gift.id,
            quantity,
            selectedVariant: {
              ...gift,
              availableForSale: true,
              price: {amount: '0.00', currencyCode: gift.price.currencyCode},
              compareAtPrice: null,
              product: {title: gift.product.title, handle: ''},
            },
            attributes: [{key: '_is_free_gift', value: 'true'}],
          },
        ]
      : []),
    {
      merchandiseId: variant.id,
      quantity,
      selectedVariant: variant,
      ...(sellingPlanId && {sellingPlanId}),
      attributes: [
        ...(gift ? [{key: '_free_gift_variant_id', value: gift.id}] : []),
        ...(sizeOptions.length > 0
          ? [
              {
                key: '_free_gift_size_options',
                value: JSON.stringify(sizeOptions),
              },
            ]
          : []),
        ...(gift && sizeChartUrl
          ? [{key: '_free_gift_size_chart_url', value: sizeChartUrl}]
          : []),
      ],
    },
  ];
}

function giftsOf(variant: Variant, subscription: boolean) {
  const field = subscription
    ? variant?.freeGiftSubscription
    : variant?.freeGift;
  return (field?.references?.nodes ?? []).filter(
    (node): node is LandingGiftVariantFragment => 'id' in node,
  );
}

/** Cans per pack: the units_per_pack metafield, or "x 24's" in the title. */
function unitsOf(variant: Variant): number | null {
  const fromMetafield = Number(variant?.unitsPerPack?.value);
  if (fromMetafield > 0) return fromMetafield;
  const match = variant?.title.match(/x\s*(\d+)/i);
  return match ? Number(match[1]) : null;
}

type InfoItem = NonNullable<
  NonNullable<LandingInfoFragment['content']>['references']
>['nodes'][number];

const infoText = 'text-xs md:text-[13px] text-black';

/**
 * One info row. Every field is optional and shown in this order:
 * tags → description → points → ingredients → note.
 */
function InfoContent({item}: {item: InfoItem}) {
  const tags = parseList(item.tags?.value);
  const points = item.points?.references?.nodes ?? [];
  const ingredients = item.ingredients?.references?.nodes ?? [];

  return (
    <div className="space-y-4">
      {tags.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li
              key={tag}
              className="px-3 py-1.5 rounded-sm bg-black text-mint text-xs font-medium"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}

      {item.description?.value && (
        <DescriptionText value={item.description.value} />
      )}

      {points.length > 0 && (
        <ul className="divide-y divide-neutral-200">
          {points.map((point, index) => (
            <li key={point.id ?? index} className="py-3 first:pt-0 last:pb-0">
              <p className="text-xs md:text-[13px] font-medium text-black">
                {point.step?.value}
              </p>
              {point.description?.value && (
                <p className={cn(infoText, 'mt-1 whitespace-pre-line')}>
                  {point.description.value}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}

      {ingredients.length > 0 && (
        <ul className="space-y-4">
          {ingredients.map((ingredient, index) => {
            const image = ingredient.image?.reference?.image;
            return (
              <li
                key={ingredient.id ?? index}
                className="flex items-start gap-3"
              >
                {image && (
                  <Image
                    data={image}
                    width={96}
                    height={96}
                    className="shrink-0 size-12 rounded-md object-cover"
                    loading="lazy"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-xs md:text-[13px] font-medium text-black">
                    {ingredient.text?.value}
                  </p>
                  {ingredient.description?.value && (
                    <p className={cn(infoText, 'mt-0.5 whitespace-pre-line')}>
                      {ingredient.description.value}
                    </p>
                  )}
                </div>
                {ingredient.amount?.value && (
                  <IngredientAmount value={ingredient.amount.value} />
                )}
              </li>
            );
          })}
        </ul>
      )}

      {item.note?.value && (
        <p className="inline-block px-3 py-1.5 rounded-full border border-black text-xs font-medium">
          {item.note.value}
        </p>
      )}
    </div>
  );
}

/**
 * Plain multi-line text with two light conventions:
 * "- text" lines become bullets, and a line ending in ":" becomes a bold label.
 */
function DescriptionText({value}: {value: string}) {
  const blocks: (
    | {type: 'line'; text: string}
    | {type: 'list'; items: string[]}
  )[] = [];
  for (const raw of value.split('\n')) {
    const line = raw.trim();
    if (!line) continue;
    const bullet = line.match(/^[-•]\s*(.*)$/);
    const last = blocks[blocks.length - 1];
    if (bullet) {
      if (last?.type === 'list') last.items.push(bullet[1]);
      else blocks.push({type: 'list', items: [bullet[1]]});
    } else {
      blocks.push({type: 'line', text: line});
    }
  }

  return (
    <div className={cn(infoText, 'space-y-2')}>
      {blocks.map((block, index) =>
        block.type === 'list' ? (
          <ul key={index} className="list-disc pl-4 space-y-1">
            {block.items.map((text, i) => (
              <li key={i}>{text}</li>
            ))}
          </ul>
        ) : block.text.endsWith(':') ? (
          <p
            key={index}
            className="font-medium text-black uppercase underline underline-offset-2"
          >
            {block.text}
          </p>
        ) : (
          <p key={index}>{block.text}</p>
        ),
      )}
    </div>
  );
}

/** "225mg" → big number with a smaller unit. */
function IngredientAmount({value}: {value: string}) {
  const match = value.match(/^([\d.,]+)\s*(.*)$/);
  return (
    <p className="shrink-0 font-medium text-black">
      <span className="text-lg md:text-xl">{match ? match[1] : value}</span>
      {match?.[2] && <span className="text-xs ml-0.5">{match[2]}</span>}
    </p>
  );
}

/** "240ml x 24's" → "24 Cans"; other option values are shown as-is. */
function packLabel(name: string) {
  const match = name.match(/x\s*(\d+)/i);
  return match ? `${match[1]} Cans` : name;
}

function parseList(value?: string | null): string[] {
  if (!value) return [];
  try {
    const list = JSON.parse(value) as unknown;
    return Array.isArray(list) ? list.map(String) : [];
  } catch {
    return [];
  }
}

function amount(money: MoneyV2 | {amount: string}) {
  return parseFloat(money.amount);
}

function formatRM(value: MoneyV2 | {amount: string} | number) {
  const n = typeof value === 'number' ? value : amount(value);
  return `RM${n.toFixed(2)}`;
}

function RepeatIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="size-full"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
      />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="size-full"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
      />
    </svg>
  );
}

function CancelIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="size-full"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
