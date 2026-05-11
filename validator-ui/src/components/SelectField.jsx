import clsx from 'clsx';
import { useEffect, useMemo, useRef, useState } from 'react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

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
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const selectedOption = useMemo(
        () => options.find((option) => option.value === value) ?? options[0],
        [options, value],
    );

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                setOpen(false);
            }
        };

        window.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('keydown', handleEscape);

        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('keydown', handleEscape);
        };
    }, []);

    const triggerClassName = clsx(
        'flex h-12 w-full items-center justify-between rounded-2xl border border-slate-200 bg-white/90 px-4 text-sm text-slate-700 shadow-sm outline-none transition hover:border-slate-300 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20',
        { [className]: className },
    );

    return (
        <div className="relative" ref={dropdownRef}>
            <label
                htmlFor="select-sorting"
                className={clsx({ [labelClassName]: labelClassName, invisible: !label })}
            >
                {label}
            </label>
            <button
                id="select-sorting"
                type="button"
                className={triggerClassName}
                onClick={() => setOpen((prev) => !prev)}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <div className="flex min-w-0 flex-col items-start">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                        Sortare
                    </span>
                    <span className="truncate font-medium text-slate-700">{selectedOption?.name}</span>
                </div>
                <ChevronDownIcon
                    className={clsx('h-5 w-5 text-slate-400 transition-transform', {
                        'rotate-180': open,
                    })}
                />
            </button>
            {open && (
                <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 overflow-hidden rounded-2xl border border-slate-200 bg-white/95 shadow-[0_18px_45px_-28px_rgba(15,23,42,0.45)] backdrop-blur-md">
                    <ul className="max-h-64 overflow-y-auto py-2" role="listbox" aria-labelledby="select-sorting">
                        {options.map((opt) => {
                            const isSelected = opt.value === value;

                            return (
                                <li key={opt.value} role="option" aria-selected={isSelected}>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            onChange(opt.value);
                                            setOpen(false);
                                        }}
                                        className={clsx(
                                            'flex w-full items-center justify-between px-4 py-3 text-left text-sm transition-colors',
                                            isSelected
                                                ? 'bg-red-50 font-medium text-red-600'
                                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
                                        )}
                                    >
                                        <span>{opt.name}</span>
                                        {isSelected && <CheckIcon className="h-4 w-4" />}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
}
