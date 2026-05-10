import { useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { InputField } from '../../../../components/InputField/InputField';
import { SelectField } from '../../../../components/SelectField';
import { Button } from '../../../../components/Button';

/**
 * Home component that serves as a container for child elements.
 *
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The child elements to be rendered within the Home component.
 * @returns {JSX.Element} The rendered Home component.
 */
export function Home({ children }) {
    return <main className="flex flex-col gap-4 lg:gap-10 ">{children}</main>;
}

/**
 * Header component for the Home component.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.title - The title to be displayed in the header.
 * @param {Function} props.selector - The selector function that returns search, order, setOrder, and setSearch.
 * @param {Array} props.options - The options for the SelectField component.
 * @returns {JSX.Element} The rendered Header component.
 */
Home.Header = function H({ title, selector, options }) {
    /**
     * Destructures the search, order, setOrder, and setSearch properties from the selector function.
     *
     * @constant {string} search - The search query string.
     * @constant {string} order - The current order state.
     * @function setOrder - Function to update the order state.
     * @function setSearch - Function to update the search query string.
     */
    const { order, setOrder, setSearch } = selector();

    // Add event listener to search input field
    useEffect(() => {
        const handleKeyUp = (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                setSearch(event.target.value);
            }
        };

        const inputElement = document.getElementById('search');
        if (inputElement) {
            inputElement.addEventListener('keyup', handleKeyUp);
        }

        return () => {
            if (inputElement) {
                inputElement.removeEventListener('keyup', handleKeyUp);
            }
        };
    }, []);

    return (
        <div
            id="search-container"
            className="sticky top-0 z-40 mx-4 rounded-3xl border border-white/60 bg-white/90 p-3 shadow-[0_18px_45px_-28px_rgba(15,23,42,0.45)] backdrop-blur-md lg:mx-6 lg:p-4"
        >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                        Filtrare rapida
                    </p>
                    <h1 className="text-2xl font-semibold text-slate-800 lg:text-3xl">{title}</h1>
                </div>

                <div className="grid gap-3 lg:min-w-[680px] lg:grid-cols-[minmax(0,1.7fr)_minmax(180px,0.9fr)_auto] lg:items-center">
                    <InputField
                        id="search"
                        fieldClassName="rounded-2xl border border-slate-200 bg-white/90 shadow-sm"
                        placeholder="Cauta aici..."
                        leftIcon={<MagnifyingGlassIcon className="h-5 text-slate-400" />}
                        showError={false}
                    />
                    <SelectField options={options} value={order} onChange={setOrder} />

                    <Button
                        id="search-button"
                        className="w-full rounded-2xl px-6 lg:w-auto"
                        text="Cauta"
                        onClick={() => {
                            const search = document.getElementById('search').value;
                            setSearch(search);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
