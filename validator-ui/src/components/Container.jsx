import clsx from 'clsx';

export function Container({ children, className }) {
    return (
        <div className={clsx('h-screen bg-container px-6', { [className]: !!className })}>
            {children}
        </div>
    );
}
