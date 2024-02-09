import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { createPortal } from 'react-dom';
import useWindowSize from '../../../hooks/useWindowSize';
import { useHamburgerMenu } from '../hooks/useBurgerMenu';
import { AppNavLink } from './AppNavLink';
import { LogoutLink } from './LogoutLink';
import { NAV_LINKS } from './links';

export function MobileMenu() {
    const { width } = useWindowSize();
    const { isOpen, handleToggle } = useHamburgerMenu(width);

    return (
        <>
            <button type="button" className="lg:hidden" onClick={() => handleToggle(true)}>
                <Bars3Icon className="w-6 h-6" />
            </button>
            {createPortal(
                <div
                    className={clsx(
                        'fixed transform -translate-x-full transition-all duration-500 ease-in-out w-full h-screen top-0 bg-card flex flex-col p-4 lg:hidden',
                        { 'translate-x-0  lg:-translate-x-full': isOpen },
                    )}
                >
                    <button className="ml-auto" onClick={() => handleToggle(false)} type="button">
                        <XMarkIcon className="h-7 w-7" />
                    </button>
                    <nav className="flex flex-col items-center m-auto">
                        {NAV_LINKS.map(({ name, url }, key) => (
                            <AppNavLink
                                key={key}
                                name={name}
                                url={url}
                                className="text-2xl py-3 uppercase"
                            />
                        ))}
                    </nav>
                    <LogoutLink />
                </div>,
                document.body,
            )}
        </>
    );
}
