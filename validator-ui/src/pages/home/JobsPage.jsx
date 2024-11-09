import { useCallback, useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useJobsInfiniteQuery } from '../../services/landing/landing.queries';
import { useJobsOptionsSelector } from '../../store/jobs.selectors';
import { infiniteScroll } from '../../hooks/infiniteScroll';
import { JOBS_OPTIONS } from './components/filters/constants';
import { JobCard } from './components/cards/JobCard';
import { Home } from './components/filters/HeaderFilters';
import { Analitycs } from './components/Analitycs';
import { LoadingPage } from '../../components/LoadingPage';
import { Modal } from '../../components/Modal';
import { JobForm } from './components/forms/JobForm';
import { Alert } from '../../components/Alert';
import Loading from '../../components/Loading';

/**
 * JobsPage component renders a page displaying available jobs for a specific company.
 * It handles infinite scrolling, job data fetching, and job management functionalities.
 *
 * @component
 * @returns {JSX.Element} The rendered JobsPage component.
 *
 * @example
 * <JobsPage />
 *
 * @description
 * - Uses `useParams` to get the company name from the URL.
 * - Uses `useNavigate` to navigate to different pages.
 * - Uses `infiniteScroll` to fetch job data with infinite scrolling.
 * - Manages job data state with `useState` and `useEffect`.
 * - Displays loading and error states based on the status of the data fetching.
 * - Renders job cards, an alert component, and a modal for job form.
 *
 * @function
 * @name JobsPage
 */
export function JobsPage() {
    // Get the company name from the URL
    const { company } = useParams();

    // Navigate to a different page
    const navigate = useNavigate();

    // Destructure the result of the `infiniteScroll` function call
    const { data, status, button } = infiniteScroll(
        useJobsOptionsSelector,
        useJobsInfiniteQuery,
        'Se incarca mai multe joburi ...',
        'Se incarca mai multe joburi',
        'Nu mai sunt joburi de incarcat',
        company,
        15,
    );

    const [open, setOpen] = useState(false);

    // State hook to manage the list of jobs
    const [jobsData, setJobsData] = useState([]);

    // State hooks for alert message and type
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('success');

    // Function to set the alert message and type
    const setAlert = useCallback((message, type) => {
        setAlertOpen(true);
        setAlertMessage(message);
        setAlertType(type);
    });

    useEffect(() => {
        if (data?.pages[0].data?.length > 0) {
            setJobsData(data.pages.map((page) => page.data).flat());
        }
    }, [data]);

    const [editedData, setEditedData] = useState({});
    return (
        <Home>
            <Home.Header
                title={`Joburi Disponibile ${company}`}
                formComponent={<p>In curs de dezvoltare </p>}
                selector={useJobsOptionsSelector}
                options={JOBS_OPTIONS}
            />
            <Alert
                message={alertMessage}
                type={alertType}
                visible={alertOpen}
                setVisible={setAlertOpen}
            />

            {status === 'pending' ? (
                <LoadingPage message={'Se incarca joburile'}>
                    <Loading />
                </LoadingPage>
            ) : status === 'error' ? (
                navigate('/')
            ) : (
                <>
                    <Analitycs company={company} />

                    <div className="grid grid-cols-minmax gap-6 px-4 lg:px-6">
                        {jobsData.map((job, index) => {
                            const uniqueKey = `job_${index}`;
                            return (
                                <JobCard
                                    key={uniqueKey}
                                    data={job}
                                    setJobs={setJobsData}
                                    setAlert={setAlert}
                                    setEditedData={setEditedData}
                                    setOpenModal={setOpen}
                                />
                            );
                        })}
                    </div>
                    {button}
                </>
            )}

            <Modal open={open} setOpen={setOpen}>
                {open && (
                    <JobForm
                        jobData={editedData}
                        setJobsData={setJobsData}
                        setOpenModal={setOpen}
                        setAlertOpen={setAlertOpen}
                        setAlertMessage={setAlertMessage}
                        setAlertType={setAlertType}
                    />
                )}
            </Modal>
        </Home>
    );
}
// }
