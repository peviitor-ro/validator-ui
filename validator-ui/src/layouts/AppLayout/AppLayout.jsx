import { useEffect, useState } from 'react';
import { Container } from '../../components/Container';
import { useAuthContext } from '../../contexts/AuthContext';
import { Outlet, useNavigate } from 'react-router-dom';
import { Dock, DockIcon, dockVariants } from '../../components/ui/dock';
import { useNavbar } from '../../contexts/Navbarcontext';
import clsx from 'clsx';

import home from '../../assets/icons/home.png';
import power from '../../assets/icons/power.png';
import bell from '../../assets/icons/bell.png';

const VITE_BASE_WS_URL = import.meta.env.VITE_BASE_WS_URL;
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

/**
 * Notification component to display a list of notifications.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.active - Determines if the notification is visible.
 * @param {Function} props.setActive - Function to set the active state.
 * @param {Array<string>} props.notifications - Array of notification messages.
 * @returns {JSX.Element} The rendered Notification component.
 */
export function Notification({ active, setActive, notifications }) {
    const notificationStyle = clsx(
        'fixed top-0 right-0 text-center font-bold p-2 border bg-white m-4 rounded-lg z-50 transition-all duration-300 ease-in-out lg:p-4 lg:m-6 lg:rounded-xl lg:text-lg lg:border-2 lg:border-gray-300',
        {
            hidden: active === false,
            block: active === true,
        },
    );

    return (
        <div className={notificationStyle}>
            <div className="overflow-y-auto max-h-40 lg:max-h-60 scrollbar-thin">
                {notifications?.length > 0 ? (
                    notifications.map((notification, key) => {
                        return <p key={key}>{notification}</p>;
                    })
                ) : (
                    <p>Nu sunt notificari</p>
                )}
            </div>

            <button
                className="text-red-500 hover:text-red-700"
                onClick={() => setActive(false)}
                data-testid="close-notifications"
            >
                Inchide
            </button>
        </div>
    );
}

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

    const [active, setActive] = useState(false);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // get token from local storage
        const token = JSON.parse(localStorage.getItem('validator')).accessToken;
        // connect to websocket notification
        const ws_url = `${VITE_BASE_WS_URL}/ws/notifications/?token=${token}`;
        const ws = new WebSocket(ws_url);

        ws.onopen = () => {
            console.log('Connected to websocket');
        };
        ws.onmessage = (e) => {
            try {
                const data = JSON.parse(e.data);
                if (data.message) {
                    setNotifications(data.message);
                }
            } catch (err) {
                console.error('Error parsing WebSocket message:', err);
            }
        };
    }, []);

    const handleNotification = async () => {
        const response = await fetch(`${VITE_BASE_URL}/notifications/read/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('validator')).accessToken}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
        }
    };

    useEffect(() => {
        if (active && notifications?.length > 0) {
            handleNotification();
        }

        if (active === false) {
            setNotifications([]);
        }
    }, [active]);

    return (
        <>
            <Notification active={active} setActive={setActive} notifications={notifications} />
            <Container>
                <Outlet />
                <div className="sticky flex flex-col items-center bottom-0 sm:flex justify-center w-full z-10">
                    <Dock className="shadow-lg mb-4 bg-card">
                        <DockIcon
                            variant={dockVariants.HOME}
                            onClick={() => navigate('/')}
                            children={<img src={home} alt="home" className={iconsClasses} />}
                            title="Acasa"
                            className="text-gray-500 hover:text-red-500"
                        />
                        {links?.map(({ name, url, onClick, icon }, key) => {
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
                            variant={dockVariants.NOTIFICATIONS}
                            onClick={() => setActive(!active)}
                            children={
                                <div className="relative">
                                    <img src={bell} alt="bell" className={iconsClasses} />
                                    {notifications?.length > 0 && (
                                        <div className="absolute top-0 right-0 h-2 w-2 lg:h-3 lg:w-3 bg-red-500 rounded-full"></div>
                                    )}
                                </div>
                            }
                            title="Notificari"
                            className="text-gray-500 hover:text-red-500"
                        />

                        <DockIcon
                            variant={dockVariants.LOGOUT}
                            onClick={() => logout()}
                            children={<img src={power} alt="power" className={iconsClasses} />}
                            title="Iesire"
                            className="text-gray-500 hover:text-red-500"
                        />
                    </Dock>
                </div>
            </Container>
        </>
    );
}
