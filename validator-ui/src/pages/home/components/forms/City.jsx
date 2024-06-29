import { useState, useEffect } from 'react';
import { useJobStore } from '../../../../store/job.state';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { useCitiesQuery } from '../../../../services/landing/landing.queries';

export function City({ cityProp, propsData, setPropsData }) {
    const city = useJobStore((state) => state.city);
    const county = useJobStore((state) => state.county);

    const { data: searchedCities } = useCitiesQuery(10, cityProp);

    const [cityOptions, setCityOptions] = useState([]);

    useEffect(() => {
        if (searchedCities) {
            setCityOptions(searchedCities);
        }
    }, [searchedCities]);

    const handleRemoveCity = (e) => {
        e.preventDefault();
        const removeCity = city.filter((c) => c !== cityProp);
        const newCounty = cityOptions?.pages[0].data;
        const removedCounty = [];

        for (const c of newCounty) {
            if (c.city === cityProp) {
                removedCounty.push(c.county);
            }
        }

        const removeCounty = county.filter((c) => removedCounty.includes(c));

        setPropsData({ ...propsData, city: removeCity, county: removeCounty });

    };

    return (
        <div
            className="border-input border-gray-300 px-1 flex items-center justify-between"
        >
            {cityProp}{' '}
            <button onClick={handleRemoveCity}>
                <XMarkIcon className="h-4 w-4 text-gray-500 cursor-pointer" />
            </button>
        </div>
    );
}
