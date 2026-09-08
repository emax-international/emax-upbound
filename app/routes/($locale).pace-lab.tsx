import { MetaFunction, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData } from 'react-router';
import { LAB_PAGE_CMS_QUERY } from '~/graphql/cms/LabPageQuery';
import ModuleRenderer from '~/components/cms/ModuleRenderer';
import HeroAccordion from '~/components/cms/HeroAccordion';
import HeroImageMultiText from '~/components/cms/HeroImageMultiText';
import TextBlock from '~/components/cms/TextBlock';
import BannerSteps from '~/components/cms/BannerSteps';
import GalleryRows from '~/components/cms/GalleryRows';
import Gallery from '~/components/Gallery';
import CtaButton from '~/components/CtaButton';


export const meta: MetaFunction = () => {
    return [{ title: 'Upbound | Pace Lab' }];
};

export async function loader(args: LoaderFunctionArgs) {
    // Start fetching non-critical data without blocking time to first byte
    const deferredData = loadDeferredData(args);

    // Await the critical data required to render initial state of the page
    const criticalData = await loadCriticalData(args);

    return {
        ...deferredData,
        ...criticalData,
    };
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({ context }: LoaderFunctionArgs) {
    const { paceLabPage } = await context.storefront.query(LAB_PAGE_CMS_QUERY);

    // If the page is unpublished/draft (or doesn't exist), the Storefront API
    // returns null. Return a 404 instead of rendering the page with fallback values.
    if (!paceLabPage) {
        throw new Response('Not found', { status: 404 });
    }

    return {
        paceLabPage,
    };
}

function loadDeferredData({ context }: LoaderFunctionArgs) {
    // const recommendedProducts = context.storefront
    //   .query(RECOMMENDED_PRODUCTS_QUERY)
    //   .catch((error) => {
    //     // Log query errors, but don't throw them so the page can still render
    //     console.error(error);
    //     return null;
    //   });

    // return {
    //   recommendedProducts,
    // };
    return {};
}



export default function LabPage() {
    const { paceLabPage } = useLoaderData<typeof loader>();

    const questionModules = paceLabPage?.question_title?.reference
        ? [paceLabPage?.question_title.reference]
        : [];

    const galleryRows =
        paceLabPage?.schedule?.references?.nodes?.map((row) => ({
            label: row.label?.value,
            title: row.title?.value,
            image: row.image?.reference?.image
                ? {
                    url: row.image.reference.image.url,
                    alt: row.image.reference.image.altText ?? '',
                }
                : undefined,
        })) ?? [];

    return (

        <div className="paceLab font-(--font-whyte)">

            {/* <header className="text-center my-8">
                {paceLabPage?.header_feature?.value && (
                    <p className="mt-2 text-xl">{paceLabPage.header_feature.value}</p>
                )}
            </header> */}

            {/* <ModuleRenderer modules={paceLabPage?.hero_pace_lab?.references?.nodes ?? []} /> */}

            {paceLabPage?.hero_with_text?.reference && (
                <HeroImageMultiText reference={paceLabPage?.hero_with_text.reference} />
            )}

            <div className='text-center p-10 md:p-20 bg-[#F2F2F2]'>
                {paceLabPage?.text?.reference && (
                    <TextBlock reference={paceLabPage.text.reference} />
                )}
            </div>

            {paceLabPage?.banner?.reference && (
                <HeroImageMultiText reference={paceLabPage?.banner.reference} />
            )}

            {/* <ModuleRenderer modules={paceLabPage?.banner?.references?.nodes ?? []} /> */}

            <div className='text-center p-10 md:p-20 bg-[#F2F2F2]'>
                {paceLabPage?.description?.reference && (
                    <TextBlock reference={paceLabPage.description.reference} />
                )}
            </div>

            <div>
                {paceLabPage?.steps?.reference && (
                <BannerSteps reference={paceLabPage?.steps.reference} />
            )}
            </div>


            <div className='text-center p-10 md:p-20'>
                <h1 className="typo-header text-center">{paceLabPage?.header_feature?.value}</h1>
            </div>

            <GalleryRows reference={galleryRows} />


            <div className='text-center p-10 md:p-20'>
                <h1 className="typo-header mb-12 text-center">Community Proof</h1>
                <p className="mt-2 text-xl md:text-2xl">Loved by runners and powered by a  growing community that values consistency and progress, both on the track and in how they show up for each other.</p>

                <Gallery reference={paceLabPage?.proof?.references?.nodes} />

            </div>

            <div className='text-center p-10 md:p-20'>
                <a
                    href={paceLabPage?.sign_up?.reference?.cta?.reference?.internalUrl?.value || '#'}
                    target="_blank" // optional: opens in new tab
                    rel="noopener noreferrer"
                >
                    <button className="text-xl px-6 py-3 bg-[#b9db9b] text-black rounded-full 
                    hover:bg-black hover:text-white transition duration-300 uppercas font-semibold">
                        {paceLabPage?.sign_up?.reference?.cta?.reference?.label?.value || 'Sign Up Here'}
                    </button>
                </a>


                <p className="mt-4 text-xl">
                    {paceLabPage?.sign_up?.reference?.description?.value || 'Join Upbound Pace Lab'}
                </p>
                <p className="mt-1 text-2xl font-bold">
                    {paceLabPage?.sign_up?.reference?.title?.value || '26 Jan Ciphr Performance'}
                </p>

                <hr className="w-full mt-10 border-t border-black"></hr>
            </div>



            <div >
                <h1 className="typo-header mb-12 text-center">Any questions? We got you</h1>
                <ModuleRenderer
                    modules={questionModules}
                    accordionClassName="mb-6 mt-0"
                />
            </div>

            {/* {joinModules && (
                <HeroAccordion reference={joinModules} className="mt-0" />
            )} */}

            <ModuleRenderer modules={paceLabPage?.modules?.references?.nodes ?? []} />
        </div>
    );
}
