import {
  ACCORDION_FRAGMENT,
  CAROUSEL_FRAGMENT,
  COMPARISON_TABLE_FRAGMENT,
  HERO_WITH_CTA_FRAGMENT,
} from './ModuleFragments';
import {
  LANDING_INFO_FRAGMENT,
  LANDING_PRODUCT_FRAGMENT,
} from './LandingProductFragment';

/**
 * Fields of a landing page metaobject (`ab_testing_page` or `landing_page`;
 * both types have the same fields). Uses $selectedOptions for the product
 * in the add-to-cart section, so the query must declare it.
 */
export const LANDING_PAGE_FRAGMENT = `#graphql
  fragment LandingPage on Metaobject {
    id
    type
    handle

    title: field(key: "title") { value }

    # Marquee messages (global_banner entries) shown instead of the site banner
    # Works as a single reference or a list
    banner: field(key: "banner") {
      reference {
        ... on Metaobject {
          content: field(key: "content") { value }
        }
      }
      references(first: 10) {
        nodes {
          ... on Metaobject {
            content: field(key: "content") { value }
          }
        }
      }
    }

    hero: field(key: "hero") {
      reference {
        ... on Metaobject {
          ...HeroWithCta
        }
      }
    }

    # Add-to-cart section (landing_product metaobject)
    productSection: field(key: "product_section") {
      reference {
        ... on Metaobject {
          product: field(key: "product") {
            reference {
              ... on Product {
                ...LandingProduct
              }
            }
          }
          subtitle: field(key: "subtitle") { value }
          highlights: field(key: "highlights") { value }
          info: field(key: "info") {
            reference {
              ... on Metaobject {
                ...LandingInfo
              }
            }
          }
        }
      }
    }

    gallery: field(key: "gallery") {
      reference {
        ... on Metaobject {
          ...Carousel
        }
      }
    }

    comparison: field(key: "comparison_table") {
      reference {
        ... on Metaobject {
          ...ComparisonTable
        }
      }
    }

    review: field(key: "review") {
      reference {
        ... on Metaobject {
          ...Carousel
        }
      }
    }

    faq: field(key: "faq") {
      reference {
        ... on Metaobject {
          ...Accordion
        }
      }
    }

    # Per-page images for the add-to-cart gallery (else the product's own)
    productImages: field(key: "product_images") {
      references(first: 20) {
        nodes {
          ... on MediaImage {
            image {
              id
              url
              altText
              width
              height
            }
          }
        }
      }
    }

    # Background of the "Join the Upbound Club" footer
    footerImage: field(key: "footer_image") {
      reference {
        ... on MediaImage {
          image {
            url
            altText
            width
            height
          }
        }
      }
    }

    # Logo under the Instagram link in the footer (image or SVG file)
    footerLogo: field(key: "footer_logo") {
      reference {
        ... on MediaImage {
          image {
            url
            altText
            width
            height
          }
        }
        ... on GenericFile {
          url
          alt
        }
      }
    }
  }
` as const;

/**
 * Loads one landing page: by `id` (e.g. from a product's
 * custom.landing_page metafield) or by `handle` ({type, handle}).
 */
export const LANDING_PAGE_CMS_QUERY = `#graphql
  ${ACCORDION_FRAGMENT}
  ${CAROUSEL_FRAGMENT}
  ${COMPARISON_TABLE_FRAGMENT}
  ${HERO_WITH_CTA_FRAGMENT}
  ${LANDING_PRODUCT_FRAGMENT}
  ${LANDING_INFO_FRAGMENT}
  ${LANDING_PAGE_FRAGMENT}

  query LandingPageCms(
    $id: ID
    $handle: MetaobjectHandleInput
    $selectedOptions: [SelectedOptionInput!]!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    landingPage: metaobject(id: $id, handle: $handle) {
      ...LandingPage
    }
  }
` as const;
