"use client";

import { cn } from "../../../lib/cn";

export default function Select({ className, id, children, ...props }) {
  return (
    <select
      id={id}
      className={cn(
        "field-control w-full rounded-sm px-3 transition-shadow duration-200 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}
