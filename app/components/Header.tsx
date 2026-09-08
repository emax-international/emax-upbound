import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import {Menu} from 'lucide-react';
import {AnimatePresence, motion} from 'motion/react';
import {Fragment, Suspense, useEffect, useState} from 'react';
import {Await, NavLink, useAsyncValue, useLocation} from 'react-router';
import type {
  CartApiQueryFragment,
  HeaderQuery,
} from 'types/storefrontapi.generated';
import {useAside} from '~/components/Aside';
import {cn} from '~/lib/utils';
import Logo from './icons/Logo';
import {Button} from './ui/button';

export type HeaderProps = {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
  isBannerOpened: boolean;
};

type Viewport = 'desktop' | 'mobile';

export function Header({
  header,
  isLoggedIn,
  cart,
  publicStoreDomain,
  isBannerOpened,
}: HeaderProps) {
  const {shop, menu} = header;

  return (
    <header className={cn('header', isBannerOpened && 'mt-10 md:mt-7')}>
      {/* Mobile Header */}
      <div className="w-full lg:hidden">
        <HeaderMobile
          header={header}
          isLoggedIn={isLoggedIn}
          cart={cart}
          publicStoreDomain={publicStoreDomain}
          isBannerOpened={isBannerOpened}
        />
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:flex w-full justify-between items-center">
        <HeaderMenu
          menu={menu}
          viewport="desktop"
          primaryDomainUrl={header.shop.primaryDomain.url}
          publicStoreDomain={publicStoreDomain}
        />
        {/* placeholder for the logo since logo is outside */}
        <div className="w-[120px]" />
        <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
      </div>
    </header>
  );
}

export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
  isLoggedIn,
}: {
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
  viewport: Viewport;
  publicStoreDomain: HeaderProps['publicStoreDomain'];
  isLoggedIn?: HeaderProps['isLoggedIn'];
}) {
  const {close} = useAside();

  // Use Tailwind classes based on viewport
  const navClassName =
    viewport === 'desktop'
      ? 'hidden lg:flex items-center gap-1'
      : 'flex flex-col gap-4 lg:hidden items-center';

  return (
    <nav className={navClassName} role="navigation">
      {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
        if (!item.url) return null;

        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        return (
          <Fragment key={item.id}>
            <NavLink
              className="header-menu-item"
              end
              onClick={close}
              prefetch="intent"
              style={activeLinkStyle}
              to={url}
            >
              {viewport === 'desktop' ? (
                <Button size="sm" variant="glass-default">
                  {item.title}
                </Button>
              ) : (
                <Button size="lg" variant="link">
                  <p className="typo-display-l capitalize">{item.title}</p>
                </Button>
              )}
            </NavLink>
            {viewport === 'mobile' && item.title.toLowerCase() === 'shop' && (
              <NavLink
                className="header-menu-item"
                end
                onClick={close}
                prefetch="intent"
                style={activeLinkStyle}
                to="/account"
              >
                <Button size="lg" variant="link">
                  <p className="typo-display-l capitalize">
                    <Suspense fallback="Sign in">
                      <Await resolve={isLoggedIn} errorElement="Sign in">
                        {(isLoggedIn) => (isLoggedIn ? 'Account' : 'Sign in')}
                      </Await>
                    </Suspense>
                  </p>
                </Button>
              </NavLink>
            )}
          </Fragment>
        );
      })}
      {viewport === 'mobile' && (
        <NavLink
          className="header-menu-item"
          end
          onClick={close}
          prefetch="intent"
          style={activeLinkStyle}
          to="/store-locator"
        >
          <Button size="lg" variant="link">
            <p className="typo-display-l capitalize">Find Us</p>
          </Button>
        </NavLink>
      )}
    </nav>
  );
}

function HeaderCtas({
  isLoggedIn,
  cart,
}: Pick<HeaderProps, 'isLoggedIn' | 'cart'>) {
  return (
    <nav className="flex items-center gap-1" role="navigation">
      {/* <HeaderSearch viewport="desktop" /> */}
      <NavLink
        prefetch="intent"
        to="/store-locator"
        style={activeLinkStyle}
        className="hidden lg:block"
      >
        <Button size="sm" variant="glass-default">
          Find Us
        </Button>
      </NavLink>
      <span className="hidden lg:block text-black/30" aria-hidden="true">
        |
      </span>
      <NavLink
        prefetch="intent"
        to="/account"
        style={activeLinkStyle}
        className="hidden lg:block"
      >
        <Button size="sm" variant="glass-default">
          <Suspense fallback="Sign in">
            <Await resolve={isLoggedIn} errorElement="Sign in">
              {(isLoggedIn) => (isLoggedIn ? 'Account' : 'Sign in')}
            </Await>
          </Suspense>
        </Button>
      </NavLink>
      <CartToggle cart={cart} />
    </nav>
  );
}

export function HeaderMobile({
  header,
  isLoggedIn,
  cart,
  publicStoreDomain,
  isBannerOpened,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  // reset search state whenever menu closed
  useEffect(() => {
    if (!isMenuOpen) setIsSearchOpen(false);
  }, [isMenuOpen]);

  return (
    <div className="relative">
      {/* background blur overlay */}
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
      <div className="p-2 rounded-xl bg-mid-grey/40 backdrop-blur-2xl">
        {/* Mobile menu toggle button */}
        <div className="flex justify-between items-center relative">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="!px-2"
          >
            <Menu size={14} />
          </Button>
          <NavLink
            prefetch="intent"
            to="/"
            end
            className={cn(isBannerOpened ? 'top-11' : 'top-4')}
          >
            <Logo
              width={90}
              height={27}
              className="text-white absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
            />
          </NavLink>
          <CartToggle cart={cart} />
        </div>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{opacity: 0, height: 0}}
              animate={{
                opacity: 1,
                height: '80dvh',
              }}
              exit={{
                opacity: 0,
                height: 0,
              }}
              transition={{
                type: 'spring',
                damping: 15,
                duration: 0.3,
              }}
              className="flex flex-col items-center justify-center max-h-[650px]"
            >
              <AnimatePresence>
                {!isSearchOpen && (
                  <motion.div
                    initial={{opacity: 0, height: 0, y: 0}}
                    animate={{
                      opacity: 1,
                      height: 'auto',
                      // y: 24,
                    }}
                    exit={{opacity: 0, height: 0, y: 0}}
                  >
                    <HeaderMenu
                      menu={header.menu}
                      viewport="mobile"
                      primaryDomainUrl={header.shop.primaryDomain.url}
                      publicStoreDomain={publicStoreDomain}
                      isLoggedIn={isLoggedIn}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.div
                animate={{
                  y: isSearchOpen ? 24 : 40,
                  transition: {
                    type: 'spring',
                    damping: 12,
                    duration: 0.3,
                  },
                }}
              >
                {/* <HeaderSearch
                viewport="mobile"
                onSearchOpenChange={setIsSearchOpen}
              /> */}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function CartBadge({count}: {count: number | null}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <>
      {/* mobile */}
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
        className="relative block lg:hidden mr-2"
      >
        <Button
          size="sm"
          variant="link"
          className="flex p-0 items-center typo-caption-responsive-uppercase leading-none h-fit"
        >
          Cart
          {(count ?? 0) > 0 && (
            <div className="flex items-center justify-center rounded-full text-mint size-[18px] bg-black">
              {count}
            </div>
          )}
        </Button>
      </a>

      {/* desktop */}
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
        className="relative hidden lg:block"
      >
        <Button size="sm" variant="glass-default">
          Cart
        </Button>
        {(count ?? 0) > 0 && (
          <div className="absolute flex items-center justify-center rounded-full typo-caption text-mint -top-2 right-0 w-[18px] h-[18px] bg-black">
            {count}
          </div>
        )}
      </a>
    </>
  );
}

function CartToggle({cart}: Pick<HeaderProps, 'cart'>) {
  return (
    <Suspense fallback={<CartBadge count={null} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const originalCart = useAsyncValue() as CartApiQueryFragment | null;
  const cart = useOptimisticCart(originalCart);
  const count = cart?.lines?.nodes
    ? cart.lines.nodes
        .filter((l) => !l.attributes?.some((a) => a.key === '_is_free_gift' && a.value === 'true'))
        .reduce((sum, l) => sum + l.quantity, 0)
    : 0;
  return <CartBadge count={count} />;
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

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'black',
  };
}
