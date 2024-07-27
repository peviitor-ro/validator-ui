import { useState, useEffect } from 'react';
import { Modal } from '../../../../components/Modal';
import { JobForm } from '../forms/JobForm';
import clsx from 'clsx';
import Loading from '../../../../components/Loading';

import { removeJob, publishJob } from '../../../../services/landing/landing.service';

export function JobCard({ data }) {
    const [job, setJob] = useState(data);

    useEffect(() => {
        setJob(data);
    }, [data]);

    const { job_link, job_title, country, city, county, remote, edited, published, posted } = job;
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const containerClasses = clsx(
        'relative flex flex-col gap-4 bg-white shadow rounded border my-2 px-3 pt-2',
        {
            'pb-8': edited || published,
            'pb-2': !edited && !published,
        },
    );

    const handleDelete = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await removeJob(data);
            if (response === 200) {
                window.location.reload();
            } else {
                setLoading(false);
                console.error('A aparut o eroare');
            }
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    };

    const handlePublish = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await publishJob(data);
            if (response === 200) {
                let chaged = job;
                chaged.published = true;
                setJob(chaged);
                setLoading(false);
            } else {
                console.error('A aparut o eroare');
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <div className={containerClasses}>
            <Modal open={open} setOpen={setOpen}>
                {open && <JobForm props={job} set={setJob} setOpen={setOpen} />}
            </Modal>
            <div className="flex flex-col gap-3 ml-2">
                <div className="text-lg font-semibold">{job_title}</div>
                <div className="flex flex-col">
                    <div className="flex flex-col gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <span>
                            {city?.length > 1 ? 'Orase' : 'Oras'}:{' '}
                            {city?.length
                                ? separateByComma([
                                      city.map((c) => c.replace('all', 'tot judetul ')),
                                  ])
                                : 'Niciun oras specificat'}
                        </span>
                        <span>
                            {county?.length > 1 ? 'Judete' : 'Judet'}:{' '}
                            {county?.length ? separateByComma([county]) : 'Niciun judet specificat'}
                        </span>
                        <span>Tara: {separateByComma([country])}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            Tipul jobului:{' '}
                            {remote?.length ? separateByComma([remote]) : 'Nu este precizat'}
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                        {posted
                            ? `Publicat la data de: ${new Date(posted).toLocaleDateString()}`
                            : 'Nepublicat'}
                    </span>
                </div>
                <div
                    className="flex gap-4 text-sm text-gray-700 dark:text-gray-400
                    "
                >
                    {!published ? (
                        <button
                            onClick={handlePublish}
                            className="rounded-full border px-3 py-2 cursor-pointer hover:bg-green-500 hover:text-white active:translate-y-1 w-[100px]"
                        >
                            {loading ? <Loading className="w-5" /> : 'Publicati'}
                        </button>
                    ) : (
                        <button
                            onClick={handleDelete}
                            className="rounded-full border px-3 py-2 cursor-pointer bg-red-500 text-white hover:bg-red-600 active:translate-y-1 w-[100px]"
                        >
                            {loading ? <Loading className="w-5" /> : 'Stergeti'}
                        </button>
                    )}

                    <button onClick={() => setOpen(!open)}>Editati</button>
                    <a href={job_link} target="_blank" className="flex items-center">
                        Catre Job
                    </a>
                </div>
            </div>
            <div className="absolute flex gap-2 bottom-0 text-xs font-semibold text-white">
                {published && (
                    <div className="bg-green-500 h-[30px] flex items-center justify-center px-6 rounded-tl-lg rounded-tr-lg">
                        Post Publicat
                    </div>
                )}
                {edited && (
                    <div className="bg-amber-500 h-[30px] flex items-center justify-center px-6 rounded-tl-lg rounded-tr-lg">
                        Post Modificat
                    </div>
                )}
            </div>
        </div>
    );
}

function separateByComma(arr) {
    return arr.map((c) => c).join(', ');
}
