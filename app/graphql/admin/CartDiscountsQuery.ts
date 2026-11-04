// NOTE: https://shopify.dev/docs/api/admin-graphql/latest/queries/discountNodes
// Looks up active discounts so eligible ones can be offered as pickable
// options in the cart. No manually-curated/duplicated list — this reads
// real discounts live from Shopify.
//
// IMPORTANT: `query: $query` only filters by things Shopify's discount
// search actually indexes (status, title, dates, etc.) — `customer_ids:` is
// NOT a supported search term here and is silently ignored rather than
// erroring, so it must never be relied on to scope results to one customer.
// customerSelection is fetched per discount instead, and getCustomerVouchers
// filters by it in code — see there for why.
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
              ... on DiscountCustomerAll {
                allCustomers
              }
              ... on DiscountCustomers {
                customers {
                  id
                }
              }
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
              ... on DiscountCustomerAll {
                allCustomers
              }
              ... on DiscountCustomers {
                customers {
                  id
                }
              }
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
              ... on DiscountCustomerAll {
                allCustomers
              }
              ... on DiscountCustomers {
                customers {
                  id
                }
              }
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
