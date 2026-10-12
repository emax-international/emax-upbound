import {Button} from './ui/button';
import {useFetcher} from 'react-router';
import {Loader2, CheckCircle, AlertCircle} from 'lucide-react';

export default function FooterNewsletterForm() {
  // Use fetcher for form submission
  const fetcher = useFetcher();

  // Helper functions to determine state
  const isLoading =
    fetcher.state === 'submitting' || fetcher.state === 'loading';
  const isSuccess = fetcher.state === 'idle' && fetcher.data?.success;
  const isError = fetcher.state === 'idle' && fetcher.data?.error;
  const errorMessage = isError ? fetcher.data.error : '';

  return (
    <div className="space-y-5 my-[60px]">
      <div>
        <p className="typo-body-l">Join the Upbound Club</p>
        <p>
          Get FREE shipping on your first order (West Malaysia only). Plus, be the first to know about our events, partnerships, and next product drop.
        </p>
      </div>

      <fetcher.Form
        method="POST"
        action="/newsletter/subscribe"
        className="space-y-2"
      >
        <div className="flex flex-col md:flex-row gap-2">
          {!isSuccess ? (
            <>
              <input
                name="email"
                placeholder="Your Email"
                className="flex-1 border bg-white min-h-[41px] px-4 typo-caption-responsive-uppercase text-center md:text-left"
                required
                disabled={isLoading}
              />
              <Button
                type="submit"
                className="rounded-none"
                disabled={isLoading || isSuccess}
              >
                {isLoading && (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span className="typo-caption-responsive-uppercase">
                      Submitting...
                    </span>
                  </>
                )}
                <span className="typo-caption-responsive-uppercase">
                  {!isLoading && 'Subscribe'}
                </span>
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-2 p-2 bg-green-50 text-green-700 rounded w-full">
              <CheckCircle size={16} />
              <span className="typo-caption-responsive">
                Thank you for subscribing!
              </span>
            </div>
          )}
        </div>

        {isError && (
          <div className="flex items-center gap-2 text-orange">
            <AlertCircle size={12} />
            <span className="typo-caption-responsive">
              {errorMessage || 'Subscription failed. Please try again.'}
            </span>
          </div>
        )}
      </fetcher.Form>

      <p className="typo-caption-responsive text-mid-grey">
        By submitting this form, you agree to receive email marketing from
        Upbound® to your email.
      </p>
    </div>
  );
}
