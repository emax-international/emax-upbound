import {
  data,
  type HeadersFunction,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@shopify/remix-oxygen';
import {useLoaderData} from 'react-router';
import LandingPage from '~/components/LandingPage';
import {
  AB_ROUTE_HANDLE,
  loadAbTestingPage,
  pickAbVariant,
} from '~/lib/abTestingPage';

export const handle = AB_ROUTE_HANDLE;

/**
 * A/B split URL: each visitor is randomly assigned to one `ab_testing_page`
 * entry and kept on it via a cookie. The variants also have their own URLs
 * (/loved-by-many, /loved-by-athletes).
 */
export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: `Upbound | ${data?.page?.title?.value ?? 'Upbound'}`}];
};

export async function loader({request, context}: LoaderFunctionArgs) {
  const {variant, setCookie} = pickAbVariant(request);
  const page = await loadAbTestingPage(context, variant, request);

  // The response depends on the visitor's cookie, so it must not be shared
  // by a CDN/browser cache.
  const headers = new Headers({'Cache-Control': 'private, no-store'});
  if (setCookie) headers.append('Set-Cookie', setCookie);

  return data({page}, {headers});
}

export const headers: HeadersFunction = ({loaderHeaders}) => loaderHeaders;

export default function LovedByPage() {
  const {page} = useLoaderData<typeof loader>();
  return <LandingPage page={page} source="split" />;
}
