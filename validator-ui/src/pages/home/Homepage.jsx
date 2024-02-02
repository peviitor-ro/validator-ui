import React from 'react';
import HomeCards from '../../components/header/HomeCards';
import { useCompaniesQuery } from '../../services/landing/landing.queries';

const firme = [
    {
        id: 1,
        name: 'Veeam',
        image: 'https://img.veeam.com/careers/logo/veeam/veeam_logo_bg.svg',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
        linkSite: '#',
    },
    {
        id: 2,
        name: 'Banca Transilvania',
        image: 'https://www.bancatransilvania.ro/themes/bancatransilvania/assets/images/logos/bt-cariere.svg',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
        linkSite: '#',
    },
    {
        id: 3,
        name: 'Coca-Cola Romania',
        image: 'https://careers.coca-colahellenic.com/portal/5/images/logo.svg',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
        linkSite: '#',
    },
    {
        id: 4,
        name: 'Dedeman',
        image: 'https://i.dedeman.ro/dedereact/design/images/logo.svg',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
        linkSite: '#',
    },
    {
        id: 5,
        name: 'Schneider Electric',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Schneider_Electric_2007.svg/284px-Schneider_Electric_2007.svg.png?20150906005100',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
        linkSite: '#',
    },
];

export function Homepage() {
    const { data, isLoading, isError } = useCompaniesQuery();

    if (isLoading) return;

    if (isError) return <>error...</>;

    if (!data || !data?.length) return <>No data</>;

    return (
        <div className="m-10">
            <div className="flex justify-between flex-wrap">
                <div>
                    <h1 className="text-4xl">Companii</h1>
                    <p className="font-semibold">600 de rezultate</p>
                </div>
                <div className="hidden md:block">
                    <label htmlFor="sort" className="mr-4">
                        Sorteaza
                    </label>
                    <select
                        name="sort"
                        className="bg-bg-header rounded-sm px-2 py-2 outline-none text-sm"
                    >
                        <option value="">Dupa numarul de joburi active</option>
                        <option value="">Dupa numarul de joburi active 2</option>
                        <option value="">Dupa numarul de joburi active 1</option>
                        <option value="">Dupa numarul de joburi active 3</option>
                    </select>
                </div>
            </div>

            <div className="flex flex-wrap gap-4 gap-y-10 mt-10 justify-center">
                {firme.map((item) => (
                    <HomeCards data={item} />
                ))}
            </div>
        </div>
    );
}
