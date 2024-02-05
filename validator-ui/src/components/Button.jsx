import clsx from 'clsx';
import { Spinner } from './Spinner';

export function Button({ type = 'submit', text = 'Submit', className, isLoading, icon, ...rest }) {
    const btnClassName = clsx(
        'px-3 py-2 bg-heading text-card rounded-md flex items-center hover:opacity-90 transition-opacity',
        {
            [className]: !!className,
        },
    );

    return (
        <button type={type} className={btnClassName} {...rest}>
            <span className="w-5 h-5">{isLoading && <Spinner />}</span>
            <span className="mx-auto">{text}</span>
            <span className="w-8 h-4">{icon}</span>
        </button>
    );
}
