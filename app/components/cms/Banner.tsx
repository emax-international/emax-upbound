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
type BannerVariant = 'mint' | 'dark';

/** Messages a route shows instead of the Global Banner entries. */
export type RouteBanner = {messages: string[]; variant?: BannerVariant};

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
          const messages =
            data?.globalBanners?.nodes
              .filter((banner) => banner.display?.value === 'true')
              .map((banner) => banner.content?.value)
              .filter((content): content is string => !!content) ?? [];

          if (messages.length === 0) return null;

          return (
            <BannerBar
              messages={messages}
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
  setIsBannerOpened,
  onClose,
}: {
  messages: string[];
  variant?: BannerVariant;
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

  return (
    <div className="sticky top-0 z-10">
      <div
        className={cn(
          'relative flex items-center overflow-hidden',
          // Dark bar is a fixed 50px on all screens (the header offsets match
          // via PageLayout's `tallBanner`)
          variant === 'dark'
            ? 'h-[50px]'
            : 'max-h-[50px] md:max-h-[28px] py-3 md:py-1.5',
          colors,
        )}
      >
        <Marquee messages={messages} variant={variant} />
        {onClose && (
          <button
            type="button"
            className={cn('absolute right-0 h-full px-2 cursor-pointer', colors)}
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
 * Dark variant: "FREE SHIPPING (West Malaysia only)" → bold text with the
 * bracketed part smaller and regular.
 */
function Message({message, variant}: {message: string; variant: BannerVariant}) {
  const match = variant === 'dark' ? message.match(/^(.*?)\s*(\(.*\))$/) : null;
  if (!match) return <>{message}</>;
  return (
    <>
      <span className="font-normal uppercase">{match[1]}</span>{' '}
      <span className="text-[10px] font-normal normal-case">{match[2]}</span>
    </>
  );
}

function Marquee({
  messages,
  variant,
}: {
  messages: string[];
  variant: BannerVariant;
}) {
  const repeat = Math.max(1, Math.ceil(MIN_ITEMS / messages.length));
  const items = Array.from({length: repeat}, () => messages).flat();

  // Two identical halves: the track moves -50%, so the loop has no visible seam
  const group = (hidden: boolean) => (
    <div className="flex shrink-0" aria-hidden={hidden}>
      {items.map((message, index) => (
        <p key={index} className="typo-caption px-8 whitespace-nowrap">
          <Message message={message} variant={variant} />
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
