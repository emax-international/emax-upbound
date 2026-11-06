import {getSelectedProductOptions} from '@shopify/hydrogen';
import type {AppLoadContext} from '@shopify/remix-oxygen';
import type {LandingPageFragment} from 'types/storefrontapi.generated';
import type {RouteBanner} from '~/components/cms/Banner';
import type {RouteHandle} from '~/components/PageLayout';
import {LANDING_PAGE_CMS_QUERY} from '~/graphql/cms/LandingPageQuery';

/** Metaobject type for product landing pages (same fields as ab_testing_page). */
export const LANDING_PAGE_TYPE = 'landing_page';

/** Which entry to load: by id (e.g. from a product metafield) or handle. */
export type LandingPageRef = {id: string} | {type: string; handle: string};

/**
 * Loads a landing page entry, or null if it doesn't exist or isn't published
 * (draft entries return null from the Storefront API).
 *
 * The add-to-cart product's variant follows the URL's option params
 * (e.g. ?Quantity=...), like the product page; without them it opens on the
 * first variant that can be subscribed to.
 */
export async function loadLandingPage(
  context: AppLoadContext,
  request: Request,
  ref: LandingPageRef,
): Promise<LandingPageFragment | null> {
  const variables =
    'id' in ref ? {id: ref.id} : {handle: {type: ref.type, handle: ref.handle}};
  const query = async (selectedOptions: {name: string; value: string}[]) => {
    const {landingPage} = await context.storefront.query(
      LANDING_PAGE_CMS_QUERY,
      {variables: {...variables, selectedOptions}},
    );
    return landingPage ?? null;
  };

  const selectedOptions = getSelectedProductOptions(request);
  let page = await query(selectedOptions);
  if (!page) return null;

  const product = page.productSection?.reference?.product?.reference;
  if (product && selectedOptions.length === 0) {
    const subscribable = product.variants.nodes.find(
      (v) => v.sellingPlanAllocations.nodes.length > 0,
    );
    if (
      subscribable &&
      subscribable.id !== product.selectedOrFirstAvailableVariant?.id
    ) {
      page = (await query(subscribable.selectedOptions)) ?? page;
    }
  }

  return page;
}

/** The entry's own marquee messages (if any), replacing the site banner. */
export function landingBanner(
  page: LandingPageFragment | null | undefined,
): RouteBanner | null {
  const nodes = page?.banner?.references?.nodes ?? [page?.banner?.reference];
  const messages = nodes
    .map((node) => node?.content?.value)
    .filter((content): content is string => !!content);
  return messages.length > 0 ? {messages, variant: 'dark'} : null;
}

/**
 * Route `handle` for standalone landing pages (the A/B pages). PageLayout:
 * - skips the site footer (LandingPage renders its own "Join the Upbound
 *   Club" footer) and the header menu links, leaving just the logo and cart;
 * - shows the entry's own marquee messages (if any) instead of the site banner.
 * Loaders must return the entry as `page`.
 */
export const LANDING_ROUTE_HANDLE: RouteHandle = {
  hideFooter: true,
  hideMenu: true,
  banner: (data) => landingBanner((data as {page?: LandingPageFragment})?.page),
};
