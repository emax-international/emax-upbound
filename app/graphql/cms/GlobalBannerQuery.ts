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
      }
    }
  }
` as const;
