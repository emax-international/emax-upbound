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

export const AB_TESTING_PAGE_CMS_QUERY = `#graphql
  ${ACCORDION_FRAGMENT}
  ${CAROUSEL_FRAGMENT}
  ${COMPARISON_TABLE_FRAGMENT}
  ${HERO_WITH_CTA_FRAGMENT}
  ${LANDING_PRODUCT_FRAGMENT}
  ${LANDING_INFO_FRAGMENT}

  query AbTestingPageCms(
    $handle: String!
    $selectedOptions: [SelectedOptionInput!]!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    abTestingPage: metaobject(
      handle: {type: "ab_testing_page", handle: $handle}
    ) {
      id
      handle

      title: field(key: "title") { value }

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
    }
  }
` as const;
