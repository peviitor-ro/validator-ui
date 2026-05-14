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
        'fixed left-0 top-0 z-40 flex h-screen w-screen items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm',
        {
            hidden: !props.open,
        },
    );

    const modalContentClasses = clsx(
        'relative max-h-[90vh] w-full overflow-y-auto rounded-[28px] border border-white/60 bg-white/95 p-5 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.45)] md:w-2/3 lg:p-6',
        {
            [props.className]: props.className,
        },
    );

    return (
        <div className={modalClasses}>
            <div className={modalContentClasses}>
                {children}
                <button
                    className="absolute right-4 top-4 rounded-full bg-slate-100 p-2 text-slate-500 transition hover:bg-slate-200 hover:text-slate-700 active:translate-y-0.5"
                    onClick={() => props.setOpen(!props.open)}
                >
                    <XMarkIcon className="h-5" />
                </button>
            </div>
        </div>
    );
}
