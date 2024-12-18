import RetroGrid from './ui/retro-grid';
import { BorderBeam } from './ui/border-beam';
import dots from '../assets/svgs/dots.svg';

/**
 * LoadingPage component displays a full-screen loading overlay with a message.
 *
 * @param {Object} props - The component props.
 * @param {string} props.message - The loading message to display.
 * @returns {JSX.Element} The rendered LoadingPage component.
 */
export function LoadingPage({ message, children }) {
    return (
        <div className="flex flex-col items-center justify-center fixed bg-gray-500 bg-opacity-50 top-0 left-0 w-[100vw] h-[100vh] z-50">
            <div className="relative flex flex-col items-center justify-center gap-1 bg-card bg-opacity-90 rounded-lg shadow-lg h-72 w-72">
                <BorderBeam />
                <RetroGrid className="top-0 left-0 rounded-lg" />
                {children}
                <div className="flex items-center gap-1 text-sm overflow-hidden w-full">
                    <p className="truncate text-center" data-testid="loading-message">
                        {message}
                    </p>
                    <img className="w-5 relative top-1" src={dots} alt="dots" />
                </div>
            </div>
        </div>
    );
}
