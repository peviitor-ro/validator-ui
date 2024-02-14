import { PRIVATE_API } from '../Api';

export async function getCompanies(page, size, order = '', search = '') {
    const response = await PRIVATE_API.get(
        `companies?page=${page}&page_size=${size}&order=${order}&search=${search}`,
    );

    return {
        data: response.data.results ?? [],
        nextId: response.data.next ? page + 1 : null,
        count: response.data?.count ?? 0,
    };
}
