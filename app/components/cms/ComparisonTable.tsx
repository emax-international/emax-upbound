import {Image} from '@shopify/hydrogen';
import {useEffect, useRef, useState} from 'react';
import {ComparisonTableFragment} from 'types/storefrontapi.generated';
import {cn} from '~/lib/utils';
import CtaButton from '../CtaButton';
import BuyNowLink from './BuyNowLink';
import TextField from './TextField';

interface ComparisonTableProps {
  reference: ComparisonTableFragment;
  /** Show a "Buy now" button that scrolls to the add-to-cart section
   * (A/B landing pages). The CTA entry, if set, only provides the label. */
  buyNow?: boolean;
}

/** Parses a list.single_line_text_field value (JSON array of strings). */
function parseList(value?: string | null): string[] {
  if (!value) return [];
  try {
    const list = JSON.parse(value) as unknown;
    return Array.isArray(list) ? list.map(String) : [];
  } catch {
    return [];
  }
}

/**
 * Renders a `comparison` metaobject: heading, a comparison table with one
 * highlighted (black) column, and a CTA.
 * - Table header cells can be an image, text, or both.
 * - lg+: background image with the heading + table on the right
 * - below lg: stacked on a plain background, the table scrolls sideways
 *   with a progress indicator underneath
 */
function ComparisonTable({reference, buyNow}: ComparisonTableProps) {
  const {header, label, background_image, table_header, rows, footnote, cta} =
    reference ?? {};

  const headers = (table_header?.references?.nodes ?? []).map((cell) => ({
    id: cell.id,
    text: cell.text?.value ?? '',
    image: cell.image?.reference?.image ?? null,
    highlight: cell.highlight?.value === 'true',
  }));
  const rowsArray = (rows?.references?.nodes ?? []).map((row) => ({
    id: row.id,
    label: row.label?.value ?? '',
    values: parseList(row.values?.value),
  }));

  // Value columns (the row label column comes first and has no header)
  const columnCount = Math.max(
    headers.length,
    ...rowsArray.map((r) => r.values.length),
  );
  // The flagged column, or the first one if none is flagged
  const highlightIndex = Math.max(
    0,
    headers.findIndex((h) => h.highlight),
  );

  const background = background_image?.reference?.image;
  const {scrollRef, thumb, scrollable} = useScrollIndicator();

  if (rowsArray.length === 0) return null;

  const lastRow = rowsArray.length - 1;
  const lastColumn = columnCount - 1;

  // Below lg the label column and the first value column stay frozen while
  // the rest scrolls. Widths are a share of the visible table width (cqw of
  // the scroll container), so the layout scales with the screen.
  const frozenLabel =
    'max-lg:sticky max-lg:left-0 max-lg:z-10 max-lg:w-[30cqw] max-lg:min-w-[30cqw]';
  const frozenFirst =
    'max-lg:sticky max-lg:left-[30cqw] max-lg:z-10 max-lg:w-[38cqw] max-lg:min-w-[38cqw]';
  // Scrolling columns: ~1 column visible beside the frozen ones
  const scrolling = 'max-lg:w-[40cqw] max-lg:min-w-[40cqw]';
  const cellPadding = 'px-3 lg:px-5';

  return (
    <section className="relative my-[60px] lg:my-0 lg:py-[100px] overflow-hidden">
      {background && (
        <Image
          data={background}
          sizes="100vw"
          className="hidden lg:block absolute inset-0 w-full h-full object-cover"
        />
      )}

      <div className="relative lg:w-[55%] lg:ml-auto lg:mr-[6%]">
        {/* Heading */}
        <div
          className={cn(
            'page-px text-center space-y-2 mb-6',
            background && 'lg:text-white',
          )}
        >
          <TextField value={header?.value} className="[&_p]:typo-h1" />
          {/* Size goes on the <p>: the global p style would override the wrapper */}
          <TextField
            value={label?.value}
            className="max-w-[300px] lg:max-w-none mx-auto [&_p]:text-base md:[&_p]:text-lg [&_p]:font-light"
          />
        </div>

        {/* Table: scrolls sideways below lg; pt leaves room for header
            images that rise above the table (e.g. the can) */}
        <div className="px-6 lg:px-0">
          <div
            ref={scrollRef}
            className="@container isolate overflow-x-auto pt-14 lg:pt-20 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <table
              // lg: fixed layout, a narrow label column and equal value columns
              style={
                {'--value-col': `${84 / columnCount}%`} as React.CSSProperties
              }
              className="w-full lg:table-fixed border-separate border-spacing-0 text-xs lg:text-sm xl:text-base leading-snug text-left wrap-break-word hyphens-auto"
            >
              <thead>
                <tr>
                  <th
                    className={cn(
                      'bg-white rounded-tl-lg lg:w-[16%]',
                      frozenLabel,
                    )}
                  />
                  {Array.from({length: columnCount}).map((_, i) => {
                    const cell = headers[i];
                    const isHighlight = i === highlightIndex;
                    return (
                      <th
                        key={cell?.id ?? i}
                        className={cn(
                          cellPadding,
                          'py-3 lg:py-4 align-bottom lg:w-(--value-col)',
                          i === 0 ? frozenFirst : scrolling,
                          isHighlight ? 'bg-black text-white' : 'bg-[#F7F7F7]',
                          i === lastColumn && 'rounded-tr-lg',
                        )}
                      >
                        {cell?.image && (
                          <Image
                            data={cell.image}
                            width={240}
                            className="block h-auto max-h-24 lg:max-h-36 w-auto max-w-full object-contain -mt-14 lg:-mt-20"
                          />
                        )}
                        {cell?.text && (
                          <span className={cn(cell.image && 'block mt-2')}>
                            {cell.text}
                          </span>
                        )}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {rowsArray.map((row, rowIndex) => {
                  const isLast = rowIndex === lastRow;
                  // Non-highlight columns alternate white / grey, starting white
                  const isStriped = rowIndex % 2 === 1;
                  return (
                    <tr key={row.id ?? rowIndex}>
                      <th
                        scope="row"
                        className={cn(
                          cellPadding,
                          'bg-[#F2F2F2] font-medium py-4 lg:py-5',
                          frozenLabel,
                          isLast && 'rounded-bl-lg',
                        )}
                      >
                        {row.label}
                      </th>
                      {Array.from({length: columnCount}).map((_, i) => {
                        const isHighlight = i === highlightIndex;
                        return (
                          <td
                            key={i}
                            className={cn(
                              cellPadding,
                              'py-4 lg:py-5',
                              i === 0 ? frozenFirst : scrolling,
                              isHighlight
                                ? 'bg-black text-mint'
                                : cn(
                                    'text-black/80',
                                    isStriped ? 'bg-[#F7F7F7]' : 'bg-white',
                                  ),
                              isLast && i === lastColumn && 'rounded-br-lg',
                            )}
                          >
                            {row.values[i]}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile scroll indicator */}
        {scrollable && (
          <div className="lg:hidden page-px mt-6">
            <div className="relative h-[3px] w-20 mx-auto rounded-full bg-[#E5E5E5] overflow-hidden">
              <div
                className="absolute inset-y-0 rounded-full bg-black"
                style={{width: `${thumb.width}%`, left: `${thumb.left}%`}}
              />
            </div>
          </div>
        )}

        {footnote?.value && (
          <TextField
            value={footnote.value}
            className={cn(
              'page-px lg:px-0 mt-4 lg:text-center [&_p]:text-xs [&_p]:text-mid-grey',
              background && 'lg:[&_p]:text-white/70',
            )}
          />
        )}

        {buyNow ? (
          <div className="page-px lg:px-0 mt-8 lg:flex lg:justify-center">
            <BuyNowLink
              position="comparison"
              label={cta?.reference?.label?.value}
              className="w-full lg:w-1/2 hover:bg-black hover:text-white"
            />
          </div>
        ) : (
          cta?.reference && (
            <div className="page-px lg:px-0 mt-8 lg:flex lg:justify-center">
              <CtaButton
                reference={cta.reference}
                className="w-full lg:w-auto lg:min-w-[150px] bg-mint text-black hover:bg-black hover:text-white uppercase rounded-md"
              />
            </div>
          )
        )}
      </div>
    </section>
  );
}

/** Tracks horizontal scroll of an element for a progress-bar style indicator. */
function useScrollIndicator() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [thumb, setThumb] = useState({width: 100, left: 0});
  const scrollable = thumb.width < 100;

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const update = () => {
      const width = Math.min(100, (el.clientWidth / el.scrollWidth) * 100);
      const maxScroll = el.scrollWidth - el.clientWidth;
      const progress = maxScroll > 0 ? el.scrollLeft / maxScroll : 0;
      setThumb({width, left: progress * (100 - width)});
    };
    update();
    el.addEventListener('scroll', update, {passive: true});
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => {
      el.removeEventListener('scroll', update);
      observer.disconnect();
    };
  }, []);

  return {scrollRef, thumb, scrollable};
}

export default ComparisonTable;
