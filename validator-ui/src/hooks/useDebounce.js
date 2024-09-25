import { useEffect, useState } from 'react';

/**
 * Custom hook that debounces a value by a specified delay.
 *
 * @param {any} value - The value to debounce.
 * @param {number} [delay=500] - The delay in milliseconds for debouncing.
 * @returns {any} - The debounced value.
 *
 * @example
 * const debouncedSearchTerm = useDebounce(searchTerm, 300);
 */
export function useDebounce(value, delay = 500) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}
