import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

/**
 * AppNavLink component renders a navigation link with custom styles and behavior.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.name - The display name of the navigation link.
 * @param {string} props.url - The URL to navigate to when the link is clicked.
 * @param {string} [props.className] - Additional CSS classes to apply to the link.
 * @param {function} [props.onClick] - Optional click handler for the link.
 * @returns {JSX.Element} The rendered navigation link component.
 */
export function AppNavLink({ name, url, className, onClick }) {
    return (
        <NavLink
            to={url}
            className={({ isActive }) =>
                clsx('link text-subtitle hover:text-heading', {
                    'text-heading': isActive,
                    [className]: className,
                })
            }
            onClick={onClick}
        >
            {name}
            <span className="underline bg-heading"></span>
        </NavLink>
    );
}
