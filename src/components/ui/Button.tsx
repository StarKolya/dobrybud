import type { ComponentPropsWithoutRef } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "outline";
};

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors";
  const variants = {
    primary: "bg-brand-red text-white hover:bg-[#a50d10]",
    outline: "border border-brand-dark text-brand-dark hover:bg-brand-gray",
  };

  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
