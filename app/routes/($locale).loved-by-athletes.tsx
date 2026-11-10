import {type LoaderFunctionArgs, type MetaFunction} from '@shopify/remix-oxygen';
import {useLoaderData} from 'react-router';
import LandingPage from '~/components/LandingPage';
import {AB_ROUTE_HANDLE, loadAbTestingPage} from '~/lib/abTestingPage';

export const handle = AB_ROUTE_HANDLE;

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: `Upbound | ${data?.page?.title?.value ?? 'Upbound'}`}];
};

export async function loader({context, request}: LoaderFunctionArgs) {
  const page = await loadAbTestingPage(context, 'loved-by-athletes', request);
  return {page};
}

export default function Page() {
  const {page} = useLoaderData<typeof loader>();
  return <LandingPage page={page} source="direct" />;
}
