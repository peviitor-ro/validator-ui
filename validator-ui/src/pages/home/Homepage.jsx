import { useCompaniesInfiniteQuery } from '../../services/landing/landing.queries';
import { useCompanyOptionsSelector } from '../../store/company.selectors';
import { infiniteScroll } from '../../hooks/infiniteScroll';
import { LoadingPage } from '../../components/LoadingPage';
import { Cards } from './components/cards/Cards';
import { Home } from './components/filters/HeaderFilters';
import { NoResultFound } from './components/NoResultFound';
import { CompanyCard } from './components/cards/CompanyCard';
import { Container } from '../../components/Container';
import { CompanyForm } from './components/forms/CompanyForm';
import { SORT_OPTIONS } from './components/filters/constants';
import useWindowSize from '../../hooks/useWindowSize';
import Loading from '../../components/Loading';

/**
 * Renders the Homepage component.
 *
 * This component uses the `useWindowSize` hook to get the current window width and the `infiniteScroll` function
 * to handle infinite scrolling of company data. It displays a header with a title and a form component, and
 * conditionally renders loading, error, or data components based on the status of the infinite scroll operation.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered Homepage component.
 */
export function Homepage() {
    const { width } = useWindowSize();
    /**
     * Destructures the result of the `infiniteScroll` function call.
     *
     * @constant
     * @type {Object}
     * @property {Array} data - The data returned by the infinite scroll.
     * @property {string} status - The status of the infinite scroll operation.
     * @property {Error} error - Any error encountered during the infinite scroll operation.
     * @property {boolean} button - Indicates the state of the button in the infinite scroll operation.
     *
     * @param {Function} useCompanyOptionsSelector - Selector function for company options.
     * @param {Function} useCompaniesInfiniteQuery - Query function for fetching companies with infinite scroll.
     * @param {string} loadingMessage - Message displayed while loading more companies.
     * @param {string} loadingMoreMessage - Message displayed while loading more companies.
     * @param {string} noMoreDataMessage - Message displayed when there are no more companies to load.
     * @param {number} pageSize - The size of each page of data to be loaded.
     */
    const { data, status, error, button } = infiniteScroll(
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
                <LoadingPage message={'Se incarca companiile ...'} />
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

/**
 * Determines the page size based on the given width.
 *
 * @param {number} width - The width of the viewport.
 * @returns {number} The page size corresponding to the given width.
 */
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
