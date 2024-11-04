import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names into a single string.
 *
 * This function merges class names using `twMerge` and `clsx`.
 *
 * @param {...any} inputs - The class names to combine.
 * @returns {string} The combined class names.
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
