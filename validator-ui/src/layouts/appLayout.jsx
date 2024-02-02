import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/header/Header';

export default function AppLayout() {
    return (
        <>
            <Header
                links={[
                    {
                        name: 'Joburi',
                        url: '#',
                    },
                    {
                        name: 'Companii',
                        url: '#',
                    },
                    {
                        name: 'Cautare',
                        url: '#',
                    },
                    {
                        name: 'Despre',
                        url: '#',
                    },
                    {
                        name: 'Contact',
                        url: '#',
                    },
                    {
                        name: 'Documentatie',
                        url: '#',
                    },
                ]}
            />{' '}
            <Outlet />
        </>
    );
}
