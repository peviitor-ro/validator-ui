import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { NotFoundRoute } from '../components/NotFoundRoute/NotFoundRoute';
import { useAuthContext } from '../contexts/AuthContext';
import { AppLayout } from '../layouts/AppLayout/AppLayout';
import Authorize from '../pages/auth/Authorize';
import { EmailConfirmation } from '../pages/auth/EmailConfirmation';
import { Login } from '../pages/auth/Login';
import { Homepage } from '../pages/home/Homepage';
import { AuthGuard } from './AuthGuard';
import { CapthchaProvider } from './CapthchaProvider';
import { routes } from './routes';

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
                </Route>

                {/* FALLBACK ROUTE */}
                <Route path="*" element={<NotFoundRoute />} />
            </Routes>
        </BrowserRouter>
    );
}
