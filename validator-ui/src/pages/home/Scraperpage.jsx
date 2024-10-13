import { Home } from './components/filters/HeaderFilters';
import { AddScraperForm } from '../account/scraper/components/AddScraperForm';
import { useScraperSelector } from '../../store/scraper.selector';
import { SCRAPER_OPTION } from './components/filters/constants';
import { useScrapersQuery } from '../../services/landing/landing.queries';
import { Folder } from '../account/scraper/components/Folders';
import { LoadingPage } from '../../components/LoadingPage';
import { Alert } from '../../components/Alert';
import Loading from '../../components/Loading';
import { useState, useEffect } from 'react';
import { infiniteScroll } from '../../hooks/infiniteScroll';

/**
 * Scraperpage component that handles the display and management of scrapers.
 *
 * This component uses infinite scrolling to load more scrapers and displays them in a grid layout.
 * It also includes an alert system to notify users of various statuses and actions.
 *
 * @component
 * @returns {JSX.Element} The rendered Scraperpage component.
 *
 * @example
 * return (
 *   <Scraperpage />
 * )
 *
 * @function
 * @name Scraperpage
 *
 * @description
 * The Scraperpage component fetches and displays scrapers using infinite scrolling. It manages the state of scrapers,
 * alert messages, and alert types. It also includes a form component for adding new scrapers.
 *
 * @hook
 * @name useState
 * @description Manages the state of scrapers, alert messages, and alert types.
 *
 * @hook
 * @name useEffect
 * @description Updates the scrapers state when new data is fetched.
 *
 * @param {Object} data - The data object returned from the infiniteScroll hook.
 * @param {string} status - The status of the data fetching process.
 * @param {Object} error - The error object if an error occurred during data fetching.
 * @param {JSX.Element} button - The button element for loading more scrapers.
 *
 * @param {Array} scrapers - The array of scrapers to be displayed.
 * @param {Function} setScrapers - The function to update the scrapers state.
 *
 * @param {boolean} alertOpen - The state indicating if the alert is open.
 * @param {Function} setAlertOpen - The function to update the alertOpen state.
 * @param {string} alertMessage - The message to be displayed in the alert.
 * @param {Function} setAlertMessage - The function to update the alertMessage state.
 * @param {string} alertType - The type of the alert (e.g., 'success', 'error').
 * @param {Function} setAlertType - The function to update the alertType state.
 *
 * @param {JSX.Element} Home - The Home component that wraps the Scraperpage content.
 * @param {JSX.Element} Home.Header - The header component of the Home component.
 * @param {JSX.Element} AddScraperForm - The form component for adding new scrapers.
 * @param {JSX.Element} Alert - The alert component for displaying messages.
 * @param {JSX.Element} LoadingPage - The component displayed while data is loading.
 * @param {JSX.Element} Loading - The loading indicator component.
 * @param {JSX.Element} Folder - The component for displaying individual scrapers.
 */
export const Scraperpage = () => {
    // Destructure the result of the `infiniteScroll` function call
    const { data, status, error, button } = infiniteScroll(
        useScraperSelector,
        useScrapersQuery,
        'Se incarca mai multe scrapere ...',
        'Se incarca mai multe scrapere',
        'Nu mai sunt scrapere de incarcat',
    );

    const [scrapers, setScrapers] = useState([]);

    useEffect(() => {
        if (data?.pages[0].data?.length > 0) {
            setScrapers(data.pages.map((page) => page.data).flat());
        }
    }, [data]);

    // State hooks for alert message and type
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('success');
    return (
        <Home>
            <Home.Header
                title={'Scraperi'}
                formComponent={
                    <AddScraperForm
                        setScrapers={setScrapers}
                        setAlertOpen={setAlertOpen}
                        setAlertMessage={setAlertMessage}
                        setAlertType={setAlertType}
                    />
                }
                selector={useScraperSelector}
                options={SCRAPER_OPTION}
            />
            <>
                <Alert
                    message={alertMessage}
                    type={alertType}
                    visible={alertOpen}
                    setVisible={setAlertOpen}
                />
                <div className="grid grid-cols-minmax gap-6 px-4 lg:px-6">
                    {status === 'pending' && (
                        <LoadingPage message="Se incarca scraperele">
                            <Loading />
                        </LoadingPage>
                    )}
                    {status === 'error' && (
                        <LoadingPage message="Nu s-au putut incarca scraperele">
                            <Loading lst={[{ name: 'user' }, { name: 'validator-error' }]} />
                        </LoadingPage>
                    )}
                    {status === 'success' && (
                        <>
                            {scrapers.map((scraper, index) => {
                                return (
                                    <Folder
                                        key={index}
                                        scraper={scraper}
                                        setScrapers={setScrapers}
                                        status={status}
                                        setAlertOpen={setAlertOpen}
                                        setAlertMessage={setAlertMessage}
                                        setAlertType={setAlertType}
                                    />
                                );
                            })}
                        </>
                    )}
                </div>
                {button}
            </>
        </Home>
    );
};
