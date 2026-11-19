import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import LocationIcon from './icons/LocationIcon';
import UserIcon from './icons/UserIcon';
import {AnimatePresence, motion} from 'motion/react';
import {Suspense, useEffect, useState} from 'react';
import {Await, NavLink, useAsyncValue, useLocation} from 'react-router';
import type {
  CartApiQueryFragment,
  HeaderQuery,
} from 'types/storefrontapi.generated';
import {useAside} from '~/components/Aside';
import {cn} from '~/lib/utils';
import Logo from './icons/Logo';

export type HeaderProps = {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
  isBannerOpened: boolean;
  /** Logo + cart only, e.g. on landing pages */
  hideMenu?: boolean;
};

type MenuItem = {id: string; title: string; url: string};

/**
 * Alternative site header (not in use; switch in ~/lib/siteDesign):
 * a black rounded bar floating over the page.
 * - Desktop: menu links (left), logo (centre), Find Us / account / cart (right)
 * - Mobile: menu toggle (left), logo (centre), Find Us / account / cart
 *   (right); the menu opens inside the bar
 * With `hideMenu` only the logo and cart show.
 */
export function HeaderBar({
  header,
  isLoggedIn,
  cart,
  publicStoreDomain,
  isBannerOpened,
  hideMenu,
}: HeaderProps) {
  const items = menuItems(header, publicStoreDomain);
  const location = useLocation();

  return (
    <header
      className={cn(
        'header',
        // The banner is a fixed 50px on all screens
        isBannerOpened && 'mt-[50px]',
      )}
    >
      <div className="w-full lg:hidden">
        <HeaderMobile items={items} isLoggedIn={isLoggedIn} cart={cart} hideMenu={hideMenu} />
      </div>

      <div className="hidden lg:grid w-full grid-cols-[1fr_auto_1fr] items-center h-16 px-4 rounded-xl bg-black text-white">
        <nav className="flex items-center gap-2" aria-label="Main">
          {!hideMenu &&
            items.map((item) => {
              const active = isSectionActive(item.url, location.pathname);
              return (
                <NavLink
                  key={item.id}
                  to={item.url}
                  prefetch="intent"
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    // Selected: mint outlined pill with mint text
                    'rounded-full border px-5 py-2 text-lg leading-none transition-colors',
                    active
                      ? 'border-mint text-mint font-medium'
                      : 'border-transparent text-white hover:border-white/40',
                  )}
                >
                  {item.title}
                </NavLink>
              );
            })}
        </nav>

        <HomeLogo className="w-[160px] h-[35px]" />

        <div className="flex items-center justify-end gap-5">
          {!hideMenu && (
            <>
              <FindUsLink className="text-[15px]" iconClassName="h-6 w-auto" />
              <AccountLink isLoggedIn={isLoggedIn} iconClassName="h-6 w-auto" />
            </>
          )}
          <CartToggle cart={cart} iconClassName="size-6" />
        </div>
      </div>
    </header>
  );
}

function HeaderMobile({
  items,
  isLoggedIn,
  cart,
  hideMenu,
}: {
  items: MenuItem[];
  isLoggedIn: HeaderProps['isLoggedIn'];
  cart: HeaderProps['cart'];
  hideMenu?: boolean;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close the menu when the route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="relative">
      {/* Blurs the page behind the open menu; tap to close */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.3}}
            className="fixed w-dvw h-dvh inset-0 z-0 backdrop-blur-3xl"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="relative rounded-xl bg-black text-white px-4">
        {/* Three columns (equal sides) keep the logo centred without the
            icons ever running under it */}
        <div className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-3 h-16">
          <div>
            {!hideMenu && (
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-expanded={isMenuOpen}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                className="relative z-10 -ml-1 p-1"
              >
                <MenuIcon open={isMenuOpen} />
              </button>
            )}
          </div>

          <HomeLogo className="block w-[112px] h-[25px] sm:w-[132px] sm:h-[29px]" />

          <div className="relative z-10 flex items-center justify-end gap-3.5">
            {!hideMenu && (
              <>
                {/* Phones: pin only ("Find Us" stays for screen readers) */}
                <FindUsLink
                  className="text-xs"
                  iconClassName="h-5 w-auto"
                  labelClassName="max-sm:sr-only"
                />
                <AccountLink isLoggedIn={isLoggedIn} iconClassName="h-5 w-auto" />
              </>
            )}
            <CartToggle cart={cart} iconClassName="size-5" />
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              aria-label="Main"
              initial={{opacity: 0, height: 0}}
              animate={{opacity: 1, height: 'auto'}}
              exit={{opacity: 0, height: 0}}
              transition={{duration: 0.3, ease: 'easeOut'}}
              className="overflow-hidden"
            >
              <ul className="flex flex-col items-center gap-6 pt-8 pb-12">
                {items.map((item) => (
                  <li key={item.id}>
                    <MobileMenuLink to={item.url}>{item.title}</MobileMenuLink>
                  </li>
                ))}
                <li>
                  <MobileMenuLink to="/account">
                    <Suspense fallback="Sign in">
                      <Await resolve={isLoggedIn} errorElement="Sign in">
                        {(loggedIn) => (loggedIn ? 'Account' : 'Sign in')}
                      </Await>
                    </Suspense>
                  </MobileMenuLink>
                </li>
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function MobileMenuLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  const {pathname} = useLocation();
  const active = isSectionActive(to, pathname);
  return (
    <NavLink
      to={to}
      prefetch="intent"
      aria-current={active ? 'page' : undefined}
      className={cn(
        'typo-display-l capitalize transition-colors',
        active ? 'text-mint' : 'text-white hover:text-mint',
      )}
    >
      {children}
    </NavLink>
  );
}

function HomeLogo({className}: {className?: string}) {
  return (
    <NavLink to="/" end prefetch="intent" aria-label="Upbound home" className={className}>
      <Logo width={160} height={35} className="w-full h-full text-white" />
    </NavLink>
  );
}

function FindUsLink({
  className,
  iconClassName,
  labelClassName,
}: {
  className?: string;
  iconClassName?: string;
  /** e.g. "max-sm:sr-only" to show only the pin on small screens */
  labelClassName?: string;
}) {
  return (
    <NavLink
      to="/store-locator"
      prefetch="intent"
      className={({isActive}) =>
        cn(
          'flex items-center gap-1.5 leading-none transition-colors hover:text-mint',
          isActive && 'text-mint',
          className,
        )
      }
    >
      <LocationIcon className={iconClassName} />
      <span className={labelClassName}>Find Us</span>
    </NavLink>
  );
}

function AccountLink({
  isLoggedIn,
  iconClassName,
}: {
  isLoggedIn: HeaderProps['isLoggedIn'];
  iconClassName?: string;
}) {
  return (
    <NavLink
      to="/account"
      prefetch="intent"
      className={({isActive}) =>
        cn('transition-colors hover:text-mint', isActive && 'text-mint')
      }
    >
      <UserIcon className={iconClassName} />
      <span className="sr-only">
        <Suspense fallback="Sign in">
          <Await resolve={isLoggedIn} errorElement="Sign in">
            {(loggedIn) => (loggedIn ? 'Account' : 'Sign in')}
          </Await>
        </Suspense>
      </span>
    </NavLink>
  );
}

/** Three thin lines that turn into an X while the menu is open. */
function MenuIcon({open}: {open: boolean}) {
  const line =
    'absolute left-0 h-px w-full bg-current transition-transform duration-300';
  return (
    <span className="relative block w-6 h-4" aria-hidden>
      <span
        className={cn(line, 'top-0', open && 'top-1/2 rotate-45')}
      />
      <span
        className={cn(
          line,
          'top-1/2 transition-opacity',
          open && 'opacity-0',
        )}
      />
      <span
        className={cn(line, 'top-full', open && 'top-1/2 -rotate-45')}
      />
    </span>
  );
}

function CartBadge({
  count,
  iconClassName,
}: {
  count: number | null;
  iconClassName?: string;
}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <a
      href="/cart"
      onClick={(e) => {
        e.preventDefault();
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        } as CartViewPayload);
      }}
      aria-label={count ? `Cart (${count} items)` : 'Cart'}
      className="relative block transition-colors hover:text-mint"
    >
      <BagIcon className={iconClassName} />
      {(count ?? 0) > 0 && (
        <span className="absolute -top-1.5 -right-2 flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full bg-mint text-black text-[10px] font-semibold leading-none">
          {count}
        </span>
      )}
    </a>
  );
}

function CartToggle({
  cart,
  iconClassName,
}: Pick<HeaderProps, 'cart'> & {iconClassName?: string}) {
  return (
    <Suspense fallback={<CartBadge count={null} iconClassName={iconClassName} />}>
      <Await resolve={cart}>
        <CartBanner iconClassName={iconClassName} />
      </Await>
    </Suspense>
  );
}

function BagIcon({className}: {className?: string}) {
  return (
    // Traced from the design's bag icon (697×754 artboard)
    <svg
      viewBox="0 0 697 754"
      fill="none"
      stroke="currentColor"
      strokeWidth={40}
      aria-hidden="true"
      className={className}
    >
      {/* body: straight top edge, sloping sides, rounded bottom corners */}
      <path
        d="M105 175H592L685 655Q697 742 610 742H87Q0 742 12 655Z"
        strokeLinejoin="round"
      />
      {/* handle above the top edge */}
      <path d="M207 175A141 163 0 0 1 490 175" />
      {/* curve below the top edge */}
      <path d="M207 262A141 128 0 0 0 490 262" />
    </svg>
  );
}

function CartBanner({iconClassName}: {iconClassName?: string}) {
  const originalCart = useAsyncValue() as CartApiQueryFragment | null;
  const cart = useOptimisticCart(originalCart);
  const count = cart?.lines?.nodes
    ? cart.lines.nodes
        .filter(
          (l) =>
            !l.attributes?.some(
              (a) => a.key === '_is_free_gift' && a.value === 'true',
            ),
        )
        .reduce((sum, l) => sum + l.quantity, 0)
    : 0;
  return <CartBadge count={count} iconClassName={iconClassName} />;
}

/**
 * Whether a menu link is the section the visitor is in: its own page or any
 * page under it (e.g. Community on /community/<article>). A link to a
 * collection (Shop → /collections/all) also covers every collection and
 * product page. Ignores a locale prefix like /en-my.
 */
function isSectionActive(url: string, pathname: string) {
  if (!url.startsWith('/')) return false;
  const path = pathname.replace(/^\/[a-z]{2}-[a-z]{2}(?=\/|$)/i, '') || '/';
  const target = url.replace(/\/+$/, '') || '/';
  if (target === '/') return path === '/';
  if (target.startsWith('/collections')) {
    return path.startsWith('/collections') || path.startsWith('/products');
  }
  return path === target || path.startsWith(`${target}/`);
}

/** The header menu's links, with the shop's own domain stripped. */
function menuItems(
  header: HeaderQuery,
  publicStoreDomain: string,
): MenuItem[] {
  const primaryDomainUrl = header.shop.primaryDomain.url;
  return (header.menu || FALLBACK_HEADER_MENU).items.flatMap((item) => {
    if (!item.url) return [];
    const url =
      item.url.includes('myshopify.com') ||
      item.url.includes(publicStoreDomain) ||
      item.url.includes(primaryDomainUrl)
        ? new URL(item.url).pathname
        : item.url;
    return [{id: item.id, title: item.title, url}];
  });
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
  ],
};
