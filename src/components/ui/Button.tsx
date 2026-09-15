import type { ComponentPropsWithoutRef } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "outline" | "dark" | "white";
};

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  
  
  const base =
    "inline-flex items-center justify-center rounded-md px-5 py-3.5 text-[20px] transition-colors outline-none";
  const variants = {
    primary: "bg-brand-red text-white hover:bg-brand-dark ",
    outline: "border border-brand-dark text-brand-dark hover:bg-brand-gray",
    dark: "bg-brand-dark text-white hover:bg-brand-red",
    white: "bg-white text-brand-red hover:bg-brand-dark hover:text-white",
  };

  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
