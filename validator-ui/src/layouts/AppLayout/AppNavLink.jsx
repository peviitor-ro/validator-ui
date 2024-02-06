import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

export function AppNavLink({ name, url, className }) {
    return (
        <NavLink
            to={url}
            className={({ isActive }) =>
                clsx('link text-subtitle hover:text-heading', {
                    'text-heading': isActive,
                    [className]: className,
                })
            }
        >
            {name}
            <span className="underline bg-heading"></span>
        </NavLink>
    );
}
