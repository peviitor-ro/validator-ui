import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import { useJobsOptionsSelector } from '../../../../store/jobs.selectors';
import { JOBS_OPTIONS } from './constants';

import { InputField } from '../../../../components/InputField/InputField';
import { SelectField } from '../../../../components/SelectField';

export function Home({ children }) {
    return <main className="flex flex-col gap-4 p-4 lg:gap-10 lg:p-10">{children}</main>;
}

Home.Header = function H({ data, company }) {
    const { search, order, setOrder, setSearch } = useJobsOptionsSelector();

    return (
        <div id='search-container' className="flex gap-2">
            <h1>Joburi Disponibile {company}</h1>
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
            <SelectField options={JOBS_OPTIONS} value={order} onChange={setOrder} />
        </div>
    );
};
