import { CartForm, Image, type OptimisticCartLine } from '@shopify/hydrogen';
import type { CartLineUpdateInput } from '@shopify/hydrogen/storefront-api-types';
import { MinusIcon, PlusIcon, Trash } from 'lucide-react';
import React, { useEffect } from 'react';
import { FetcherWithComponents, Link } from 'react-router';
import type { CartApiQueryFragment } from 'types/storefrontapi.generated';
import type { CartLayout } from '~/components/CartMain';
import { useVariantUrl } from '~/lib/variants';
import { pushCartEvent } from '~/lib/tracking';
import { useAside } from './Aside';
import { useCartLine } from './CartLineContext';
import { ProductPrice } from './ProductPrice';
import { Button } from './ui/button';

type CartLine = OptimisticCartLine<CartApiQueryFragment>;

/** Pushes add_to_cart / remove_from_cart for a cart line (skips free gifts). */
function trackLine(
  event: 'add_to_cart' | 'remove_from_cart',
  line: CartLine,
  quantity: number,
  lineQuantity: number,
  layout: CartLayout,
) {
  const isGift = line.attributes?.some((a) => a.key === '_is_free_gift' && a.value === 'true');
  if (isGift) return;
  // amountPerQuantity already includes the subscription discount
  const unit = line.cost?.amountPerQuantity;
  pushCartEvent(
    event,
    {
      id: line.merchandise.product.id,
      name: line.merchandise.product.title,
      variant: line.merchandise.title,
      price: parseFloat(unit?.amount ?? '0'),
      quantity,
      currency: unit?.currencyCode ?? 'MYR',
      lineQuantity,
    },
    layout === 'aside' ? 'Cart Drawer' : 'Cart Page',
  );
}


/**
 * A single line item in the cart. It displays the product image, title, price.
 * It also provides controls to update the quantity or remove the line item.
 */
export function CartLineItem({
  layout,
  line,
  giftLineId,
}: {
  layout: CartLayout;
  line: CartLine;
  giftLineId?: string;
}) {
  const { id, merchandise, isOptimistic, sellingPlanAllocation } = line;
  const { product, title, image, selectedOptions } = merchandise;
  const lineItemUrl = useVariantUrl(product.handle, selectedOptions);
  const { close } = useAside();
  const { loadingLineIds } = useCartLine();
  const isLineLoading = loadingLineIds.has(id);
  const isGift = line.attributes?.some((a) => a.key === '_is_free_gift' && a.value === 'true') ?? false;

  return (
    <li key={id} className="flex py-4 border-b border-neutral-400 gap-4 typo-p">
      {image && (
        <div className="aspect-square min-h-[80px] md:min-h-[100px] h-full">
          <Image
            alt={title}
            data={image}
            height={100}
            width={100}
            loading="lazy"
          />
        </div>
      )}
      <div className="grid grid-cols-[1fr_auto] gap-4">
        <div className="space-y-2">
          <Link
            prefetch="intent"
            to={lineItemUrl}
            onClick={() => {
              if (layout === 'aside') {
                close();
              }
            }}
            className="block"
          >
            <p>{product.title}</p>
          </Link>

          <ul>

            {sellingPlanAllocation && (
              <li key={sellingPlanAllocation.sellingPlan.name}>
                <small>{sellingPlanAllocation.sellingPlan.name}</small>
              </li>
            )}
            {selectedOptions.map((option) => (
              <li key={option.name}>
                <p>
                  {option.name}: {option.value}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <CartLineRemoveButton
          lineIds={giftLineId ? [id, giftLineId] : [id]}
          disabled={!!isOptimistic}
          onRemove={() => trackLine('remove_from_cart', line, line.quantity, 0, layout)}
        />
        {isGift ? (
          <div className="col-span-2 flex items-center justify-between">
            <span className="text-xs text-gray-400">Included in your order</span>
            <span className="text-xs bg-mint px-2 py-1 font-bold uppercase tracking-wide rounded-full">
              Free
            </span>
          </div>
        ) : (
          <>
            <CartLineQuantity line={line} giftLineId={giftLineId} layout={layout} />
            <ProductPrice
              price={line?.cost?.totalAmount}
              className="self-end"
              isLoading={isLineLoading || !!isOptimistic}
            />
          </>
        )}
      </div>
    </li>
  );
}

/**
 * Provides the controls to update the quantity of a line item in the cart.
 * These controls are disabled when the line item is new, and the server
 * hasn't yet responded that it was successfully added to the cart.
 */
function CartLineQuantity({
  line,
  giftLineId,
  layout,
}: {
  line: CartLine;
  giftLineId?: string;
  layout: CartLayout;
}) {
  if (!line || typeof line?.quantity === 'undefined') return null;
  const { id: lineId, quantity, isOptimistic } = line;
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = Number((quantity + 1).toFixed(0));

  const decreaseLines: CartLineUpdateInput[] = [
    { id: lineId, quantity: prevQuantity },
    ...(giftLineId ? [{ id: giftLineId, quantity: prevQuantity }] : []),
  ];
  const increaseLines: CartLineUpdateInput[] = [
    { id: lineId, quantity: nextQuantity },
    ...(giftLineId ? [{ id: giftLineId, quantity: nextQuantity }] : []),
  ];

  return (
    <div className="flex w-fit items-center bg-default-grey gap-2 md:gap-[14px]">
      <CartLineUpdateButton lines={decreaseLines}>
        <Button
          aria-label="Decrease quantity"
          disabled={quantity <= 1 || !!isOptimistic}
          name="decrease-quantity"
          value={prevQuantity}
          onClick={() => trackLine('remove_from_cart', line, 1, line.quantity - 1, layout)}
          className="!h-fit !p-2 md:!p-4 rounded-none bg-transparent"
        >
          <MinusIcon />
        </Button>
      </CartLineUpdateButton>
      <div className="text-center">
        <p>{quantity}</p>
      </div>
      <CartLineUpdateButton lines={increaseLines}>
        <Button
          aria-label="Increase quantity"
          name="increase-quantity"
          value={nextQuantity}
          onClick={() => trackLine('add_to_cart', line, 1, line.quantity + 1, layout)}
          disabled={!!isOptimistic}
          className="!h-fit !p-2 md:!p-4 rounded-none bg-transparent"
        >
          <PlusIcon />
        </Button>
      </CartLineUpdateButton>
    </div>
  );
}

/**
 * A button that removes a line item from the cart. It is disabled
 * when the line item is new, and the server hasn't yet responded
 * that it was successfully added to the cart.
 */
function CartLineRemoveButton({
  lineIds,
  disabled,
  onRemove,
}: {
  lineIds: string[];
  disabled: boolean;
  onRemove?: () => void;
}) {
  return (
    <div className="w-fit justify-self-end">
      <CartForm
        fetcherKey={getUpdateKey(lineIds)}
        route="/cart"
        action={CartForm.ACTIONS.LinesRemove}
        inputs={{ lineIds }}
      >
        <Button disabled={disabled} type="submit" variant="ghost" size="icon" onClick={onRemove}>
          <Trash />
        </Button>
      </CartForm>
    </div>
  );
}

function CartLineUpdateButton({
  children,
  lines,
}: {
  children: React.ReactNode;
  lines: CartLineUpdateInput[];
}) {
  const lineIds = lines.map((line) => line.id);
  const { setLineLoading } = useCartLine();

  return (
    <CartForm
      fetcherKey={getUpdateKey(lineIds)}
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{ lines }}
    >
      {(fetcher: FetcherWithComponents<any>) => {
        // Set loading state based on fetcher state
        useEffect(() => {
          const isLoading =
            fetcher.state === 'loading' || fetcher.state === 'submitting';
          lineIds.forEach((id) => {
            setLineLoading(id, isLoading);
          });

          // Cleanup when component unmounts
          return () => {
            lineIds.forEach((id) => {
              setLineLoading(id, false);
            });
          };
        }, [fetcher.state]);

        // Clone the child element (Button) with our props
        const childElement = React.Children.only(
          children,
        ) as React.ReactElement;

        const isLoading =
          fetcher.state === 'loading' || fetcher.state === 'submitting';

        return React.cloneElement(childElement, {
          onClick: (e: React.MouseEvent) => {
            lineIds.forEach((id) => {
              setLineLoading(id, true);
            });
            // Preserve any existing onClick handler
            if (childElement.props.onClick) {
              childElement.props.onClick(e);
            }
          },
          disabled: childElement.props.disabled || isLoading,
          children: childElement.props.children,
        });
      }}
    </CartForm>
  );
}

/**
 * Returns a unique key for the update action. This is used to make sure actions modifying the same line
 * items are not run concurrently, but cancel each other. For example, if the user clicks "Increase quantity"
 * and "Decrease quantity" in rapid succession, the actions will cancel each other and only the last one will run.
 * @param lineIds - line ids affected by the update
 * @returns
 */
function getUpdateKey(lineIds: string[]) {
  return [CartForm.ACTIONS.LinesUpdate, ...lineIds].join('-');
}
