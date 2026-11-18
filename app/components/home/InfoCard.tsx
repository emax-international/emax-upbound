import {Image} from '@shopify/hydrogen';
import type {InfoCardFragment} from 'types/storefrontapi.generated';
import TextField from '~/components/cms/TextField';
import {cn} from '~/lib/utils';

/**
 * Image + text section from an `info_card` entry (e.g. "How Upbound was
 * born"). The rich-text `content` holds the whole text column: a short intro
 * paragraph, a heading (line breaks kept) and the body. `image_position`
 * "Right" puts the image on the right on desktop; anything else is left.
 * On mobile the image always comes first. `title` is only an admin label.
 */
/** Mobile photo: fully visible down to half, gone by 90% of its height. */
const FADE_OUT_BOTTOM =
  'linear-gradient(to bottom, #000 50%, rgb(0 0 0 / 0.35) 75%, transparent 90%)';

export default function InfoCard({reference}: {reference: InfoCardFragment}) {
  const image = reference.image?.reference?.image;
  const mobileImage = reference.mobileImage?.reference?.image ?? image;
  const imageRight =
    reference.imagePosition?.value?.trim().toLowerCase() === 'right';

  return (
    // Full width (no max-w-content) so the image runs to the screen edge
    <section className="bg-white">
      <div className="grid md:grid-cols-2 md:items-center">
        {/* Mobile: `mobile_image` (else the desktop one) edge to edge,
            fading to white into the text below */}
        {mobileImage && (
          <div className="md:hidden pt-10">
            <div
              className="relative overflow-hidden"
              style={
                mobileImage.width && mobileImage.height
                  ? {
                      aspectRatio: `${mobileImage.width} / ${mobileImage.height}`,
                    }
                  : undefined
              }
            >
              {/* The photo itself fades out (CSS mask) onto the white
                  background. A white overlay on top left a 1px grey line
                  at the box's sub-pixel edges, where the dark photo shows
                  through the overlay's anti-aliased edge. */}
              <Image
                data={mobileImage}
                sizes="100vw"
                className="block w-full h-full object-cover"
                style={{
                  maskImage: FADE_OUT_BOTTOM,
                  WebkitMaskImage: FADE_OUT_BOTTOM,
                }}
              />
            </div>
          </div>
        )}

        {image && (
          <div
            className={cn(
              // Desktop. Image's own shape (no cropping); the corners on the
              // text side are rounded
              'hidden md:block overflow-hidden',
              imageRight
                ? 'md:order-last md:rounded-l-3xl'
                : 'md:rounded-r-3xl',
            )}
            style={
              image.width && image.height
                ? {aspectRatio: `${image.width} / ${image.height}`}
                : undefined
            }
          >
            <Image
              data={image}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <TextField
          value={reference.content?.value}
          className={cn(
            // Mobile: little top padding, the image's fade is the gap
            'pt-4 pb-10 md:py-16 px-15 md:px-16 lg:px-20 max-w-155 text-black',
            // Intro line + body: 16px mobile / 18px desktop (base p is 14px)
            '[&_p]:text-base md:[&_p]:text-lg [&_strong]:font-medium [&_strong]:text-black',
            '[&_:is(h1,h2,h3)]:typo-header [&_:is(h1,h2,h3)]:font-semibold',
            '[&_:is(h1,h2,h3)]:uppercase [&_:is(h1,h2,h3)]:whitespace-pre-line',
            '[&_:is(h1,h2,h3)]:mt-2 [&_:is(h1,h2,h3)]:mb-6 md:[&_:is(h1,h2,h3)]:mb-8',
            '[&_p+p]:mt-4',
          )}
        />
      </div>
    </section>
  );
}
