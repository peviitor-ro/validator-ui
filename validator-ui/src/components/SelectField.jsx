import clsx from 'clsx';

/**
 * SelectField component renders a dropdown select element with customizable options.
 *
 * @param {Object} props - The properties object.
 * @param {Array} props.options - The array of options to be displayed in the select dropdown.
 * @param {Function} props.onChange - The callback function to handle the change event.
 * @param {string} props.value - The current selected value of the select element.
 * @param {string} [props.label] - The label text for the select element.
 * @param {string} [props.className] - Additional class names for the select element.
 * @param {string} [props.labelClassName] - Additional class names for the label element.
 *
 * @returns {JSX.Element} The rendered SelectField component.
 */
export function SelectField({ options, onChange, value, label, className, labelClassName }) {
    // set select class
    const selectClassName = clsx(
        'rounded-md p-2 bg-card border border-disabled focus:outline-none focus:ring-1 focus:ring-primary',
        { [className]: className },
    );

    return (
        <>
            <label
                htmlFor="select-sorting"
                className={clsx({ [labelClassName]: labelClassName, invisible: !label })}
            >
                {label}
            </label>
            <select
                name="options"
                id="select-sorting"
                className={selectClassName}
                value={value}
                onChange={({ target }) => onChange(target.value)}
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.name}
                    </option>
                ))}
            </select>
        </>
    );
}
