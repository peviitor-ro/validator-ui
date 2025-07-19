import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDebounce } from '../../../../hooks/useDebounce';
import { useCitiesSelector } from '../../../../store/cities.selector';
import { useCitiesQuery } from '../../../../services/landing/landing.queries';
import { useJobStore } from '../../../../store/job.state';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { City } from './City';
import { routes } from '../../../../routes/routes';
import Loading from '../../../../components/Loading';
import clsx from 'clsx';
import * as yup from 'yup';
import { Button } from '../../../../components/Button';
import { LoadingPage } from '../../../../components/LoadingPage';
import { post } from '../../../../services/landing/landing.service';

// form validation schema
const schema = yup.object().shape({
    job_title: yup.string().required('Titlul jobului este obligatoriu'),
    job_link: yup.string().url().required('Link-ul jobului este obligatoriu'),
    city: yup.array().of(yup.string()),
    county: yup.array().of(yup.string()),
    remote: yup.array().of(yup.string()),
    edited: yup.boolean().required(),
});

/**
 * JobForm component for editing job details.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.jobData - Initial job data.
 * @param {Function} props.setJobsData - Function to update the jobs data.
 * @param {Function} props.setOpenModal - Function to control the modal state.
 * @param {Function} props.setAlertOpen - Function to control the alert state.
 * @param {Function} props.setAlertMessage - Function to set the alert message.
 * @param {Function} props.setAlertType - Function to set the alert type.
 * @returns {JSX.Element} The JobForm component.
 *
 * @example
 * <JobForm
 *   jobData={jobData}
 *   setJobsData={setJobsData}
 *   setOpenModal={setOpenModal}
 *   setAlertOpen={setAlertOpen}
 *   setAlertMessage={setAlertMessage}
 *   setAlertType={setAlertType}
 * />
 */
export function JobForm({
    jobData,
    setJobsData,
    setOpenModal,
    setAlertOpen,
    setAlertMessage,
    setAlertType,
}) {
    // State hooks for alert message and type
    const [loading, setLoading] = useState(false);
    const setAlert = (message, type) => {
        setLoading(false);
        setAlertOpen(true);
        setAlertMessage(message);
        setAlertType(type);
    };

    const store = useJobStore();
    const [propsdata, setPropsData] = useState(jobData);

    const { job_link, job_title, country, city, county, remote, edited, published, posted } =
        propsdata;

    useEffect(() => {
        store.setJob({ ...propsdata });
    }, [propsdata, jobData]);

    // form validation
    const {
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm({ resolver: yupResolver(schema) });

    // form submit handler
    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await post(routes.JOBS_EDIT, [propsdata]);
            // if the response is 200, update the job in the store and close the modal
            if (response.status === 200) {
                let changedJob = propsdata;
                changedJob.edited = true;
                setPropsData({ ...changedJob });
                setJobsData((prev) =>
                    prev.map((item) => (item.job_link === propsdata.job_link ? changedJob : item)),
                );

                setOpenModal(false);
                setAlert('Jobul a fost editat cu succes', 'success');
            } else {
                // if the response is not 200, set an error message
                setError('job_title', { type: 'manual', message: 'A aparut o eroare' });
                setAlert('A aparut o eroare', 'error');
            }
        } catch (error) {
            setLoading(false);
            setError('job_title', { type: 'manual', message: error.message });
            setAlert('A aparut o eroare', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleClick = (e) => {
        e.preventDefault();
        handleSubmit(onSubmit(e))();
    };

    // city search
    const { search, setSearch } = useCitiesSelector();
    useDebounce(search);

    // fetch cities
    const { data, status, error, isFetchingNextPage, fetchNextPage, hasNextPage } = useCitiesQuery(
        10,
        search,
    );

    // infinite scroll
    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [fetchNextPage, inView]);

    useEffect(() => {
        setSearch(city?.[0]);
    }, [setSearch, city]);

    // form change handler
    const changeHandler = (e) => {
        if (e.target.id === 'remote') {
            const options = e.target.options;
            const value = [];
            for (const option of options) {
                if (option.selected) {
                    value.push(option.value);
                }
            }
            setPropsData({ ...propsdata, [e.target.id]: value.join(',') });
            return;
        }
        setPropsData({ ...propsdata, [e.target.id]: e.target.value });
    };

    // city select handler
    const handleCitySelect = (e) => {
        const [selectedCity, selectedCounty] = e.target.getAttribute('value').split(',');
        const cities = new Set([selectedCity, ...city]);
        const counties = new Set([selectedCounty, ...county]);
        setPropsData({ ...propsdata, city: Array.from(cities), county: Array.from(counties) });
        setOpen(false);
    };

    // city search ref
    const selectRef = useRef(null);

    const handlerCityOnChange = (e) => {
        setSearch(e.target.value);
    };

    // close dropdown on click outside
    document.addEventListener('click', (e) => {
        if (e.target.id !== 'search') {
            setOpen(false);
        }
    });

    const [open, setOpen] = useState(false);

    const dropdownClasses = clsx(
        'flex flex-col gap-2 absolute bg-white z-10 w-full max-h-60 overflow-y-auto border rounded-md shadow-md p-2 left-0 border-input mt-2',
        {
            hidden: !open || data?.pages[0].data.length === 0,
        },
    );

    return (
        <>
            <h1 className="text-2xl font-semibold">Editare Job</h1>
            <form className="flex flex-col gap-2 text-gray-500">
                <div className="flex flex-col">
                    <label>Titlu</label>
                    <input
                        className="border-input h-full w-full p-2"
                        id="job_title"
                        placeholder="Titlu"
                        type="text"
                        defaultValue={job_title}
                        onChange={changeHandler}
                    />
                </div>
                <div className="flex flex-col">
                    <label>Link</label>
                    <input
                        className="border-input h-full w-full p-2"
                        id="job_link"
                        placeholder="Link"
                        type="text"
                        defaultValue={job_link}
                        disabled
                    />
                </div>
                <div className="border-input h-full w-full p-2">
                    <label>Localitatea</label>
                    <div className="relative">
                        <div className="flex items-center ">
                            <input
                                className="border-input h-full w-full p-2"
                                ref={selectRef}
                                type="text"
                                name="Search"
                                id="search"
                                placeholder="Oras"
                                defaultValue={city?.[0]}
                                onChange={handlerCityOnChange}
                                onFocus={(e) => {
                                    e.target.value = '';
                                    setOpen(true);
                                }}
                            />
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    selectRef.current.value = '';
                                    setPropsData({ ...propsdata, city: [], county: [] });
                                }}
                            >
                                <XMarkIcon className="absolute w-5  h-full top-1/2 transform -translate-y-1/2 right-2" />
                            </button>
                        </div>

                        <ul className={dropdownClasses} name="city_search" id="city_search">
                            {data?.pages
                                .map((page) => page.data)
                                .flat()
                                .map((obj, index) => {
                                    const name = obj.name.replace('all', 'tot judetul ');
                                    return (
                                        <li
                                            value={[obj.name, obj.county]}
                                            key={index}
                                            className="border-input h-full w-full p-2 cursor-pointer hover:bg-gray-200"
                                            onClick={handleCitySelect}
                                        >
                                            {name.includes('tot judetul')
                                                ? `${name}`
                                                : `${name} ,jud: ${obj.county}`}
                                        </li>
                                    );
                                })}

                            <button
                                ref={ref}
                                onClick={() => fetchNextPage()}
                                disabled={!hasNextPage || isFetchingNextPage}
                                className="m-auto"
                            >
                                {status === 'pending' || isFetchingNextPage || hasNextPage ? (
                                    <span className="text-sm">Se incarca mai multe orase ...</span>
                                ) : null}
                            </button>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-1 text-xs text-gray-500 mt-2">
                        <div className="flex gap-1 flex-wrap">
                            {city?.length > 1 ? 'Orase' : 'Oras'}:{' '}
                            {city?.length
                                ? city.map((city) => (
                                      <City
                                          cityProp={city.replace('all', 'tot judetul ')}
                                          propsData={propsdata}
                                          setPropsData={setPropsData}
                                          key={city}
                                      />
                                  ))
                                : 'Niciun oras specificat'}
                        </div>
                        <p>
                            {county?.length > 1 ? 'Judete' : 'Judet'}:{' '}
                            {county?.length ? county.join(', ') : 'Niciun judet specificat'}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="remote">Tipul Jobului</label>
                    <select
                        className="border-input h-32 w-full p-2"
                        id="remote"
                        onChange={changeHandler}
                        defaultValue={remote.split(',')}
                        multiple
                    >
                        <option value="">Fara selectie</option>
                        {['remote', 'on-site', 'hybrid'].map((choice) => (
                            <option key={choice} value={choice.toLowerCase()}>
                                {choice}
                            </option>
                        ))}
                    </select>
                </div>
                <Button text="Editati" onClick={handleClick} />
            </form>
            {loading && (
                <LoadingPage message="Se editeaza Jobul">
                    <Loading />
                </LoadingPage>
            )}
        </>
    );
}
