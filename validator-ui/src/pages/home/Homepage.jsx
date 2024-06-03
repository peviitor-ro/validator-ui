import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useDebounce } from '../../hooks/useDebounce';

import { useCompaniesInfiniteQuery } from '../../services/landing/landing.queries';
import { useCompanyOptionsSelector } from '../../store/company.selectors';

import { Cards } from './components/cards/Cards';
import { Home } from './components/filters/CompanyFilter';
import { NoResultFound } from './components/NoResultFound';
import { CompanyCard } from './components/cards/CompanyCard';
import { Container } from '../../components/Container';

import useWindowSize from '../../hooks/useWindowSize';
import Loading from '../../components/Loading';
import { NoMoreResults } from './components/NoMoreResults';
import PropTypes from 'prop-types';

// TODO: Generic error component ??,
// TODO: Home Items, Home Item components

/**
 * Homepage template
 */
export const Template = ({
    data,
    status,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
}) => {
    const { ref, inView } = useInView();

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
                <span>Eroare: {error.message}</span>
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
                                    'Se încarcă mai multe ...'
                                ) : (
                                    <NoMoreResults message="Nu mai sunt companii de afișat" />
                                )}
                            </button>
                        </>
                    )}
                </>
            )}
        </Home>
    );
};

export function Homepage() {
    const { width } = useWindowSize();

    const { order, search } = useCompanyOptionsSelector();
    const debounceSearch = useDebounce(search);

    const { data, status, error, isFetchingNextPage, fetchNextPage, hasNextPage } =
        useCompaniesInfiniteQuery(getPageSize(width), order, debounceSearch);
    return (
        <Template
            data={data}
            status={status}
            error={error}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
        />
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

Template.propTypes = {
    /**
     * Data from the query
     */
    data: PropTypes.object,
    /**
     * Status of the query
     */
    status: PropTypes.oneOf(['success', 'pending', 'error']),
    /**
     * Error object
     */
    error: PropTypes.object,
    /**
     * Flag to check if the next page is being fetched
     */
    isFetchingNextPage: PropTypes.bool,
    /**
     * Function to fetch the next page
     */
    fetchNextPage: PropTypes.func,
    /**
     * Flag to check if there is a next page
     */
    hasNextPage: PropTypes.bool,
};
