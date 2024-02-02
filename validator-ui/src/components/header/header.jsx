import React, { useId } from 'react';

import { NavLink } from 'react-router-dom';
import logo from '../../assets/svgs/logo.svg';
import { useAuthContext } from '../../contexts/AuthContext';
import { routes } from '../../routes/routes';

export function Header({ links }) {
    const anchorId = useId();

    const { logout } = useAuthContext();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const LinkComponent = links?.map((link) => (
        <a
            key={anchorId + link.name}
            href={link.url}
            className="text-base font-medium hover:text-bg-primary pr-4 pl-4 text-center"
        >
            {link.name}
        </a>
    ));

    return (
        <>
            <div className=" flex items-center justify-between w-full h-16 bg-bg-header">
                <button
                    type="button"
                    className="lg:hidden focus:outline-none ml-4 hover:text-bg-primary"
                    onClick={() => {
                        toggleMenu();
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fillRule="evenodd"
                            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
                        />
                    </svg>
                </button>
                <a href="/" className="ml-4">
                    <img src={logo} alt="logo" className="logo" />
                </a>
                <div className="hidden lg:flex items-center justify-end h-full lg:grow">
                    <div className="flex-1 flex items-center">
                        <div className="flex-1 flex justify-center">{links}</div>
                        <NavLink
                            className="text-base font-medium hover:text-bg-primary pr-4 pl-4 text-center lg:block hidden"
                            to={routes.LOGIN}
                            replace
                            onClick={logout}
                        >
                            Logout
                        </NavLink>
                    </div>
                </div>
                <a
                    className="text-base font-medium hover:text-bg-primary pr-4 pl-4 text-center lg:hidden block"
                    href="#home"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                    >
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                        <path
                            fillRule="evenodd"
                            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                        />
                    </svg>
                </a>
            </div>
            {/* The links prop is optional, so we need to check if it exists before mapping over it. */}
            <div
                className={
                    isMenuOpen
                        ? 'absolute transform translate-x-0 transition-all duration-500 ease-in-out w-full h-screen top-0 bg-bg-cards flex flex-col justify-center lg:-translate-x-full'
                        : 'absolute transform -translate-x-full transition-all duration-500 ease-in-out w-full h-screen top-0 bg-bg-cards flex flex-col justify-center'
                }
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
                <a
                    className="text-base font-medium hover:text-bg-primary pr-4 pl-4 w-full text-center"
                    href="/logout"
                >
                    Profilul Meu
                </a>
                <LinkComponent />
            </div>
        </>
    );
}
