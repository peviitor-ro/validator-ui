import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/AuthContext';
import { routes } from '../../../routes/routes';

export function LogoutLink({ className }) {
    const { logout } = useAuthContext();

    return (
        <NavLink className={className} to={routes.LOGIN} replace onClick={logout}>
            Logout
        </NavLink>
    );
}
