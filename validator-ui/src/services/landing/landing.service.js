import { PRIVATE_API } from '../Api';

/**
 * Encodes an object of parameters into a URL query string.
 *
 * @param {Object} params - The parameters to encode.
 * @param {string} params.key - The key of the parameter.
 * @param {string} params.value - The value of the parameter.
 * @returns {string} The encoded query string.
 */
function encodedParams(params) {
    return Object.keys(params)
        .map((key) => `${key}=${encodeURIComponent(params[key])}`)
        .join('&');
}

/**
 * Sends a POST request to the specified URL with the provided data.
 *
 * @param {string} url - The URL to send the POST request to.
 * @param {object|any} data - The data to be sent in the POST request. If the data is an object, it is sent as is. Otherwise, it is wrapped in an array.
 * @returns {Promise<object>} The response from the POST request.
 */
export async function post(url, data) {
    let response;
    if (typeof data === 'object') {
        response = await PRIVATE_API.post(url, data);
    } else {
        response = await PRIVATE_API.post(url, [data]);
    }
    return response;
}

/**
 * Fetches data from the specified URL with the given parameters.
 *
 * @param {string} url - The URL to send the GET request to.
 * @param {Object} [params={}] - The query parameters to include in the request.
 * @param {string} [type='data'] - The type of result to return ('data' or 'status').
 * @returns {Promise<Object>} The requested data or status based on the type parameter.
 */
export async function get(url, params = {}, type = 'data') {
    const response = await PRIVATE_API.get(`${url}?${encodedParams(params)}`);

    const results = {
        data: {
            data: response.data.results ?? [],
            nextId: response.data.next ? params.page + 1 : null,
            count: response.data?.count ?? 0,
        },
        staus: response.status,
    };

    return results[type];
}

export async function removeCompany(companyName) {
    const data = {
        company: companyName,
    };
    const response = await PRIVATE_API.post('companies/delete/', data);

    return response.status;
}

export async function clearCompany(companyName) {
    const data = {
        company: companyName,
    };
    const response = await PRIVATE_API.post('companies/clear/', data);

    return response.status;
}

export async function syncJobs(companyName) {
    const response = await PRIVATE_API.post('jobs/sync/', { company: companyName });
    return response.status;
}

export async function getDataset(companyName) {
    const response = await PRIVATE_API.get(`companies/dataset/${companyName}/`);

    return response.data;
}

export async function getJobs(companyName, page, size, order = '', search = '') {
    const response = await PRIVATE_API.get(
        `jobs/get/?company=${companyName}&page=${page}&page_size=${size}&order=${order}&search=${search}`,
    );

    return {
        data: response.data.results ?? [],
        nextId: response.data.next ? page + 1 : null,
        count: response.data?.count ?? 0,
    };
}

export async function editJob(data) {
    const response = await PRIVATE_API.post('jobs/edit/', [data]);
    return response.status;
}

export async function removeJob(data) {
    const response = await PRIVATE_API.post('jobs/delete/', [data]);
    return response.status;
}

export async function publishJob(data) {
    const response = await PRIVATE_API.post('jobs/publish/', [data]);
    return response.status;
}

export async function getScrapers(page, order, search = '') {
    const response = await PRIVATE_API.get(
        `scraper/add/?${encodedParams({
            page,
            order,
            search,
        })}`,
    );

    return {
        data: response.data.results ?? [],
        nextId: response.data.next ? page + 1 : null,
        count: response.data?.count ?? 0,
    };
}

export async function getScraperFiles(scraperName) {
    const response = await PRIVATE_API.get(`scraper/${scraperName}/`);

    return response.data;
}

export async function runScraperFile(endpoint, fileName) {
    const response = await PRIVATE_API.post(endpoint, { file: fileName });
    return response.data;
}

export async function addScraper(data) {
    const response = await PRIVATE_API.post('scraper/add/', data);
    return response.data;
}

export async function deleteScraper(scraperName) {
    const response = await PRIVATE_API.post(`scraper/remove/`, { name: scraperName });
    return response.status;
}

export async function updateScraper(scraperName) {
    const response = await PRIVATE_API.post(`scraper/${scraperName}/`, { update: true });
    return response.data;
}

export async function getCities(page, size = 50, search = '') {
    const response = await PRIVATE_API.get(
        `orase/?page=${page}&page_size=${size}&search=${search}`,
    );

    return {
        data: response.data.results ?? [],
        nextId: response.data.next ? page + 1 : null,
        count: response.data?.count ?? 0,
    };
}

export async function getUsersAndCompanies(user = '') {
    const response = await PRIVATE_API.get(`user/companies${user ? `?user=${user}` : ''}`);

    return response.data;
}

export async function editUserCompanies(data) {
    const response = await PRIVATE_API.post('user/companies', data);
    return response.status;
}

export async function addUser(user) {
    const response = await PRIVATE_API.post('add', { email: user });

    return response.status;
}

export async function deleteUser(user) {
    const response = await PRIVATE_API.post('delete', { email: user });

    return response.status;
}
