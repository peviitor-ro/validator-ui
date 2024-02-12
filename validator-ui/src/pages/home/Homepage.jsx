import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Container } from '../../components/Container';
import Loading from '../../components/Loading';
import useWindowSize from '../../hooks/useWindowSize';
import { useCompaniesInfiniteQuery } from '../../services/landing/landing.queries';
import { useCompanyOptionsSelector } from '../../store/Company.selectors';
import { CompanyCards } from './components/CompanyCards';
import NoResultFound from './components/NoResultFound';
import SelectOrderField from './components/SelectOrderField';

// TODO:  Generic error component ??,

export function Homepage() {
    const { ref, inView } = useInView();

    const { width } = useWindowSize();

    const { order } = useCompanyOptionsSelector();
    const { data, status, error, isFetchingNextPage, fetchNextPage, hasNextPage } =
        useCompaniesInfiniteQuery(getPageSize(width), order);

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
            <div className="grid grid-cols-fixed items-center">
                <h1 className="col-start-1 col-end-2 flex-1">Companii</h1>
                <p className="font-semibold col-start-1 col-end-2">
                    {data.pages[0].count} de rezultate
                </p>

                <SelectOrderField />
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
