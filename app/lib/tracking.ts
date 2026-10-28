/**
 * Cart tracking events pushed to the GTM dataLayer (add_to_cart / remove_from_cart).
 * GTM forwards these to GA4, Google Ads remarketing and Meta.
 */

declare global {
  interface Window {
    dataLayer: any[];
  }
}

export type TrackedItem = {
  /** Product GID */
  id: string;
  name: string;
  /** Variant title */
  variant?: string;
  /** Unit price after discounts (e.g. subscription price) */
  price: number;
  quantity: number;
  currency: string;
};

export function pushCartEvent(
  event: 'add_to_cart' | 'remove_from_cart',
  item: TrackedItem,
  page = 'unknown',
) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];

  const price = round(item.price);

  // GA4 recommends clearing the previous ecommerce object first
  window.dataLayer.push({ecommerce: null});
  window.dataLayer.push({
    event,
    eventPage: page,
    // Legacy shape, kept for existing GTM tags
    details: {
      id: item.id,
      name: item.name,
      variant: item.variant ?? '',
      price: price.toFixed(2),
      quantity: item.quantity,
      currency: item.currency,
    },
    product_id: item.id,
    currency: item.currency,
    quantity: item.quantity,
    // GA4 ecommerce shape
    ecommerce: {
      currency: item.currency,
      items: [
        {
          item_id: item.id,
          item_name: item.name,
          item_variant: item.variant ?? '',
          price,
          quantity: item.quantity,
        },
      ],
    },
  });
}

function round(n: number) {
  return Math.round((Number.isFinite(n) ? n : 0) * 100) / 100;
}
