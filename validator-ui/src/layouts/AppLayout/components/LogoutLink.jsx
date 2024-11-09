import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/AuthContext';
import { routes } from '../../../routes/routes';

/**
 * LogoutLink component renders a navigation link that triggers the logout function.
 *
 * @param {Object} props - The component props.
 * @param {string} props.className - Additional class names for styling the link.
 * @returns {JSX.Element} The rendered LogoutLink component.
 */
export function LogoutLink({ className }) {
    const { logout } = useAuthContext();

    const style = 'link text-subtitle hover:text-primary flex items-center gap-1';

    return (
        <NavLink className={`${style} ${className}`} to={routes.LOGIN} replace onClick={logout}>
            <ArrowLeftStartOnRectangleIcon className="h-5" />
            Iesire
        </NavLink>
    );
}
