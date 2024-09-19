import { useState } from 'react';
import { runScraperFile } from '../../../../services/landing/landing.service';
import { ExclamationTriangleIcon, CheckIcon, DocumentTextIcon } from '@heroicons/react/20/solid';
import { handleFetch } from './Folders';
import { setStatusComponent } from './Folders';
import { Spinner } from '../../../../components/Spinner';
import { Loader } from '../../../../components/Loader';

export function File({ data, endpoint }) {
    const [status, setStatus] = useState('idle');

    const handleRunFile = handleFetch.bind(
        null,
        runScraperFile.bind(null, endpoint, data.name),
        setStatus,
    );
    let statusFetch = setStatusComponent(
        status,
        ['pending', 'error', 'idle'],
        [
            <Loader message="Se ruleaza" imgStyle="w-32" />,
            <ExclamationTriangleIcon className="h-32 text-red-500" />,
            <DocumentTextIcon className="w-32 text-blue-500" />,
        ],
    );

    let statusButton = setStatusComponent(
        status,
        ['pending', 'idle', 'resolved', 'error'],
        [
            <span className="w-5 h-5">
                <Spinner />
            </span>,
            null,
            <CheckIcon className="h-5 text-white" title="Success" />,
            <ExclamationTriangleIcon
                className="h-5 text-white"
                title={handleRunFile == 'error' ? handleRunFile.error : handleRunFile.success}
            />,
        ],
    );

    return (
        <div className="flex flex-col items-center justify-around bg-white rounded-md shadow-md my-2 h-[400px] w-[300px] card">
            {statusFetch}
            <p className="ml-2">{data.name}</p>
            <button
                className={`flex items-center gap-2 w-full btn text-center mb-2 ${status === 'error' ? 'btn-red' : 'btn-green'}`}
                onClick={handleRunFile}
                disabled={statusButton === 'pending'}
            >
                {statusButton}

                <p className="w-full text-white">
                    {
                        {
                            pending: 'Asteapta',
                            idle: 'Ruleaza',
                            resolved: 'Ruleaza',
                            error: 'Eroare',
                        }[status]
                    }
                </p>
            </button>
        </div>
    );
}
