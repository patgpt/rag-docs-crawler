import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge multiple class names with Tailwind CSS support
 * @param inputs - Class names to merge
 * @returns Merged class string
 * @example
 * cn("px-2 py-1", "bg-red-500", { "text-white": true })
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
