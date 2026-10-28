import type {AppLoadContext} from '@shopify/remix-oxygen';
import {AB_TESTING_PAGE_CMS_QUERY} from '~/graphql/cms/AbTestingPageQuery';

/** Handles of the `ab_testing_page` metaobject entries. */
export const AB_VARIANTS = ['loved-by-many', 'love-by-athletes'] as const;
export type AbVariant = (typeof AB_VARIANTS)[number];

/** Cookie that pins a visitor to one variant on the split URL (/loved-by). */
export const AB_COOKIE = 'ab_loved_by';
const AB_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export async function loadAbTestingPage(
  context: AppLoadContext,
  handle: AbVariant,
) {
  const {abTestingPage} = await context.storefront.query(
    AB_TESTING_PAGE_CMS_QUERY,
    {variables: {handle}},
  );

  // Unpublished/draft entries return null from the Storefront API.
  if (!abTestingPage) {
    throw new Response('Not found', {status: 404});
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
