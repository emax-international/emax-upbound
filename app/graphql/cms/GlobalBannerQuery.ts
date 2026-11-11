export const GLOBAL_BANNER_CMS_QUERY = `#graphql
  query GlobalBannerCms {
    globalBanners: metaobjects(type: "global_banner", first: 10) {
      nodes {
        id
        handle
        display: field(key: "display") {
          value
        }
        content: field(key: "content") {
          value
        }
        # Optional colour fields (Shopify "Color" type); empty = default mint bar
        backgroundColor: field(key: "background_color") {
          value
        }
        textColor: field(key: "text_color") {
          value
        }
      }
    }
  }
` as const;
