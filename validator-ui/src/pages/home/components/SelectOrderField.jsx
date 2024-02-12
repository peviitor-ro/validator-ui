import { SelectField } from '../../../components/SelectField';
import { useCompanyOptionsSelector } from '../../../store/Company.selectors';

const SORT_OPTIONS = [
    { value: 'name_asc', name: 'Ordine alfabetica' },
    { value: 'name_desc', name: 'Ordine alfabetica desc.' },
    { value: 'jobs_count_asc', name: 'Ordine dupa nr. joburi' },
    { value: 'jobs_count_desc', name: 'Ordine dupa nr. joburi desc.' },
];

export default function SelectOrderField() {
    const { order, setOrder } = useCompanyOptionsSelector();

    return (
        <SelectField
            label="Sorteaza"
            options={SORT_OPTIONS}
            value={order}
            onChange={setOrder}
            className="col-start-2"
            labelClassName="col-start-2 row-start-1"
        />
    );
}
