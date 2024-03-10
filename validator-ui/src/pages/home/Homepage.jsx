import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useDebounce } from '../../hooks/useDebounce';

import { useCompaniesInfiniteQuery } from '../../services/landing/landing.queries';
import { useCompanyOptionsSelector } from '../../store/Company.selectors';

import { Cards } from './components/cards/Cards';
import { Home } from './components/filters/CompanyFilter';
import { NoResultFound } from './components/NoResultFound';
import { CompanyCard } from './components/cards/CompanyCard';
import { Container } from '../../components/Container';

import useWindowSize from '../../hooks/useWindowSize';
import Loading from '../../components/Loading';

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

            {status === 'pending' ? (
                <Container className="flex">
                    <Loading className="w-28 m-auto" />
                </Container>
            ) : status === 'error' ? (
                <span>Error: {error.message}</span>
            ) : (
                <>
                    {!data?.pages[0].data?.length ? (
                        <NoResultFound />
                    ) : (
                        <>
                            <div className="grid grid-cols-minmax gap-6">
                                {data?.pages.map((page, index) => {
                                    const uniqueKey = `company_${index}`;
                                    return (
                                        <Cards
                                            key={uniqueKey}
                                            data={page.data}
                                            component={CompanyCard}
                                        />
                                    );
                                })}
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
