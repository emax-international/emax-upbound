import {INFO_CARD_FRAGMENT} from './InfoCardFragment';
import {CLUB_FOOTER_FRAGMENT} from './LandingPageQuery';
import {CAROUSEL_FRAGMENT, HERO_WITH_CTA_FRAGMENT} from './ModuleFragments';
import {PEOPLE_CARD_FRAGMENT} from './PeopleCardFragment';
import {PRODUCT_CARD_FRAGMENT} from './ProductCardFragment';

/**
 * The revamped homepage: the `homepage` metaobject entry "new-homepage".
 */
export const NEW_HOME_PAGE_QUERY = `#graphql
  ${HERO_WITH_CTA_FRAGMENT}
  ${INFO_CARD_FRAGMENT}
  ${PRODUCT_CARD_FRAGMENT}
  ${CAROUSEL_FRAGMENT}
  ${CLUB_FOOTER_FRAGMENT}

  query NewHomePage($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    newHomePage: metaobject(handle: {handle: "new-homepage", type: "homepage"}) {
      id
      handle
      hero: field(key: "hero_banner") {
        reference {
          ... on Metaobject {
            ...HeroWithCta
          }
        }
      }
      # Mobile layout of the "Hydrate up" cards: "Carousel" (default) or "Stacked"
      mobileProductLayout: field(key: "mobile_product_layout") {
        value
      }
      # "Hydrate up" cards (product_card entries)
      productList: field(key: "product_list") {
        references(first: 6) {
          nodes {
            ... on Metaobject {
              ...ProductCard
            }
          }
        }
      }
      # "Brands we've worked with" (carousel entry, same as landing pages)
      gallery: field(key: "gallery") {
        reference {
          ... on Metaobject {
            ...Carousel
          }
        }
      }
      info: field(key: "info") {
        reference {
          ... on Metaobject {
            ...InfoCard
          }
        }
      }
      # "The People Who Choose Upbound" (community blog articles). Only the
      # ids here: Hydrogen's bundled Storefront schema (2025-07) doesn't list
      # Article as a metafield reference, so codegen rejects "... on Article".
      # The articles load via HOME_PAGE_ARTICLES_QUERY.
      blog: field(key: "blog") {
        references(first: 12) {
          nodes {
            ... on Node {
              id
            }
          }
        }
      }
      # "Join the Upbound Club" footer (club_footer entry); replaces the
      # site footer when set, like on the landing pages
      footer: field(key: "footer") {
        reference {
          ... on Metaobject {
            ...ClubFooterContent
          }
        }
      }
    }
  }
` as const;

/** The homepage `blog` articles by id, in the order given. */
export const HOME_PAGE_ARTICLES_QUERY = `#graphql
  ${PEOPLE_CARD_FRAGMENT}

  query HomePageArticles(
    $ids: [ID!]!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    nodes(ids: $ids) {
      ... on Article {
        ...PeopleCard
      }
    }
  }
` as const;
