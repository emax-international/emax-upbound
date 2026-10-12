import {
  redirect,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import {
  adminCustomerByEmailQuery,
  adminCustomerCreateMutation,
  adminCustomerUpdateMarketingMutation,
} from '~/graphql/admin/CustomerEmailMarketing';

/**
 * Action function to handle newsletter subscription form submissions
 */
export async function action({request, context}: ActionFunctionArgs) {
  // Get the form data
  const formData = await request.formData();
  const email = formData.get('email')?.toString();

  // Validate email
  if (!email || !email.includes('@')) {
    return new Response(
      JSON.stringify({
        error: 'Please provide a valid email address',
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }

  try {
    // Check if adminApiClient is available
    if (!context.adminApiClient) {
      console.error('Admin API client is not available');
      return new Response(
        JSON.stringify({
          error: 'Newsletter subscription is temporarily unavailable',
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }

    // Create the customer without marketing consent. Consent is set in a
    // separate update below so Shopify fires the "Customer subscribed to
    // email marketing" event (used by Flow) for new and existing customers.
    const {data, errors} = await context.adminApiClient.request(
      adminCustomerCreateMutation,
      {
        variables: {
          input: {email},
        },
      },
    );

    // Check for GraphQL errors
    if (errors) {
      console.error('GraphQL errors:', JSON.stringify(errors, null, 2));
      return new Response(
        JSON.stringify({
          error: 'Failed to subscribe to newsletter',
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }

    let customerId: string | undefined = data?.customerCreate?.customer?.id;
    let marketingState: string | undefined;

    // Check for user errors from the mutation
    if (data?.customerCreate?.userErrors?.length > 0) {
      const userErrors = data.customerCreate.userErrors;

      // Check if the error is because the customer already exists
      const emailTakenError = userErrors.find((error: {field?: string; message?: string}) =>
        error.message?.includes('Email has already been taken'),
      );

      if (!emailTakenError) {
        console.error('User errors:', userErrors);
        return new Response(
          JSON.stringify({
            error: userErrors[0].message || 'Failed to subscribe to newsletter',
          }),
          {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
      }

      // Customer already exists - look them up
      const {data: customerData, errors: customerErrors} =
        await context.adminApiClient.request(adminCustomerByEmailQuery, {
          variables: {query: `email:"${email.replace(/"/g, '')}"`},
        });

      if (customerErrors) {
        console.error('GraphQL errors:', JSON.stringify(customerErrors, null, 2));
        throw new Error('Failed to look up existing customer');
      }

      const customer = customerData?.customers?.nodes?.[0];
      customerId = customer?.id;
      marketingState = customer?.emailMarketingConsent?.marketingState;
    }

    if (!customerId) {
      throw new Error('Customer not found after create/lookup');
    }

    // Subscribe to email marketing unless already subscribed
    if (marketingState !== 'SUBSCRIBED') {
      const {data: consentData, errors: consentErrors} =
        await context.adminApiClient.request(
          adminCustomerUpdateMarketingMutation,
          {
            variables: {
              input: {
                customerId,
                emailMarketingConsent: {
                  marketingState: 'SUBSCRIBED',
                  marketingOptInLevel: 'SINGLE_OPT_IN',
                },
              },
            },
          },
        );

      const consentUserErrors =
        consentData?.customerEmailMarketingConsentUpdate?.userErrors;
      if (consentErrors || consentUserErrors?.length > 0) {
        console.error(
          'Consent update errors:',
          JSON.stringify(consentErrors ?? consentUserErrors, null, 2),
        );
        throw new Error('Failed to update marketing consent');
      }
    }

    // Success - always return JSON for fetcher
    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error: unknown) {
    console.error('Error subscribing to newsletter:', error);
    return new Response(
      JSON.stringify({
        error: 'An unexpected error occurred',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
}

// Add a loader to handle direct navigation to this route
export async function loader({request}: LoaderFunctionArgs) {
  // If someone navigates directly to this URL, redirect them to the home page
  return redirect('/');
}
