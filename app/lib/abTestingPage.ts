import type {AppLoadContext} from '@shopify/remix-oxygen';
import {LANDING_ROUTE_HANDLE, loadLandingPage} from './landingPage';

/** Handles of the `ab_testing_page` metaobject entries in the A/B test. */
export const AB_VARIANTS = ['loved-by-many', 'loved-by-athletes'] as const;
export type AbVariant = (typeof AB_VARIANTS)[number];

/** True for the two A/B test versions; other landing pages (other
 * `ab_testing_page` entries, `landing_page` entries) are not in the test. */
export function isAbVariant(handle: string): handle is AbVariant {
  return (AB_VARIANTS as readonly string[]).includes(handle);
}

/** Route `handle` for the A/B pages (see LANDING_ROUTE_HANDLE). */
export const AB_ROUTE_HANDLE = LANDING_ROUTE_HANDLE;

/** Loads an `ab_testing_page` entry by handle; 404 if missing/unpublished. */
export async function loadAbTestingPage(
  context: AppLoadContext,
  handle: string,
  request: Request,
) {
  const page = await loadLandingPage(context, request, {
    type: 'ab_testing_page',
    handle,
  });
  if (!page) throw new Response('Not found', {status: 404});
  return page;
}

/** Cookie that pins a visitor to one variant on the split URL (/loved-by). */
export const AB_COOKIE = 'ab_loved_by';
const AB_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

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
