"use client";

import { cn } from "../../../lib/cn";

export default function Textarea({ className, id, ...props }) {
  return (
    <textarea
      id={id}
      className={cn(
        "field-control min-h-[96px] w-full rounded-sm px-3 py-2 transition-shadow duration-200 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}
