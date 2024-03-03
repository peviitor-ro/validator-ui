import clsx from 'clsx';

export function Container({ children, className }) {
    return (
        <div className={clsx('min-h-screen', { [className]: !!className })}>
            {children}
        </div>
    );
}
