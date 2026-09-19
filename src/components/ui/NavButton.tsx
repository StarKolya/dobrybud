import Image from "next/image";

export function NavButton({
  direction,
  onClick,
  disabled,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}) {
  const isNext = direction === "next";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={isNext ? "Next" : "Previous"}
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors tablet:h-[53px] tablet:w-[53px] ${
        disabled
          ? "cursor-not-allowed bg-white"
          : "bg-brand-red hover:bg-brand-dark"
      }`}
    >
      <Image
        src={disabled ? "/icons/arrows/black.svg" : "/icons/arrows/white.svg"}
        alt=""
        width={24}
        height={24}
        className={`h-[18px] w-[18px] tablet:h-6 tablet:w-6 ${disabled ? "opacity-30" : ""} ${
          isNext === disabled ? "-scale-x-100" : ""
        }`}
      />
    </button>
  );
}
