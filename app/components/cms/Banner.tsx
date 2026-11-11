import {X} from 'lucide-react';
import {Suspense, useEffect, useState} from 'react';
import {Await} from 'react-router';
import {GlobalBannerCmsQuery} from 'types/storefrontapi.generated';
import {markComponentAsShown, shouldShowComponent} from '~/lib/cooldown';
import {cn} from '~/lib/utils';

// Unique key for this component in localStorage
const STORAGE_KEY = 'promo_banner';
// How long the banner stays hidden after the user closes it (10 minutes)
const COOLDOWN_MINUTES = 10;
// Repeat the messages so a short list still fills wide screens
const MIN_ITEMS = 6;

type SetBannerOpened = React.Dispatch<React.SetStateAction<boolean>>;
/** Default colours, used when the entries set none */
type BannerVariant = 'mint' | 'dark';

/** Custom colours (any CSS colour, e.g. "#caf68c") */
export type BannerColors = {background?: string; text?: string};

/** Messages a route shows instead of the Global Banner entries. */
export type RouteBanner = {
  messages: string[];
  variant?: BannerVariant;
  colors?: BannerColors;
};

/** A global_banner entry's colour fields (Shopify "Color" type) */
type BannerColorFields =
  | {
      backgroundColor?: {value?: string | null} | null;
      textColor?: {value?: string | null} | null;
    }
  | null
  | undefined;

/** The bar takes its colours from the first entry that sets them. */
export function bannerColors(entries: BannerColorFields[]): BannerColors {
  return {
    background:
      entries.find((e) => e?.backgroundColor?.value)?.backgroundColor?.value ??
      undefined,
    text:
      entries.find((e) => e?.textColor?.value)?.textColor?.value ?? undefined,
  };
}

function Banner({
  bannerPromise,
  routeBanner,
  setIsBannerOpened,
}: {
  bannerPromise: Promise<GlobalBannerCmsQuery | null>;
  routeBanner?: RouteBanner | null;
  setIsBannerOpened: SetBannerOpened;
}) {
  // Starts hidden so server and client render the same; localStorage is read after mount
  const [isDismissed, setIsDismissed] = useState(true);

  useEffect(() => {
    setIsDismissed(!shouldShowComponent(STORAGE_KEY, COOLDOWN_MINUTES));
  }, []);

  // Route messages (e.g. A/B landing pages) are always shown
  if (routeBanner) {
    return (
      <BannerBar
        messages={routeBanner.messages}
        variant={routeBanner.variant}
        colors={routeBanner.colors}
        setIsBannerOpened={setIsBannerOpened}
      />
    );
  }

  if (isDismissed) return null;

  return (
    <Suspense>
      <Await resolve={bannerPromise}>
        {(data) => {
          // Every Global Banner entry with "display" on becomes one message
          const shown =
            data?.globalBanners?.nodes.filter(
              (banner) =>
                banner.display?.value === 'true' && !!banner.content?.value,
            ) ?? [];
          const messages = shown.map((banner) => banner.content?.value ?? '');

          if (messages.length === 0) return null;

          return (
            <BannerBar
              messages={messages}
              colors={bannerColors(shown)}
              setIsBannerOpened={setIsBannerOpened}
              onClose={() => {
                // The cooldown only starts when the user closes the banner
                markComponentAsShown(STORAGE_KEY);
                setIsDismissed(true);
              }}
            />
          );
        }}
      </Await>
    </Suspense>
  );
}

function BannerBar({
  messages,
  variant = 'mint',
  colors: customColors,
  setIsBannerOpened,
  onClose,
}: {
  messages: string[];
  variant?: BannerVariant;
  colors?: BannerColors;
  setIsBannerOpened: SetBannerOpened;
  /** Shows the close button when set */
  onClose?: () => void;
}) {
  // Tell the layout to offset the header only while the bar is on screen
  useEffect(() => {
    setIsBannerOpened(true);
    return () => setIsBannerOpened(false);
  }, [setIsBannerOpened]);

  const colors = variant === 'dark' ? 'bg-black text-white' : 'bg-mint';
  // Inline styles override the variant classes when the CMS sets a colour
  const style: React.CSSProperties = {
    backgroundColor: customColors?.background,
    color: customColors?.text,
  };

  return (
    <div className="sticky top-0 z-10">
      <div
        style={style}
        className={cn(
          // A fixed 50px on all screens (Header and PageLayout offsets match)
          'relative flex items-center overflow-hidden h-[50px]',
          colors,
        )}
      >
        <Marquee messages={messages} />
        {onClose && (
          <button
            type="button"
            className={cn('absolute right-0 h-full px-2 cursor-pointer', colors)}
            style={style}
            onClick={onClose}
            aria-label="Close promotional banner"
          >
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * "FREE SHIPPING (West Malaysia only)" → uppercase text with the bracketed
 * part smaller and in normal case.
 */
function Message({message}: {message: string}) {
  const match = message.match(/^(.*?)\s*(\(.*\))$/);
  if (!match) return <>{message}</>;
  return (
    <>
      <span className="font-normal uppercase">{match[1]}</span>{' '}
      <span className="text-[10px] font-normal normal-case">{match[2]}</span>
    </>
  );
}

function Marquee({messages}: {messages: string[]}) {
  const repeat = Math.max(1, Math.ceil(MIN_ITEMS / messages.length));
  const items = Array.from({length: repeat}, () => messages).flat();

  // Two identical halves: the track moves -50%, so the loop has no visible seam
  const group = (hidden: boolean) => (
    <div className="flex shrink-0" aria-hidden={hidden}>
      {items.map((message, index) => (
        <p key={index} className="typo-caption px-8 whitespace-nowrap">
          <Message message={message} />
        </p>
      ))}
    </div>
  );

  return (
    <div className="marquee w-full overflow-hidden">
      <div className="marquee-track">
        {group(false)}
        {group(true)}
      </div>
    </div>
  );
}

export default Banner;
