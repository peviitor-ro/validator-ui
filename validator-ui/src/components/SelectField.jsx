import clsx from 'clsx';

export function SelectField({ options, onChange, value, label, className, labelClassName }) {
    const selectClassName = clsx('rounded-md px-3 py-2 bg-card', { [className]: className });

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
