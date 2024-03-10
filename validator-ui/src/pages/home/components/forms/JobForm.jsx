import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { useCitiesSelector } from '../../../../store/cities.selector';
import { useCitiesQuery } from '../../../../services/landing/landing.queries';

import { useJobSelector } from '../../../../store/job.selector';
import { useJobStore } from '../../../../store/job.state';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { editJob } from '../../../../services/landing/landing.service';

import Loading from '../../../../components/Loading';

const schema = yup.object().shape({
    job_title: yup.string().required(),
    job_link: yup.string().url().required(),
    city: yup.array().of(yup.string().required()),
    county: yup.array().of(yup.string().required()),
    remote: yup.array().of(yup.string().required()),
    edited: yup.boolean().required(),
});

export function JobForm({ ...props }) {
    const store = useJobStore();
    const [propsdata, setPropsData] = useState(props);

    const { job_title, job_link, city, county, remote } = propsdata;

    useEffect(() => {
        store.setJob({ ...propsdata });
    }, [propsdata]);

    const [loading, setLoading] = useState(false);
    const {
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(propsdata);

        try {
            const response = await editJob(propsdata);
            if (response === 200) {
                window.location.reload();
            } else {
                setError('job_title', { type: 'manual', message: 'A aparut o eroare' });
            }
        } catch (error) {
            setLoading(false);
            setError('job_title', { type: 'manual', message: error.message });
        } finally {
            setLoading(false);
        }
    };

    const handleClick = (e) => {
        handleSubmit(onSubmit(e));
    };

    const { search, setSearch } = useCitiesSelector();
    const { data } = useCitiesQuery(10, search);

    useEffect(() => {
        setSearch(city?.[0]);
    }, [setSearch, city]);

    const changeHandler = (e) => {
        setPropsData({ ...propsdata, [e.target.id]: e.target.value });
    };

    const handleCitySelect = (e) => {
        const [selectedCity, selectedCounty] = e.target.getAttribute('value').split(',');
        const cities = new Set([selectedCity, ...city]);
        const counties = new Set([selectedCounty, ...county]);
        setPropsData({ ...propsdata, city: Array.from(cities), county: Array.from(counties) });
        setOpen(false);
    };

    const selectRef = useRef(null);

    const handlerCityOnChange = (e) => {
        setSearch(e.target.value);
    };

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
                        className="
                        border-input h-full w-full p-2
                    "
                        id="job_title"
                        placeholder="Titlu"
                        // errorMessage={errors.title?.message}
                        type="text"
                        // register={register}
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
                        onChange={changeHandler}
                    />
                </div>
                <div
                    className="
                    border-input h-full w-full p-2
                "
                >
                    <label>Localitatea</label>
                    <div
                        className="
                        relative
                    "
                    >
                        <div className="flex items-center ">
                            <input
                                className="
                            border-input h-full w-full p-2
                        "
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
                                    return (
                                        <li
                                            value={[obj.name, obj.county]}
                                            key={index}
                                            className="border-input h-full w-full p-2 cursor-pointer hover:bg-gray-200"
                                            onClick={handleCitySelect}
                                        >{`${obj.name} ,jud: ${obj.county}`}</li>
                                    );
                                })}
                        </ul>
                    </div>
                    <div
                        className="
                        flex flex-col gap-1 text-xs text-gray-500 mt-2
                    "
                    >
                        <p>
                            {city?.length > 1 ? 'Orase' : 'Oras'}:{' '}
                            {city?.length ? city.join(', ') : 'Niciun oras specificat'}
                        </p>
                        <p>
                            {county?.length > 1 ? 'Judete' : 'Judet'}:{' '}
                            {county?.length ? county.join(', ') : 'Niciun judet specificat'}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col">
                    <label>Tipul Jobului</label>
                    <input
                        className="
                            border-input h-full w-full p-2
                        "
                        id="remote"
                        placeholder="ex. Remote, Onsite"
                        type="text"
                        defaultValue={remote}
                        onChange={changeHandler}
                    />
                </div>

                <div>
                    <button
                        className="rounded-full border px-3 py-2 cursor-pointer hover:bg-green-500 hover:text-white active:translate-y-1 w-[100px]"
                        onClick={handleClick}
                    >
                        {loading ? <Loading className="w-5" /> : 'Editati'}
                    </button>
                </div>
            </form>
        </>
    );
}
