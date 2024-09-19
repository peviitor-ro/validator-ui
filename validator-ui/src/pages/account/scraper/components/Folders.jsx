import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

import { FolderIcon } from '@heroicons/react/20/solid';
import { deleteScraper, updateScraper } from '../../../../services/landing/landing.service';
import { Loader } from '../../../../components/Loader';
import { Spinner } from '../../../../components/Spinner';

import Python from '../../../../assets/svgs/Python.svg';
import JavaScript from '../../../../assets/svgs/JavaScript.svg';
import Jmeter from '../../../../assets/svgs/Jmeter.svg';

import {
    ExclamationTriangleIcon,
    TrashIcon,
    ArrowPathIcon,
    CheckIcon,
} from '@heroicons/react/24/outline';

export async function handleFetch(fetch, setStatus) {
    setStatus('pending');
    try {
        const response = await fetch();

        if (response.success || response === 200) {
            setStatus('resolved');
        } else {
            setStatus('error');
        }
    } catch (error) {
        setStatus('error');
    }
}

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

export function Folder({ scraper, status, error }) {
    const [deleteStatus, setDeleteStatus] = useState('idle');
    const [updateStatus, setUpdateStatus] = useState('idle');

    useEffect(() => {
        if (deleteStatus === 'resolved') {
            window.location.reload();
        }
    }, [deleteStatus]);

    const handleDelete = handleFetch.bind(null, () => deleteScraper(scraper.name), setDeleteStatus);
    const handleUpdate = handleFetch.bind(null, () => updateScraper(scraper.name), setUpdateStatus);

    let deleteStatusButon = setStatusComponent(
        deleteStatus,
        ['pending', 'idle', 'resolved', 'error'],
        [
            <span className="w-5 h-5">
                <Spinner />
            </span>,
            <TrashIcon className="h-5" title="Delete" />,
            <CheckIcon className="h-5" title="Success" />,
            <ExclamationTriangleIcon className="h-5" />,
        ],
    );

    let updateStatusButon = setStatusComponent(
        updateStatus,
        ['pending', 'idle', 'resolved', 'error'],
        [
            <span className="w-5 h-5">
                <Spinner />
            </span>,
            <ArrowPathIcon className="h-5" title="Update" />,
            <CheckIcon className="h-5" title="Success" />,
            <ExclamationTriangleIcon className="h-5" />,
        ],
    );

    let folderIcon = setStatusComponent(
        status,
        ['pending', 'error', 'resolved'],
        [
            <Loader message="Se incarca" imgStyle="w-32" />,
            <ExclamationTriangleIcon
                className="h-32 text-red-500"
                title={`Error: ${error?.message}`}
            />,
            <FolderIcon className="h-32" title="Deschide" />,
        ],
    );

    return (
        <div className="bg-white rounded-md shadow-md my-2 h-[400px] w-[300px] card">
            <div className="flex flex-col items-center justify-between h-full">
                <div className="flex flex-col items-center gap-2 p-2 ">
                    <NavLink className="text-amber-500" to={`/scraper/${scraper.name}`}>
                        {folderIcon}
                    </NavLink>
                    <p
                        className={clsx('text-xl font-semibold', {
                            'text-red-500': status === 'error',
                        })}
                    >
                        {scraper.name}
                    </p>
                </div>
                <div className="flex items-center gap-2 p-2">
                    <img className="w-5" src={icons[scraper.language]} alt={scraper.language} />
                    <p
                        className={clsx('text-sm font-semibold', {
                            'text-red-500': status === 'error',
                        })}
                    >
                        {scraper.language}
                    </p>
                </div>
                <div className="flex flex-col justify-center w-full h-full gap-2 mr-2">
                    <button
                        className="flex items-center gap-2 btn btn-green text-center mb-2 text-white"
                        onClick={handleUpdate}
                        disabled={updateStatus === 'pending'}
                    >
                        {updateStatusButon}

                        <p className="w-full text-white">
                            {
                                {
                                    pending: 'Asteapta',
                                    idle: 'Actualizeaza',
                                    resolved: 'Actualizat',
                                    error: 'Eroare',
                                }[updateStatus]
                            }
                        </p>
                    </button>
                    <button
                        className="flex items-center gap-2 btn  btn-red text-center mb-2 text-white"
                        onClick={handleDelete}
                        disabled={deleteStatus === 'pending'}
                    >
                        {deleteStatusButon}{' '}
                        <p className="w-full text-white">
                            {
                                {
                                    pending: 'Asteapta',
                                    idle: 'Sterge',
                                    resolved: 'Sters',
                                    error: 'Eroare',
                                }[deleteStatus]
                            }
                        </p>
                    </button>
                </div>
            </div>
        </div>
    );
}
