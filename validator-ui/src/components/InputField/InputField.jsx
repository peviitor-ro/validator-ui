import clsx from 'clsx';
import PropTypes from 'prop-types';

export default function InputField(props, ref) {
    const { id, label, type, errorMessage, placeholder, register } = props;
    const errorId = `error-${id}`;

    const inputClassName = clsx('mt-1 px-3 py-2 border-input', {
        'text-error border-text-error': errorMessage,
        'border-subtitle': !errorMessage,
    });

    const labelClassName = clsx('block font-semibold', { 'text-error': errorMessage });

    return (
        <>
            <label htmlFor={id} className={labelClassName}>
                {label}
            </label>

            <input
                ref={ref}
                id={id}
                type={type}
                className={inputClassName}
                aria-errormessage={errorId}
                placeholder={placeholder}
                {...register(id)}
            />

            <p className="h-8 my-1 text-error" id={errorId}>
                {errorMessage}
            </p>
        </>
    );
}

InputField.propTypes = {
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['text', 'email', 'password']).isRequired,
    errorMessage: PropTypes.string,
};
