import {redirect, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Await, Link, useLoaderData, type MetaFunction} from 'react-router';
import {getPaginationVariables, Analytics} from '@shopify/hydrogen';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import {ProductItem} from '~/components/ProductItem';
import {Suspense, useState} from 'react';
import {COLLECTIONS_HANDLE_QUERY} from './($locale).collections.all';
import {motion} from 'motion/react';
import {Button} from '~/components/ui/button';
import {EmptyResult} from '~/components/EmptyResult';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: `Upbound | ${data?.collection.title ?? ''} Collection`}];
};

export async function loader(args: LoaderFunctionArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
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
  const {handle} = params;
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 8,
  });

  if (!handle) {
    throw redirect('/collections');
  }

  const [{collection}] = await Promise.all([
    storefront.query(COLLECTION_QUERY, {
      variables: {handle, ...paginationVariables},
      // Add other queries here, so that they are loaded in parallel
    }),
  ]);

  const testResponse = await storefront.query(COLLECTION_QUERY, {
    variables: {handle, ...paginationVariables},
    // Add other queries here, so that they are loaded in parallel
  });

  if (!collection) {
    throw new Response(`Collection ${handle} not found`, {
      status: 404,
    });
  }

  // The API handle might be localized, so redirect to the localized handle
  redirectIfHandleIsLocalized(request, {handle, data: collection});

  return {
    collection,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context, request}: LoaderFunctionArgs) {
  const paginationVariables = getPaginationVariables(request);

  const collectionHandles = context.storefront
    .query(COLLECTIONS_HANDLE_QUERY, {
      variables: paginationVariables,
    })
    .catch((error) => {
      console.error(error);
      return null;
    });

  return {collectionHandles};
}

export default function Collection() {
  const {collectionHandles, collection} = useLoaderData<typeof loader>();
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="collection page-py page-px">
      {/* expandable collection handle filter */}
      {/* only renders if product > 2 */}
      {collection?.products?.nodes?.length > 2 ? (
        <div className="flex items-center justify-center my-[48px] flex-wrap gap-2 md:gap-0">
          <Button
            className="justify-self-center"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            How are you feeling?
          </Button>
          <Suspense>
            <Await resolve={collectionHandles}>
              {(response) => (
                <>
                  {/* mobile */}
                  <motion.div
                    className="flex md:hidden gap-2 overflow-hidden flex-wrap justify-center"
                    layout
                    initial={{opacity: 0, scale: 0.8}}
                    animate={{
                      opacity: isExpanded ? 1 : 0,
                      scale: isExpanded ? 1 : 0.8,
                      height: isExpanded ? 'auto' : 0,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 25,
                    }}
                  >
                    {response
                      ? response.collections.nodes.map((_collection) => (
                          <Link
                            key={_collection.id}
                            to={`/collections/${_collection.handle}`}
                            prefetch="intent"
                          >
                            <Button
                              size="sm"
                              variant={
                                collection.handle === _collection.handle
                                  ? 'gradient'
                                  : 'default'
                              }
                            >
                              {_collection.title}
                            </Button>
                          </Link>
                        ))
                      : null}
                  </motion.div>
                  {/* desktop */}
                  <motion.div
                    className="hidden md:flex gap-2 overflow-hidden"
                    layout
                    initial={{opacity: 0, scale: 0.8, marginLeft: 0}}
                    animate={{
                      opacity: isExpanded ? 1 : 0,
                      scale: isExpanded ? 1 : 0.8,
                      marginLeft: isExpanded ? 8 : 0,
                      width: isExpanded ? 'auto' : 0,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 25,
                    }}
                  >
                    {response
                      ? response.collections.nodes.map((_collection) => (
                          <Link
                            key={_collection.id}
                            to={`/collections/${_collection.handle}`}
                            prefetch="intent"
                          >
                            <Button
                              size="sm"
                              variant={
                                collection.handle === _collection.handle
                                  ? 'gradient'
                                  : 'default'
                              }
                            >
                              {_collection.title}
                            </Button>
                          </Link>
                        ))
                      : null}
                  </motion.div>
                </>
              )}
            </Await>
          </Suspense>
        </div>
      ) : (
        <div className="h-[24px]" />
      )}
      {collection?.products?.nodes?.length > 0 ? (
        <PaginatedResourceSection
          connection={collection.products}
          resourcesClassName="products-grid max-w-content"
        >
          {({node: product, index}) => (
            <ProductItem
              key={product.id}
              product={product}
              loading={index < 8 ? 'eager' : undefined}
            />
          )}
        </PaginatedResourceSection>
      ) : (
        <EmptyResult
          title="No products found"
          description="We couldn't find any products in this collection. Try checking back later or explore our other collections."
          ctaText="Explore collections"
          ctaLink="/collections"
        />
      )}
      <Analytics.CollectionView
        data={{
          collection: {
            id: collection.id,
            handle: collection.handle,
          },
        }}
      />
    </div>
  );
}

const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment ProductItem on Product {
    id
    handle
    title
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
    selectedOrFirstAvailableVariant(ignoreUnknownOptions: true) {
      id
      title
      availableForSale
      price {
        amount
        currencyCode
      }
      freeGift: metafield(key: "free_gift", namespace: "custom") {
        value
      }
    }
    productType
    totalInventory
  }
` as const;

// NOTE: https://shopify.dev/docs/api/storefront/2022-04/objects/collection
const COLLECTION_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        nodes {
          ...ProductItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }
` as const;
