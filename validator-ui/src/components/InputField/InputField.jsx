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

    const errorId = `error-${id}`;

    const inputClassName = clsx(
        {
            'text-error border-text-error': errorMessage,
            'border-subtitle': !errorMessage,
            'pl-8 border-none': leftIcon,
        },
        'mt-1 px-3 py-2 border-input',
    );

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
            ) : (
                <input
                    id={id}
                    type={type}
                    className={inputClassName}
                    aria-errormessage={errorId}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
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
