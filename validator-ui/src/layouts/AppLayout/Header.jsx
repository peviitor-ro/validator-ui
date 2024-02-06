import { useState } from 'react';

import { Bars3Icon, UserCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/svgs/logo.svg';
import { useAuthContext } from '../../contexts/AuthContext';
import { routes } from '../../routes/routes';
import NavList from './NavList';

const links = [
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
];

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

                <NavList links={links} />

                <NavLink className="lg:block hidden" to={routes.LOGIN} replace onClick={logout}>
                    Logout
                </NavLink>

                <button disabled className="lg:hidden block">
                    <UserCircleIcon className="w-7 h-7" />
                </button>
            </header>

            <div
                className={clsx(
                    'absolute transform -translate-x-full transition-all duration-500 ease-in-out w-full h-screen top-0 bg-card flex flex-col',
                    { 'translate-x-0  lg:-translate-x-full': isMenuOpen },
                )}
            >
                <button
                    className="absolute top-0 right-0 mr-4 mt-4 focus:outline-none active:text-bg-primary"
                    onClick={toggleMenu}
                    type="button"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                    >
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                    </svg>
                </button>

                <nav className="flex flex-col m-auto items-center">
                    {links.map(({ name, url }, key) => (
                        <NavLink
                            key={key}
                            to={url}
                            className="link text-2xl text-subtitle hover:text-heading py-3 uppercase"
                        >
                            {name}
                            <span className="underline bg-heading"></span>
                        </NavLink>
                    ))}
                </nav>
                <NavLink to="/login" onClick={logout} replace>
                    Logout
                </NavLink>
            </div>
        </>
    );
}
