import { UserCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import logo from '../../../assets/svgs/logo.svg';
import useScrollDirection from '../hooks/useScrollDirection';
import { AppNavLink } from './AppNavLink';
import { LogoutLink } from './LogoutLink';
import { MobileMenu } from './MobileMenu';
import { NAV_LINKS } from './links';

export function Header() {
    const { isScrollingDown } = useScrollDirection();

    return (
        <>
            <header
                className={clsx(
                    'flex items-center justify-between h-16 px-4 lg:px-10 bg-card sticky top-0 link shadow-3xl z-10',
                    {
                        '-translate-y-20 opacity-45': isScrollingDown,
                        'translate-y-0': !isScrollingDown,
                    },
                )}
            >
                <MobileMenu />

                <NavLink to="/">
                    <img src={logo} alt="logo" className="logo" />
                </NavLink>

                <nav className="lg:flex hidden">
                    {NAV_LINKS?.map(({ name, url, onClick }, key) => (
                        <AppNavLink key={key} url={url} name={name} onClick={onClick} className="px-4" />
                    ))}
                </nav>

                <LogoutLink className="lg:block hidden" />

                <button disabled className="lg:hidden block">
                    <UserCircleIcon className="w-7 h-7" />
                </button>
            </header>
        </>
    );
}
