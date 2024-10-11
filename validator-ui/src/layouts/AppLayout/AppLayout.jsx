import React from 'react';
import { Container } from '../../components/Container';
import { useAuthContext } from '../../contexts/AuthContext';
import { Outlet, useNavigate } from 'react-router-dom';
import { Dock, DockIcon, dockVariants } from '../../components/ui/dock';
import { useNavbar } from '../../contexts/Navbarcontext';
import { HomeIcon, LogOut } from 'lucide-react';

export function AppLayout() {
    const { logout } = useAuthContext();

    const navigate = useNavigate();
    const { links } = useNavbar();
    const iconsClasses = 'w-5 h-5 lg:w-7 lg:h-7';

    return (
        <Container>
            {/* <Header /> */}
            <Outlet />
            <div className="fixed flex flex-col items-center bottom-0 sm:flex justify-center w-full z-10">
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
