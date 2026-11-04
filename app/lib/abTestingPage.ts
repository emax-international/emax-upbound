import {getSelectedProductOptions} from '@shopify/hydrogen';
import type {AppLoadContext} from '@shopify/remix-oxygen';
import {AB_TESTING_PAGE_CMS_QUERY} from '~/graphql/cms/AbTestingPageQuery';

/** Handles of the `ab_testing_page` metaobject entries. */
export const AB_VARIANTS = ['loved-by-many', 'love-by-athletes'] as const;
export type AbVariant = (typeof AB_VARIANTS)[number];

/**
 * Route `handle` for the A/B pages: PageLayout skips the site footer, since
 * AbTestingPage renders its own "Join the Upbound Club" footer.
 */
export const AB_ROUTE_HANDLE = {hideFooter: true};

/** Cookie that pins a visitor to one variant on the split URL (/loved-by). */
export const AB_COOKIE = 'ab_loved_by';
const AB_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

/**
 * Loads an `ab_testing_page` entry. The product variant follows the URL's
 * option params (e.g. ?Quantity=...), like the product page; without them it
 * opens on the first variant that can be subscribed to.
 */
export async function loadAbTestingPage(
  context: AppLoadContext,
  handle: AbVariant,
  request: Request,
) {
  const query = (selectedOptions: {name: string; value: string}[]) =>
    context.storefront.query(AB_TESTING_PAGE_CMS_QUERY, {
      variables: {handle, selectedOptions},
    });

  const selectedOptions = getSelectedProductOptions(request);
  let {abTestingPage} = await query(selectedOptions);

  // Unpublished/draft entries return null from the Storefront API.
  if (!abTestingPage) {
    throw new Response('Not found', {status: 404});
  }

  const product = abTestingPage.productSection?.reference?.product?.reference;
  if (product && selectedOptions.length === 0) {
    const subscribable = product.variants.nodes.find(
      (v) => v.sellingPlanAllocations.nodes.length > 0,
    );
    if (
      subscribable &&
      subscribable.id !== product.selectedOrFirstAvailableVariant?.id
    ) {
      ({abTestingPage} = await query(subscribable.selectedOptions));
      if (!abTestingPage) throw new Response('Not found', {status: 404});
    }
  }

  return abTestingPage;
}

/**
 * Returns the visitor's variant from the cookie, or assigns one at random.
 * `setCookie` is only set when a new variant was assigned.
 */
export function pickAbVariant(request: Request) {
  const cookies = request.headers.get('Cookie') ?? '';
  const match = cookies.match(new RegExp(`(?:^|;\s*)${AB_COOKIE}=([^;]+)`));
  const existing = match?.[1] as AbVariant | undefined;

  if (existing && AB_VARIANTS.includes(existing)) {
    return {variant: existing, setCookie: null};
  }

  const variant = AB_VARIANTS[Math.floor(Math.random() * AB_VARIANTS.length)];
  const setCookie = `${AB_COOKIE}=${variant}; Path=/; Max-Age=${AB_COOKIE_MAX_AGE}; SameSite=Lax; Secure`;
  return {variant, setCookie};
}
