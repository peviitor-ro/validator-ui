import PropTypes from 'prop-types';

export default function InputField(props, ref) {
    const { id, label, type, errorMessage, placeholder, register } = props;
    const errorId = `error-${id}`;

    return (
        <>
            <label htmlFor={id} className="block mb-2 font-semibold">
                {label}
            </label>

            <input
                ref={ref}
                id={id}
                type={type}
                className="mb-2 px-3 py-2 border-input"
                aria-errormessage={errorId}
                placeholder={placeholder}
                {...register(id)}
            />

            <p className="h-2 my-2 text-error" id={errorId}>
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
