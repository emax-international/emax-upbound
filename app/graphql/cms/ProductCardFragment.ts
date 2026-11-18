/**
 * `product_card` metaobject: a product's card on the homepage ("Hydrate up").
 * The same entry is linked from the product's `custom.product_info` metafield.
 * `image` is a list: the card shows the first one and fades to the second
 * on hover; on touch screens it cycles through all of them.
 */
export const PRODUCT_CARD_FRAGMENT = `#graphql
  fragment ProductCard on Metaobject {
    id
    description: field(key: "description") { value }
    info: field(key: "info") { value }
    label: field(key: "label") { value }
    labelColor: field(key: "label_color") { value }
    image: field(key: "image") {
      references(first: 6) {
        nodes {
          ... on MediaImage {
            image { url altText width height }
          }
        }
      }
    }
    product: field(key: "product") {
      reference {
        ... on Product {
          id
          handle
          title
          featuredImage { url altText width height }
        }
      }
    }
  }
` as const;
