/**
 * "+50% до вартості нерухомості / після ремонту" — breaks before the last two
 * caption words so the result reads as two lines in every locale, per design.
 *
 * Inherits the surrounding font size; on phones it shrinks only when the card
 * is too narrow for the first line (the Russian one is the longest, ~15.6em).
 */
export function ResultCaption({
  value,
  caption,
}: {
  value: React.ReactNode;
  caption: string;
}) {
  const words = caption.split(" ");

  return (
    <span className="@container block">
      <span className="block max-tablet:text-[min(1em,5.8cqw)]">
        {value} {words.slice(0, -2).join(" ")}
        <br />
        {words.slice(-2).join(" ")}
      </span>
    </span>
  );
}
