import { AnimatedList, AnimatedListItem } from './ui/animated-list';

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
    return visible ? (
        <AnimatedList
            className={`${
                type === 'error'
                    ? 'bg-red-100 border-red-400 text-red-700'
                    : 'bg-green-100 border-green-400 text-green-700'
            } fixed top-0 right-0 mt-4 mr-4 lg:w-1/4 z-50 border px-4 py-3 rounded`}
        >
            <AnimatedListItem>
                <div className="flex flex-col items-center" role="alert">
                    <strong className="font-bold">{type === 'error' ? 'Error' : 'Success'}!</strong>
                    <span className="block sm:inline">{message}</span>
                    <button
                        className=" bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
                        onClick={() => setVisible(false)}
                    >
                        OK!
                    </button>
                </div>
            </AnimatedListItem>
        </AnimatedList>
    ) : null;
}
