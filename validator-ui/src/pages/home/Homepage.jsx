import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Container } from '../../components/Container';
import Loading from '../../components/Loading';
import { useCompaniesInfiniteQuery } from '../../services/landing/landing.queries';
import { CompanyCards } from './components/CompanyCards';

//     {
//         id: 1,
//         company: 'Veeam',
//         logo: 'https://img.veeam.com/careers/logo/veeam/veeam_logo_bg.svg',
//         description:
//             'Lorem ipsum dolor sit amet, consectetur adipiscing elit,
//         link: '#',
//         website: '',
//         jobsCount: 15,
//     },
// ];

// TODO: Generic No data component, Generic error component ??,
// TODO: Generic filter components
// ! When filters and sorting are available extract logic into new component

// TODO: Placeholders for company fields, disable view jobs if jobs count is 0

export function Homepage() {
    const { ref, inView } = useInView();

    const { data, status, error, isFetchingNextPage, fetchNextPage, hasNextPage } =
        useCompaniesInfiniteQuery();

    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [fetchNextPage, inView]);

    return (
        <main className="flex flex-col gap-4 p-4 lg:gap-10 lg:p-10 ">
            <div>
                <h1>Companii</h1>
                <p className="font-semibold">{data?.pages[0].count} de rezultate</p>
                {/* <SelectField /> */}
            </div>

            {status == 'pending' ? (
                <Container className="flex">
                    <Loading className="w-28 m-auto" />
                </Container>
            ) : status == 'error' ? (
                <span>Error: {error.message}</span>
            ) : (
                <>
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
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
