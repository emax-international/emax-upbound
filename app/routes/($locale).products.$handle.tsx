import {
  Analytics,
  getAdjacentAndFirstAvailableVariants,
  getProductOptions,
  getSelectedProductOptions,
  Image,
  useOptimisticVariant,
  useSelectedOptionInUrlParam,
} from '@shopify/hydrogen';
import { redirect, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData, type MetaFunction } from 'react-router';
import { ProductForm } from '~/components/ProductForm';
import {
  DesktopProductImage,
  MobileProductImage,
} from '~/components/ProductImage';
import { ProductPrice } from '~/components/ProductPrice';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import HeroAccordion from '~/components/cms/HeroAccordion';
import {
  ACCORDION_FRAGMENT,
  PRODUCT_ENDORSEMENT_CARD_FRAGMENT,
} from '~/graphql/cms/ModuleFragments';
import { redirectIfHandleIsLocalized } from '~/lib/redirect';
import { Image as ShopifyImage } from '@shopify/hydrogen/storefront-api-types';
import ProductEndorsementCard from '~/components/ProductEndorsementCard';

import type { ProductFragment, SellingPlanFragment } from 'types/storefrontapi.generated';
import { useState, useEffect } from 'react';

import sellingPlanStyle from '~/styles/selling-plan.css?url';

export const links: Route.LinksFunction = () => [
  { rel: 'stylesheet', href: sellingPlanStyle },
];


export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: `Upbound | ${data?.product.title ?? ''}` },
    {
      rel: 'canonical',
      href: `/products/${data?.product.handle}`,
    },
  ];
};

export async function loader(args: LoaderFunctionArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page

  const criticalData = await loadCriticalData(args);

  return { ...deferredData, ...criticalData };
}

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
      // Plain GID string — not JSON
      return raw.trim() ? [raw.trim()] : [];
    }
  }
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({
  context,
  params,
  request,
}: LoaderFunctionArgs) {
  const { handle } = params;
  const { storefront } = context;

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  const { product } = await storefront.query(PRODUCT_QUERY, {
    variables: { handle, selectedOptions: getSelectedProductOptions(request) },
  });

  const selectedVar = product?.selectedOrFirstAvailableVariant as any;

  type GiftImageEntry = { url: string | null; altText: string | null; width: number; height: number; title: string; selectedOptions: { name: string; value: string }[]; sizeChartUrl: string | null };
  const giftImages: Record<string, GiftImageEntry> = {};

  function addNode(node: any) {
    if (node?.id) {
      giftImages[node.id] = {
        url: node.image?.url ?? null,
        altText: node.image?.altText ?? null,
        width: node.image?.width ?? 0,
        height: node.image?.height ?? 0,
        title: node.product?.title ?? '',
        selectedOptions: node.selectedOptions ?? [],
        sizeChartUrl: node.product?.sizeChart?.reference?.image?.url ?? null,
      };
    }
  }

  // Collect gift images from selected variant + all adjacent variants so every
  // possible gift image is in the record regardless of which variant is active.
  const variantsToScan: any[] = [
    selectedVar,
    ...((product as any)?.adjacentVariants ?? []),
  ];
  for (const v of variantsToScan) {
    const refs: any[] = v?.freeGift?.references?.nodes ?? [];
    const subRefs: any[] = v?.freeGiftSubscription?.references?.nodes ?? [];
    refs.forEach(addNode);
    subRefs.forEach(addNode);
  }

  // Fall back to separate query when references are empty (json / single_line_text_field metafield type)
  if (Object.keys(giftImages).length === 0) {
    const freeGiftId: string | null = selectedVar?.freeGift?.value ?? null;
    const freeGiftSubRaw: string | null = selectedVar?.freeGiftSubscription?.value ?? null;
    const giftIdsToFetch = [
      ...new Set([
        ...(freeGiftId ? parseGiftValue(freeGiftId) : []),
        ...(freeGiftSubRaw ? parseGiftValue(freeGiftSubRaw) : []),
      ]),
    ];
    if (giftIdsToFetch.length > 0) {
      const { nodes: giftNodes } = await storefront.query<any>(
        `query GiftImages($ids: [ID!]!) {
          nodes(ids: $ids) {
            ... on ProductVariant {
              id
              product {
                title
                sizeChart: metafield(key: "size_chart", namespace: "custom") {
                reference {
                  ... on MediaImage {
                    image { url }
                  }
                }
              }
              }
              image { url altText width height }
              selectedOptions { name value }
            }
          }
        }`,
        { variables: { ids: giftIdsToFetch } },
      );
      (giftNodes ?? []).forEach(addNode);
    }
  }


  if (!product?.id) {
    throw new Response(null, { status: 404 });
  }

  // Check if the user landed here without selecting a specific variant
  const selectedOptions = getSelectedProductOptions(request);

  if (selectedOptions.length === 0) {
    // Find the first variant that has a subscription attached
    const firstSubVariant = product.variants.nodes.find(
      (v) => v.sellingPlanAllocations?.nodes?.length > 0
    );

    // If we found one, and it's not already the default, redirect to it!
    if (firstSubVariant && firstSubVariant.id !== product.selectedOrFirstAvailableVariant?.id) {
      const url = new URL(request.url);
      firstSubVariant.selectedOptions.forEach((option) => {
        url.searchParams.set(option.name, option.value);
      });
      throw redirect(url.toString(), 302);
    }
  }

  // The API handle might be localized, so redirect to the localized handle
  redirectIfHandleIsLocalized(request, { handle, data: product });

  // Initialize the selectedSellingPlan to null
  let selectedSellingPlan = null;

  // Get the selected selling plan id from the request url
  const selectedSellingPlanId =
    new URL(request.url).searchParams.get('selling_plan') ?? null;

  // Get the selected selling plan bsed on the selectedSellingPlanId
  if (selectedSellingPlanId) {
    const selectedSellingPlanGroup =
      product.sellingPlanGroups.nodes?.find((sellingPlanGroup) => {
        return sellingPlanGroup.sellingPlans.nodes?.find(
          (sellingPlan: SellingPlanFragment) =>
            sellingPlan.id === selectedSellingPlanId,
        );
      }) ?? null;

    if (selectedSellingPlanGroup) {
      selectedSellingPlan =
        selectedSellingPlanGroup.sellingPlans.nodes.find((sellingPlan) => {
          return sellingPlan.id === selectedSellingPlanId;
        }) ?? null;
    }
  }

  return {
    product,
    selectedSellingPlan,
    giftImages,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({ context, params }: LoaderFunctionArgs) {
  // Put any API calls that is not critical to be available on first page render
  // For example: product reviews, product recommendations, social feeds.

  return {};
}

export default function Product() {
  const { product, selectedSellingPlan, giftImages } = useLoaderData<typeof loader>();

  // Optimistically selects a variant with given available variant information
  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  );

  const [purchaseType, setPurchaseType] = useState<'one-time' | 'subscription'>(() => {
    return selectedVariant?.sellingPlanAllocations?.nodes?.length > 0
      ? 'subscription'
      : 'one-time';
  });

  useEffect(() => {
    const hasSubscription = selectedVariant?.sellingPlanAllocations?.nodes?.length > 0;

    if (!hasSubscription && purchaseType === 'subscription') {
      setPurchaseType('one-time');
    }
  }, [selectedVariant, purchaseType]);


  // Sets the search param to the selected variant without navigation
  // only when no search params are set in the url
  useSelectedOptionInUrlParam(selectedVariant.selectedOptions);

  // Get the product options array
  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  });


  const variant = product?.variants?.nodes?.find(
    (variant) =>
      variant.id === product?.selectedOrFirstAvailableVariant?.id
  );

  const variantType = variant?.metafield?.value || '';


  const {
    title,
    descriptionHtml,
    productType,
    certifiedLogos,
    ingredients,
    howToConsume,
    accordion,
    productEndorsements,
    tags,
    images,
    sellingPlanGroups

  } = product;
  const certifiedLogosArray = certifiedLogos?.references?.nodes || [];

  return (
    <div className="page-py max-w-content">
      <div className="subscriptions_app_embed_block"></div>
      <MobileProductImage
        // TODO: listen to selected variant
        // selectedVariantImage={selectedVariant?.image}
        mediaImages={(images.nodes ?? []) as ShopifyImage[]}
      />
      <div className="page-px">
        <div className="product">
          <DesktopProductImage
            // TODO: listen to selected variant
            // selectedVariantImage={selectedVariant?.image}
            mediaImages={(images.nodes ?? []) as ShopifyImage[]}
          />
          <div className="product-main space-y-6 col-span-6">
            <h2>{title}</h2>
            <div className="typo-p-small text-mid-grey">{variantType}
              <p className="typo-p-small text-black">Hydration + focus support without the energy drink crash</p>
            </div>
            <ProductPrice
              price={selectedVariant?.price}
              compareAtPrice={selectedVariant?.compareAtPrice}
              priceClassName="!typo-h2"
              className="typo-h2"
              selectedSellingPlan={selectedSellingPlan}
              selectedVariant={selectedVariant}
              purchaseType={purchaseType}
              unitCount={Number((selectedVariant as any)?.unitsPerPack?.value) || undefined}
            />
            <ProductForm
              productId={product.id}
              productTitle={title}
              productOptions={productOptions}
              selectedVariant={selectedVariant}
              selectedSellingPlan={selectedSellingPlan}
              sellingPlanGroups={sellingPlanGroups}
              purchaseType={purchaseType}
              setPurchaseType={setPurchaseType}
              giftImages={giftImages}
            />

            <Accordion
              type="multiple"
              defaultValue={['description', 'how-to-consume', 'ingredient', 'benefit']}
            >
              <AccordionItem
                value="description"
                className="border-neutral-900 border-t border-b-0"
              >
                <AccordionTrigger className="typo-caption-responsive-uppercase pt-[12px] md:pt-[24px] data-[state=closed]:pb-[24px] data-[state=open]:pb-[12px]">
                  Description
                </AccordionTrigger>
                <AccordionContent className="typo-p">
                  <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
                </AccordionContent>
              </AccordionItem>



              {/* product additional components */}
              {accordion?.reference && (
                <AccordionItem value="benefit"
                  className="border-neutral-900 border-t border-b-0">
                  <AccordionTrigger className="typo-caption-responsive-uppercase pt-3 md:pt-6 data-[state=closed]:pb-6 data-[state=open]:pb-3">
                    Benefit
                  </AccordionTrigger>
                  <AccordionContent className="typo-p">
                    <HeroAccordion
                      reference={accordion.reference}
                      className="mt-1 mb-0 max-w-full"
                      size="small"
                    />
                  </AccordionContent>

                </AccordionItem>

              )}

              {ingredients && (
                <AccordionItem
                  value="ingredient"
                  className="border-neutral-900 border-t border-b-0"
                >
                  <AccordionTrigger className="typo-caption-responsive-uppercase pt-[12px] md:pt-[24px] data-[state=closed]:pb-[24px] data-[state=open]:pb-[12px]">
                    Ingredients
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-wrap gap-2 pb-8">
                    {(() => {
                      try {
                        const ingredientsArray: string[] = ingredients?.value
                          ? (JSON.parse(ingredients.value) as string[])
                          : [];
                        return ingredientsArray.map(
                          (ingredient: string, index: number) => (
                            <div
                              key={index}
                              className="typo-paragraph bg-neutral-400 border rounded-full px-4 py-2"
                            >
                              {ingredient}
                            </div>
                          ),
                        );
                      } catch (error) {
                        console.error('Error parsing ingredients:', error);
                        return <p>Unable to load ingredients</p>;
                      }
                    })()}
                  </AccordionContent>
                </AccordionItem>
              )}
              {certifiedLogosArray.length > 0 && (
                <AccordionItem
                  value="how-to-consume"
                  className="border-neutral-900 border-t border-b-0"
                >
                  <AccordionTrigger className="typo-caption-responsive-uppercase pt-[12px] md:pt-[24px] data-[state=closed]:pb-[24px] data-[state=open]:pb-[12px]">
                    Certified By:
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-wrap items-center gap-8">
                    {certifiedLogosArray.map(
                      (logo, index) =>
                        logo.image && (
                          <div
                            key={index}
                            className="max-w-[52px] md:max-w-[72px] h-auto"
                          >
                            <Image
                              data={{
                                altText: logo.image.altText || 'Platform logo',
                                url: logo.image.url || '',
                                width: logo.image.width || 0,
                                height: logo.image.height || 0,
                              }}
                              alt={logo.image.altText || 'Platform logo'}
                              sizes="20vw"
                              className="w-full h-auto object-contain"
                            />
                          </div>
                        ),
                    )}
                  </AccordionContent>
                </AccordionItem>
              )}
              {howToConsume && (
                <AccordionItem
                  value="how-to-consume"
                  className="border-neutral-900 border-t border-b-0"
                >
                  <AccordionTrigger className="typo-caption-responsive-uppercase pt-3 md:pt-6 data-[state=closed]:pb-6 data-[state=open]:pb-3">
                    How To Consume
                  </AccordionTrigger>
                  <AccordionContent className="typo-p whitespace-pre-line">
                    {howToConsume.value}
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          </div>
        </div>

        {/* product additional components */}
        {/* {accordion?.reference && (
          <HeroAccordion
            reference={accordion.reference}
            className="mt-10 mb-0 max-w-full"
          />
        )} */}

        {/* old {ingredients} */}
        {/* <div className="mt-10 p-8 mx-auto bg-white rounded-xl space-y-3">
          <h4 className="typo-caption text-neutral uppercase">Ingredients</h4>
          <div className="flex flex-wrap gap-2 w-full md:w-[50%]">
            {(() => {
              try {
                const ingredientsArray: string[] = ingredients?.value
                  ? (JSON.parse(ingredients.value) as string[])
                  : [];
                return ingredientsArray.map(
                  (ingredient: string, index: number) => (
                    <div
                      key={index}
                      className="typo-p-large bg-neutral-400 border rounded-full px-4 py-2"
                    >
                      {ingredient}
                    </div>
                  ),
                );
              } catch (error) {
                console.error('Error parsing ingredients:', error);
                return <p>Unable to load ingredients</p>;
              }
            })()}
          </div>
        </div> */}

        {/* product endorsements */}
        {productEndorsements?.references &&
          productEndorsements.references?.nodes.length > 0 && (
            <div className="mt-10 p-8 mx-auto bg-white rounded-xl space-y-3">
              <h4 className="typo-caption text-neutral uppercase">
                Choices of Elites
              </h4>
              <div className="flex flex-col gap-6">
                {productEndorsements?.references?.nodes.map(
                  (endorsement, index) => (
                    <ProductEndorsementCard
                      key={endorsement.id}
                      endorsement={endorsement}
                      isLast={
                        index ===
                        (productEndorsements?.references?.nodes.length ?? 0) - 1
                      }
                    />
                  ),
                )}
              </div>
            </div>
          )}

        <Analytics.ProductView
          data={{
            products: [
              {
                id: product.id,
                title: product.title,
                price: selectedVariant?.price.amount || '0',
                vendor: product.vendor,
                variantId: selectedVariant?.id || '',
                variantTitle: selectedVariant?.title || '',
                quantity: 1,
              },
            ],
          }}
        />
      </div>
    </div>
  );
}

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
    unitsPerPack: metafield(key: "units_per_pack", namespace: "custom") {
      value
    }
    freeGift: metafield(key: "free_gift", namespace: "custom") {
      value
      references(first: 10) {
        nodes {
          ... on ProductVariant {
            id
            product {
              title
              sizeChart: metafield(key: "size_chart", namespace: "custom") {
                reference {
                  ... on MediaImage {
                    image { url }
                  }
                }
              }
            }
            image { url altText width height }
            selectedOptions { name value }
          }
        }
      }
    }
    freeGiftSubscription: metafield(key: "free_gift_subscription", namespace: "custom") {
      value
      references(first: 10) {
        nodes {
          ... on ProductVariant {
            id
            product {
              title
              sizeChart: metafield(key: "size_chart", namespace: "custom") {
                reference {
                  ... on MediaImage {
                    image { url }
                  }
                }
              }
            }
            image { url altText width height }
            selectedOptions { name value }
          }
        }
      }
    }
    sellingPlanAllocations(first: 10) {
      nodes {
        sellingPlan {
          id
        }
        priceAdjustments {
          compareAtPrice {
            amount
            currencyCode
          }
          price {
            amount
            currencyCode
          }
          perDeliveryPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
` as const;


const SELLING_PLAN_FRAGMENT = `#graphql
  fragment SellingPlanMoney on MoneyV2 {
    amount
    currencyCode
  }
  fragment SellingPlan on SellingPlan {
    id
    options {
      name
      value
    }
    priceAdjustments {
      adjustmentValue {
        ... on SellingPlanFixedAmountPriceAdjustment {
          __typename
          adjustmentAmount {
            ... on MoneyV2 {
               ...SellingPlanMoney
            }
          }
        }
        ... on SellingPlanFixedPriceAdjustment {
          __typename
          price {
            ... on MoneyV2 {
              ...SellingPlanMoney
            }
          }
        }
        ... on SellingPlanPercentagePriceAdjustment {
          __typename
          adjustmentPercentage
        }
      }
      orderCount
    }
    recurringDeliveries
    checkoutCharge {
      type
      value {
        ... on MoneyV2 {
          ...SellingPlanMoney
        }
        ... on SellingPlanCheckoutChargePercentageValue {
          percentage
        }
      }
    }
 }
` as const;

const SELLING_PLAN_GROUP_FRAGMENT = `#graphql
  fragment SellingPlanGroup on SellingPlanGroup {
    name
    options {
      name
      values
    }
    sellingPlans(first:10) {
      nodes {
        ...SellingPlan
      }
    }
  }
  ${SELLING_PLAN_FRAGMENT}
` as const;


const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    handle
    title
    productType
    tags
    vendor
    descriptionHtml
    description
    encodedVariantExistence
    encodedVariantAvailability
    options {
      name
      optionValues {
        name
        firstSelectableVariant {
          ...ProductVariant
        }
        swatch {
          color
          image {
            previewImage {
              url
            }
          }
        }
      }
    }
    images(first: 10) {
      nodes {
        height
        width
        url
        altText
      }
    }
    sellingPlanGroups(first:10) {
      nodes {
        ...SellingPlanGroup
      }
    }
    selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    adjacentVariants (selectedOptions: $selectedOptions) {
      ...ProductVariant
    }
    seo {
      description
      title
    }
  }
  ${SELLING_PLAN_GROUP_FRAGMENT}
  ${PRODUCT_VARIANT_FRAGMENT}
` as const;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
      variants(first: 100) {
        nodes {
          id
          title
          selectedOptions {
            name
            value
          }
          metafield(key: "variant_type", namespace: "custom") {
            type
            value
          }
          sellingPlanAllocations(first: 1) {
            nodes {
              sellingPlan {
                id
              }
            }
          }
        }
      }

      howToConsume: metafield(key: "how_to_consume", namespace: "custom") {
        type
        value
      }
      ingredients: metafield(key: "ingredients", namespace: "custom") {
        type
        value
      }
      certifiedLogos: metafield(key: "certified_logos", namespace: "custom") {
        references(first: 5) {
          nodes {
            ... on MediaImage {
              image {
                height
                width
                url
                altText
              }
            }
          }
        }
      }
      accordion: metafield(key: "accordion_content", namespace: "custom") {
        type
        reference {
          ...Accordion
        }
      }
      productEndorsements: metafield(key: "product_endorsements", namespace: "custom") {
        type
        references(first: 10) {
          nodes {
            ...ProductEndorsementCard
          }
        }
      }
    }
  }
  ${PRODUCT_FRAGMENT}
  ${ACCORDION_FRAGMENT}
  ${PRODUCT_ENDORSEMENT_CARD_FRAGMENT}
` as const;
