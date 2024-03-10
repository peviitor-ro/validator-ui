import clsx from 'clsx';
import { XMarkIcon } from '@heroicons/react/24/outline';

export function Modal({ children, ...props }) {
    const modalClasses = clsx(
        'fixed w-screen h-screen bg-gray-500 bg-opacity-60 top-0 left-0 z-50 flex justify-center items-center',
        {
            hidden: !props.open,
        },
    );

    const modalContentClasses = clsx('relative bg-white rounded-md p-4', {
        [props.className]: props.className,
    });

    return (
        <div className={modalClasses}>
            <div className={modalContentClasses}>
                {children}
                <button
                    className="absolute top-2 right-2  active:translate-y-1"
                    onClick={() => props.setOpen(!props.open)}
                >
                    <XMarkIcon className="h-5" />
                </button>
            </div>
        </div>
    );
}
