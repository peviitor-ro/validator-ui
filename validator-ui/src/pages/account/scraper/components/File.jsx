import { useState, useEffect } from 'react';
import { DocumentTextIcon } from '@heroicons/react/20/solid';
import { handleFetch } from './Folders';
import { post } from '../../../../services/landing/landing.service';
import { AnimatedCard } from '../../../../components/AnimatedCard';
import { Play } from 'lucide-react';
import { LoadingPage } from '../../../../components/LoadingPage';
import Loading from '../../../../components/Loading';

/**
 * Component representing a file with associated actions and status.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.data - The data related to the file.
 * @param {string} props.data.name - The name of the file.
 * @param {string} props.endpoint - The endpoint to post the file data.
 * @param {Function} props.setAlert - Function to set alert messages.
 *
 * @returns {JSX.Element} The rendered component.
 */
export function File({ data, endpoint, setAlert }) {
    const [status, setStatus] = useState('idle');

    useEffect(() => {
        if (status === 'error') {
            setAlert('A aparut o eroare', 'error');
        }
    }, [status]);

    // handle run file
    const handleRunFile = handleFetch.bind(
        null,
        () => post(endpoint, { file: data.name }),
        setStatus,
        setAlert,
    );

    // navigation links
    const iconsClasses = 'w-5 h-5 lg:w-7 lg:h-7';
    const navLinks = [
        {
            name: 'Ruleaza',
            onClick: handleRunFile,
            icon: <Play className={iconsClasses} />,
        },
    ];

    return (
        <>
            <AnimatedCard navLinks={navLinks} cardId={data.name} data={data}>
                <div className="flex flex-col items-center gap-2 p-2">
                    <DocumentTextIcon className="w-32 text-blue-500" />
                    <p className="ml-2 font-semibold text-xl text-center">{data.name}</p>
                </div>
            </AnimatedCard>
            {!['idle', 'resolved', 'error'].includes(status) ? (
                <LoadingPage message={`Se ruleaza scraperul ${data.name}`}>
                    <Loading />
                </LoadingPage>
            ) : null}
        </>
    );
}
