import { NoMoreResults } from '../pages/home/components/NoMoreResults';
import Loading from '../components/Loading';

/**
 * Button component that handles fetching the next page of data.
 *
 * @param {Object} props - The properties object.
 * @param {React.Ref} props.ref - The reference to the button element.
 * @param {Function} props.fetchNextPage - Function to fetch the next page of data.
 * @param {boolean} props.hasNextPage - Flag indicating if there are more pages to fetch.
 * @param {boolean} props.isFetchingNextPage - Flag indicating if the next page is currently being fetched.
 * @param {string} props.buttonText - Text to display on the button while fetching.
 * @param {string} props.fetchNextPageText - Text to display on the button when there are more pages to fetch.
 * @param {string} props.noPagesText - Text to display when there are no more pages to fetch.
 * @returns {JSX.Element} The rendered button component.
 */
export function Button({
    ref,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    buttonText,
    fetchNextPageText,
    noPagesText,
}) {
    return (
        <button
            ref={ref}
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
            className="m-auto"
        >
            {isFetchingNextPage ? (
                <>
                    <span className="text-xl">{buttonText}</span>
                    <Loading className="w-28" />
                </>
            ) : hasNextPage ? (
                fetchNextPageText
            ) : (
                <NoMoreResults message={noPagesText} />
            )}
        </button>
    );
}
