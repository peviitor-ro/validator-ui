import clsx from 'clsx';
import { Spinner } from './Spinner';

/**
 * Button component renders a customizable button with optional loading spinner and icon.
 *
 * @param {Object} props - The properties object.
 * @param {string} [props.type='submit'] - The type of the button.
 * @param {string} [props.text='Submit'] - The text to display inside the button.
 * @param {string} [props.className] - Additional class names for the button.
 * @param {boolean} [props.isLoading] - Flag to indicate if the button is in a loading state.
 * @param {React.ReactNode} [props.icon] - Optional icon to display inside the button.
 * @param {Object} [props.rest] - Additional properties to pass to the button element.
 * @returns {JSX.Element} The rendered button component.
 */
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
