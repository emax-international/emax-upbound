import {createHydrogenContext} from '@shopify/hydrogen';
import {createAdminApiClient} from '@shopify/admin-api-client';
import {AppSession} from '~/lib/session';
import {CART_MUTATE_FRAGMENT, CART_QUERY_FRAGMENT} from '~/lib/fragments';
import {getLocaleFromRequest} from '~/lib/i18n';

/**
 * The context implementation is separate from server.ts
 * so that type can be extracted for AppLoadContext
 * */
export async function createAppLoadContext(
  request: Request,
  env: Env & {
    SHOPIFY_ADMIN_API_ACCESS_TOKEN?: string;
    SHOPIFY_ADMIN_API_VERSION?: string;
  },
  executionContext: ExecutionContext,
) {
  /**
   * Open a cache instance in the worker and a custom session instance.
   */
  if (!env?.SESSION_SECRET) {
    throw new Error('SESSION_SECRET environment variable is not set');
  }

  const waitUntil = executionContext.waitUntil.bind(executionContext);
  const [cache, session] = await Promise.all([
    caches.open('hydrogen'),
    AppSession.init(request, [env.SESSION_SECRET]),
  ]);

  const hydrogenContext = createHydrogenContext({
    env,
    request,
    cache,
    waitUntil,
    session,
    i18n: getLocaleFromRequest(request),
    cart: {
      queryFragment: CART_QUERY_FRAGMENT,
      mutateFragment: CART_MUTATE_FRAGMENT,
    },
  });

  // Initialize the Admin API client if credentials are available
  const adminApiClient =
    env.SHOPIFY_ADMIN_API_ACCESS_TOKEN && env.PUBLIC_STORE_DOMAIN
      ? createAdminApiClient({
          storeDomain: env.PUBLIC_STORE_DOMAIN,
          apiVersion: env.SHOPIFY_ADMIN_API_VERSION || '2023-04',
          accessToken: env.SHOPIFY_ADMIN_API_ACCESS_TOKEN,
        })
      : null;

  return {
    ...hydrogenContext,
    adminApiClient,
    // declare additional Remix loader context
  };
}
