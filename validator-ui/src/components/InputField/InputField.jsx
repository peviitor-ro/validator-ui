import clsx from 'clsx';
import PropTypes from 'prop-types';

InputField.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    type: PropTypes.oneOf(['text', 'email', 'password']),
    errorMessage: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    register: PropTypes.any,
    leftIcon: PropTypes.element,
    fieldClassName: PropTypes.string,
};

/**
 * InputField component renders a customizable input field with optional error message and icon.
 *
 * @param {Object} props - The properties object.
 * @param {boolean} [props.showError=true] - Flag to show or hide the error message.
 * @param {string} [props.type='text'] - The type of the input field.
 * @param {string} props.id - The id of the input field.
 * @param {string} props.label - The label for the input field.
 * @param {string} props.errorMessage - The error message to display.
 * @param {string} props.placeholder - The placeholder text for the input field.
 * @param {function} props.register - The register function for form handling.
 * @param {string} props.value - The value of the input field.
 * @param {function} props.onChange - The function to call when the input value changes.
 * @param {string} props.fieldClassName - Additional class names for the field container.
 * @param {React.ReactNode} props.leftIcon - The icon to display on the left side of the input field.
 *
 * @returns {JSX.Element} The rendered InputField component.
 */
export function InputField({ showError = true, type = 'text', ...props }) {
    const {
        id,
        label,
        errorMessage,
        placeholder,
        register,
        value,
        onChange,
        fieldClassName,
        leftIcon,
    } = props;

    // set error id
    const errorId = `error-${id}`;

    // set input class
    const inputClassName = clsx(
        {
            'text-error border-text-error': errorMessage,
            'border-subtitle': !errorMessage,
            'pl-8 border-none': leftIcon,
        },
        'border-input h-full w-full p-2',
    );

    // set label class
    const labelClassName = clsx('block font-semibold', { 'text-error': errorMessage });

    return (
        <div className={clsx('relative', { [fieldClassName]: fieldClassName })}>
            {label && (
                <label htmlFor={id} className={labelClassName}>
                    {label}
                </label>
            )}
            <span className="absolute top-1/2 transform -translate-y-1/2 left-2 mt-0.5">
                {leftIcon}
            </span>
            {register ? (
                <input
                    id={id}
                    type={type}
                    className={inputClassName}
                    aria-errormessage={errorId}
                    placeholder={placeholder}
                    {...register(id)}
                />
            ) : onChange ? (
                <input
                    id={id}
                    type={type}
                    className={`${inputClassName} rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
                    aria-errormessage={errorId}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            ) : (
                <input
                    id={id}
                    type={type}
                    className={inputClassName}
                    aria-errormessage={errorId}
                    placeholder={placeholder}
                    value={value}
                />
            )}

            {showError && (
                <p className="h-8 my-1 text-error" id={errorId}>
                    {errorMessage}
                </p>
            )}
        </div>
    );
}
