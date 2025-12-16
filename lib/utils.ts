import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names with intelligent Tailwind merging.
 * Example:
 * cn("px-2", condition && "text-red-500", "px-4")
 * → "px-4 text-red-500"
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
