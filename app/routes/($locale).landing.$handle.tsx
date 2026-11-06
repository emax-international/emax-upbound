import {type LoaderFunctionArgs, type MetaFunction} from '@shopify/remix-oxygen';
import {useLoaderData} from 'react-router';
import LandingPage from '~/components/LandingPage';
import {
  LANDING_PAGE_TYPE,
  LANDING_ROUTE_HANDLE,
  loadLandingPage,
} from '~/lib/landingPage';

/**
 * Standalone URL for any `landing_page` entry: /landing/<entry handle>.
 * Same layout as the A/B pages (logo + cart header, "Join the Upbound Club"
 * footer). Not part of the A/B test.
 *
 * SEO: once the add-to-cart product shows this entry on its own page
 * (product metafield custom.landing_page → this entry), the canonical URL
 * becomes /products/<product handle> so search engines index that one page
 * instead of two copies. Until then this page is its own canonical.
 */
export const handle = LANDING_ROUTE_HANDLE;

export const meta: MetaFunction<typeof loader> = ({data}) => {
  const page = data?.page;
  const product = page?.productSection?.reference?.product?.reference;
  const canonical =
    product && product.landingPage?.reference?.id === page?.id
      ? `/products/${product.handle}`
      : `/landing/${page?.handle}`;
  return [
    {title: `Upbound | ${page?.title?.value ?? 'Upbound'}`},
    {tagName: 'link', rel: 'canonical', href: canonical},
  ];
};

export async function loader({params, context, request}: LoaderFunctionArgs) {
  const {handle} = params;
  if (!handle) throw new Response('Not found', {status: 404});

  const page = await loadLandingPage(context, request, {
    type: LANDING_PAGE_TYPE,
    handle,
  });
  // Missing or unpublished (draft) entry
  if (!page) throw new Response('Not found', {status: 404});

  return {page};
}

export default function LandingRoute() {
  const {page} = useLoaderData<typeof loader>();
  return <LandingPage page={page} />;
}
