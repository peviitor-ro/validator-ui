import { useState } from 'react';
import { runScraperFile } from '../../../../services/landing/landing.service';
import { ExclamationTriangleIcon, CheckIcon, DocumentTextIcon } from '@heroicons/react/20/solid';
import Loading from '../../../../components/Loading';

export function File({ data, endpoint }) {
    const [status, setStatus] = useState('idle');

    function handleRun() {
        setStatus('pending');
        runScraperFile(endpoint, data.name)
            .then((data) => {
                console.log(data);
                if (data.success) {
                    setStatus('resolved');
                } else {
                    setStatus(data.error);
                }
            })
            .catch((error) => {
                setStatus(error.message);
            });
    }

    let runStatusButton;
    switch (status) {
        case 'pending':
            runStatusButton = <Loading className="w-5" />;
            break;
        case 'resolved':
            runStatusButton = <CheckIcon className="h-5 text-green-500" title="Success" />;
            break;
        case 'idle':
            runStatusButton = '';
            break;
        default:
            runStatusButton = (
                <ExclamationTriangleIcon
                    className="h-5 text-red-500"
                    title={status === 'error' ? `Error: ${status}` : status}
                />
            );
    }

    return (
        <button className="flex items-center gap-2 text-gray-500 mb-2" onClick={handleRun}>
            <DocumentTextIcon className="h-5 text-blue-500" />
            <p className="ml-2">{data.name}</p>
            {runStatusButton}
        </button>
    );
}
