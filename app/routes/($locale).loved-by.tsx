import {
  data,
  type HeadersFunction,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@shopify/remix-oxygen';
import {useLoaderData} from 'react-router';
import AbTestingPage from '~/components/AbTestingPage';
import {loadAbTestingPage, pickAbVariant} from '~/lib/abTestingPage';

/**
 * A/B split URL: each visitor is randomly assigned to one `ab_testing_page`
 * entry and kept on it via a cookie. The variants also have their own URLs
 * (/loved-by-many, /love-by-athletes).
 */
export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: `Upbound | ${data?.page?.title?.value ?? 'Upbound'}`}];
};

export async function loader({request, context}: LoaderFunctionArgs) {
  const {variant, setCookie} = pickAbVariant(request);
  const page = await loadAbTestingPage(context, variant);

  // The response depends on the visitor's cookie, so it must not be shared
  // by a CDN/browser cache.
  const headers = new Headers({'Cache-Control': 'private, no-store'});
  if (setCookie) headers.append('Set-Cookie', setCookie);

  return data({page}, {headers});
}

export const headers: HeadersFunction = ({loaderHeaders}) => loaderHeaders;

export default function LovedByPage() {
  const {page} = useLoaderData<typeof loader>();
  return <AbTestingPage page={page} source="split" />;
}
