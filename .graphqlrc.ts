import type {IGraphQLConfig} from 'graphql-config';
import {getSchema, preset} from '@shopify/hydrogen-codegen';

/**
 * GraphQL Config
 * @see https://the-guild.dev/graphql/config/docs/user/usage
 * @type {IGraphQLConfig}
 */
export default {
  projects: {
    default: {
      schema: getSchema('storefront'),
      documents: [
        './*.{ts,tsx,js,jsx}',
        './app/**/*.{ts,tsx,js,jsx}',
        './app/graphql/cms/*.{ts,tsx,js,jsx}',
        '!./app/graphql/customer-account/*.{ts,tsx,js,jsx}',
        '!./app/graphql/admin/*.{ts,tsx,js,jsx}',
      ],
      extensions: {
        codegen: {
          generates: {
            './types/storefrontapi.generated.d.ts': {
              preset,
            },
          },
        },
      },
    },
    customer: {
      schema: getSchema('customer-account'),
      documents: ['./app/graphql/customer-account/*.{ts,tsx,js,jsx}'],
      extensions: {
        codegen: {
          generates: {
            './types/customer-accountapi.generated.d.ts': {
              preset,
            },
          },
        },
      },
    },
    admin: {
      schema: 'https://shopify.dev/admin-graphql-direct-proxy/2026-07',
      documents: ['./app/graphql/admin/*.{ts,tsx,js,jsx}'],
      extensions: {
        codegen: {
          generates: {
            // './types/admin.schema.json': {
            //   plugins: ['introspection'],
            //   config: {minify: true},
            // },
            // './types/admin.types.d.ts': {
            //   plugins: ['typescript'],
            // },
            './types/adminapi.generated.d.ts': {
              preset,
            },
          },
        },
      },
    },
    // Add your own GraphQL projects here for CMS, Shopify Admin API, etc.
  },
} as IGraphQLConfig;
