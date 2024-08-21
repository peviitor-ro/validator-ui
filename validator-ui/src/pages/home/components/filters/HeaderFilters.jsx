import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { InputField } from '../../../../components/InputField/InputField';
import { SelectField } from '../../../../components/SelectField';
import { Button } from '../../../../components/Button';
import { Modal } from '../../../../components/Modal';

export function Home({ children }) {
    return <main className="flex flex-col gap-4 p-4 lg:gap-10 lg:p-10">{children}</main>;
}

Home.Header = function H({ title, formComponent, selector, options }) {
    const { search, order, setOrder, setSearch } = selector();
    const [open, setOpen] = useState(false);

    return (
        <div
            id="search-container"
            className="flex flex-col gap-2 border-b border-disabled pb-4 lg:flex-row lg:pb-6 lg:items-center"
        >
            <h1 className="text-3xl font-semibold text-primary">{title}</h1>

            <InputField
                id="search"
                value={search}
                onChange={setSearch}
                fieldClassName="rounded-md bg-card border border-disabled focus:outline-none focus:ring-1 lg:ml-auto"
                placeholder="Cauta aici..."
                leftIcon={<MagnifyingGlassIcon className="h-5" />}
                showError={false}
            />
            <SelectField options={options} value={order} onChange={setOrder} />

            <Button className="w-full lg:w-auto" text="Adaugă" onClick={() => setOpen(true)} />

            <Modal open={open} setOpen={setOpen} title="Adaugă companie">
                {formComponent}
            </Modal>
        </div>
    );
};
