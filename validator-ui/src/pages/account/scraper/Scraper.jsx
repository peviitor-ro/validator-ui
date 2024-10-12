import React, { useState, useEffect } from 'react';
import { infiniteScroll } from '../../../hooks/infiniteScroll';
import { useScrapersQuery } from '../../../services/landing/landing.queries';
import { useScraperSelector } from '../../../store/scraper.selector';
import { Folder } from './components/Folders';
import Loading from '../../../components/Loading';
import { LoadingPage } from '../../../components/LoadingPage';
import { Alert } from '../../../components/Alert';

/**
 * Scraper component that handles the display and management of scrapers.
 * Utilizes infinite scrolling to load more scrapers as the user scrolls.
 *
 * @component
 * @returns {JSX.Element} The rendered Scraper component.
 *
 * @example
 * <Scraper />
 *
 * @typedef {Object} Scraper
 * @property {string} id - The unique identifier of the scraper.
 *
 * @typedef {Object} Data
 * @property {Array<{ data: Scraper[] }>} pages - The pages of scrapers data.
 *
 * @typedef {Object} InfiniteScrollResult
 * @property {Data} data - The data returned from the infinite scroll.
 * @property {string} status - The status of the data fetching ('pending', 'error', 'success').
 * @property {Error} error - The error object if an error occurred.
 * @property {JSX.Element} button - The button element for loading more data.
 *
 * @typedef {Object} AlertProps
 * @property {string} message - The alert message.
 * @property {string} type - The type of alert ('success', 'error', etc.).
 * @property {boolean} visible - Whether the alert is visible.
 * @property {Function} setVisible - Function to set the visibility of the alert.
 *
 * @typedef {Object} FolderProps
 * @property {Scraper} scraper - The scraper object.
 * @property {Function} setScrapers - Function to update the scrapers state.
 * @property {string} status - The status of the data fetching.
 * @property {Function} setAlertOpen - Function to set the alert visibility.
 * @property {Function} setAlertMessage - Function to set the alert message.
 * @property {Function} setAlertType - Function to set the alert type.
 *
 * @hook
 * @name useScraperSelector
 * @description Custom hook to select scraper data from the state.
 *
 * @hook
 * @name useScrapersQuery
 * @description Custom hook to query scrapers data.
 *
 * @hook
 * @name infiniteScroll
 * @description Custom hook to handle infinite scrolling.
 * @param {Function} useSelector - The selector hook to use.
 * @param {Function} useQuery - The query hook to use.
 * @param {string} loadingMessage - The message to display while loading more data.
 * @param {string} loadingMoreMessage - The message to display while loading more data.
 * @param {string} noMoreDataMessage - The message to display when no more data is available.
 * @returns {InfiniteScrollResult} The result of the infinite scroll.
 */
export function Scraper() {
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
                        {scrapers.map((scraper) => {
                            return (
                                <Folder
                                    key={scraper.id}
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
    );
}
