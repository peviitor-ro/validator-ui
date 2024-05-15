import { useState, useEffect } from 'react';

export function Alert({ message, type }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return visible ? (
        <div
            className={`${
                type === 'error'
                    ? 'bg-red-100 border-red-400 text-red-700'
                    : 'bg-green-100 border-green-400 text-green-700'
            } border px-4 py-3 rounded 
                absolute top-0 right-0 mt-4 mr-4 w-1/4 z-50
                `}
            role="alert"
        >
            <strong className="font-bold">{type === 'error' ? 'Error' : 'Success'}!</strong>
            <span className="block sm:inline">{message}</span>
        </div>
    ) : null;
}
