import Globe from '../../../components/ui/globe';

/**
 * NoMoreResults component displays a message indicating that there are no more results.
 *
 * @param {Object} props - The component props.
 * @param {string} props.message - The message to display.
 * @returns {JSX.Element} The rendered component.
 */
export function NoMoreResults({ message }) {
    return (
        <div className="flex flex-col justify-center items-center">
            <Globe className="relative mx-auto right-0 w-40" />
            <span className="text-sm font-semibold text-gray-500">{message}</span>
        </div>
    );
}
