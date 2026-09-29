"use client";

import { cn } from "../../../lib/cn";

const variants = {
  primary:
    "bg-primary text-body hover:bg-primary-hover shadow-sm",
  secondary:
    "bg-accent text-body hover:opacity-90 shadow-sm",
  outline:
    "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-body",
  ghost:
    "bg-transparent text-heading hover:bg-body",
  danger:
    "bg-danger text-body hover:opacity-90",
};

const sizes = {
  sm: "min-h-10 px-3 text-sm",
  md: "min-h-[46px] px-5 text-base",
  lg: "min-h-12 px-6 text-lg",
};

export default function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  disabled,
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-sm font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
