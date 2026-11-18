/** `info_card` metaobject: image + rich-text content, image on the left or right. */
export const INFO_CARD_FRAGMENT = `#graphql
  fragment InfoCard on Metaobject {
    id
    type
    title: field(key: "title") {
      value
    }
    content: field(key: "content") {
      value
    }
    imagePosition: field(key: "image_position") {
      value
    }
    # Optional portrait image for mobile (fades into the text below)
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
` as const;
