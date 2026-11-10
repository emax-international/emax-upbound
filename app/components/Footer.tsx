import { Image } from '@shopify/hydrogen';
import { DateTime } from 'luxon';
import { Suspense } from 'react';
import { Await, NavLink } from 'react-router';
import type {
  CustomMenuItemFragment,
  FooterMenuCmsQuery,
  HeaderQuery,
} from 'types/storefrontapi.generated';
import {Logo} from './icons/Logo';
import ApplyPaySvg from '~/assets/payment/apple-pay.svg';
import GooglePaySvg from '~/assets/payment/google-pay.svg';
import MastercardSvg from '~/assets/payment/mastercard.svg';
import PaypalSvg from '~/assets/payment/paypal.svg';
import VisaSvg from '~/assets/payment/visa.svg';
import FooterNewsletterForm from './FooterNewsletterForm';
import { Button } from './ui/button';

interface FooterProps {
  footer: Promise<FooterMenuCmsQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
}

interface FooterMenuGroupProps {
  title: string;
  items: CustomMenuItemFragment[];
}

export function Footer({
  footer: footerPromise,
  header,
  publicStoreDomain,
}: FooterProps) {
  return (
    <footer className="mt-auto px-6 py-8">
      <div className="flex flex-col md:flex-row gap-12">
        <div className="flex-1">
          {/* Same wordmark as the header; same width as the old footer logo */}
          <Logo
            className="block text-black w-[150px] md:w-[280px] h-auto justify-self-center md:justify-self-start"
          />
        </div>
        <div className="flex-1">
          <div className="flex flex-col md:flex-row gap-12 justify-between">
            {/* TODO: dynamic footer */}
            <Suspense>
              <Await resolve={footerPromise}>
                {(footer) => {
                  return footer?.footerMenu?.groups?.references?.nodes?.map(
                    (group, index) => (
                      <FooterMenu
                        key={index}
                        title={group.title?.value ?? ''}
                        items={group.items?.references?.nodes ?? []}
                      />
                    ),
                  );
                }}
              </Await>
            </Suspense>
          </div>
          <FooterNewsletterForm />
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-12 border-t pt-4">
        <div>
          <p className="typo-caption-responsive-uppercase flex-1 pb-2">
            © {DateTime.now().year} OMNI LABS WELLNESS SDN BHD
          </p>
          <div className="flex gap-2">
            {[ApplyPaySvg, GooglePaySvg, VisaSvg, MastercardSvg, PaypalSvg].map(
              (asset, index) => (
                <div
                  key={index}
                  className="py-[6px] px-[10px] bg-mid-grey/40 rounded-sm"
                >
                  <Image src={asset} width={40} height={16} />
                </div>
              ),
            )}
          </div>
        </div>
        <div className="flex items-center gap-6 typo-caption-responsive">
          <NavLink to="/policies/terms-of-service">Terms & Conditions</NavLink>
          <NavLink to="/policies/privacy-policy">Privacy Policy</NavLink>
        </div>
      </div>
    </footer>
  );
}

function FooterMenu({ title, items }: FooterMenuGroupProps) {
  if (items.length <= 0) return null;

  return (
    <nav className="[&>*]:block [&>*]:min-w-fit" role="navigation">
      <p className="typo-caption pb-4">{title}</p>
      {items.map((item, index) => {
        if (!item?.label?.value) return null;

        const internalUrl = item.internalUrl?.value ?? undefined;
        const externalUrl = item.externalUrl?.value ?? undefined;
        // Determine the URL to use (prefer internal over external)
        const url = internalUrl || externalUrl || '#';
        // Determine if it's an external link
        const isExternal = !internalUrl && !!externalUrl;

        const buttonContent = (
          <Button
            size="sm"
            variant="glass-default"
            className="w-full md:w-fit group"
          >
            {item.icon && (
              <Image
                data={item.icon.reference?.image ?? undefined}
                className="size-[20px] group-hover:invert transition-all"
                sizes="48px"
              />
            )}
            {item.label.value ?? ''}
          </Button>
        );

        if (isExternal) {
          return (
            <a key={index} href={url} target="_blank" rel="noopener noreferrer">
              {buttonContent}
            </a>
          );
        }

        return (
          <NavLink
            key={index}
            to={url}
            end
            style={activeLinkStyle}
            className="last:pb-4 pb-1"
          >
            {buttonContent}
          </NavLink>
        );
      })}

      {title === 'About' && (
        <NavLink
          key="subscription"
          to={'https://shopify.com/83887620289/account/pages/6971b1a1-27f6-4c27-b8b0-3009fd3b921d'}
          end
          style={activeLinkStyle}
          className="last:pb-4 pb-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            size="sm"
            variant="glass-default"
            className="w-full md:w-fit group"
          >
            Subscription Management
          </Button>
        </NavLink>
      )}


    </nav>
  );
}

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
