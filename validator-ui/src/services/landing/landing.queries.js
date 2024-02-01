import { useQuery } from 'react-query';
import { getCompanies } from './landing.service';

export function useCompaniesQuery() {
    return useQuery('companies', () => getCompanies());
}
