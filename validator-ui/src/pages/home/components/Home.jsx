import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { InputField } from '../../../components/InputField/InputField';
import { SelectField } from '../../../components/SelectField';
import { useCompanyOptionsSelector } from '../../../store/Company.selectors';

export function Home({ children }) {
    return <main className="flex flex-col gap-4 p-4 lg:gap-10 lg:p-10">{children}</main>;
}

const SORT_OPTIONS = [
    { value: 'name_asc', name: 'Alfabetic' },
    { value: 'name_desc', name: 'Alfabetic (Desc.)' },
    { value: 'jobs_count_asc', name: 'Nr. joburi' },
    { value: 'jobs_count_desc', name: 'Nr. joburi (desc.)' },
];

Home.Header = function H({ data }) {
    const { search, order, setOrder, setSearch } = useCompanyOptionsSelector();

    return (
        <div className="flex gap-2">
            <h1>Companii</h1>
            {!!data?.pages[0]?.count && (
                <p className="font-semibold p-2">{data.pages[0].count} de rezultate</p>
            )}
            <InputField
                id="search"
                value={search}
                onChange={setSearch}
                fieldClassName="ml-auto"
                placeholder="Cauta aici..."
                leftIcon={<MagnifyingGlassIcon className="h-5" />}
                showError={false}
            />
            <SelectField options={SORT_OPTIONS} value={order} onChange={setOrder} />
        </div>
    );
};
