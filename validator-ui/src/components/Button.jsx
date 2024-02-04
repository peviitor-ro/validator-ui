import clsx from 'clsx';

export function Button({ type = 'submit', text = 'Submit', className, ...rest }) {
    const btnClassName = clsx('px-3 py-2 bg-heading text-card rounded-md', {
        [className]: !!className,
    });

    return (
        <button type={type} className={btnClassName} {...rest}>
            {text}
        </button>
    );
}
