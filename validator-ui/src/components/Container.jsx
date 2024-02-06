import clsx from 'clsx';

export function Container({ children, className }) {
    return (
        <div className={clsx('h-screen bg-container', { [className]: !!className })}>
            {children}
        </div>
    );
}
