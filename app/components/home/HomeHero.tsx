import {Image} from '@shopify/hydrogen';
import {Fragment} from 'react';
import {Link} from 'react-router';
import type {HeroWithCtaFragment} from 'types/storefrontapi.generated';
import TextField from '~/components/cms/TextField';

/**
 * Homepage hero from a `hero_with_cta` entry: full-width image (desktop /
 * mobile) with the title, description and CTA at the bottom left over a
 * dark fade. In the title, text wrapped in **double asterisks** is bold and
 * the rest light; line breaks are kept.
 */
export default function HomeHero({reference}: {reference: HeroWithCtaFragment}) {
  const {title, description, desktopImage, mobileImage, cta} = reference;
  const desktop = desktopImage?.reference?.image;
  const mobile = mobileImage?.reference?.image ?? desktop;
  const button = cta?.reference;
  const label = button?.label?.value?.trim();
  const internalUrl = button?.internalUrl?.value?.trim();
  const externalUrl = button?.externalUrl?.value?.trim();

  return (
    <section className="relative w-full h-[85svh] min-h-[560px] md:h-svh md:min-h-[640px] md:max-h-[960px] overflow-clip bg-black">
      {desktop && (
        <Image
          data={desktop}
          sizes="100vw"
          loading="eager"
          className="hidden md:block absolute inset-0 w-full h-full object-cover"
        />
      )}
      {mobile && (
        <Image
          data={mobile}
          sizes="100vw"
          loading="eager"
          className="md:hidden absolute inset-0 w-full h-full object-cover"
        />
      )}
      {/* Darkens the bottom so the white text stays readable */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

      <div className="relative h-full max-w-content flex flex-col justify-end items-start gap-4 md:gap-5 px-6 md:px-16 pb-12 md:pb-20 text-white">
        {title?.value && (
          <h1 className="text-4xl md:text-[64px] font-light leading-[1.05] tracking-[-0.02em]">
            <HeroTitle text={title.value} />
          </h1>
        )}
        <TextField
          value={description?.value}
          className="[&_p]:text-base md:[&_p]:text-xl [&_p]:text-white"
        />
        {label && (internalUrl || externalUrl) && (
          <CtaLink
            label={label}
            internalUrl={internalUrl}
            externalUrl={externalUrl}
          />
        )}
      </div>
    </section>
  );
}

/** "**Hydrate** anytime,\nanywhere" → bold "Hydrate", one span per line. */
function HeroTitle({text}: {text: string}) {
  return text.split('\n').map((line, lineIndex) => (
    <span key={lineIndex} className="block">
      {line.split(/\*\*(.+?)\*\*/g).map((part, index) =>
        // split() puts the captured (bold) parts at odd positions
        index % 2 === 1 ? (
          // typo-h1's font and letter spacing, at the hero title's size
          <strong
            key={index}
            className="[font-family:var(--font-whyte)]  tracking-(--text-h1-mobile--letter-spacing) md:tracking-(--text-h1-desktop--letter-spacing)"
          >
            {part}
          </strong>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        ),
      )}
    </span>
  ));
}

function CtaLink({
  label,
  internalUrl,
  externalUrl,
}: {
  label: string;
  internalUrl?: string;
  externalUrl?: string;
}) {
  const className =
    'mt-2 inline-flex items-center rounded-full border border-white px-6 py-2.5 md:px-7 md:py-3 text-base md:text-lg leading-none transition-colors hover:bg-white hover:text-black';
  return internalUrl ? (
    <Link to={internalUrl} prefetch="intent" className={className}>
      {label}
    </Link>
  ) : (
    <a href={externalUrl} className={className}>
      {label}
    </a>
  );
}
