import {type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Suspense} from 'react';
import {Await, useLoaderData, type MetaFunction} from 'react-router';
import {
  HOME_PAGE_ARTICLES_QUERY,
  NEW_HOME_PAGE_QUERY,
} from '~/graphql/cms/NewHomePageQuery';
import HomeHero from '~/components/home/HomeHero';
import InfoCard from '~/components/home/InfoCard';
import ProductCards from '~/components/home/ProductCards';
import PeopleCarousel from '~/components/home/PeopleCarousel';
import MediaCarousel from '~/components/cms/MediaCarousel';
import ClubFooter, {footerLogoOf} from '~/components/cms/ClubFooter';
import type {RouteHandle} from '~/components/PageLayout';

export const meta: MetaFunction = () => {
  return [{title: 'Upbound | Home'}];
};

/** The "Join the Upbound Club" footer replaces the site footer when set. */
export const handle: RouteHandle = {
  hideFooter: (data) =>
    !!(data as {newHomePage?: {footer?: {reference?: unknown} | null} | null})
      ?.newHomePage?.footer?.reference,
};

/**
 * The homepage, built from the `homepage` metaobject entry "new-homepage":
 * hero, "Hydrate up" product cards, brands carousel, info card (founder),
 * "The People Who Choose Upbound" and the Upbound Club footer.
 */
export async function loader({context}: LoaderFunctionArgs) {
  const {newHomePage} = await context.storefront.query(NEW_HOME_PAGE_QUERY);

  // "The People Who Choose Upbound" is below the fold: started here (it
  // needs the article ids) but not awaited, so it streams in after.
  const articleIds = (newHomePage?.blog?.references?.nodes ?? []).flatMap(
    (node) => ('id' in node && node.id ? [node.id] : []),
  );
  const articles =
    articleIds.length > 0
      ? context.storefront
          .query(HOME_PAGE_ARTICLES_QUERY, {variables: {ids: articleIds}})
          .then(({nodes}) =>
            nodes.flatMap((node) => (node && 'handle' in node ? [node] : [])),
          )
          .catch((error) => {
            console.error(error);
            return [];
          })
      : Promise.resolve([]);

  return {newHomePage, articles};
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  const {newHomePage} = data;
  const footer = newHomePage?.footer?.reference;

  return (
    <div className="home">
      {newHomePage?.hero?.reference && (
        <HomeHero reference={newHomePage.hero.reference} />
      )}
      <ProductCards cards={newHomePage?.productList?.references?.nodes ?? []} />
      {newHomePage?.gallery?.reference && (
        <MediaCarousel reference={newHomePage.gallery.reference} />
      )}
      {newHomePage?.info?.reference && (
        <InfoCard reference={newHomePage.info.reference} />
      )}
      <Suspense fallback={null}>
        <Await resolve={data.articles}>
          {(articles) => <PeopleCarousel articles={articles} />}
        </Await>
      </Suspense>
      {footer && (
        <ClubFooter
          content={footer}
          image={footer.backgroundImage?.reference?.image}
          logo={footerLogoOf(footer.logo?.reference)}
        />
      )}
    </div>
  );
}
