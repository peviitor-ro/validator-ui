import { useState, useEffect } from 'react';
import { useJobStore } from '../../../../store/job.state';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { useCitiesQuery } from '../../../../services/landing/landing.queries';

/**
 * City component to display and manage city data.
 *
 * @param {Object} props - The component props.
 * @param {string} props.cityProp - The name of the city.
 * @param {Object} props.propsData - The current state of the props data.
 * @param {Function} props.setPropsData - Function to update the props data.
 *
 * @returns {JSX.Element} The rendered City component.
 */
export function City({ cityProp, propsData, setPropsData }) {
    const city = useJobStore((state) => state.city);
    const county = useJobStore((state) => state.county);

    const cityName = cityProp.replace('tot judetul ', 'all');

    const { data: searchedCities } = useCitiesQuery(50, cityName);

    const [cityOptions, setCityOptions] = useState([]);

    useEffect(() => {
        if (searchedCities) {
            setCityOptions(searchedCities);
        }
    }, [searchedCities]);

    const handleRemoveCity = (e) => {
        e.preventDefault();
        const newCounty = cityOptions?.pages[0].data;

        const removedCounty = [];

        for (const c of newCounty) {
            if (c.name === cityName && county.includes(c.county)) {
                removedCounty.push(c.county);
            }
        }

        setPropsData({
            ...propsData,
            city: city.filter((c) => c !== cityName),

            county: county.filter((c) => !removedCounty.includes(c)),
        });
    };

    return (
        <div className="border-input border-gray-300 px-1 flex items-center justify-between">
            {cityProp}{' '}
            <button onClick={handleRemoveCity}>
                <XMarkIcon className="h-4 w-4 text-gray-500 cursor-pointer" />
            </button>
        </div>
    );
}
