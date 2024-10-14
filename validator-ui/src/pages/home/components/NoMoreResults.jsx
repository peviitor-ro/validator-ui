import Globe from '../../../components/ui/globe';

export function NoMoreResults({ message }) {
    return (
        <div className="flex flex-col justify-center items-center">
            <Globe className="relative mx-auto right-0 w-40" />
            <span
                className="text-sm font-semibold text-gray-500
            "
            >
                {message}
            </span>
        </div>
    );
}
