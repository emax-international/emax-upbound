// Fragment definitions for different module types
// These will be used by codegen to generate TypeScript types

export const HERO_WITH_CTA_FRAGMENT = `#graphql
  fragment HeroWithCta on Metaobject {
    id
    type
    title: field(key: "title") {
      value
    }
    description: field(key: "description") {
      value
    }
    desktopImage: field(key: "desktop_image") {
      reference {
        ... on MediaImage {
          image {
            height
            width
            url
            altText
          }
        }
      }
    }
    mobileImage: field(key: "mobile_image") {
      reference {
        ... on MediaImage {
          image {
            height
            width
            url
            altText
          }
        }
      }
    }
    cta: field(key: "cta") {
      reference {
        ... on Metaobject {
          type
          label: field(key: "label") {
            value
          }
          internalUrl: field(key: "internal_url") {
            value
          }
          externalUrl: field(key: "external_url") {
            value
          }
          iconVariant: field(key: "icon_variant") {
            value
          }
        }
      }
    }
  }
`;

export const TEXT_WITH_CTA_FRAGMENT = `#graphql
  fragment TextWithCta on Metaobject {
    id
    type
    title: field(key: "title") {
      value
    }
    description: field(key: "description") {
      value
    }
    cta: field(key: "cta") {
      reference {
        ... on Metaobject {
          type
          label: field(key: "label") {
            value
          }
          internalUrl: field(key: "internal_url") {
            value
          }
          externalUrl: field(key: "external_url") {
            value
          }
          iconVariant: field(key: "icon_variant") {
            value
          }
        }
      }
    }
  }
`;

export const IMAGE_CAROUSEL_FRAGMENT = `#graphql
  fragment ImageCarousel on Metaobject {
    id
    type
    title: field(key: "title") {
      value
    }
    subtitle: field(key: "subtitle") {
      value
    }
    cta: field(key: "cta") {
      reference {
        ... on Metaobject {
          type
          label: field(key: "label") {
            value
          }
          internalUrl: field(key: "internal_url") {
            value
          }
          externalUrl: field(key: "external_url") {
            value
          }
          iconVariant: field(key: "icon_variant") {
            value
          }
        }
      }
    }
    cards: field(key: "cards") {
      references(first: 20) {
        nodes {
          ... on Metaobject {
            title: field(key: "title") {
              value
            }
            description: field(key: "description") {
              value
            }
            mixBlend: field(key: "mix_blend_font") {
              value
            }
            image: field(key: "image") {
              reference {
                ... on MediaImage {
                  image {
                    height
                    width
                    url
                    altText
                  }
                }
              }
            }
            internalUrl: field(key: "internal_url") {
              value
            }
            variant: field(key: "variant") {
              value
            }
            tags: field(key: "tags") {
              value
            }
          }
        }
      }
    }
    mobileLayout: field(key: "mobile_layout") {
      value
    }
  }
`;

export const ACCORDION_FRAGMENT = `#graphql
  fragment Accordion on Metaobject {
    id
    type
    title: field(key: "title") {
      value
    }
    collapsible: field(key: "collapsible") {
      value
    }
    iconVariant: field(key: "icon_variant") {
      value
    }
    numberedContent: field(key: "numbered_content") {
      value
    }
    variant: field(key: "variant") {
      value
    }
    content: field(key: "content") {
      references(first: 20) {
        nodes {
          ... on Metaobject {
            title: field(key: "title") {
              value
            }
            description: field(key: "description") {
              value
            }
          }
        }
      }
    }
  }
`;

export const SCIENCE_HERO_FRAGMENT = `#graphql
  fragment ScienceHero on Metaobject {
    id
    type
    title: field(key: "title") {
      value
    }
    subtitle: field(key: "subtitle") {
      value
    }
    description: field(key: "description") {
      value
    }
    hero_image: field(key: "hero_image") {
      reference {
        ... on MediaImage {
          image {
            height
            width
            url
            altText
          }
        }
      }
    }
  }
`;

export const ACCOUNT_HERO_FRAGMENT = `#graphql
  fragment AccountHero on Metaobject {
    id
    type
    title: field(key: "title") {
      value
    }
    hero_image: field(key: "hero_image") {
      reference {
        ... on MediaImage {
          image {
            height
            width
            url
            altText
          }
        }
      }
    }
  }
`;

export const COMMUNITY_HERO_FRAGMENT = `#graphql
  fragment CommunityHero on Metaobject {
    id
    type
    title: field(key: "title") {
      value
    }
    hero_image: field(key: "hero_image") {
      reference {
        ... on MediaImage {
          image {
            height
            width
            url
            altText
          }
        }
      }
    }
    description: field(key: "description") {
      value
    }
    grid_title: field(key: "grid_title") {
      value
    }
    grid_description: field(key: "grid_description") {
      value
    }
  }
`;

export const HERO_IMAGE_WITH_PRODUCT = `#graphql
  fragment HeroImageWithProduct on Metaobject {
    id
    type
    title: field(key: "title") {
      value
    }
    desktopImage: field(key: "desktop_image") {
      reference {
        ... on MediaImage {
          image {
            height
            width
            url
            altText
          }
        }
      }
    }
    mobileImage: field(key: "mobile_image") {
      reference {
        ... on MediaImage {
          image {
            height
            width
            url
            altText
          }
        }
      }
    }
    featuredProduct: field(key: "featured_product") {
      reference {
        ... on Product {
          id
          title
          description
          productType
          selectedOrFirstAvailableVariant(ignoreUnknownOptions: true) {
            id
            availableForSale
            price {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

export const HERO_FEATURED_PRODUCT_FRAGMENT = `#graphql
  fragment HeroFeaturedProduct on Metaobject {
    id
    type
    platformLogos: field(key: "featured_platforms_logo") {
      references(first: 5) {
        nodes {
          ... on MediaImage {
            image {
              height
              width
              url
              altText
            }
          }
        }
      }
    }
    title: field(key: "title") {
      value
    }
    featuredProduct: field(key: "featured_product") {
      reference {
        ... on Product {
          id
          handle
          title
          description
          productType
          featuredImage {
            altText
            id
            url
            height
            width
          }
          selectedOrFirstAvailableVariant(ignoreUnknownOptions: true) {
            id
            availableForSale
          }
        }
      }
    }
    desktopImage: field(key: "desktop_image") {
      reference {
        ... on MediaImage {
          image {
            height
            width
            url
            altText
          }
        }
      }
    }
    mobileImage: field(key: "mobile_image") {
      reference {
        ... on MediaImage {
          image {
            height
            width
            url
            altText
          }
        }
      }
    }
  }
`;

export const GALLERY_IMAGE_CARD_FRAGMENT = `#graphql
  fragment GalleryImageCard on Metaobject {
    id
    type
    shape: field(key: "shape") {
      value
    }
    desktopImage: field(key: "desktop_image") {
      reference {
        ... on MediaImage {
          image {
            height
            width
            url
            altText
          }
        }
      }
    }
    mobileImage: field(key: "mobile_image") {
      reference {
        ... on MediaImage {
          image {
            height
            width
            url
            altText
          }
        }
      }
    }
  }
`;

export const FOUNDER_CARD_FRAGMENT = `#graphql
  fragment FounderCard on Metaobject {
    id
    type
    title: field(key: "title") {
      value
    }
    description: field(key: "description") {
      value
    }
    image: field(key: "image") {
      reference {
        ... on MediaImage {
          image {
            height
            width
            url
            altText
          }
        }
      }
    }
    # TODO: Article is only available from version 2025-10
    # dialogContent: field(key: "dialog_content") {
    #   reference {
    #     ... on Article {
    #       id
    #       title
    #       handle
    #       contentHtml
    #     }
    #   }
    # }
  }
`;

export const PRODUCT_ENDORSEMENT_CARD_FRAGMENT = `#graphql
  fragment ProductEndorsementCard on Metaobject {
    id
    type
    description: field(key: "description") {
      value
    }
    name: field(key: "name") {
      value
    }
    position: field(key: "position") {
      value
    }
    image: field(key: "image") {
      reference {
        ... on MediaImage {
          image {
            height
            width
            url
            altText
          }
        }
      }
    }
  }
`;

export const CUSTOM_MENU_ITEM_FRAGMENT = `#graphql
  fragment CustomMenuItem on Metaobject {
    id
    type
    label: field(key: "label") {
      value
    }
    internalUrl: field(key: "internal_url") {
      value
    }
    externalUrl: field(key: "external_url") {
      value
    }
    icon: field(key: "icon") {
      reference {
        ... on MediaImage {
          image {
            height
            width
            url
            altText
          }
        }
      }
    }
  }
`;

export const FOOTER_MENU_GROUP_FRAGMENT = `#graphql
  ${CUSTOM_MENU_ITEM_FRAGMENT}
  
  fragment FooterMenuGroup on Metaobject {
    id
    type
    title: field(key: "title") {  
      value
    }
    items: field(key: "items") {
      references(first: 10) {
        nodes {
          ...CustomMenuItem
        }
      } 
    }
  }
`;

export const HERO_IMAGE_MULTI_TEXT_FRAGMENT = `#graphql
fragment HeroImageMultiText on Metaobject {
  id
  type

  background_image: field(key: "background_image") {
    reference {
      ... on MediaImage {
        image {
          url
          altText
        }
      }
    }
  }

  enable_overlay: field(key: "enable_overlay") {
    value
  }
  overlay_opacity: field(key: "overlay_opacity") {
    value
  }

  logo: field(key: "logo") {
    references(first: 10) {
      nodes {
        ... on Metaobject {
          image: field(key: "image") {
            reference {
              ... on MediaImage {
                image {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  }

  texts: field(key: "texts") {
    references(first: 10) {
      nodes {
        ... on Metaobject {
          text: field(key: "text") { value }
          position: field(key: "position") { value }
          font_size: field(key: "font_size") { value }
          font_weight: field(key: "font_weight") { value }
          text_color: field(key: "text_color") { value }
          tag: field(key: "tag") { value }
          label: field(key: "label") { value }
          listing: field(key: "listing") { value }
        }
      }
    }
  }
}
`;

export const TEXT_BLOCK_FRAGMENT = `#graphql
fragment TextBlock on Metaobject {
  id
  type
  label: field(key: "label") {
    value
  }
  description: field(key: "description") {
    value
  }
  header: field(key: "header") {
    value
  }
  listing: field(key: "listing") {
    value
  }
  footer: field(key: "footer") {
    value
  }
}
`;

export const GALLERY_ROWS_FRAGMENT = `#graphql
fragment GalleryRows on Metaobject {
  id
  type

  image: field(key: "image") {
    reference {
      ... on MediaImage {
        image {
          url
          altText
        }
      }
    }
  }

  title: field(key: "title") {
    value
  }
  label: field(key: "label") {
    value
  }
}
`;

export const STORE_OUTLET_FRAGMENT = `#graphql
fragment StoreOutlet on Metaobject {
  id
  type
  area: field(key: "area") {
    value
  }
  name: field(key: "name") {
    value
  }
  map_url: field(key: "map_url") {
    value
  }
  address: field(key: "address") {
    value
  }
}
`;

export const STORE_LOCATION_FRAGMENT = `#graphql
${STORE_OUTLET_FRAGMENT}

fragment StoreLocation on Metaobject {
  id
  type
  store_name: field(key: "store_name") {
    value
  }
  store_logo: field(key: "store_logo") {
    reference {
      ... on MediaImage {
        image {
          url
          altText
        }
      }
    }
  }
  more_than_1_location: field(key: "more_than_1_location") {
    value
  }
  address: field(key: "address") {
    value
  }
  map_url: field(key: "map_url") {
    value
  }
  outlets: field(key: "outlets") {
    references(first: 50) {
      nodes {
        ... on Metaobject {
          ...StoreOutlet
        }
      }
    }
  }
}
`;

export const STORE_LOCATOR_HERO_FRAGMENT = `#graphql
fragment StoreLocatorHero on Metaobject {
  id
  type
  hero_header: field(key: "hero_header") {
    value
  }
  hero_text_position: field(key: "hero_text_position") {
    value
  }
  hero_text_color: field(key: "hero_text_color") {
    value
  }
  hero_image: field(key: "hero_image") {
    reference {
      ... on MediaImage {
        image {
          height
          width
          url
          altText
        }
      }
    }
  }
}
`;

export const STORE_TYPE_FRAGMENT = `#graphql
${STORE_LOCATION_FRAGMENT}

fragment StoreType on Metaobject {
  id
  type
  type_name: field(key: "type_name") {
    value
  }
  store_list: field(key: "store_list") {
    references(first: 50) {
      nodes {
        ... on Metaobject {
          ...StoreLocation
        }
      }
    }
  }
}
`;

export const BANNER_STEPS_FRAGMENT = `#graphql
fragment BannerSteps on Metaobject {
  id
  type
  title: field(key: "title") {
    value
  }
  title_position: field(key: "title_position") {
    value
  }
  footer: field(key: "footer") {
    value
  }
  footer_position: field(key: "footer_position") {
    value
  }
  position: field(key: "position") {
    value
  }
  text_color: field(key: "text_color") {
    value
  }
  tag: field(key: "tag") {
    value
  }
  background_image: field(key: "background_image") {
    reference {
      ... on MediaImage {
        image {
          url
          altText
        }
      }
    }
  }
  steps: field(key: "steps") {
    references(first: 10) {
      nodes {
        ... on Metaobject {
          step: field(key: "step") { value }
          step_text_color: field(key: "step_text_color") { value }
          step_body_color: field(key: "step_body_color") { value }
          description: field(key: "description") { value }
          description_text_color: field(key: "description_text_color") { value }
          description_body_color: field(key: "description_body_color") { value }
        }
      }
    }
  }

}
`;



export const CAROUSEL_FRAGMENT = `#graphql
fragment Carousel on Metaobject {
  id
  type
  top_heading: field(key: "top_heading") {
    value
  }
  caption: field(key: "caption") {
    value
  }
  header: field(key: "header") {
    value
  }
  label: field(key: "label") {
    value
  }
  layout: field(key: "layout") {
    value
  }
  slides: field(key: "slides") {
    references(first: 20) {
      nodes {
        ... on Metaobject {
          id
          title: field(key: "title") { value }
          show_overlay: field(key: "show_overlay") { value }
          overlay_color: field(key: "overlay_color") { value }
          overlay_opacity: field(key: "overlay_opacity") { value }
          video_title: field(key: "video_title") { value }
          video_label: field(key: "video_label") { value }
          logo: field(key: "logo") {
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
          media: field(key: "media") {
            references(first: 5) {
              nodes {
                __typename
                ... on MediaImage {
                  image {
                    url
                    altText
                    width
                    height
                  }
                }
                ... on Video {
                  previewImage {
                    url
                    altText
                  }
                  sources {
                    url
                    mimeType
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
`;

export const COMPARISON_TABLE_FRAGMENT = `#graphql
fragment ComparisonTable on Metaobject {
  id
  type
  header: field(key: "header") {
    value
  }
  label: field(key: "label") {
    value
  }
  background_image: field(key: "background_image") {
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
  table_header: field(key: "table_header") {
    references(first: 10) {
      nodes {
        ... on Metaobject {
          id
          text: field(key: "text") { value }
          highlight: field(key: "highlight") { value }
          image: field(key: "image") {
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
    }
  }
  rows: field(key: "rows") {
    references(first: 20) {
      nodes {
        ... on Metaobject {
          id
          label: field(key: "label") { value }
          values: field(key: "values") { value }
        }
      }
    }
  }
  footnote: field(key: "footnote") {
    value
  }
  cta: field(key: "cta") {
    reference {
      ... on Metaobject {
        type
        label: field(key: "label") { value }
        internalUrl: field(key: "internal_url") { value }
        externalUrl: field(key: "external_url") { value }
        iconVariant: field(key: "icon_variant") { value }
      }
    }
  }
}
`;
