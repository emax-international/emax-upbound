import {Image} from '@shopify/hydrogen';
import type {Image as ImageType} from '@shopify/hydrogen/storefront-api-types';
import {AlertCircle, CheckCircle, Instagram, Loader2} from 'lucide-react';
import {useEffect} from 'react';
import {useFetcher} from 'react-router';
import type {ClubFooterContentFragment} from 'types/storefrontapi.generated';
import {useAbEvent} from '~/lib/abTracking';
import {cn} from '~/lib/utils';
import TextField from './TextField';

const DEFAULT_INSTAGRAM_URL = 'https://www.instagram.com/stayupbound/';

/**
 * Landing-page footer: "Join the Upbound Club" newsletter signup on a dark
 * image banner. Posts to the same endpoint as the site footer's form.
 * The copy comes from a `club_footer` entry (`content`); any empty field
 * falls back to the default text. `email_subscription` = false hides the
 * signup form and its consent line.
 */
export default function ClubFooter({
  content,
  image,
  logo,
}: {
  content?: ClubFooterContentFragment | null;
  image?: Pick<ImageType, 'url' | 'altText' | 'width' | 'height'> | null;
  /** Optional logo under the Instagram link */
  logo?: {url: string; alt?: string | null} | null;
}) {
  const text = (field?: {value?: string | null} | null) =>
    field?.value?.trim() || null;
  // Email signup form + consent line; shown unless switched off
  const showEmailForm = content?.emailSubscription?.value !== 'false';
  const instagramHandle = text(content?.instagramHandle) ?? '@stayupbound';
  const instagramUrl = text(content?.instagramUrl) ?? DEFAULT_INSTAGRAM_URL;

  const pushAbEvent = useAbEvent();
  const fetcher = useFetcher<{success?: boolean; error?: string}>();
  const isLoading = fetcher.state !== 'idle';
  const isSuccess = fetcher.state === 'idle' && fetcher.data?.success;
  const isError = fetcher.state === 'idle' && fetcher.data?.error;

  // Signups are tracked only once the subscription succeeds; attempts
  // (button clicks / submits) are a separate event
  useEffect(() => {
    if (isSuccess)
      pushAbEvent('newsletter_signup', {signup_position: 'footer'});
  }, [isSuccess, pushAbEvent]);

  return (
    <footer>
      {/* From tablet up the banner takes the image's own ratio so the whole
          image shows; it only grows (and crops) if the text needs more room */}
      <div
        className="relative overflow-clip bg-black text-white md:aspect-(--image-ratio) flex flex-col justify-center"
        style={
          image?.width && image?.height
            ? ({
                '--image-ratio': `${image.width} / ${image.height}`,
              } as React.CSSProperties)
            : undefined
        }
      >
        {image && (
          <Image
            data={image}
            sizes="100vw"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        )}
        {/* Keeps the text readable on any background */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Fills the banner: the signup block is centred in the space above,
            the logo sits at the bottom */}
        <div
          className={cn(
            'relative flex-1 flex flex-col items-center text-center px-6 pt-14 md:pt-20',
            logo ? 'pb-6 md:pb-8' : 'pb-14 md:pb-20',
          )}
        >
          <div className="flex-1 w-full flex flex-col items-center justify-center">
            {/* Rich text: bold words get the heavier weight */}
            {text(content?.heading) ? (
              <TextField
                value={content?.heading?.value}
                className="[&_p]:typo-h2 [&_p]:font-extralight [&_strong]:font-normal"
              />
            ) : (
              <h2 className="typo-h2 font-extralight">
                Join the <span className="font-normal">Upbound Club</span>
              </h2>
            )}

            {showEmailForm && (
              <fetcher.Form
                method="POST"
                action="/newsletter/subscribe"
                className="w-full max-w-[560px] mt-6"
                onSubmit={() =>
                  pushAbEvent('newsletter_submit', {signup_position: 'footer'})
                }
              >
                {!isSuccess ? (
                  <div className="flex">
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      required
                      disabled={isLoading}
                      className="flex-1 min-w-0 min-h-11 px-4 bg-white text-black typo-caption-responsive-uppercase placeholder:text-mid-grey"
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="shrink-0 flex items-center gap-2 min-h-11 px-5 bg-mint text-black typo-caption-responsive-uppercase cursor-pointer disabled:opacity-70"
                    >
                      {isLoading && <Loader2 className="size-4 animate-spin" />}
                      {isLoading ? 'Submitting...' : 'Subscribe'}
                    </button>
                  </div>
                ) : (
                  <p className="flex items-center justify-center gap-2 min-h-11 px-4 bg-white text-black typo-caption-responsive">
                    <CheckCircle className="size-4 text-green-700" />
                    Thank you for subscribing!
                  </p>
                )}

                {isError && (
                  <p className="flex items-center justify-center gap-2 mt-2 text-orange typo-caption-responsive">
                    <AlertCircle className="size-3" />
                    {fetcher.data?.error ||
                      'Subscription failed. Please try again.'}
                  </p>
                )}
              </fetcher.Form>
            )}

            {text(content?.description) ? (
              <TextField
                value={content?.description?.value}
                className="mt-5 max-w-[560px] [&_p]:typo-caption-responsive [&_p]:text-sm! md:[&_p]:text-base! [&_p:not(:first-child)]:mt-2"
              />
            ) : (
              <p className="mt-5 max-w-[560px] typo-caption-responsive text-sm! md:text-base!">
                Get FREE shipping on your first order (West Malaysia only).
                Plus, be the first to know about our events, partnerships, and
                next product drop.
              </p>
            )}
            {/* One line from tablet up; wraps on small phones */}
            {showEmailForm &&
              (text(content?.consentText) ? (
                <TextField
                  value={content?.consentText?.value}
                  className="mt-3 md:[&_p]:whitespace-nowrap [&_p]:typo-caption-responsive [&_p]:text-white/70 [&_p]:underline [&_p]:underline-offset-2"
                />
              ) : (
                <p className="mt-3 md:whitespace-nowrap typo-caption-responsive text-white/70 underline underline-offset-2">
                  By submitting this form, you agree to receive email marketing
                  from Upbound® to your email.
                </p>
              ))}

            <a
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-10 md:mt-14 flex items-center gap-2 typo-caption-responsive-uppercase hover:text-mint transition-colors"
            >
              <Instagram className="size-4" />
              {instagramHandle}
            </a>
          </div>

          {logo && (
            // Plain <img> so SVG files work too; height fixed, width follows
            <img
              src={logo.url}
              alt={logo.alt || 'Upbound'}
              loading="lazy"
              className="mt-8 md:mt-10 h-8 md:h-10 w-auto max-w-[240px] object-contain"
            />
          )}
        </div>
      </div>
    </footer>
  );
}
