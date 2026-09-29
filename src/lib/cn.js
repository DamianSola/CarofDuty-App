import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Combina clases Tailwind sin conflictos. */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
