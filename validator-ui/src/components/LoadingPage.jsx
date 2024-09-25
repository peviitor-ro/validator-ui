import { Loader } from './Loader';

/**
 * LoadingPage component displays a full-screen loading overlay with a message.
 *
 * @param {Object} props - The component props.
 * @param {string} props.message - The loading message to display.
 * @returns {JSX.Element} The rendered LoadingPage component.
 */
export function LoadingPage({ message }) {
    return (
        <div className="flex items-center justify-center fixed bg-gray-500 bg-opacity-50 top-0 left-0 w-[100vw] h-[100vh] z-50">
            <div className="flex flex-col items-center justify-center gap-1 bg-white bg-opacity-90 rounded-lg shadow-lg h-96 w-96">
                <Loader message={message} imgStyle="w-32" />
            </div>
        </div>
    );
}
