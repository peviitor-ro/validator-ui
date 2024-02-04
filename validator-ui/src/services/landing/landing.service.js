import { PRIVATE_API } from '../Api';

export function getCompanies() {
    return PRIVATE_API.get('getcompanies/').then((res) => res.data);
}
