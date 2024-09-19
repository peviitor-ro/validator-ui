import { NoMoreResults } from '../pages/home/components/NoMoreResults';
import Loading from '../components/Loading';

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
