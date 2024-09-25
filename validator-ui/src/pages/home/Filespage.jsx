import { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { useScraperFilesQuery } from '../../services/landing/landing.queries';
import { Home } from './components/filters/HeaderFilters';
import { File } from '../../pages/account/scraper/components/File';
import { Loader } from '../../components/Loader';
import { setStatusComponent } from '../account/scraper/components/Folders';
import { ExclamationTriangleIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { InputField } from '../../components/InputField/InputField';

export function Filespage() {
    const { scraperName } = useParams();
    const { data, status } = useScraperFilesQuery(scraperName);

    const [files, setFiles] = useState([]);

    useEffect(() => {
        if (data) {
            setFiles(data.files);
        }
    }, [data]);

    const handelChange = (e) => {
        const filteredFiles = data?.files.filter((file) => {
            return file.name.toLowerCase().includes(e.toLowerCase());
        });
        setFiles(filteredFiles);
    };

    const loadingStatus = setStatusComponent(
        status,
        ['pending', 'error', 'idle'],
        [
            <div
                className="
              flex items-center justify-center
              "
            >
                <Loader
                    message="Se preiau datele"
                    imgStyle="w-32"
                    boxStyle="flex items-center justify-center bg-white bg-opacity-90 rounded-lg shadow-lg h-96 w-96"
                />
            </div>,
            <ExclamationTriangleIcon className="h-32 text-red-500" />,
            <div className="relative h-full flex flex-col gap-2">
                <div
                    className="flex flex-wrap
                      align-center justify-center
                    gap-2 overflow-y-auto no-scrollbar
                    
                    "
                >
                    {files.map((file, index) => {
                        return <File key={index} data={file} endpoint={data.endpoint} />;
                    })}
                </div>
            </div>,
        ],
    );

    return (
        <Home>
            <div
                id="search-container"
                className="flex flex-col gap-2 border-b border-disabled pb-4 lg:flex-row lg:pb-6 lg:items-center"
            >
                <h2 className="text-2xl font-semibold text-gray-500">Fisiere</h2>
                <InputField
                    id="search"
                    onChange={handelChange}
                    fieldClassName="rounded-md bg-card border border-disabled focus:outline-none focus:ring-1 lg:ml-auto"
                    placeholder="Cauta aici..."
                    leftIcon={<MagnifyingGlassIcon className="h-5" />}
                    showError={false}
                />
            </div>
            {loadingStatus}
        </Home>
    );
}
