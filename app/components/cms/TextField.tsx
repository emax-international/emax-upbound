import {RichText} from '@shopify/hydrogen';

/** Renders a metaobject text field that may be rich text (JSON) or plain text. */
export default function TextField({
  value,
  className,
}: {
  value?: string | null;
  className?: string;
}) {
  if (!value) return null;
  if (value.trimStart().startsWith('{')) {
    try {
      if ((JSON.parse(value) as {type?: string})?.type === 'root') {
        return <RichText data={value} className={className} />;
      }
    } catch {
      // not JSON, fall through to plain text
    }
  }
  return (
    <div className={className}>
      <p>{value}</p>
    </div>
  );
}
