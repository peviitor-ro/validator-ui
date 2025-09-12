import { useState, useCallback } from 'react';
import Loading from '../../../../components/Loading';
import { LoadingPage } from '../../../../components/LoadingPage';
import { AnimatedCard } from '../../../../components/AnimatedCard';
import { post } from '../../../../services/landing/landing.service';
import { cn } from '../../../../lib/utils';
import { useParams } from 'react-router-dom';
import { routes } from '../../../../routes/routes';

import pencil from '../../../../assets/icons/pencil.png';
import deleteIcon from '../../../../assets/icons/delete.png';
import www from '../../../../assets/icons/www.png';
import upload from '../../../../assets/icons/upload.png';
import syncIcon from '../../../../assets/icons/sync.png';
import clean from '../../../../assets/icons/clean.png';

/**
 * Badge component that displays a text inside a styled div with a grid pattern background.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.text - The text to display inside the badge.
 * @param {string} [props.className] - Additional class names to apply to the badge.
 * @returns {JSX.Element} The rendered Badge component.
 */
function Badge({ text, className }) {
    const classes = cn(
        'relative border-x border-t h-[30px] flex items-center justify-center px-6 rounded-tl-lg rounded-tr-lg',
        className,
    );

    return (
        <div className={classes}>
            <p className="font-semibold text-white z-10">{text}</p>
        </div>
    );
}

/**
 * Handles action buttons by sending a POST request and setting alert messages.
 *
 * @param {Object} data - The data to be sent in the POST request.
 * @param {string} url - The URL to which the POST request is sent.
 * @param {Function} setAlertCallback - Callback function to set alert messages.
 * @param {Function} setLoading - Function to set the loading state.
 * @returns {Promise<number>} - The status code of the response.
 */
async function actionButtons(data, url, setAlertCallback, setLoading) {
    setLoading(true);
    try {
        const { status } = await post(url, data);
        setAlertCallback('Actiune efectuata cu succes', 'success');
        return status;
    } catch (error) {
        setAlertCallback('A aparut o eroare', 'error');
    } finally {
        setLoading(false);
    }

    return 400;
}

/**
 * JobCard component renders a card with job details and various action buttons.
 *
 * @param {Object} props - The properties object.
 * @param {Object} props.data - The job data.
 * @param {Function} props.setJobs - Function to update the jobs state.
 * @param {Function} props.setAlertOpen - Function to set the alert open state.
 * @param {Function} props.setAlertMessage - Function to set the alert message.
 * @param {Function} props.setAlertType - Function to set the alert type.
 * @param {Function} props.setEditedData - Function to set the edited data.
 * @param {Function} props.setOpenModal - Function to set the modal open state.
 *
 * @returns {JSX.Element} The rendered JobCard component.
 */
export function JobCard({ data, setJobs, setAlert, setEditedData, setOpenModal }) {
    const { job_link, job_title, country, city, county, remote, edited, published, posted } = data;
    const { id, company } = useParams();

    const companyJobs = data;
    data.companyId = id;

    // clear job from production
    const [clearLoading, setClearLoading] = useState(false);
    const clearJob = async () => {
        await actionButtons({ company: company }, routes.COMPANY_CLEAR, setAlert, setClearLoading);
        setJobs((prev) =>
            prev.map((item) =>
                item.company === company
                    ? {
                          ...item,
                          published: false,
                      }
                    : item,
            ),
        );
    };

    // clear company
    const handleClearCompany = useCallback(() => {
        clearJob();
    });

    // sync jobs
    const [syncLoading, setSyncLoading] = useState(false);
    const syncJob = async () => {
        await actionButtons({ company: id }, routes.JOBS_SYNC, setAlert, setSyncLoading);
    };

    // sync jobs
    const handleSyncJobs = useCallback(() => {
        syncJob();
    });

    // delete job
    const [deleteLoading, setDeleteLoading] = useState(false);
    const deleteJob = async () => {
        const response = await actionButtons(
            [companyJobs],
            routes.JOBS_DELETE,
            setAlert,
            setDeleteLoading,
        );
        if (response === 200) {
            setJobs((prev) => prev.filter((item) => item.job_link !== job_link));
        }
    };

    // delete job
    const handleDelete = useCallback(() => {
        deleteJob();
    });

    // publish job
    const [updateLoading, setUpdateLoading] = useState(false);
    const publishJob = async () => {
        const response = await actionButtons(
            [companyJobs],
            routes.JOBS_PUBLISH,
            setAlert,
            setUpdateLoading,
        );
        if (response === 200) {
            setJobs((prev) =>
                prev.map((item) =>
                    item.job_link === job_link
                        ? {
                              ...item,
                              published: true,
                          }
                        : item,
                ),
            );
        }
    };

    // publish job
    const handlePublish = useCallback(() => {
        publishJob();
        navLinks.splice(2, 1);
    });

    // loading message
    const message = clearLoading
        ? 'Se sterge joburile din productie'
        : syncLoading
          ? 'Se sincronizeaza joburile'
          : deleteLoading
            ? 'Se sterge jobul'
            : updateLoading
              ? 'Se publica jobul'
              : '';

    // navigation links
    const iconsClasses = 'w-5 h-5 lg:w-7 lg:h-7';
    const navLinks = [
        {
            name: 'Editeaza',
            onClick: () => setOpenModal(true),
            icon: <img src={pencil} alt="Editeaza" className={iconsClasses} />,
        },
        {
            name: 'Sterge',
            onClick: handleDelete,
            icon: <img src={deleteIcon} alt="Sterge" className={iconsClasses} />,
        },
        {
            name: 'Publica Jobul',
            onClick: handlePublish,
            icon: <img src={upload} alt="Publica Jobul" className={iconsClasses} />,
        },
        {
            name: 'Vizualizeaza Jobul',
            url: job_link,
            icon: <img src={www} alt="Vizualizeaza Jobul" className={iconsClasses} />,
        },
        {
            name: 'Sterge Joburile din Productie',
            onClick: handleClearCompany,
            icon: <img src={clean} alt="Sterge Joburile din Productie" className={iconsClasses} />,
        },
        {
            name: 'Sincronizeaza Joburile',
            onClick: handleSyncJobs,
            icon: <img src={syncIcon} alt="Sincronizeaza Joburile" className={iconsClasses} />,
        },
    ];

    if (published) {
        navLinks.splice(2, 1);
    }

    return (
        <>
            {clearLoading || syncLoading || deleteLoading || updateLoading ? (
                <LoadingPage message={message}>
                    <Loading />
                </LoadingPage>
            ) : null}
            <AnimatedCard
                navLinks={navLinks}
                cardId={job_link}
                data={data}
                setEditedData={setEditedData}
            >
                <div className="flex flex-col justify-between h-full">
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
                                    {county?.length
                                        ? separateByComma([county])
                                        : 'Niciun judet specificat'}
                                </span>
                                <span>Tara: {separateByComma([country])}</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    Tipul jobului:{' '}
                                    {remote?.length
                                        ? separateByComma([remote])
                                        : 'Nu este precizat'}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                {posted
                                    ? `Publicat la data de: ${new Date(posted).toLocaleDateString()}`
                                    : 'Nepublicat'}
                            </span>
                        </div>
                    </div>
                    <div className="absolute flex gap-2 bottom-0 text-xs ">
                        {published && <Badge text="Publicat" className="bg-green-500" />}
                        {edited && <Badge text="Editat" className="bg-orange-500" />}
                    </div>
                </div>
            </AnimatedCard>
        </>
    );
}

/**
 * Separates the elements of an array by a comma and a space.
 *
 * @param {Array} arr - The array of elements to be separated.
 * @returns {string} A string with the array elements separated by a comma and a space.
 */
function separateByComma(arr) {
    return arr.map((c) => c).join(', ');
}
