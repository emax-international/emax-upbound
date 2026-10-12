/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import type * as StorefrontAPI from '@shopify/hydrogen/storefront-api-types';

export type CustomerCartDiscountsQueryVariables = StorefrontAPI.Exact<{
  query: StorefrontAPI.Scalars['String']['input'];
}>;

export type CustomerCartDiscountsQuery = {
  discountNodes: {
    nodes: Array<
      Pick<StorefrontAPI.DiscountNode, 'id'> & {
        discount:
          | {
              __typename:
                | 'DiscountAutomaticApp'
                | 'DiscountAutomaticBasic'
                | 'DiscountAutomaticBxgy'
                | 'DiscountAutomaticFreeShipping'
                | 'DiscountCodeApp';
            }
          | ({__typename: 'DiscountCodeBasic'} & Pick<
              StorefrontAPI.DiscountCodeBasic,
              'title' | 'summary' | 'status'
            > & {
                codes: {
                  nodes: Array<Pick<StorefrontAPI.DiscountRedeemCode, 'code'>>;
                };
              })
          | ({__typename: 'DiscountCodeBxgy'} & Pick<
              StorefrontAPI.DiscountCodeBxgy,
              'title' | 'summary' | 'status'
            > & {
                codes: {
                  nodes: Array<Pick<StorefrontAPI.DiscountRedeemCode, 'code'>>;
                };
              })
          | ({__typename: 'DiscountCodeFreeShipping'} & Pick<
              StorefrontAPI.DiscountCodeFreeShipping,
              'title' | 'summary' | 'status'
            > & {
                codes: {
                  nodes: Array<Pick<StorefrontAPI.DiscountRedeemCode, 'code'>>;
                };
              });
      }
    >;
  };
};

export type CustomerCreateMutationVariables = StorefrontAPI.Exact<{
  input: StorefrontAPI.CustomerInput;
}>;

export type CustomerCreateMutation = {
  customerCreate?: StorefrontAPI.Maybe<{
    customer?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Customer, 'id' | 'email'>
    >;
    userErrors: Array<Pick<StorefrontAPI.UserError, 'field' | 'message'>>;
  }>;
};

export type CustomerByEmailQueryVariables = StorefrontAPI.Exact<{
  query: StorefrontAPI.Scalars['String']['input'];
}>;

export type CustomerByEmailQuery = {
  customers: {
    nodes: Array<
      Pick<StorefrontAPI.Customer, 'id'> & {
        emailMarketingConsent?: StorefrontAPI.Maybe<
          Pick<
            StorefrontAPI.CustomerEmailMarketingConsentState,
            'marketingState'
          >
        >;
      }
    >;
  };
};

export type TagsAddMutationVariables = StorefrontAPI.Exact<{
  id: StorefrontAPI.Scalars['ID']['input'];
  tags:
    | Array<StorefrontAPI.Scalars['String']['input']>
    | StorefrontAPI.Scalars['String']['input'];
}>;

export type TagsAddMutation = {
  tagsAdd?: StorefrontAPI.Maybe<{
    userErrors: Array<Pick<StorefrontAPI.UserError, 'field' | 'message'>>;
  }>;
};

export type CustomerEmailMarketingConsentUpdateMutationVariables =
  StorefrontAPI.Exact<{
    input: StorefrontAPI.CustomerEmailMarketingConsentUpdateInput;
  }>;

export type CustomerEmailMarketingConsentUpdateMutation = {
  customerEmailMarketingConsentUpdate?: StorefrontAPI.Maybe<{
    customer?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Customer, 'id'>>;
    userErrors: Array<
      Pick<
        StorefrontAPI.CustomerEmailMarketingConsentUpdateUserError,
        'field' | 'message'
      >
    >;
  }>;
};

interface GeneratedQueryTypes {
  '#graphql\n  query CustomerCartDiscounts($query: String!) {\n    discountNodes(first: 20, query: $query) {\n      nodes {\n        id\n        discount {\n          __typename\n          ... on DiscountCodeBasic {\n            title\n            summary\n            status\n            codes(first: 1) {\n              nodes {\n                code\n              }\n            }\n          }\n          ... on DiscountCodeFreeShipping {\n            title\n            summary\n            status\n            codes(first: 1) {\n              nodes {\n                code\n              }\n            }\n          }\n          ... on DiscountCodeBxgy {\n            title\n            summary\n            status\n            codes(first: 1) {\n              nodes {\n                code\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n': {
    return: CustomerCartDiscountsQuery;
    variables: CustomerCartDiscountsQueryVariables;
  };
  '#graphql\n  query customerByEmail($query: String!) {\n    customers(first: 1, query: $query) {\n      nodes {\n        id\n        emailMarketingConsent {\n          marketingState\n        }\n      }\n    }\n  }\n': {
    return: CustomerByEmailQuery;
    variables: CustomerByEmailQueryVariables;
  };
}

interface GeneratedMutationTypes {
  '#graphql\n  mutation customerCreate($input: CustomerInput!) {\n    customerCreate(input: $input) {\n      customer {\n        id\n        email\n      }\n      userErrors {\n        field\n        message\n      }\n    }\n  }\n': {
    return: CustomerCreateMutation;
    variables: CustomerCreateMutationVariables;
  };
  '#graphql\n  mutation tagsAdd($id: ID!, $tags: [String!]!) {\n    tagsAdd(id: $id, tags: $tags) {\n      userErrors {\n        field\n        message\n      }\n    }\n  }\n': {
    return: TagsAddMutation;
    variables: TagsAddMutationVariables;
  };
  '#graphql\n  mutation customerEmailMarketingConsentUpdate(\n    $input: CustomerEmailMarketingConsentUpdateInput!\n  ) {\n    customerEmailMarketingConsentUpdate(input: $input) {\n      customer {\n        id\n      }\n      userErrors {\n        field\n        message\n      }\n    }\n  }\n': {
    return: CustomerEmailMarketingConsentUpdateMutation;
    variables: CustomerEmailMarketingConsentUpdateMutationVariables;
  };
}

declare module '@shopify/hydrogen' {
  interface StorefrontQueries extends GeneratedQueryTypes {}
  interface StorefrontMutations extends GeneratedMutationTypes {}
}
