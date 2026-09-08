import type {CustomerFragment} from 'types/customer-accountapi.generated';
import type {CustomerUpdateInput} from '@shopify/hydrogen/customer-account-api-types';
import {CUSTOMER_UPDATE_MUTATION} from '~/graphql/customer-account/CustomerUpdateMutation';
import {
  data,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import {
  Form,
  useActionData,
  useNavigation,
  useOutletContext,
  type MetaFunction,
} from 'react-router';
import {Button} from '~/components/ui/button';

export type ActionResponse = {
  error: string | null;
  customer: CustomerFragment | null;
};

export const meta: MetaFunction = () => {
  return [{title: 'Profile'}];
};

export async function loader({context}: LoaderFunctionArgs) {
  await context.customerAccount.handleAuthStatus();

  return {};
}

export async function action({request, context}: ActionFunctionArgs) {
  const {customerAccount} = context;

  if (request.method !== 'PUT') {
    return data({error: 'Method not allowed'}, {status: 405});
  }

  const form = await request.formData();

  try {
    const customer: CustomerUpdateInput = {};
    const validInputKeys = ['firstName', 'lastName'] as const;
    for (const [key, value] of form.entries()) {
      if (!validInputKeys.includes(key as any)) {
        continue;
      }
      if (typeof value === 'string' && value.length) {
        customer[key as (typeof validInputKeys)[number]] = value;
      }
    }

    // update customer and possibly password
    const {data, errors} = await customerAccount.mutate(
      CUSTOMER_UPDATE_MUTATION,
      {
        variables: {
          customer,
        },
      },
    );

    if (errors?.length) {
      throw new Error(errors[0].message);
    }

    if (!data?.customerUpdate?.customer) {
      throw new Error('Customer profile update failed.');
    }

    return {
      error: null,
      customer: data?.customerUpdate?.customer,
    };
  } catch (error: any) {
    return data(
      {error: error.message, customer: null},
      {
        status: 400,
      },
    );
  }
}

export default function AccountProfile() {
  const account = useOutletContext<{customer: CustomerFragment}>();
  const {state} = useNavigation();
  const action = useActionData<ActionResponse>();
  const customer = action?.customer ?? account?.customer;

  const labelClassName = 'typo-body-l';
  const inputClassName =
    'w-full rounded-xl bg-[#FDFDFD] shadow-[0_2px_8px_rgba(0,0,0,0.06)] px-5 py-4 typo-body-l text-black placeholder:text-mid-grey outline-none focus:ring-2 focus:ring-black/10 read-only:text-mid-grey';

  return (
    <div className="account-profile max-w-xl">
      <p className="typo-h2 mb-6 md:mb-10">Account Information</p>
      <Form method="PUT">
        <fieldset className="space-y-6">
          <div className="space-y-2 [&>label]:block">
            <label htmlFor="firstName" className={labelClassName}>
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              placeholder="First Name"
              aria-label="First name"
              defaultValue={customer.firstName ?? ''}
              minLength={2}
              className={inputClassName}
            />
          </div>
          <div className="space-y-2 [&>label]:block">
            <label htmlFor="lastName" className={labelClassName}>
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              placeholder="Last Name"
              aria-label="Last name"
              defaultValue={customer.lastName ?? ''}
              minLength={2}
              className={inputClassName}
            />
          </div>
          <div className="space-y-2 [&>label]:block">
            <label htmlFor="email" className={labelClassName}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Email"
              aria-label="Email"
              defaultValue={customer.emailAddress?.emailAddress ?? ''}
              readOnly
              className={inputClassName}
            />
          </div>
          <div className="space-y-2 [&>label]:block">
            <label htmlFor="phone" className={labelClassName}>
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="phone"
              placeholder="Phone"
              aria-label="Phone"
              defaultValue={customer.phoneNumber?.phoneNumber ?? ''}
              className={inputClassName}
            />
          </div>
          <div className="space-y-2">
            <p className={labelClassName}>Address(Default)</p>
            <div className={inputClassName}>
              {customer.defaultAddress?.formatted ? (
                customer.defaultAddress.formatted.map((line, index) => (
                  <p key={index}>{line}</p>
                ))
              ) : (
                <p className="text-mid-grey">No default address set.</p>
              )}
            </div>
          </div>

          {action?.error && (
            <p className="typo-caption-responsive text-red-500">
              {action.error}
            </p>
          )}

          <Button
            type="submit"
            variant="mint-black"
            disabled={state !== 'idle'}
            className="w-full sm:w-fit"
          >
            {state !== 'idle' ? 'Updating' : 'Update'}
          </Button>
        </fieldset>
      </Form>
    </div>
  );
}
