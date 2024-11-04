import React from 'react';
import { Container } from '../../components/Container';
import { useAuthContext } from '../../contexts/AuthContext';
import { Outlet, useNavigate } from 'react-router-dom';
import { Dock, DockIcon, dockVariants } from '../../components/ui/dock';
import { useNavbar } from '../../contexts/Navbarcontext';
import { HomeIcon, LogOut } from 'lucide-react';

/**
 * AppLayout component that provides the main layout for the application.
 * It includes a navigation dock with various icons and links.
 *
 * @component
 * @example
 * return (
 *   <AppLayout />
 * )
 *
 * @returns {JSX.Element} The rendered AppLayout component.
 *
 * @description
 * The AppLayout component uses several hooks to manage authentication, navigation, and navbar links.
 * It renders a container with an Outlet for nested routes and a sticky dock at the bottom with navigation icons.
 *
 * @hook useAuthContext - Provides the logout function.
 * @hook useNavigate - Provides the navigate function for routing.
 * @hook useNavbar - Provides the links for the navigation dock.
 */
export function AppLayout() {
    const { logout } = useAuthContext();

    const navigate = useNavigate();
    const { links } = useNavbar();
    const iconsClasses = 'w-5 h-5 lg:w-7 lg:h-7';

    return (
        <Container>
            <Outlet />
            <div className="sticky flex flex-col items-center bottom-0 sm:flex justify-center w-full z-10">
                <Dock className="shadow-lg mb-4 bg-card">
                    <DockIcon
                        variant={dockVariants.HOME}
                        onClick={() => navigate('/')}
                        children={<HomeIcon className={iconsClasses} />}
                        title="Acasa"
                        className="text-gray-500 hover:text-red-500"
                    />
                    {links?.map(({ name, url, onClick, icon }, key) => {
                        if (name === 'Companii') return null;
                        return (
                            <DockIcon
                                key={key}
                                variant={dockVariants[name.toUpperCase()]}
                                onClick={
                                    onClick
                                        ? () => onClick()
                                        : () => {
                                              url.includes('http')
                                                  ? window.open(url, '_blank')
                                                  : navigate(url);
                                          }
                                }
                                children={icon}
                                title={name}
                                className="text-gray-500 hover:text-red-500"
                            />
                        );
                    })}
                    <DockIcon
                        variant={dockVariants.LOGOUT}
                        onClick={() => logout()}
                        children={<LogOut className={iconsClasses} />}
                        title="Iesire"
                        className="text-gray-500 hover:text-red-500"
                    />
                </Dock>
            </div>
        </Container>
    );
}
