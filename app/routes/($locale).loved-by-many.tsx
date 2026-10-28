import {type LoaderFunctionArgs, type MetaFunction} from '@shopify/remix-oxygen';
import {useLoaderData} from 'react-router';
import AbTestingPage from '~/components/AbTestingPage';
import {loadAbTestingPage} from '~/lib/abTestingPage';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: `Upbound | ${data?.page?.title?.value ?? 'Upbound'}`}];
};

export async function loader({context}: LoaderFunctionArgs) {
  const page = await loadAbTestingPage(context, 'loved-by-many');
  return {page};
}

export default function Page() {
  const {page} = useLoaderData<typeof loader>();
  return <AbTestingPage page={page} source="direct" />;
}
