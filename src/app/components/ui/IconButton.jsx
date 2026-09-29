"use client";

import { cn } from "../../../lib/cn";

export default function IconButton({
  label,
  className,
  children,
  ...props
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-sm text-heading transition-colors hover:bg-body",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
