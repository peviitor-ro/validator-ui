export default function Badge({ text, color = 'bg-blue-500', textColor = 'text-white' }) {
    return (
        <span className={`inline-flex px-2 py-1 text-xs font-bold ${color} ${textColor} w-full`}>
            {text}
        </span>
    );
}
