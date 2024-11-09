import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDebounce } from './useDebounce';
import { Button } from './Button';

/**
 * Implements infinite scrolling functionality.
 *
 * @param {Function} selector - A function to select the necessary state.
 * @param {Function} query - A function to fetch data with pagination.
 * @param {string} buttonText - The text to display on the button.
 * @param {string} fetchNextPageText - The text to display when fetching the next page.
 * @param {string} noPagesText - The text to display when there are no more pages.
 * @param {...any} params - Additional parameters to pass to the query function.
 * @returns {Object} An object containing the data, status, error, and button component.
 */
export function infiniteScroll(
    selector,
    query,
    buttonText,
    fetchNextPageText,
    noPagesText,
    ...params
) {
    /**
     * Custom hook that uses the `useInView` hook to provide a reference and a boolean indicating if the element is in view.
     *
     * @returns {Object} An object containing:
     * - `ref` {React.RefObject} - A reference to be attached to the element to observe.
     * - `inView` {boolean} - A boolean indicating if the element is currently in view.
     */
    const { ref, inView } = useInView();

    /**
     * Destructures the `order` and `search` properties from the result of the `selector` function.
     *
     * @constant
     * @type {Object}
     * @property {string} order - The order property from the selector.
     * @property {string} search - The search property from the selector.
     */
    const { order, search } = selector();

    /**
     * Debounced version of the search function to limit the rate at which the search function is called.
     *
     * @constant {Function} debounceSearch - The debounced search function.
     */
    const debounceSearch = useDebounce(search);

    /**
     * Destructures the response from a query hook.
     *
     * @param {...any} params - The parameters for the query.
     * @param {string} order - The order in which to fetch the data.
     * @param {function} debounceSearch - The debounce function for the search.
     * @returns {Object} The query response.
     * @returns {Array} data - The data returned from the query.
     * @returns {string} status - The status of the query.
     * @returns {Error} error - The error object if the query fails.
     * @returns {boolean} isFetchingNextPage - Indicates if the next page is being fetched.
     * @returns {function} fetchNextPage - Function to fetch the next page of data.
     * @returns {boolean} hasNextPage - Indicates if there is a next page to fetch.
     */
    const { data, status, error, isFetchingNextPage, fetchNextPage, hasNextPage } = query(
        ...params,
        order,
        debounceSearch,
    );

    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [inView]);

    /**
     * Creates a Button component with infinite scroll functionality.
     *
     * @param {Object} options - The options for the Button component.
     * @param {React.RefObject} options.ref - The reference to the button element.
     * @param {Function} options.fetchNextPage - The function to fetch the next page of data.
     * @param {boolean} options.hasNextPage - Indicates if there are more pages to fetch.
     * @param {boolean} options.isFetchingNextPage - Indicates if the next page is currently being fetched.
     * @param {string} options.buttonText - The text to display on the button.
     * @param {string} options.fetchNextPageText - The text to display when fetching the next page.
     * @param {string} options.noPagesText - The text to display when there are no more pages.
     * @returns {JSX.Element} The Button component.
     */
    const button = Button({
        ref,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        buttonText,
        fetchNextPageText,
        noPagesText,
    });

    return { data, status, error, button };
}
