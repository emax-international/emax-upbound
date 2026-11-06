/**
 * A/B test tracking for the "Loved by" landing pages.
 *
 * When a visitor views an A/B page we remember which version they saw and
 * where they came from (UTM tags / click IDs) in localStorage. That context is
 * then:
 * - added to every A/B event pushed to the GTM dataLayer (pushAbEvent), and
 * - saved on the cart as attributes when they add to cart (abCartAttributes),
 *   so Shopify copies it onto the order and the checkout custom pixel can
 *   report begin_checkout / purchase per version and traffic source.
 */

import {createContext, useContext} from 'react';
import type {AbVariant} from './abTestingPage';

/** GA4 property the site reports to; its session cookie is `_ga_<id>`. */
const GA4_MEASUREMENT_ID = 'G-NB0SCMEGH0';

const STORAGE_KEY = 'ab_loved_by_context';
// Same lifetime as the variant cookie (AB_COOKIE_MAX_AGE)
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

/** URL params copied from the ad click. */
const CAMPAIGN_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'gclid',
  'fbclid',
] as const;
type CampaignParam = (typeof CAMPAIGN_PARAMS)[number];

export type AbContext = {
  ab_test: 'loved_by';
  ab_variant: AbVariant;
  /** split = assigned on /loved-by; direct = opened a version's own URL */
  ab_source: 'split' | 'direct';
  savedAt: number;
} & Partial<Record<CampaignParam, string>>;

/**
 * Records the version shown and the visit's campaign params. Campaign params
 * from an earlier ad click are kept when this visit has none (e.g. a
 * returning visitor who typed the URL).
 */
export function saveAbContext(
  variant: AbVariant,
  source: AbContext['ab_source'],
): AbContext {
  const params = new URLSearchParams(window.location.search);
  const campaign: Partial<Record<CampaignParam, string>> = {};
  for (const key of CAMPAIGN_PARAMS) {
    const value = params.get(key);
    if (value) campaign[key] = value.slice(0, 200);
  }
  const hasCampaign = Object.keys(campaign).length > 0;
  const previous = getAbContext();

  const context: AbContext = {
    ...(hasCampaign ? {} : pickCampaign(previous)),
    ...campaign,
    ab_test: 'loved_by',
    ab_variant: variant,
    ab_source: source,
    savedAt: Date.now(),
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(context));
  } catch {
    // Storage blocked (private mode etc.): events still carry the context
  }
  return context;
}

/** The visitor's A/B context, or null if they haven't seen an A/B page. */
export function getAbContext(): AbContext | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const context = JSON.parse(raw) as AbContext;
    if (!context?.ab_variant || Date.now() - context.savedAt > MAX_AGE_MS) {
      return null;
    }
    return context;
  } catch {
    return null;
  }
}

/**
 * Pushes an event to the GTM dataLayer with the A/B context added
 * (ab_test, ab_variant, ab_source and the campaign params).
 */
export function pushAbEvent(
  event: string,
  params: Record<string, unknown> = {},
  context: AbContext | null = getAbContext(),
) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  const {savedAt: _savedAt, ...abParams} = context ?? {};
  window.dataLayer.push({event, ...abParams, ...params});
}

/**
 * Cart attributes for the visitor's A/B context (empty if they haven't seen
 * an A/B page). Shown on the order under "Additional details" and read by the
 * checkout custom pixel. The GA4 IDs let the pixel report the purchase as the
 * same GA4 visitor/session that saw the landing page.
 */
export function abCartAttributes(): Array<{key: string; value: string}> {
  const context = getAbContext();
  if (!context) return [];
  const {savedAt: _savedAt, ab_test: _abTest, ...fields} = context;
  const attributes = Object.entries({...fields, ...getGa4Ids()})
    .filter((entry): entry is [string, string] => !!entry[1])
    .map(([key, value]) => ({key, value}));
  return attributes;
}

/** Cart attribute keys abCartAttributes can produce. */
const AB_CART_ATTRIBUTE_KEYS = new Set<string>([
  'ab_variant',
  'ab_source',
  ...CAMPAIGN_PARAMS,
  'ga_client_id',
  'ga_session_id',
]);

/**
 * Server side: reads the `cartAttributes` form field sent with add to cart,
 * keeping only the known A/B keys (it's client input).
 */
export function parseAbCartAttributes(
  value: FormDataEntryValue | null,
): Array<{key: string; value: string}> {
  if (typeof value !== 'string' || !value) return [];
  try {
    const list = JSON.parse(value) as unknown;
    if (!Array.isArray(list)) return [];
    return (list as Array<{key?: unknown; value?: unknown} | null>)
      .filter(
        (a): a is {key: string; value: string} =>
          typeof a?.key === 'string' &&
          typeof a?.value === 'string' &&
          AB_CART_ATTRIBUTE_KEYS.has(a.key),
      )
      .map(({key, value}) => ({key, value: value.slice(0, 255)}));
  } catch {
    return [];
  }
}

/** GA4 client and session IDs from the `_ga` / `_ga_<id>` cookies. */
function getGa4Ids() {
  const cookies = Object.fromEntries(
    document.cookie.split(/;\s*/).map((c) => {
      const i = c.indexOf('=');
      return [c.slice(0, i), decodeURIComponent(c.slice(i + 1))];
    }),
  );
  // _ga = GA1.1.<random>.<timestamp>; the client ID is the last two parts
  const clientId = cookies._ga?.split('.').slice(-2).join('.');
  // _ga_<id> = GS1.1.<session>.… (old) or GS2.1.s<session>$o…$… (new)
  const session = cookies[`_ga_${GA4_MEASUREMENT_ID.replace(/^G-/, '')}`];
  const sessionId =
    session?.match(/^GS2\.\d+\.s(\d+)/)?.[1] ??
    session?.match(/^GS1\.\d+\.(\d+)/)?.[1];
  return {ga_client_id: clientId, ga_session_id: sessionId};
}

function pickCampaign(context: AbContext | null) {
  const campaign: Partial<Record<CampaignParam, string>> = {};
  for (const key of CAMPAIGN_PARAMS) {
    if (context?.[key]) campaign[key] = context[key];
  }
  return campaign;
}

/**
 * Whether the current page is one of the A/B test versions. Set by
 * LandingPage; shared sections (Buy now, add to cart, footer) read it so
 * that on other landing pages their clicks aren't counted in the A/B test.
 */
export const AbPageContext = createContext(false);

const noop = () => {};

/** pushAbEvent on A/B pages; does nothing on other pages. */
export function useAbEvent() {
  const isAbPage = useContext(AbPageContext);
  return isAbPage ? pushAbEvent : noop;
}
