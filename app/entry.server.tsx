import type { AppLoadContext } from '@shopify/remix-oxygen';
import { ServerRouter } from 'react-router';
import { isbot } from 'isbot';
import { renderToReadableStream } from 'react-dom/server';
import { createContentSecurityPolicy } from '@shopify/hydrogen';
import type { EntryContext } from 'react-router';

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  reactRouterContext: EntryContext,
  context: AppLoadContext,
) {
  const { nonce, header, NonceProvider } = createContentSecurityPolicy({
    scriptSrc: [
      "'self'",
      'https://cdn.shopify.com',
      'https://*.googletagmanager.com',
      'https://*.google-analytics.com',
      'https://connect.facebook.net',
      "'sha256-HSqsF0AqO4Au0siH0PmBAIJZrNYC4UQlwQCJy/WhzZ8='",
    ],
    imgSrc: [
      "'self'",
      'https://cdn.shopify.com',
      'https://*.google-analytics.com',
      'https://*.googletagmanager.com',
      'https://www.facebook.com',
      // Meta Pixel error reporting
      'https://connect.facebook.net',
      // Google Ads remarketing
      'https://www.google.com',
      'https://www.google.com.my',
      'https://www.googleadservices.com',
      'https://googleads.g.doubleclick.net',
      // Google Ads consent-mode pings
      'https://ad.doubleclick.net',
      // GTM preview (Tag Assistant) badge icon
      'https://fonts.gstatic.com',
    ],
    // GTM preview (Tag Assistant) badge styles and fonts
    styleSrc: ['https://www.googletagmanager.com', 'https://fonts.googleapis.com'],
    // Hydrogen's default-src values are repeated because setting font-src
    // stops the fallback to default-src
    fontSrc: [
      "'self'",
      'https://cdn.shopify.com',
      'https://shopify.com',
      'https://fonts.gstatic.com',
    ],
    // Hydrogen's default-src values are repeated here because setting
    // frame-src stops the fallback to default-src
    frameSrc: [
      "'self'",
      'https://cdn.shopify.com',
      'https://shopify.com',
      'https://www.facebook.com',
    ],

    shop: {
      checkoutDomain: context.env.PUBLIC_CHECKOUT_DOMAIN,
      storeDomain: context.env.PUBLIC_STORE_DOMAIN,
    },
    connectSrc: [
      'wss://nearly-obliging-oryx.ngrok-free.app:*',
      "'self'",
      'https://*.google-analytics.com',
      'https://*.analytics.google.com',
      // the wildcard above doesn't cover the bare domain
      'https://analytics.google.com',
      'https://*.googletagmanager.com',
      'https://www.facebook.com',
      'https://connect.facebook.net',
      // Meta storefront events
      'https://mpc-prod-25-s6uit34pua-wl.a.run.app',
      'https://5z-2b6b7616f94640c2840d1841e1ac24c3.ecs.us-east-1.on.aws',
      'https://e5-cce25cf3b4a5476fbb3aaa2312efbe1a.ecs.us-east-2.on.aws',
      // Google Ads remarketing
      'https://www.google.com',
      'https://google.com',
      'https://www.google.com.my',
      'https://www.googleadservices.com',
      'https://googleads.g.doubleclick.net',
      // Google Ads consent-mode pings
      'https://ad.doubleclick.net',
      // GA4 Google Signals
      'https://stats.g.doubleclick.net',
      // Shopify performance metrics (shopify-perf-kit)
      'https://otlp-http-production.shopifysvc.com',
    ],
  });

  const body = await renderToReadableStream(
    <NonceProvider>
      <ServerRouter
        context={reactRouterContext}
        url={request.url}
        nonce={nonce}
      />
    </NonceProvider>,
    {
      nonce,
      signal: request.signal,
      onError(error) {
        console.error(error);
        responseStatusCode = 500;
      },
    },
  );

  if (isbot(request.headers.get('user-agent'))) {
    await body.allReady;
  }

  responseHeaders.set('Content-Type', 'text/html');
  responseHeaders.set('Content-Security-Policy', header);

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
