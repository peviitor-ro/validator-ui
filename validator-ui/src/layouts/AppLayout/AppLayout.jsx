import { useEffect, useState } from 'react';
import { Container } from '../../components/Container';
import { useAuthContext } from '../../contexts/AuthContext';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
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
    const location = useLocation();
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

    const handleLinkClick = ({ url, onClick }) => {
        if (onClick) {
            onClick();
            return;
        }

        if (url.includes('http')) {
            window.open(url, '_blank');
            return;
        }

        navigate(url);
    };

    const bottomActions = [
        {
            name: 'Acasa',
            onClick: () => navigate('/'),
            icon: <img src={home} alt="Acasa" className={iconsClasses} />,
            active: location.pathname === '/',
        },
        ...links.map(({ name, url, onClick, icon }) => ({
            name,
            onClick: () => handleLinkClick({ url, onClick }),
            icon,
            active: url ? location.pathname === url : false,
        })),
        {
            name: 'Notificari',
            onClick: () => setActive(!active),
            icon: (
                <div className="relative">
                    <img src={bell} alt="Notificari" className={iconsClasses} />
                    {notifications?.length > 0 && (
                        <div className="absolute top-0 right-0 h-2 w-2 lg:h-3 lg:w-3 bg-red-500 rounded-full"></div>
                    )}
                </div>
            ),
            active,
        },
        {
            name: 'Iesire',
            onClick: () => logout(),
            icon: <img src={power} alt="Iesire" className={iconsClasses} />,
            active: false,
        },
    ];

    return (
        <>
            <Notification active={active} setActive={setActive} notifications={notifications} />
            <Container>
                <Outlet />
                <div className="sticky flex flex-col items-center bottom-0 sm:flex justify-center w-full z-10">
                    <div className="mb-4 flex w-[min(100%,820px)] flex-wrap items-center justify-center gap-2 rounded-3xl border bg-card/95 p-2 shadow-lg backdrop-blur-md">
                        {bottomActions.map(({ name, onClick, icon, active: isActive }) => (
                            <button
                                key={name}
                                type="button"
                                onClick={onClick}
                                className={clsx(
                                    'flex min-w-[92px] flex-1 items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium transition-colors',
                                    isActive
                                        ? 'bg-red-500 text-white shadow-sm'
                                        : 'bg-white/70 text-gray-600 hover:bg-red-50 hover:text-red-500',
                                )}
                            >
                                {icon}
                                <span>{name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </Container>
        </>
    );
}
