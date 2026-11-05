import type {LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {
  CART_DISCOUNTS_QUERY,
  type CartDiscountOption,
} from '~/graphql/admin/CartDiscountsQuery';
import {CUSTOMER_ID_QUERY} from '~/graphql/customer-account/CustomerIdQuery';

export type {CartDiscountOption};

export type RewardsSummary = {
  // Current spendable balance — shown as "Your Points".
  points: number;
  // Lifetime points earned, used for tier progress (the progress bar and
  // "N more points to reach <tier>") instead of the spendable `points`
  // balance, since redeeming a voucher shouldn't visually knock the
  // customer's tier progress backwards.
  accumulatedPoints: number;
  tier: string;
  nextTier: string | null;
  nextTierAt: number | null;
  // Current tier's max_points (from GET /loyalty/api/tiers) — null for the
  // top tier, which has no ceiling. Used to render tier progress.
  tierMaxPoints: number | null;
  // ISO date string ("YYYY-MM-DD") the customer's current membership tier
  // expires, or null if the loyalty API didn't return one.
  expiredMembershipDate: string | null;
};

// Shape mirrors one entry of `unredeemed_rewards` from the real loyalty API
// (see getAvailableVouchersToClaim below) so wiring in the live fetch later
// is just a field mapping, not a redesign.
export type AvailableVoucher = {
  id: string; // reward_id
  title: string; // name
  description: string | null;
  rewardType: string; // reward_type, e.g. "discount"
  pointsCost: number; // points_required
  discountType: 'fixed' | 'percentage' | null; // reward.discount_type — fixed = RM, percentage = %
  discountValue: number | null;
  minSpend: number | null;
  minQuantity: number;
  // Number of times this voucher may be redeemed per customer.
  maxRedeem: number;
  hasExpiry: boolean;
  // When false the customer hasn't met this voucher's requirements — the
  // voucher must be shown read-only (not redeemable) rather than hidden.
  isEligible: boolean;
  // Not supplied by the loyalty API yet — VoucherCard falls back to a
  // placeholder icon until an image field is added.
  imageUrl?: string | null;
};

// Shopify's auto-generated discount summary appends who it's scoped to, e.g.
// "5% off orders over RM50 For Amira Farisa" or "...For 1 customer" — that
// eligibility clause isn't useful to show back to the customer it's for.
function cleanDiscountSummary(summary?: string | null): string | null {
  if (!summary) return null;
  return summary.replace(/\s+For\s+.+$/i, '').trim() || null;
}

// Rejects if `promise` hasn't settled within `ms` — for clients like
// customerAccount.query() that don't accept an AbortSignal, so a hung
// request can't stall a caller forever.
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(`Timed out after ${ms}ms`)), ms),
    ),
  ]);
}

/**
 * Rewards rollout switch. With REWARDS_OPEN_TO_ALL=true every logged-in
 * customer is eligible; otherwise only customers whitelisted via the
 * `custom.test_account` boolean metafield (set in Shopify admin) are.
 */
export function hasRewardsAccess(
  env: Env,
  testAccountValue?: string | null,
): boolean {
  return env.REWARDS_OPEN_TO_ALL === 'true' || testAccountValue === 'true';
}

export type RewardsCustomer = {
  id: string;
  email: string;
  isEligible: boolean;
} | null;

/**
 * Resolves the logged-in customer's id/email/eligibility ONCE. isRewardsEligible
 * and getCustomerVouchers below both accept an already-resolved (or
 * in-flight) RewardsCustomer and only call this themselves when one isn't
 * supplied. Callers that already have an `isLoggedIn` promise in flight
 * (e.g. the root loader, which needs it anyway for the header) should pass
 * it in instead of letting this call customerAccount.isLoggedIn() again.
 *
 * This used to be three independent Customer Account API round trips per
 * page load (one each in isRewardsTester, getCustomerVouchers, and root's
 * own isLoggedIn field) — sharing one lookup is what fixed a ~30s+
 * slowdown that was happening on every single page.
 */
export async function getRewardsCustomer(
  context: LoaderFunctionArgs['context'],
  isLoggedIn?: Promise<boolean> | boolean,
): Promise<RewardsCustomer> {
  try {
    const {customerAccount} = context;
    if (!(await (isLoggedIn ?? customerAccount.isLoggedIn()))) return null;

    // customerAccount.query() doesn't accept an AbortSignal, so a hung
    // Customer Account API call would otherwise stall this indefinitely —
    // and since every rewards field (canUseRewards, cartDiscounts) now
    // shares this one lookup, that would freeze the whole cart drawer on
    // "Loading cart ..." rather than just failing this one lookup.
    const {data} = await withTimeout(
      customerAccount.query(CUSTOMER_ID_QUERY),
      5000,
    );
    const customer = data?.customer;
    if (!customer?.id) return null;

    return {
      id: customer.id,
      email: customer.emailAddress?.emailAddress ?? '',
      isEligible: hasRewardsAccess(context.env, customer.testAccount?.value),
    };
  } catch (error) {
    console.error('Failed to load rewards customer:', error);
    return null;
  }
}

/**
 * Whether the logged-in customer can see/use rewards. Never throws — a
 * logged-out customer or a lookup failure both just mean "not eligible"
 * rather than breaking the page. (Previously named isRewardsTester — renamed
 * now that eligibility isn't tied to a "test account" concept.)
 */
export async function isRewardsEligible(
  context: LoaderFunctionArgs['context'],
  rewardsCustomer?: Promise<RewardsCustomer> | RewardsCustomer,
): Promise<boolean> {
  const customer = await (rewardsCustomer ?? getRewardsCustomer(context));
  return customer?.isEligible ?? false;
}

/**
 * Look up the active code discounts the logged-in customer can use: their own
 * (assigned via Shopify's native "Specific customers" discount eligibility)
 * first, then store-wide "All customers" ones. Used both by the cart's
 * discount picker and the account "My Rewards" page. Guests, stores without
 * an Admin API client configured, and customers not eligible for rewards
 * (see isRewardsEligible) simply get no discounts — never throws, so a
 * failure here should never break the page.
 */
export async function getCustomerVouchers(
  context: LoaderFunctionArgs['context'],
  rewardsCustomer?: Promise<RewardsCustomer> | RewardsCustomer,
): Promise<CartDiscountOption[]> {
  try {
    const {adminApiClient} = context;
    if (!adminApiClient) return [];

    const customer = await (rewardsCustomer ?? getRewardsCustomer(context));
    if (!customer?.isEligible) return [];

    const numericId = customer.id.split('/').pop();
    if (!numericId) return [];

    const fetchDiscounts = async (query: string, first: number) => {
      const {data, errors} = await adminApiClient.request(CART_DISCOUNTS_QUERY, {
        variables: {query, first},
        // Without this, a slow/unresponsive Admin API call hangs forever —
        // and since this is part of the cart's deferred data, that leaves
        // the whole cart drawer stuck on "Loading cart ..." after Add to
        // Cart rather than just failing this one lookup.
        signal: AbortSignal.timeout(5000),
      });
      if (errors) {
        console.error('Admin API errors fetching customer vouchers:', errors);
        return [];
      }
      return (data?.discountNodes?.nodes ?? []) as any[];
    };

    // The Admin API has no filter for "All customers" eligibility (nor a way
    // to exclude customer-specific discounts), so store-wide ones are found
    // by scanning active code discounts and checking each one below.
    const [ownNodes, storeNodes] = await Promise.all([
      fetchDiscounts(`customer_ids:${numericId} status:active`, 20),
      fetchDiscounts('status:active method:code', 100),
    ]);

    const options: CartDiscountOption[] = [];
    const addOption = (discount: any) => {
      const code = discount?.codes?.nodes?.[0]?.code;
      if (!code || options.some((o) => o.code === code)) return;
      const label = discount.title || discount.summary || code;
      const summary = cleanDiscountSummary(discount.summary);
      // Shopify's auto-generated summary (e.g. "5% off orders over RM50")
      // — only worth showing as a subtitle when it says more than the label.
      const description = summary && summary !== label ? summary : null;
      options.push({code, label, description});
    };

    // Only discounts assigned to this customer — the query's customer_ids
    // filter is silently ignored on Admin API versions before 2026-07,
    // which would otherwise list every active code in the store.
    ownNodes
      .map((node) => node?.discount)
      .filter((discount) =>
        (
          discount?.customerSelection?.customers as {id: string}[] | undefined
        )?.some((c) => c.id === customer.id),
      )
      .forEach(addOption);

    storeNodes
      .map((node) => node?.discount)
      .filter(
        (discount) => discount?.customerSelection?.allCustomers === true,
      )
      .forEach(addOption);

    return options;
  } catch (error) {
    console.error('Failed to load customer vouchers:', error);
    return [];
  }
}

// Raw shape returned by the loyalty API's GET /loyalty/api/customer?email=...
// endpoint. Only the fields we actually use are declared.
type LoyaltyCustomerResponse = {
  id: number;
  email: string;
  points: number;
  // Lifetime points earned — never decreases when a customer spends points,
  // unlike `points` (their current spendable balance). Tier progress is
  // based on this, not the spendable balance.
  accumulated_points: number;
  tier: string;
  expired_membership_date: string | null;
  status_code: number;
};

// Raw shape returned by the loyalty API's GET /loyalty/api/tiers endpoint.
type LoyaltyTier = {
  id: number;
  name: string;
  min_points: number;
  // null on the top tier — no ceiling.
  max_points: number | null;
};

type LoyaltyTiersResponse = {
  tiers: LoyaltyTier[];
  status_code: number;
};

/**
 * Fetches the tier ladder from the loyalty API (GET /loyalty/api/tiers),
 * sorted ascending by min_points. Never throws — a missing config or API
 * failure just resolves to [] so tier progress is simply omitted.
 */
async function getLoyaltyTiers(
  context: LoaderFunctionArgs['context'],
): Promise<LoyaltyTier[]> {
  try {
    const {env} = context;
    const apiUrl = env.LOYALTY_API_URL;
    const apiKey = env.LOYALTY_API_KEY;
    if (!apiUrl || !apiKey) return [];

    const response = await fetch(`${apiUrl}/loyalty/api/tiers`, {
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      console.error(`Loyalty API returned ${response.status} fetching tiers`);
      return [];
    }

    const json = (await response.json()) as LoyaltyTiersResponse;
    return (json?.tiers ?? []).slice().sort((a, b) => a.min_points - b.min_points);
  } catch (error) {
    console.error('Failed to load tiers from loyalty API:', error);
    return [];
  }
}

/**
 * Fetches the logged-in customer's points/tier from the loyalty API, plus
 * the tier ladder (GET /loyalty/api/tiers) to derive progress toward the
 * next tier. Never throws — a missing config, a logged-out customer, or an
 * API failure all just fall back to a zeroed summary so the page still
 * renders normally.
 */
export async function getCustomerRewardsSummary(
  context: LoaderFunctionArgs['context'],
): Promise<RewardsSummary> {
  const fallback: RewardsSummary = {
    points: 0,
    accumulatedPoints: 0,
    tier: 'N/A',
    nextTier: null,
    nextTierAt: null,
    tierMaxPoints: null,
    expiredMembershipDate: null,
  };

  try {
    const {customerAccount, env} = context;
    const apiUrl = env.LOYALTY_API_URL;
    const apiKey = env.LOYALTY_API_KEY;

    if (!apiUrl || !apiKey || !(await customerAccount.isLoggedIn())) {
      return fallback;
    }

    const {data: customerData} = await customerAccount.query(CUSTOMER_ID_QUERY);
    const email = customerData?.customer?.emailAddress?.emailAddress;
    if (!email) return fallback;

    const [customerResponse, tiers] = await Promise.all([
      fetch(`${apiUrl}/loyalty/api/customer?email=${encodeURIComponent(email)}`, {
        headers: {
          'X-API-Key': apiKey,
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(5000),
      }),
      getLoyaltyTiers(context),
    ]);

    if (!customerResponse.ok) {
      console.error(
        `Loyalty API returned ${customerResponse.status} fetching customer rewards summary`,
      );
      return fallback;
    }

    const json = (await customerResponse.json()) as LoyaltyCustomerResponse;

    const currentTierIndex = tiers.findIndex((t) => t.name === json.tier);
    const currentTier = currentTierIndex >= 0 ? tiers[currentTierIndex] : undefined;
    const nextTierData =
      currentTierIndex >= 0 ? tiers[currentTierIndex + 1] : undefined;

    return {
      points: json.points,
      accumulatedPoints: json.accumulated_points,
      tier: json.tier,
      nextTier: nextTierData?.name ?? null,
      nextTierAt: nextTierData?.min_points ?? null,
      tierMaxPoints: currentTier?.max_points ?? null,
      expiredMembershipDate: json.expired_membership_date ?? null,
    };
  } catch (error) {
    console.error('Failed to load customer rewards summary from loyalty API:', error);
    return fallback;
  }
}

// Raw shape returned by the loyalty API's
// GET /loyalty/api/customer/rewards?email=... endpoint.
type LoyaltyRewardItem = {
  reward_id: number;
  customer_reward_id: number | null;
  voucher_code: string | null;
  name: string;
  description: string | null;
  reward_type: string;
  points_required: number;
  reward: {
    discount_type: 'fixed' | 'percentage';
    discount_value: number | null;
    applies_to_type: string;
    eligible_products: string[];
    eligible_collections: string[];
  } | null;
  min_requirement: {
    type: string;
    min_spend: number | null;
    min_quantity: number;
  } | null;
  max_redeem: number;
  has_expiry: boolean;
  expiry_value: number | null;
  expiry_unit: string | null;
  status: string;
  is_eligible: boolean;
  assigned_date: string | null;
  // Set once the voucher has actually been redeemed — null/absent for
  // vouchers still sitting in unredeemed_rewards.
  expiry_date: string | null;
  used_date: string | null;
};

// unredeemed_rewards/redeemed_rewards are now paginated envelopes rather
// than plain arrays.
type LoyaltyRewardsPage = {
  data: LoyaltyRewardItem[];
  paging: {
    page: number;
    page_size: number;
    total: number;
    total_pages: number;
  };
};

type LoyaltyRewardsResponse = {
  customer_id: number;
  unredeemed_rewards: LoyaltyRewardsPage;
  redeemed_rewards: LoyaltyRewardsPage;
  status_code: number;
};

function mapLoyaltyReward(reward: LoyaltyRewardItem): AvailableVoucher {
  return {
    id: String(reward.reward_id),
    title: reward.name,
    description: reward.description,
    rewardType: reward.reward_type,
    pointsCost: reward.points_required,
    discountType: reward.reward?.discount_type ?? null,
    discountValue: reward.reward?.discount_value ?? null,
    minSpend: reward.min_requirement?.min_spend ?? null,
    minQuantity: reward.min_requirement?.min_quantity ?? 0,
    maxRedeem: reward.max_redeem,
    hasExpiry: reward.has_expiry,
    isEligible: reward.is_eligible,
  };
}

/**
 * Fetches the logged-in customer's claimable vouchers from the loyalty API
 * (`unredeemed_rewards`). Never throws — a missing config, a logged-out
 * customer, or an API failure all just resolve to an empty list so the page
 * still renders normally (errors are logged server-side).
 */
export async function getAvailableVouchersToClaim(
  context: LoaderFunctionArgs['context'],
): Promise<AvailableVoucher[]> {
  try {
    const {customerAccount, env} = context;
    const apiUrl = env.LOYALTY_API_URL;
    const apiKey = env.LOYALTY_API_KEY;

    if (!apiUrl || !apiKey || !(await customerAccount.isLoggedIn())) {
      return [];
    }

    const {data: customerData} = await customerAccount.query(CUSTOMER_ID_QUERY);
    const email = customerData?.customer?.emailAddress?.emailAddress;
    if (!email) return [];

    const response = await fetch(
      `${apiUrl}/loyalty/api/customer/rewards?email=${encodeURIComponent(email)}`,
      {
        headers: {
          'X-API-Key': apiKey,
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(5000),
      },
    );

    if (!response.ok) {
      console.error(
        `Loyalty API returned ${response.status} fetching available vouchers`,
      );
      return [];
    }

    const json = (await response.json()) as LoyaltyRewardsResponse;
    return (json?.unredeemed_rewards?.data ?? []).map(mapLoyaltyReward);
  } catch (error) {
    console.error('Failed to load available vouchers from loyalty API:', error);
    return [];
  }
}

// Raw shape returned by the loyalty API's
// POST /loyalty/api/customer/rewards/redeem endpoint. On success `error` is
// absent and the customer_reward_id/voucher_code/etc fields are populated;
// on failure it's the reverse — just reward_id/success/status_code/error.
type LoyaltyRedeemResult = {
  reward_id: number;
  success: boolean;
  status_code: number;
  customer_reward_id?: number | null;
  voucher_code?: string | null;
  points_used?: number;
  assigned_date?: string | null;
  error?: string;
};

type LoyaltyRedeemResponse = {
  customer_id: number;
  points_balance: number;
  results: LoyaltyRedeemResult[];
  status_code: number;
};

export type RedeemVoucherResult = {
  success: boolean;
  error?: string;
  voucherCode?: string | null;
  pointsBalance?: number;
};

/**
 * Redeems one claimable voucher via the loyalty API
 * (POST /loyalty/api/customer/rewards/redeem). Never throws — any failure
 * (missing config, logged-out customer, network/API error) comes back as
 * `{success: false}` with a message for the caller to surface.
 */
export async function redeemVoucher(
  context: LoaderFunctionArgs['context'],
  rewardId: string,
): Promise<RedeemVoucherResult> {
  try {
    const {customerAccount, env} = context;
    const apiUrl = env.LOYALTY_API_URL;
    const apiKey = env.LOYALTY_API_KEY;

    if (!apiUrl || !apiKey || !(await customerAccount.isLoggedIn())) {
      return {success: false, error: 'You must be logged in to redeem a voucher.'};
    }

    const {data: customerData} = await customerAccount.query(CUSTOMER_ID_QUERY);
    const email = customerData?.customer?.emailAddress?.emailAddress;
    if (!email) {
      return {success: false, error: 'Could not find your account email.'};
    }

    const rewardIdNumber = Number(rewardId);
    if (!Number.isFinite(rewardIdNumber)) {
      return {success: false, error: 'Invalid voucher.'};
    }

    const response = await fetch(`${apiUrl}/loyalty/api/customer/rewards/redeem`, {
      method: 'POST',
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, reward_ids: [rewardIdNumber]}),
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      console.error(`Loyalty API returned ${response.status} redeeming voucher ${rewardId}`);
      return {success: false, error: 'Redemption failed. Please try again.'};
    }

    const json = (await response.json()) as LoyaltyRedeemResponse;
    const result = json?.results?.find((r) => r.reward_id === rewardIdNumber) ?? json?.results?.[0];

    if (!result?.success) {
      // result.error is an internal/technical message (e.g. a raw Shopify
      // rejection) — log it for debugging, but never show it to the customer.
      console.error(`Loyalty API rejected redemption of voucher ${rewardId}:`, result);
      return {success: false, error: 'Redemption failed. Please try again.'};
    }

    return {success: true, voucherCode: result.voucher_code, pointsBalance: json.points_balance};
  } catch (error) {
    console.error('Failed to redeem voucher via loyalty API:', error);
    return {success: false, error: 'Redemption failed. Please try again.'};
  }
}