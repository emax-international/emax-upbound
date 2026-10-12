export const adminCustomerCreateMutation = `#graphql
  mutation customerCreate($input: CustomerInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const adminCustomerByEmailQuery = `#graphql
  query customerByEmail($query: String!) {
    customers(first: 1, query: $query) {
      nodes {
        id
        emailMarketingConsent {
          marketingState
        }
      }
    }
  }
`;

export const adminTagsAddMutation = `#graphql
  mutation tagsAdd($id: ID!, $tags: [String!]!) {
    tagsAdd(id: $id, tags: $tags) {
      userErrors {
        field
        message
      }
    }
  }
`;

export const adminCustomerUpdateMarketingMutation = `#graphql
  mutation customerEmailMarketingConsentUpdate(
    $input: CustomerEmailMarketingConsentUpdateInput!
  ) {
    customerEmailMarketingConsentUpdate(input: $input) {
      customer {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`;
