import clsx from 'clsx';

export function Container({ children, className }) {
    return (
        <div className={clsx('min-h-screen bg-container', { [className]: !!className })}>
            {children}
        </div>
    );
}
