import clsx from 'clsx';
import { XMarkIcon } from '@heroicons/react/24/outline';

/**
 * Modal component that displays a modal dialog.
 *
 * @param {Object} props - The properties object.
 * @param {boolean} props.open - Determines if the modal is open or not.
 * @param {Function} props.setOpen - Function to toggle the modal open state.
 * @param {string} [props.className] - Additional class names for the modal content.
 * @param {React.ReactNode} props.children - The content to be displayed inside the modal.
 *
 * @returns {JSX.Element} The rendered modal component.
 */
export function Modal({ children, ...props }) {
    const modalClasses = clsx(
        'fixed w-screen h-screen bg-gray-500 bg-opacity-60 top-0 left-0 z-40 flex justify-center items-center',
        {
            hidden: !props.open,
        },
    );

    const modalContentClasses = clsx('relative bg-white rounded-md p-4 w-11/12 md:w-2/3', {
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
