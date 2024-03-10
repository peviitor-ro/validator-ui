import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useParams, useNavigate } from 'react-router-dom';

import { useDebounce } from '../../hooks/useDebounce';

import { useJobsInfiniteQuery } from '../../services/landing/landing.queries';
import { useJobsOptionsSelector } from '../../store/jobs.selectors';

import { Cards } from './components/cards/Cards';
import { JobCard } from './components/cards/JobCard';
import { Home } from './components/filters/JobsFilter';
import { Analitycs } from './components/Analitycs';

import Loading from '../../components/Loading';

export function JobsPage() {
    const { company } = useParams();
    const navigate = useNavigate();

    const { ref, inView } = useInView();

    const { order, search } = useJobsOptionsSelector();
    const debounceSearch = useDebounce(search);

    const { data, status, isFetchingNextPage, fetchNextPage, hasNextPage } = useJobsInfiniteQuery(
        company,
        10,
        order,
        debounceSearch,
    );

    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [fetchNextPage, inView]);

    if (status === 'loading') {
        return (
            <Container className="flex">
                <Loading className="w-28 m-auto" />
            </Container>
        );
    } else if (status === 'error') {
        navigate('/');
    }
    return (
        <Home>
            <Home.Header data={data} company={company} />
            <Analitycs company={company} />

            <div>
                <div>
                    <div className="flex flex-col gap-4 ">
                        {data?.pages.map((page, index) => {
                            const uniqueKey = `job_${index}`;
                            return <Cards key={uniqueKey} data={page.data} component={JobCard} />;
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
                            'Load More'
                        ) : (
                            'Nothing more to load'
                        )}
                    </button>
                </div>
            </div>
        </Home>
    );
}
