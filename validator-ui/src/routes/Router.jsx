import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { NotFoundRoute } from '../components/NotFoundRoute/NotFoundRoute';
import { useAuthContext } from '../contexts/AuthContext';
import { AppLayout } from '../layouts/AppLayout/AppLayout';
import { Authorize } from '../pages/auth/Authorize';
import { EmailConfirmation } from '../pages/auth/EmailConfirmation';
import { Login } from '../pages/auth/Login';
import { Homepage } from '../pages/home/Homepage';
import { AuthGuard } from './AuthGuard';
import { CapthchaProvider } from './CapthchaProvider';
import { routes } from './routes';
import { JobsPage } from '../pages/home/JobsPage';
import { Account } from '../pages/account/Account';
import { Scraperpage } from '../pages/home/Scraperpage';
import { Filespage } from '../pages/home/Filespage';

/**
 * Router component that defines the application's routing structure.
 *
 * This component uses `BrowserRouter` to manage the routing and `Routes` to define
 * individual routes. It includes both public routes and routes that require authentication.
 *
 * Public Routes:
 * - Login: Redirects to the home page if authenticated, otherwise renders the Login component wrapped in a CapthchaProvider.
 * - Authorized: Redirects to the home page if authenticated, otherwise renders the Authorize component.
 * - Confirm Email: Redirects to the home page if authenticated, otherwise renders the EmailConfirmation component.
 *
 * Authenticated Routes:
 * - Home: Renders the AppLayout component wrapped in an AuthGuard.
 * - Account: Renders the Account component.
 * - Scraper: Renders the Scraperpage component.
 * - Scraper Details: Renders the Filespage component based on the scraper name.
 * - Jobs: Renders the JobsPage component based on the company name.
 *
 * Fallback Route:
 * - Not Found: Renders the NotFoundRoute component for any undefined routes.
 *
 * @returns {JSX.Element} The Router component with defined routes.
 */
export function Router() {
    const { isAuthenticated } = useAuthContext();

    return (
        <BrowserRouter>
            <Routes>
                {/* PUBLIC ROUTES */}
                <Route
                    path={routes.LOGIN}
                    element={
                        isAuthenticated ? (
                            <Navigate to="/" />
                        ) : (
                            <CapthchaProvider>
                                <Login />
                            </CapthchaProvider>
                        )
                    }
                />
                <Route
                    path={`${routes.AUTHORIZED}/:token`}
                    element={isAuthenticated ? <Navigate to="/" /> : <Authorize />}
                />
                <Route
                    path={routes.CONFIRM_EMAIL}
                    element={isAuthenticated ? <Navigate to="/" /> : <EmailConfirmation />}
                />

                {/* LOOGED IN USERS ROUTES */}
                <Route
                    path="/"
                    element={
                        <AuthGuard>
                            <AppLayout />
                        </AuthGuard>
                    }
                >
                    <Route index element={<Homepage />} />
                    <Route path="account" element={<Account />} />
                    <Route path="scraper" element={<Scraperpage />} />
                    <Route path="scraper/:scraperName" element={<Filespage />} />
                    <Route path="jobs/:company" element={<JobsPage />} />
                </Route>

                {/* FALLBACK ROUTE */}
                <Route path="*" element={<NotFoundRoute />} />
            </Routes>
        </BrowserRouter>
    );
}
