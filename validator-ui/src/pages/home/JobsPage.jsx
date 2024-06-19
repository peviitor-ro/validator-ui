import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useParams, useNavigate } from 'react-router-dom';

import { useDebounce } from '../../hooks/useDebounce';

import { useJobsInfiniteQuery } from '../../services/landing/landing.queries';
import { useJobsOptionsSelector } from '../../store/jobs.selectors';
import { clearCompany, syncJobs } from '../../services/landing/landing.service';

import { Cards } from './components/cards/Cards';
import { JobCard } from './components/cards/JobCard';
import { Home } from './components/filters/JobsFilter';
import { Analitycs } from './components/Analitycs';

import Loading from '../../components/Loading';

import { ChevronDoubleLeftIcon } from '@heroicons/react/24/outline';

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

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [syncLoading, setSyncLoading] = useState(false);

    const handleclearCompany = async () => {
        setLoading(true);
        try {
            await clearCompany(company);
            window.location.reload();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSyncJobs = async () => {
        setSyncLoading(true);
        try {
            await syncJobs(company);
            window.location.reload();
        } catch (error) {
            console.error(error);
        } finally {
            setSyncLoading(false);
        }
    };

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
        <>
            <Home>
                <Home.Header data={data} company={company} />
                <Analitycs company={company} />
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
            </Home>
            {/* Sidebar */}
            {/* Move this to a separate component */}
            <div
                className={`flex flex-col pt-20 justify-start gap-4 fixed top-0 right-0 transform p-4 h-screen z-1000 border-l-2  transition-all duration-300 ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <button
                    className="transform -translate-x-full w-10 absolute"
                    onClick={() => setOpen(!open)}
                >
                    <div className="opacity-80 bg-gray-900 w-6 h-6 rounded-l-md text-white hover:bg-red-500">
                        <ChevronDoubleLeftIcon
                            className={`w-6 h-6  text-white px-1 cursor-pointer ${open ? 'rotate-180' : 'rotate-0'}`}
                        />
                    </div>
                </button>
                <div className="absolute top-0 right-0 w-full h-full opacity-80 bg-gray-900 z-0"></div>

                <button
                    className="flex gap-2 justify-center items-center rounded-md border p-1 cursor-pointer bg-red-500 text-white active:translate-y-1 z-10 hover:bg-red-400 w-[100px] text-[10px]"
                    title="Sterge toate joburile din productie"
                    onClick={handleclearCompany}
                >
                    {loading ? <Loading className="w-5" /> : 'Sterge joburile din productie'}
                </button>
                <button
                    className="flex gap-2 justify-center items-center rounded-md border p-1 cursor-pointer bg-green-500 text-white active:translate-y-1 z-10 hover:bg-green-400 w-[100px] text-[10px]"
                    title="Publica toate joburile"
                >
                    Publica toate joburile
                </button>
                <button
                    className="flex gap-2 justify-center items-center rounded-md border p-1 cursor-pointer bg-yellow-500 text-white active:translate-y-1 z-10 hover:bg-yellow-400 w-[100px] text-[10px]"
                    title="Sinconizeaza joburile"
                    onClick={handleSyncJobs}
                >
                    {syncLoading ? <Loading className="w-5" /> : 'Sincronizeaza joburile'}
                </button>
            </div>
        </>
    );
}
