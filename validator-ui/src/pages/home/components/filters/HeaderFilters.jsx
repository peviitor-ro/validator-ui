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
            className="sticky top-0 w-full z-40 flex flex-col bg-card gap-2 border-b border-disabled shadow-lg lg:flex-row lg:items-center p-2 lg:p-4"
        >
            <h1 className="text-3xl font-semibold text-primary">{title}</h1>

            <InputField
                id="search"
                fieldClassName="rounded-md bg-card border border-disabled focus:outline-none focus:ring-1 lg:ml-auto"
                placeholder="Cauta aici..."
                leftIcon={<MagnifyingGlassIcon className="h-5" />}
                showError={false}
            />
            <SelectField options={options} value={order} onChange={setOrder} />

            <Button
                id="search-button"
                className="w-full lg:w-auto"
                text="Cauta"
                onClick={() => {
                    const search = document.getElementById('search').value;
                    setSearch(search);
                }}
            />
        </div>
    );
};
