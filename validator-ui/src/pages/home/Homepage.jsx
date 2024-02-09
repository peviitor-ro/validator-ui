import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Container } from '../../components/Container';
import Loading from '../../components/Loading';
import useWindowSize from '../../hooks/useWindowSize';
import { useCompaniesInfiniteQuery } from '../../services/landing/landing.queries';
import { CompanyCards } from './components/CompanyCards';
import NoResultFound from './components/NoResultFound';

// TODO:  Generic error component ??,
// TODO: Generic filter components
// TODO: When filters and sorting are available extract logic into new component

export function Homepage() {
    const { ref, inView } = useInView();

    const { width } = useWindowSize();

    const { data, status, error, isFetchingNextPage, fetchNextPage, hasNextPage } =
        useCompaniesInfiniteQuery(getPageSize(width));

    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [fetchNextPage, inView]);

    if (!data?.pages[0].data?.length) {
        return <NoResultFound />;
    }

    return (
        <main className="flex flex-col gap-4 p-4 lg:gap-10 lg:p-10 ">
            <div>
                <h1>Companii</h1>
                <p className="font-semibold">{data.pages[0].count} de rezultate</p>
            </div>

            {status == 'pending' ? (
                <Container className="flex">
                    <Loading className="w-28 m-auto" />
                </Container>
            ) : status == 'error' ? (
                <span>Error: {error.message}</span>
            ) : (
                <>
                    <div className="grid grid-cols-minmax gap-6">
                        {data?.pages.map((page, index) => (
                            <CompanyCards key={index} companies={page.data} />
                        ))}
                    </div>

                    <button
                        ref={ref}
                        onClick={() => fetchNextPage()}
                        disabled={!hasNextPage || isFetchingNextPage}
                        className="m-auto"
                    >
                        {isFetchingNextPage ? (
                            <>
                                <span className="text-xl">Loading more ...</span>
                                <Loading className="w-28" />
                            </>
                        ) : hasNextPage ? (
                            'Load Newer'
                        ) : (
                            ''
                        )}
                    </button>
                </>
            )}
        </main>
    );
}

function getPageSize(width) {
    if (width < 576) {
        return 5;
    } else if (width < 768) {
        return 10;
    } else if (width < 1024) {
        return 15;
    }

    return 20;
}
