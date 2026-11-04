import {AccordionFragment} from 'types/storefrontapi.generated';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import {cn} from '~/lib/utils';

interface HeroAccordionProps {
  reference: AccordionFragment;
  titleCentered?: boolean;
  className?: string;
  /** Extra classes for the title (split layout), e.g. a heavier weight */
  titleClassName?: string;
  size?: 'default' | 'small';
  /**
   * split: title on the left, questions as cards on the right (1 column on
   * mobile). Defaults to split when the metaobject's variant is "split".
   */
  layout?: 'default' | 'split';
}

function HeroAccordion({
  reference,
  className,
  titleClassName,
  size = 'default',
  layout: layoutProp,
}: HeroAccordionProps) {
  const {
    title,
    type,
    collapsible,
    iconVariant,
    variant,
    numberedContent,
    content,
  } = reference ?? {};
  const accordionItems = content?.references?.nodes ?? [];
  const isCollapsible = collapsible?.value === 'true';
  const isNumbered = numberedContent?.value === 'true';

  const isSmall = size === 'small';
  const layout =
    layoutProp ?? (variant?.value === 'split' ? 'split' : 'default');

  if (isSmall) {
    return (
      <div className={cn('w-full flex flex-col gap-4', className)}>
        {accordionItems.map((item, index) => (
          <div key={index} className="flex flex-col">
            <p className="typo-caption-responsive-uppercase flex gap-3">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <span>{item.title?.value}</span>
            </p>
            <p className="typo-p text-mid-grey whitespace-pre-line">
              {item.description?.value}
            </p>
          </div>
        ))}
      </div>
    );
  }

  if (layout === 'split') {
    return (
      <div
        className={cn(
          'w-full flex flex-col md:flex-row md:items-center gap-6 md:gap-12',
          className,
        )}
      >
        {title?.value && (
          <p className={cn('typo-h1 text-center md:w-1/2', titleClassName)}>
            {title.value}
          </p>
        )}
        <Accordion
          type={isCollapsible ? 'single' : 'multiple'}
          collapsible={isCollapsible}
          className="w-full md:w-1/2 space-y-2"
        >
          {accordionItems.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-0 bg-[#F5F5F5] rounded-lg px-4"
            >
              <AccordionTrigger
                iconVariant="plusMinus"
                className="py-4 text-xs md:text-[13px] font-semibold hover:no-underline"
              >
                <span className="flex-1 wrap-break-word">
                  {item.title?.value}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <p className="text-xs md:text-[13px] text-mid-grey whitespace-pre-line">
                  {item.description?.value}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'max-w-content my-25 px-4 md:px-8 py-8 bg-white rounded-xl space-y-3',
        className,
      )}
    >
      {title?.value && (
        <p
          className={cn(
            'typo-caption text-neutral uppercase',
            variant?.value === 'faq' && 'text-center',
          )}
        >
          {title.value}
        </p>
      )}

      <Accordion
        type={isCollapsible ? 'single' : 'multiple'}
        collapsible={isCollapsible}
      >
        {accordionItems.map((item, index) => {
          const itemNumber = String(index + 1).padStart(2, '0');

          return (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-neutral-900 border-t border-b-0"
            >
              <AccordionTrigger
                iconVariant={iconVariant?.value === 'plus' ? 'plus' : 'arrow'}
                className="flex items-center gap-2 md:gap-0 pt-5 data-[state=closed]:pb-5 data-[state=open]:pb-4 data-[state=open]:md:pb-5"
              >
                {isNumbered && <span className="w-[10%]">{itemNumber}</span>}
                <span className="flex-1 wrap-break-word typo-p">
                  {item.title?.value}
                </span>
              </AccordionTrigger>
              <AccordionContent className="flex pb-6">
                {isNumbered && <span className="w-[10%]" />}
                <p className="flex-1 typo-p-small whitespace-pre-line">
                  {item.description?.value}
                </p>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}

export default HeroAccordion;
