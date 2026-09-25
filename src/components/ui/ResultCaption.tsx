/**
 * "+50% до вартості / нерухомості після ремонту" — breaks before the last three
 * caption words so the result reads as two lines in every locale, per design.
 *
 * Inherits the surrounding font size; on phones it shrinks only when the card
 * is too narrow for the first line (the Russian one is the longest, ~15.6em).
 * Pass `fit={false}` in cells that are too narrow for that and should wrap.
 */
export function ResultCaption({
  value,
  caption,
  fit = true,
}: {
  value: React.ReactNode;
  caption: string;
  fit?: boolean;
}) {
  const words = caption.split(" ");

  return (
    <span className="@container block">
      <span className={`block ${fit ? "max-tablet:text-[min(1em,5.8cqw)]" : ""}`}>
        {value} {words.slice(0, -3).join(" ")}
        <br />
        {words.slice(-3).join(" ")}
      </span>
    </span>
  );
}
