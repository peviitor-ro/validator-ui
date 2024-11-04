import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { routes } from './routes';

/**
 * AuthGuard component that protects routes from unauthorized access.
 *
 * This component checks if the user is authenticated using the `useAuthContext` hook.
 * If the user is not authenticated, it redirects to the login page.
 * Otherwise, it renders the child components.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to render if authenticated.
 * @returns {React.ReactNode} The rendered child components or a redirect to the login page.
 */
export function AuthGuard({ children }) {
    const { isAuthenticated } = useAuthContext();

    if (!isAuthenticated) {
        return <Navigate to={routes.LOGIN} replace />;
    }

    return children;
}
