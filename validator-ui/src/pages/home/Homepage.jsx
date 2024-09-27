import React, { useEffect, useState } from 'react';
import { useCompaniesInfiniteQuery } from '../../services/landing/landing.queries';
import { useCompanyOptionsSelector } from '../../store/company.selectors';
import { infiniteScroll } from '../../hooks/infiniteScroll';
import { LoadingPage } from '../../components/LoadingPage';
import { Alert } from '../../components/Alert';
import { Home } from './components/filters/HeaderFilters';
import { NoResultFound } from './components/NoResultFound';
import { CompanyCard } from './components/cards/CompanyCard';
import { CompanyForm } from './components/forms/CompanyForm';
import { SORT_OPTIONS } from './components/filters/constants';
import useWindowSize from '../../hooks/useWindowSize';

/**
 * The Homepage component is responsible for rendering the main page of the application.
 * It handles infinite scrolling to load company data and displays it in a grid layout.
 *
 * @component
 * @returns {JSX.Element} The rendered Homepage component.
 *
 * @example
 * return (
 *   <Homepage />
 * )
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
        'Se incarca mai multe companii',
        'Se incarca mai multe companii',
        'Nu mai sunt companii de incarcat',
        getPageSize(width),
    );

    /**
     * State hook to manage the list of companies.
     *
     * @type {Array}
     * @default []
     */
    const [companies, setCompanies] = useState([]);

    // State hooks for alert message and type
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('success');

    // Update the companies list when the data changes
    useEffect(() => {
        if (data?.pages[0].data?.length > 0) {
            setCompanies(data.pages.map((page) => page.data).flat());
        }
    }, [data]);

    return (
        <Home>
            <Home.Header
                title={'Companii'}
                formComponent={
                    <CompanyForm
                        setCompanies={setCompanies}
                        setAlertOpen={setAlertOpen}
                        setAlertMessage={setAlertMessage}
                        setAlertType={setAlertType}
                    />
                }
                selector={useCompanyOptionsSelector}
                options={SORT_OPTIONS}
            />

            <Alert
                message={alertMessage}
                type={alertType}
                visible={alertOpen}
                setVisible={setAlertOpen}
            />

            {status === 'pending' ? (
                <LoadingPage message={'Se incarca companiile'} />
            ) : status === 'error' ? (
                <span>Eroare: {error.message}</span>
            ) : (
                <>
                    {!data?.pages[0].data?.length ? (
                        <NoResultFound />
                    ) : (
                        <>
                            <div className="grid grid-cols-minmax gap-6">
                                {companies.map((company, index) => {
                                    const uniqueKey = `company_${index}`;
                                    return (
                                        <CompanyCard
                                            key={uniqueKey}
                                            data={company}
                                            setCompanies={setCompanies}
                                            setAlertOpen={setAlertOpen}
                                            setAlertMessage={setAlertMessage}
                                            setAlertType={setAlertType}
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
