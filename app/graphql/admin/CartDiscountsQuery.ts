// NOTE: https://shopify.dev/docs/api/admin-graphql/latest/queries/discountNodes
// Looks up a specific customer's active discounts (assigned via Shopify's
// native "Specific customers" discount eligibility) so they can be offered
// as pickable options in the cart. No manually-curated/duplicated list —
// this reads real discounts live from Shopify.
export const CART_DISCOUNTS_QUERY = `#graphql
  query CustomerCartDiscounts($query: String!, $first: Int!) {
    discountNodes(first: $first, query: $query) {
      nodes {
        id
        discount {
          __typename
          ... on DiscountCodeBasic {
            title
            summary
            status
            codes(first: 1) {
              nodes {
                code
              }
            }
            customerSelection {
              ...CustomerSelection
            }
          }
          ... on DiscountCodeFreeShipping {
            title
            summary
            status
            codes(first: 1) {
              nodes {
                code
              }
            }
            customerSelection {
              ...CustomerSelection
            }
          }
          ... on DiscountCodeBxgy {
            title
            summary
            status
            codes(first: 1) {
              nodes {
                code
              }
            }
            customerSelection {
              ...CustomerSelection
            }
          }
        }
      }
    }
  }
  # Re-checked in getCustomerVouchers: the query's customer_ids filter is
  # silently ignored on Admin API versions before 2026-07.
  fragment CustomerSelection on DiscountCustomerSelection {
    __typename
    ... on DiscountCustomers {
      customers {
        id
      }
    }
  }
`;

export type CartDiscountOption = {
  code: string;
  label: string;
  // Shopify's auto-generated discount summary (e.g. "5% off orders over
  // RM50") — null when it wouldn't say anything the label doesn't already.
  description: string | null;
};
