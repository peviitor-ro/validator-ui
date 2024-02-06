import { useState } from 'react';

import { Bars3Icon, UserCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/svgs/logo.svg';
import { useAuthContext } from '../../contexts/AuthContext';
import { routes } from '../../routes/routes';
import { AppNavLink } from './AppNavLink';

const links = [
    {
        name: 'Joburi',
        url: '/jobs',
    },
    {
        name: 'Companii',
        url: '/companies',
    },
    {
        name: 'Cautare',
        url: '/search',
    },
    {
        name: 'Despre',
        url: '/info',
    },
    {
        name: 'Contact',
        url: '/contact',
    },
    {
        name: 'Documentatie',
        url: '/docs',
    },
];

//TODO: Create a reusable mobile menu or a reusable action with popup/element;

export function Header() {
    const { logout } = useAuthContext();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <header className="flex items-center justify-between h-16 px-4 bg-card">
                <button type="button" className="lg:hidden" onClick={toggleMenu}>
                    <Bars3Icon className="w-6 h-6" />
                </button>

                <NavLink to="/">
                    <img src={logo} alt="logo" className="logo" />
                </NavLink>

                <nav className="lg:flex hidden">
                    {links?.map(({ name, url }, key) => (
                        <AppNavLink key={key} url={url} name={name} className="px-4" />
                    ))}
                </nav>

                <NavLink className="lg:block hidden" to={routes.LOGIN} replace onClick={logout}>
                    Logout
                </NavLink>

                <button disabled className="lg:hidden block">
                    <UserCircleIcon className="w-7 h-7" />
                </button>
            </header>

            <div
                className={clsx(
                    'absolute transform -translate-x-full transition-all duration-500 ease-in-out w-full h-screen top-0 bg-card flex flex-col p-4',
                    { 'translate-x-0  lg:-translate-x-full': isMenuOpen },
                )}
            >
                <button className="ml-auto" onClick={toggleMenu} type="button">
                    <XMarkIcon className="h-7 w-7" />
                </button>

                <nav className="flex flex-col m-auto items-center">
                    {links.map(({ name, url }, key) => (
                        <AppNavLink
                            key={key}
                            name={name}
                            url={url}
                            className="text-2xl py-3 uppercase"
                        />
                    ))}
                </nav>
                <NavLink to="/login" onClick={logout} replace>
                    Logout
                </NavLink>
            </div>
        </>
    );
}
