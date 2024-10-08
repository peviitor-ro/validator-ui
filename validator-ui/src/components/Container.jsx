import clsx from 'clsx';

/**
 * Container component that wraps its children in a div with a minimum height of the screen.
 *
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The child elements to be rendered inside the container.
 * @param {string} [props.className] - Optional additional class names to apply to the container.
 * @returns {JSX.Element} The rendered container component.
 */
export function Container({ children, className }) {
    return <div className={clsx('min-h-screen', { [className]: !!className })}>{children}</div>;
}
