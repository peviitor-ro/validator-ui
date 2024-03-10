import { useState } from 'react';
import clsx from 'clsx';

import {
    FolderPlusIcon,
    FolderMinusIcon,
    ExclamationTriangleIcon,
    TrashIcon,
    ArrowPathIcon,
    CheckIcon,
} from '@heroicons/react/24/outline';

import { useScraperFilesQuery } from '../../../../services/landing/landing.queries';
import { deleteScraper, updateScraper } from '../../../../services/landing/landing.service';

import { File } from './File';
import Loading from '../../../../components/Loading';

export function Folder({ scraper }) {
    const { data, status, error } = useScraperFilesQuery(scraper.name);
    const [deleteStatus, setDeleteStatus] = useState('idle');
    const [updateStatus, setUpdateStatus] = useState('idle');

    function handleDelete() {
        const responseStatus = deleteScraper(scraper.name);
        setDeleteStatus('pending');
        responseStatus
            .then((status) => {
                if (status === 200) {
                    window.location.reload();
                }
            })
            .catch((error) => {
                setDeleteStatus(error.message);
            });
    }

    function handleUpdate() {
        const responseStatus = updateScraper(scraper.name);
        setUpdateStatus('pending');
        responseStatus

            .then((data) => {
                if (data.success) {
                    setUpdateStatus('resolved');
                } else {
                    setUpdateStatus(data.error);
                }
            })
            .catch((error) => {
                setUpdateStatus(error.message);
            });
    }

    const [open, setOpen] = useState(false);

    const folderOpenClasses = clsx('ml-6', {
        'h-0 overflow-hidden': !open,
    });

    let deleteStatusButon;
    switch (deleteStatus) {
        case 'pending':
            deleteStatusButon = <Loading className="w-5" />;
            break;
        case 'idle':
            deleteStatusButon = <TrashIcon className="h-5 text-red-500" title="Sterge" />;
            break;
        default:
            deleteStatusButon = (
                <ExclamationTriangleIcon
                    className="h-5 text-red-500"
                    title={`Error: ${deleteStatus}`}
                />
            );
            break;
    }

    let updateStatusButon;
    switch (updateStatus) {
        case 'pending':
            updateStatusButon = <Loading className="w-5" />;
            break;
        case 'idle':
            updateStatusButon = <ArrowPathIcon className="h-5 text-green-500" title="Update" />;
            break;
        case 'resolved':
            updateStatusButon = <CheckIcon className="h-5 text-green-500" title="Success" />;
            break;
        default:
            updateStatusButon = (
                <ExclamationTriangleIcon
                    className="h-5 text-red-500"
                    title={`Error: ${updateStatus}`}
                />
            );
            break;
    }

    return (
        <div className="flex flex-col bg-white rounded-md shadow-md my-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 p-2 ">
                    <button className="text-amber-500" onClick={() => setOpen(!open)}>
                        {open ? (
                            <FolderMinusIcon className="h-5" title="Inchide" />
                        ) : (
                            <FolderPlusIcon className="h-5" title="Deschide" />
                        )}
                    </button>
                    <p>{scraper.name}</p>
                    {status === 'pending' ? (
                        <div className="flex items-center">
                            <Loading className="w-5" />
                        </div>
                    ) : (
                        status === 'error' && (
                            <ExclamationTriangleIcon
                                className="h-5 text-red-500"
                                title={`Error: ${error.message}`}
                            />
                        )
                    )}
                </div>
                <div className="flex gap-2 text-gray-500 mr-2">
                    <button onClick={handleDelete}>{deleteStatusButon}</button>
                    <button onClick={handleUpdate}>{updateStatusButon}</button>
                </div>
            </div>

            <div className={folderOpenClasses}>
                {data?.files.map((file, index) => {
                    return <File key={index} data={file} endpoint={scraper.endpoint} />;
                })}
            </div>
        </div>
    );
}
