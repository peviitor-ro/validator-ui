import { useCompaniesInfiniteQuery } from '../../services/landing/landing.queries';
import { useCompanyOptionsSelector } from '../../store/company.selectors';
import { infiniteScroll } from '../../hooks/infiniteScroll';
import { Cards } from './components/cards/Cards';
import { Home } from './components/filters/HeaderFilters';
import { NoResultFound } from './components/NoResultFound';
import { CompanyCard } from './components/cards/CompanyCard';
import { Container } from '../../components/Container';
import { CompanyForm } from './components/forms/CompanyForm';
import { SORT_OPTIONS } from './components/filters/constants';
import useWindowSize from '../../hooks/useWindowSize';
import Loading from '../../components/Loading';
import PropTypes from 'prop-types';

// TODO: Generic error component ??,
// TODO: Home Items, Home Item components

/**
 * Homepage template
 */
export function Homepage() {
    const { width } = useWindowSize();
    const { data, status, button } = infiniteScroll(
        useCompanyOptionsSelector,
        useCompaniesInfiniteQuery,
        'Se incarca mai multe companii ...',
        'Se incarca mai multe companii',
        'Nu mai sunt companii de incarcat',
        getPageSize(width),
    );
    return (
        <Home>
            <Home.Header
                title={'Companii'}
                formComponent={<CompanyForm />}
                selector={useCompanyOptionsSelector}
                options={SORT_OPTIONS}
            />

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
                            {button}
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
