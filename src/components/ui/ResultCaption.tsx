/**
 * "+50% до вартості / нерухомості після ремонту" — breaks after the first two
 * caption words so the result reads as two lines in every locale, per design.
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
    <>
      {value} {words.slice(0, 2).join(" ")}
      <br />
      {words.slice(2).join(" ")}
    </>
  );
}
