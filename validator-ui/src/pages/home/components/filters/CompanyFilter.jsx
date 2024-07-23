import { useState } from 'react';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import { useCompanyOptionsSelector } from '../../../../store/company.selectors';
import { SORT_OPTIONS } from './constants';

import { InputField } from '../../../../components/InputField/InputField';
import { SelectField } from '../../../../components/SelectField';
import { Button } from '../../../../components/Button';
import { Modal } from '../../../../components/Modal';
import { CompanyForm } from '../forms/CompanyForm';

export function Home({ children }) {
    return <main className="flex flex-col gap-4 p-4 lg:gap-10 lg:p-10">{children}</main>;
}

Home.Header = function H() {
    const { search, order, setOrder, setSearch } = useCompanyOptionsSelector();
    const [open, setOpen] = useState(false);

    return (
        <div
            id="search-container"
            className="flex flex-col gap-2 border-b border-disabled pb-4 lg:flex-row lg:pb-6 lg:items-center"
        >
            <h1 id="companies-title" className="text-3xl font-semibold text-primary">
                Companii
            </h1>

            <InputField
                id="search"
                value={search}
                onChange={setSearch}
                fieldClassName="rounded-md bg-card border border-disabled focus:outline-none focus:ring-1 lg:ml-auto"
                placeholder="Cauta aici..."
                leftIcon={<MagnifyingGlassIcon className="h-5" />}
                showError={false}
            />
            <SelectField options={SORT_OPTIONS} value={order} onChange={setOrder} />

            <Button className="w-full lg:w-auto" text="Adaugă"
                onClick={() => setOpen(true)}
            />

            <Modal open={open} setOpen={setOpen} title="Adaugă companie" className="w-11/12 md:w-2/3">
                <CompanyForm />
            </Modal>
        </div>
    );
};
