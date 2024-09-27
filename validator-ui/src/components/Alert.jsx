import { useEffect } from 'react';

/**
 * Alert component that displays a message based on the type and visibility.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.message - The message to display in the alert.
 * @param {string} props.type - The type of alert, either 'error' or 'success'.
 * @param {boolean} props.visible - Determines if the alert is visible.
 * @param {Function} props.setVisible - Function to set the visibility of the alert.
 *
 * @returns {JSX.Element|null} The Alert component or null if not visible.
 */
export function Alert({ message, type, visible, setVisible }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, [visible, setVisible]);

    return visible ? (
        <div
            className={`${
                type === 'error'
                    ? 'bg-red-100 border-red-400 text-red-700'
                    : 'bg-green-100 border-green-400 text-green-700'
            } border px-4 py-3 rounded fixed top-0 right-0 mt-4 mr-4 w-1/4 z-50`}
            role="alert"
        >
            <strong className="font-bold">{type === 'error' ? 'Error' : 'Success'}!</strong>
            <span className="block sm:inline">{message}</span>
        </div>
    ) : null;
}
