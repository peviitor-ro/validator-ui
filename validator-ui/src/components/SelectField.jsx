import clsx from 'clsx';

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
