import { useState } from 'react';

import { PlusIcon } from '@heroicons/react/20/solid';

import { useScrapersQuery } from '../../../services/landing/landing.queries';

import { Container } from '../../../components/Container';
import { Folder } from './components/Folders';
import { AddScraperForm } from './components/AddScraperForm';
import { Modal } from '../../../components/Modal';

import Loading from '../../../components/Loading';

export function Scraper() {
    const { data, status, error } = useScrapersQuery();
    const [open, setOpen] = useState(false);

    return (
        <div className="flex flex-col gap-4 ml-2 p-2">
            {data?.length === 0 ? (
                <h2 className="text-2xl font-semibold text-gray-500 border-b-2 pb-2">No scrapers found</h2>
            ) : data?.length > 1 ? (
                <h2 className="text-2xl font-semibold text-gray-500 border-b-2 pb-2">Scrapers</h2>
            ) : (
                <h2 className="text-2xl font-semibold text-gray-500 border-b-2 pb-2">Scraper</h2>
            )}
            {status === 'pending' ? (
                <Container className="flex">
                    <Loading className="w-28 m-auto" />
                </Container>
            ) : status === 'error' ? (
                <span>Error: {error.message}</span>
            ) : (
                <div className="ml-2">
                    {data?.map((scraper, index) => {
                        return <Folder key={index} scraper={scraper} />;
                    })}
                </div>
            )}
            <div>
                <button
                    className="flex items-center p-2 text-gray-500 mb-2 active:translate-y-1"
                    onClick={() => setOpen(!open)}
                >
                    <PlusIcon className="h-5 text-green-500" />
                    <p>Adaugare</p>
                </button>
            </div>
            <Modal open={open} setOpen={setOpen} className="w-1/3">
                <AddScraperForm />
            </Modal>
        </div>
    );
}
