/**
 * Shopify custom pixel: A/B test "Loved by" → GA4
 *
 * Paste into Shopify admin → Settings → Customer events → Add custom pixel.
 * Not part of the Hydrogen build; kept here so it's version-controlled.
 *
 * The storefront saves the A/B context as cart attributes on add to cart
 * (app/lib/abTracking.ts): ab_variant, ab_source, utm_*, gclid, fbclid,
 * ga_client_id, ga_session_id. Shopify carries them into checkout, where this
 * pixel reads them and sends begin_checkout / purchase to GA4 as the same
 * GA4 visitor and session that saw the landing page.
 *
 * Only checkouts with an ab_variant attribute are sent, so other orders
 * aren't affected.
 */

const GA4_MEASUREMENT_ID = 'G-NB0SCMEGH0';

// If a Shopify app (e.g. Google & YouTube) already sends purchases to this
// GA4 property, set this to false: the events are then sent as
// ab_begin_checkout / ab_purchase so purchases aren't counted twice.
// false: Shopify's GA4 integration already sends purchase/begin_checkout
// to G-NB0SCMEGH0 (checked 2026-11-06).
const USE_STANDARD_EVENT_NAMES = false;

const script = document.createElement('script');
script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
script.async = true;
document.head.appendChild(script);

window.dataLayer = window.dataLayer || [];
function gtag() {
  window.dataLayer.push(arguments);
}
gtag('js', new Date());

let configured = false;

/** Cart attributes as an object, e.g. {ab_variant: 'loved-by-many', ...} */
function attributesOf(checkout) {
  const attributes = {};
  for (const {key, value} of checkout?.attributes ?? []) {
    attributes[key] = value;
  }
  return attributes;
}

function send(eventName, event) {
  const checkout = event.data?.checkout;
  const attrs = attributesOf(checkout);
  if (!attrs.ab_variant) return;

  // Configure once, reusing the landing page's GA4 IDs so the checkout joins
  // the same visitor and session
  if (!configured) {
    configured = true;
    gtag('config', GA4_MEASUREMENT_ID, {
      send_page_view: false,
      page_location: event.context?.document?.location?.href,
      ...(attrs.ga_client_id && {client_id: attrs.ga_client_id}),
      ...(attrs.ga_session_id && {session_id: attrs.ga_session_id}),
    });
    gtag('set', 'user_properties', {ab_variant: attrs.ab_variant});
  }

  const name = USE_STANDARD_EVENT_NAMES ? eventName : `ab_${eventName}`;
  gtag('event', name, {
    ab_test: 'loved_by',
    ab_variant: attrs.ab_variant,
    ab_source: attrs.ab_source,
    utm_source: attrs.utm_source,
    utm_medium: attrs.utm_medium,
    utm_campaign: attrs.utm_campaign,
    utm_content: attrs.utm_content,
    currency: checkout.currencyCode,
    value: Number(checkout.totalPrice?.amount ?? 0),
    ...(eventName === 'purchase' && {
      transaction_id: checkout.order?.id,
      tax: Number(checkout.totalTax?.amount ?? 0),
      shipping: Number(checkout.shippingLine?.price?.amount ?? 0),
    }),
    items: (checkout.lineItems ?? []).map((line) => ({
      item_id: line.variant?.product?.id,
      item_name: line.title,
      item_variant: line.variant?.title,
      price: Number(line.variant?.price?.amount ?? 0),
      quantity: line.quantity,
    })),
  });
}

analytics.subscribe('checkout_started', (event) => {
  send('begin_checkout', event);
});

analytics.subscribe('checkout_completed', (event) => {
  send('purchase', event);
});
