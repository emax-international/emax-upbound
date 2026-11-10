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
 * "Join the Upbound Club" footer content (`club_footer` metaobject). Every
 * field is optional; ClubFooter falls back to the default copy.
 */
export const CLUB_FOOTER_FRAGMENT = `#graphql
  fragment ClubFooterContent on Metaobject {
    id
    heading: field(key: "heading") { value }
    # Show the email signup form + consent line (true/false; empty = show)
    emailSubscription: field(key: "email_subscription") { value }
    description: field(key: "description") { value }
    consentText: field(key: "consent_text") { value }
    instagramHandle: field(key: "instagram_handle") { value }
    instagramUrl: field(key: "instagram_url") { value }
    backgroundImage: field(key: "background_image") {
      reference {
        ... on MediaImage {
          image { url altText width height }
        }
      }
    }
    logo: field(key: "logo") {
      reference {
        ... on MediaImage {
          image { url altText width height }
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

    # Show the header menu links (true/false); empty = the route's default
    showMenu: field(key: "show_menu") { value }

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

    # "Join the Upbound Club" footer content (club_footer metaobject)
    clubFooter: field(key: "club_footer") {
      reference {
        ... on Metaobject {
          ...ClubFooterContent
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
  ${CLUB_FOOTER_FRAGMENT}
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
