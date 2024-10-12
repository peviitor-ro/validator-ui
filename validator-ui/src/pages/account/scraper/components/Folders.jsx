import { useState } from 'react';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { post } from '../../../../services/landing/landing.service';
import { routes } from '../../../../routes/routes';
import { FolderIcon } from '@heroicons/react/20/solid';

import Python from '../../../../assets/svgs/Python.svg';
import JavaScript from '../../../../assets/svgs/JavaScript.svg';
import Jmeter from '../../../../assets/svgs/Jmeter.svg';

import { AnimatedCard } from '../../../../components/AnimatedCard';
import { Trash, RefreshCcw } from 'lucide-react';
import { LoadingPage } from '../../../../components/LoadingPage';
import Loading from '../../../../components/Loading';

/**
 * Handles the fetch operation and updates the status and alert accordingly.
 *
 * @param {Function} fetch - The fetch function to execute.
 * @param {Function} setStatus - Function to update the status.
 * @param {Function} setAlert - Function to set the alert message and type.
 * @param {Function} [setScrapers=null] - Optional function to update the scrapers list.
 * @param {string} [scraperNname=''] - The name of the scraper to be removed from the list.
 * @returns {Promise<void>} - A promise that resolves when the fetch operation is complete.
 */
export async function handleFetch(
    fetch,
    setStatus,
    setAlert,
    setScrapers = null,
    scraperNname = '',
) {
    setStatus('pending');
    try {
        const response = await fetch();

        if (response.data.success && response.status === 200) {
            setStatus('resolved');
            setAlert('Actiune efectuata cu succes', 'success');
            if (setScrapers) {
                setScrapers((prev) => prev.filter((scraper) => scraper.name !== scraperNname));
            }
        } else {
            setStatus('error');
            setAlert('A aparut o eroare', 'error');
        }
    } catch (error) {
        setStatus('error');
        setAlert('A aparut o eroare', 'error');
    }
}

/**
 * Determines the component to be displayed based on the given status.
 *
 * @param {string} status - The current status to match.
 * @param {string[]} statuses - An array of possible statuses.
 * @param {React.Component[]} components - An array of components corresponding to each status.
 * @returns {React.Component} - The component that matches the given status.
 */
export function setStatusComponent(status, statuses, components) {
    const totalStatuses = statuses.length;
    let statusComponent = components[totalStatuses - 1];
    for (let i = 0; i < totalStatuses; i++) {
        if (status === statuses[i]) {
            statusComponent = components[i];
            break;
        }
    }

    return statusComponent;
}

const icons = {
    Python: Python,
    JavaScript: JavaScript,
    Jmeter: Jmeter,
};

/**
 * Folder component that displays information about a scraper and provides options to delete or update it.
 *
 * @param {Object} props - The properties object.
 * @param {Object} props.scraper - The scraper object containing details about the scraper.
 * @param {Function} props.setScrapers - Function to update the list of scrapers.
 * @param {string} props.status - The status of the scraper.
 * @param {Function} props.setAlertOpen - Function to set the alert open state.
 * @param {Function} props.setAlertMessage - Function to set the alert message.
 * @param {Function} props.setAlertType - Function to set the alert type.
 *
 * @returns {JSX.Element} The Folder component.
 */
export function Folder({
    scraper,
    setScrapers,
    status,
    setAlertOpen,
    setAlertMessage,
    setAlertType,
}) {
    // State hooks for alert message and type
    const [deleteStatus, setDeleteStatus] = useState('idle');
    const [updateStatus, setUpdateStatus] = useState('idle');

    // Function to set the alert message and type
    const setAlert = (message, type) => {
        setAlertOpen(true);
        setAlertMessage(message);
        setAlertType(type);
    };

    // Function to handle the delete operation
    const handleDelete = handleFetch.bind(
        null,
        () => post(routes.SCRAPER_DELETE, { name: scraper.name }),

        setDeleteStatus,
        setAlert,
        setScrapers,
        scraper.name,
    );

    // Function to handle the update operation
    const handleUpdate = handleFetch.bind(
        null,
        () => post(routes.SCRAPER_UPDATE + scraper.name + '/', { update: true }),
        setUpdateStatus,
        setAlert,
    );

    // navigation links
    const iconsClasses = 'w-5 h-5 lg:w-7 lg:h-7';
    const navLinks = [
        {
            name: 'Sterge',
            onClick: handleDelete,
            icon: <Trash className={iconsClasses} />,
        },
        {
            name: 'Actualizeaza',
            onClick: handleUpdate,
            icon: <RefreshCcw className={iconsClasses} />,
        },
    ];

    return (
        <>
            <AnimatedCard navLinks={navLinks} cardId={scraper.name} data={scraper}>
                <div className="flex flex-col items-center gap-2 p-2 ">
                    <NavLink className="text-amber-500" to={`/scraper/${scraper.name}`}>
                        <FolderIcon className="h-32" title="Deschide" />,
                    </NavLink>
                    <p
                        className={clsx('text-xl font-semibold', {
                            'text-red-500': status === 'error',
                        })}
                    >
                        {scraper.name}
                    </p>
                </div>
                <div className="flex items-center justify-center gap-2 p-2">
                    <img className="w-10" src={icons[scraper.language]} alt={scraper.language} />
                    <p
                        className={clsx('text-sm font-semibold', {
                            'text-red-500': status === 'error',
                        })}
                    >
                        {scraper.language}
                    </p>
                </div>
            </AnimatedCard>
            {!['idle', 'resolved', 'error'].includes(updateStatus) && (
                <LoadingPage
                    message={
                        {
                            pending: 'Se Actualizeaza',
                            idle: 'Actualizeaza',
                            resolved: 'Sters',
                            error: 'Eroare',
                        }[updateStatus]
                    }
                >
                    <Loading />
                </LoadingPage>
            )}

            {!['idle', 'resolved', 'error'].includes(deleteStatus) && (
                <LoadingPage
                    message={
                        {
                            pending: 'Se Sterge',
                            idle: 'Sterge',
                            resolved: 'Sters',
                            error: 'Eroare',
                        }[deleteStatus]
                    }
                >
                    <Loading />
                </LoadingPage>
            )}
        </>
    );
}
