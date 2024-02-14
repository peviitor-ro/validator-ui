import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Container } from '../../components/Container';
import Loading from '../../components/Loading';
import { useDebounce } from '../../hooks/useDebounce';
import useWindowSize from '../../hooks/useWindowSize';
import { useCompaniesInfiniteQuery } from '../../services/landing/landing.queries';
import { useCompanyOptionsSelector } from '../../store/Company.selectors';
import { CompanyCards } from './components/CompanyCards';
import { Home } from './components/Home';
import { NoResultFound } from './components/NoResultFound';

// TODO: Generic error component ??,
// TODO: Home Items, Home Item components

export function Homepage() {
    const { ref, inView } = useInView();

    const { width } = useWindowSize();

    const { order, search } = useCompanyOptionsSelector();
    const debounceSearch = useDebounce(search);

    const { data, status, error, isFetchingNextPage, fetchNextPage, hasNextPage } =
        useCompaniesInfiniteQuery(getPageSize(width), order, debounceSearch);

    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [fetchNextPage, inView]);

    return (
        <Home>
            <Home.Header data={data} />

            {status == 'pending' ? (
                <Container className="flex">
                    <Loading className="w-28 m-auto" />
                </Container>
            ) : status == 'error' ? (
                <span>Error: {error.message}</span>
            ) : (
                <>
                    {!data?.pages[0].data?.length ? (
                        <NoResultFound />
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
                </>
            )}
        </Home>
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
