/**
 * A blog article as a card in "The People Who Choose Upbound": the article's
 * title (name), excerpt (role) and featured image.
 */
export const PEOPLE_CARD_FRAGMENT = `#graphql
  fragment PeopleCard on Article {
    id
    handle
    title
    excerpt
    image { url altText width height }
    blog { handle }
  }
` as const;
