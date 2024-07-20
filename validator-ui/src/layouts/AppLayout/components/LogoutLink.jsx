import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/AuthContext';
import { routes } from '../../../routes/routes';

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
