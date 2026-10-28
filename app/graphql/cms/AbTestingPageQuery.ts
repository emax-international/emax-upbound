import {ACCORDION_FRAGMENT, CAROUSEL_FRAGMENT} from './ModuleFragments';

export const AB_TESTING_PAGE_CMS_QUERY = `#graphql
  ${ACCORDION_FRAGMENT}
  ${CAROUSEL_FRAGMENT}

  query AbTestingPageCms($handle: String!) {
    abTestingPage: metaobject(
      handle: {type: "ab_testing_page", handle: $handle}
    ) {
      id
      handle

      title: field(key: "title") { value }

      gallery: field(key: "gallery") {
        reference {
          ... on Metaobject {
            ...Carousel
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
    }
  }
` as const;
