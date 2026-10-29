import {type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {motion} from 'motion/react';
import {Suspense, useState} from 'react';
import {Await, Link, useLoaderData, type MetaFunction} from 'react-router';
import {getPaginationVariables} from '@shopify/hydrogen';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';
import {ProductItem} from '~/components/ProductItem';
import {Button} from '~/components/ui/button';
import {EmptyResult} from '~/components/EmptyResult';
import { filterStagingProducts } from '~/lib/productVisibility';

export const meta: MetaFunction<typeof loader> = () => {
  return [{title: `Upbound | Products`}];
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
async function loadCriticalData({context, request}: LoaderFunctionArgs) {
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 8,
  });

  const [{products}] = await Promise.all([
    storefront.query(CATALOG_QUERY, {
      variables: {...paginationVariables},
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);
 return {
   products: filterStagingProducts(products),
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
  const {collectionHandles, products} = useLoaderData<typeof loader>();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="collection page-py page-px">
      {/* expandable collection handle filter */}
      {/* only renders if product > 2 */}
      {products?.nodes?.length > 2 ? (
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
                      ? response.collections.nodes.map((collection, index) => (
                          <Link
                            key={collection.id}
                            to={`/collections/${collection.handle}`}
                            prefetch="intent"
                          >
                            <Button size="sm">{collection.title}</Button>
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
                      ? response.collections.nodes.map((collection, index) => (
                          <Link
                            key={collection.id}
                            to={`/collections/${collection.handle}`}
                            prefetch="intent"
                          >
                            <Button size="sm">{collection.title}</Button>
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
      {products?.nodes?.length > 0 ? (
        <PaginatedResourceSection
          connection={products}
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
    </div>
  );
}

const COLLECTION_ITEM_FRAGMENT = `#graphql
  fragment MoneyCollectionItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment CollectionItem on Product {
    id
    handle
    title
    tags
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyCollectionItem
      }
      maxVariantPrice {
        ...MoneyCollectionItem
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        ...MoneyCollectionItem
      }
      maxVariantPrice {
        ...MoneyCollectionItem
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
  }
` as const;

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/product
const CATALOG_QUERY = `#graphql
  query Catalog(
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    products(first: $first, last: $last, before: $startCursor, after: $endCursor) {
      nodes {
        ...CollectionItem
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
  ${COLLECTION_ITEM_FRAGMENT}
` as const;

export const COLLECTIONS_HANDLE_QUERY = `#graphql
  query StoreCollectionHandles(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    collections(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor
    ) {
      nodes {
        id
        title
        handle
      }
    }
  }
` as const;
