import {
  data as remixData,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import {Form, NavLink, Outlet, useLoaderData} from 'react-router';
import AccountHero from '~/components/account/AccountHero';
import {ACCOUNT_HERO_CMS_QUERY} from '~/graphql/cms/AccountPageQuery';
import {CUSTOMER_DETAILS_QUERY} from '~/graphql/customer-account/CustomerDetailsQuery';
import {hasRewardsAccess} from '~/lib/rewards';

export function shouldRevalidate() {
  return true;
}

export async function loader({context}: LoaderFunctionArgs) {
  const [{data, errors}, {accountHero}] = await Promise.all([
    context.customerAccount.query(CUSTOMER_DETAILS_QUERY),
    // Merchandiser-managed hero banner — see AccountPageQuery.ts. Not
    // critical to render the page, so a missing/misconfigured metaobject
    // just means no hero rather than a broken account page.
    context.storefront
      .query(ACCOUNT_HERO_CMS_QUERY)
      .catch((error) => {
        console.error('Failed to load account hero CMS data:', error);
        return {accountHero: null};
      }),
  ]);

  if (errors?.length || !data?.customer) {
    throw new Error('Customer not found');
  }

  return remixData(
    {
      customer: data.customer,
      accountHero,
      isRewardsEligible: hasRewardsAccess(
        context.env,
        data.customer.testAccount?.value,
      ),
    },
    {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    },
  );
}

export default function AccountLayout() {
  const {customer, accountHero, isRewardsEligible} =
    useLoaderData<typeof loader>();

  // const heading = customer
  //   ? customer.firstName
  //     ? `Welcome, ${customer.firstName}`
  //     : `Welcome to your account.`
  //   : 'Account Details';

  return (
    <div>
      <AccountHero data={accountHero} />
      <div className="account">
        <AccountMenu isRewardsEligible={isRewardsEligible} />
        <div className="flex-3">
          <Outlet context={{customer}} />
        </div>
      </div>
    </div>
  );
}

function AccountMenu({isRewardsEligible}: {isRewardsEligible: boolean}) {
  function isActiveStyle({
    isActive,
    isPending,
  }: {
    isActive: boolean;
    isPending: boolean;
  }) {
    return {
      color: isActive ? 'black' : undefined,
    };
  }

  return (
    <nav
      role="navigation"
      className="flex-1 space-y-3 [&>*]:block mb-12 md:mb-0 pb-6 md:pb-0 border-black border-b md:border-none"
    >
      <h2 className="typo-h2 mb-6">Account</h2>
      <NavLink
        to="/account/profile"
        style={isActiveStyle}
        className="typo-body-l text-mid-grey"
      >
        Account Details
      </NavLink>
      <NavLink
        to="/account/orders"
        style={isActiveStyle}
        className="typo-body-l text-mid-grey"
      >
        Order History
      </NavLink>
      <NavLink
        to="/account/addresses"
        style={isActiveStyle}
        className="typo-body-l text-mid-grey"
      >
        Addresses
      </NavLink>
      <NavLink
      to="/account/subscriptions"
      style={isActiveStyle}
      className="typo-body-l text-mid-grey">
        Subscriptions
      </NavLink>
      {isRewardsEligible && (
        <NavLink
          to="/account/rewards"
          style={isActiveStyle}
          className="typo-body-l text-mid-grey"
        >
          Points & Rewards
        </NavLink>
      )}
      <Logout />
    </nav>
  );
}

function Logout() {
  return (
    <Form className="account-logout" method="POST" action="/account/logout">
      <button type="submit" className="typo-body-l text-mid-grey">
        Logout
      </button>
    </Form>
  );
}
