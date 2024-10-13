import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useScraperFilesQuery } from '../../services/landing/landing.queries';
import { Home } from './components/filters/HeaderFilters';
import { File } from '../../pages/account/scraper/components/File';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { InputField } from '../../components/InputField/InputField';
import { LoadingPage } from '../../components/LoadingPage';
import Loading from '../../components/Loading';
import { Alert } from '../../components/Alert';

/**
 * Filespage component fetches and displays files related to a specific scraper.
 * It includes a search functionality to filter files by name and displays alerts for errors.
 *
 * @component
 * @returns {JSX.Element} The rendered Filespage component.
 *
 * @example
 * return (
 *   <Filespage />
 * )
 *
 * @function
 * @name Filespage
 *
 * @description
 * - Fetches files using `useScraperFilesQuery` hook based on the `scraperName` from URL parameters.
 * - Manages state for files, alert messages, and alert types.
 * - Filters files based on user input in the search field.
 * - Displays an alert message if an error occurs during data fetching.
 *
 * @hook
 * @name useParams
 * @description Extracts `scraperName` from the URL parameters.
 *
 * @hook
 * @name useScraperFilesQuery
 * @description Fetches files data related to the `scraperName`.
 *
 * @hook
 * @name useState
 * @description Manages state for files, alert messages, and alert types.
 *
 * @hook
 * @name useEffect
 * @description Handles side effects such as setting files data and displaying error alerts.
 *
 * @param {Object} data - The data object returned from `useScraperFilesQuery`.
 * @param {string} status - The status of the data fetching process.
 * @param {Object} error - The error object returned from `useScraperFilesQuery`.
 * @param {Array} files - The list of files to be displayed.
 * @param {Function} setFiles - Function to update the files state.
 * @param {boolean} alertOpen - State to control the visibility of the alert.
 * @param {Function} setAlertOpen - Function to update the alert visibility state.
 * @param {string} alertMessage - The message to be displayed in the alert.
 * @param {Function} setAlertMessage - Function to update the alert message state.
 * @param {string} alertType - The type of the alert (e.g., 'success', 'error').
 * @param {Function} setAlertType - Function to update the alert type state.
 * @param {Function} setAlert - Function to set the alert message and type.
 * @param {Function} handelChange - Function to handle the search input change and filter files.
 */
export function Filespage() {
    // Get the scraper name from the URL parameters
    const { scraperName } = useParams();

    // Fetch files data related to the scraper name
    const { data, status, error } = useScraperFilesQuery(scraperName);

    const [files, setFiles] = useState([]);

    useEffect(() => {
        if (data) {
            setFiles(data.data.files);
        }
    }, [data]);

    // Function to handle the search input change and filter files
    const handelChange = (e) => {
        const filteredFiles = data?.files.filter((file) => {
            return file.name.toLowerCase().includes(e.toLowerCase());
        });
        setFiles(filteredFiles);
    };

    // State hooks for alert message and type
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('success');

    // Function to set the alert message and type
    const setAlert = (message, type) => {
        setAlertOpen(true);
        setAlertMessage(message);
        setAlertType(type);
    };

    useEffect(() => {
        if (error) {
            setAlert(error.message, 'error');
        }
    }, [error]);

    return (
        <Home>
            <div
                id="search-container"
                className="flex flex-col bg-card gap-2 p-2 border-b border-disabled lg:flex-row items-center justify-center"
            >
                <Alert
                    message={alertMessage}
                    type={alertType}
                    visible={alertOpen}
                    setVisible={setAlertOpen}
                />
                <h2 className="w-full text-2xl font-semibold text-gray-500">Fisiere</h2>
                <InputField
                    id="search"
                    onChange={handelChange}
                    fieldClassName="w-full lg:w-[300px] rounded-md bg-card border border-disabled focus:outline-none focus:ring-1 lg:ml-auto"
                    placeholder="Cauta aici..."
                    leftIcon={<MagnifyingGlassIcon className="h-5" />}
                    showError={false}
                />
            </div>
            <div className="grid grid-cols-minmax gap-6 px-4 lg:px-6">
                {files.map((file, index) => {
                    return (
                        <File
                            key={index}
                            data={file}
                            endpoint={data.data.endpoint}
                            setAlert={setAlert}
                        />
                    );
                })}
            </div>
            {!['idle', 'success', 'error'].includes(status) && (
                <LoadingPage
                    message={
                        {
                            pending: 'Se incarca Fisierele',
                        }[status]
                    }
                >
                    <Loading />
                </LoadingPage>
            )}
        </Home>
    );
}
