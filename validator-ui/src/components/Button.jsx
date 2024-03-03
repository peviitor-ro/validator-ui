import clsx from 'clsx';
import { Spinner } from './Spinner';

export function Button({ type = 'submit', text = 'Submit', className, isLoading, icon, ...rest }) {
    const btnClassName = clsx('btn py-2 flex items-center', {
        [className]: className,
    });

    return (
        <button type={type} className={btnClassName} {...rest}>
            {type == 'submit' && <span className="w-5 h-5">{isLoading && <Spinner />}</span>}
            <span className="mx-auto px-2">{text}</span>
            <span className="w-5 h-5">{icon}</span>
        </button>
    );
}
