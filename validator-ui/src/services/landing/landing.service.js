import { PRIVATE_API } from '../Api';

export function getCompanies() {
    return PRIVATE_API.get('companies/').then((res) => res.data);
}
