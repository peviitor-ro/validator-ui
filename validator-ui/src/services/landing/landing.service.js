import { PRIVATE_API } from '../Api';

let count = 0;

export async function getCompanies(page, size) {
    const response = await PRIVATE_API.get(`companies/?page=${page}&page_size=${size}`);

    if (!count) {
        count = response.data.count;
    }

    return {
        data: response.data.results ?? [],
        nextId: response.data.next ? page + 1 : null,
        previousId: null,
        count,
    };
}
