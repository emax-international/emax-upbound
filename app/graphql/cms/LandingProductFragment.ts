// Product data for the add-to-cart section on landing pages (e.g. A/B testing
// pages). Kept separate from the product route's fragments so the two pages
// can change independently.

const LANDING_GIFT_VARIANT_FRAGMENT = `#graphql
  fragment LandingGiftVariant on ProductVariant {
    id
    title
    price {
      amount
      currencyCode
    }
    compareAtPrice {
      amount
      currencyCode
    }
    image {
      url
      altText
      width
      height
    }
    selectedOptions {
      name
      value
    }
    product {
      title
      sizeChart: metafield(key: "size_chart", namespace: "custom") {
        reference {
          ... on MediaImage {
            image {
              url
            }
          }
        }
      }
    }
  }
` as const;

const LANDING_PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment LandingProductVariant on ProductVariant {
    availableForSale
    id
    title
    sku
    price {
      amount
      currencyCode
    }
    compareAtPrice {
      amount
      currencyCode
    }
    unitPrice {
      amount
      currencyCode
    }
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    unitsPerPack: metafield(key: "units_per_pack", namespace: "custom") {
      value
    }
    freeGift: metafield(key: "free_gift", namespace: "custom") {
      references(first: 10) {
        nodes {
          ...LandingGiftVariant
        }
      }
    }
    freeGiftSubscription: metafield(
      key: "free_gift_subscription"
      namespace: "custom"
    ) {
      references(first: 10) {
        nodes {
          ...LandingGiftVariant
        }
      }
    }
    sellingPlanAllocations(first: 10) {
      nodes {
        sellingPlan {
          id
        }
        priceAdjustments {
          compareAtPrice {
            amount
            currencyCode
          }
          price {
            amount
            currencyCode
          }
          perDeliveryPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
` as const;

export const LANDING_PRODUCT_FRAGMENT = `#graphql
  fragment LandingProduct on Product {
    id
    handle
    title
    vendor
    # Landing page set on the product (SEO: /landing/<handle> then points
    # search engines to the product page)
    landingPage: metafield(key: "landing_page", namespace: "custom") {
      reference {
        ... on Metaobject {
          id
        }
      }
    }
    encodedVariantExistence
    encodedVariantAvailability
    images(first: 20) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
    options {
      name
      optionValues {
        name
        firstSelectableVariant {
          ...LandingProductVariant
        }
        swatch {
          color
          image {
            previewImage {
              url
            }
          }
        }
      }
    }
    selectedOrFirstAvailableVariant(
      selectedOptions: $selectedOptions
      ignoreUnknownOptions: true
      caseInsensitiveMatch: true
    ) {
      ...LandingProductVariant
    }
    adjacentVariants(selectedOptions: $selectedOptions) {
      ...LandingProductVariant
    }
    # Used to open on the first variant that can be subscribed to
    variants(first: 50) {
      nodes {
        id
        selectedOptions {
          name
          value
        }
        sellingPlanAllocations(first: 1) {
          nodes {
            sellingPlan {
              id
            }
          }
        }
      }
    }
  }
  ${LANDING_PRODUCT_VARIANT_FRAGMENT}
  ${LANDING_GIFT_VARIANT_FRAGMENT}
` as const;

// Product info accordion (Why Upbound?, How it helps?, Ingredients, ...).
// Same accordion / accordion_item types as the FAQs, plus the optional item
// fields only this section uses: points (step_item), ingredients
// (mix_entry), tags and note.
export const LANDING_INFO_FRAGMENT = `#graphql
  fragment LandingInfo on Metaobject {
    id
    content: field(key: "content") {
      references(first: 20) {
        nodes {
          ... on Metaobject {
            id
            title: field(key: "title") { value }
            description: field(key: "description") { value }
            tags: field(key: "tags") { value }
            note: field(key: "note") { value }
            points: field(key: "points") {
              references(first: 10) {
                nodes {
                  ... on Metaobject {
                    id
                    step: field(key: "step") { value }
                    description: field(key: "description") { value }
                  }
                }
              }
            }
            ingredients: field(key: "ingredients") {
              references(first: 10) {
                nodes {
                  ... on Metaobject {
                    id
                    text: field(key: "text") { value }
                    description: field(key: "description") { value }
                    amount: field(key: "amount") { value }
                    image: field(key: "image") {
                      reference {
                        ... on MediaImage {
                          image { url altText width height }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
` as const;
