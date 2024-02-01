import { PRIVATE_API } from '../Api';

export function getCompanies() {
    return PRIVATE_API.get('validator/get/').then((res) => res.data);
}
