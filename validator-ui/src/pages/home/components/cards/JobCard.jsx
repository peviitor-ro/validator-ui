import { useState } from 'react';
import Loading from '../../../../components/Loading';
import { LoadingPage } from '../../../../components/LoadingPage';
import { AnimatedCard } from '../../../../components/AnimatedCard';
import { GridPattern } from '../../../../components/ui/animated-grid-pattern';
import { post } from '../../../../services/landing/landing.service';
import { cn } from '../../../../lib/utils';
import { Paintbrush, RefreshCcwDot, PenIcon, Trash, Globe, PenLine } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { routes } from '../../../../routes/routes';

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
            <GridPattern
                className="absolute top-0 left-0 rounded-tl-lg rounded-tr-lg text-white stroke-none"
                width={5}
                height={5}
                duration={1}
                repeatDelay={0.1}
            />
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
        const response = await post(url, data);
        setAlertCallback('Actiune efectuata cu succes', 'success');
        return response.status;
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
export function JobCard({
    data,
    setJobs,
    setAlertOpen,
    setAlertMessage,
    setAlertType,
    setEditedData,
    setOpenModal,
}) {
    const { job_link, job_title, country, city, county, remote, edited, published, posted } = data;
    const { company } = useParams();

    const setAlert = (message, type) => {
        setAlertOpen(true);
        setAlertMessage(message);
        setAlertType(type);
    };

    // clear job from production
    const [clearLoading, setClearLoading] = useState(false);
    const handleClearCompany = async () => {
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

    // sync jobs
    const [syncLoading, setSyncLoading] = useState(false);
    const handleSyncJobs = async () => {
        await actionButtons({ company: company }, routes.JOBS_SYNC, setAlert, setSyncLoading);
    };

    // delete job
    const [deleteLoading, setDeleteLoading] = useState(false);
    const handleDelete = async () => {
        const response = await actionButtons(
            [data],
            routes.JOBS_DELETE,
            setAlert,
            setDeleteLoading,
        );
        if (response === 200) {
            setJobs((prev) => prev.filter((item) => item.job_link !== data.job_link));
        }
    };

    // publish job
    const [updateLoading, setUpdateLoading] = useState(false);
    const handlePublish = async (e) => {
        const response = await actionButtons(
            [data],
            routes.JOBS_PUBLISH,
            setAlert,
            setUpdateLoading,
        );
        if (response === 200) {
            setJobs((prev) =>
                prev.map((item) =>
                    item.job_link === data.job_link
                        ? {
                              ...item,
                              published: true,
                          }
                        : item,
                ),
            );
        }
    };

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
            icon: <PenIcon className={iconsClasses} />,
        },
        {
            name: 'Sterge',
            onClick: handleDelete,
            icon: <Trash className={iconsClasses} />,
        },
        {
            name: 'Publica Jobul',
            onClick: handlePublish,
            icon: <PenLine className={iconsClasses} />,
        },
        {
            name: 'Vizualizeaza Jobul',
            url: job_link,
            icon: <Globe className={iconsClasses} />,
        },
        {
            name: 'Sterge Joburile din Productie',
            onClick: handleClearCompany,
            icon: <Paintbrush className={iconsClasses} />,
        },
        {
            name: 'Sincronizeaza Joburile',
            onClick: handleSyncJobs,
            icon: <RefreshCcwDot className={iconsClasses} />,
        },
    ];

    return (
        <>
            <AnimatedCard
                navLinks={navLinks}
                cardId={company}
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
            {clearLoading || syncLoading || deleteLoading || updateLoading ? (
                <LoadingPage message={message}>
                    <Loading />
                </LoadingPage>
            ) : null}
        </>
    );
}

function separateByComma(arr) {
    return arr.map((c) => c).join(', ');
}
