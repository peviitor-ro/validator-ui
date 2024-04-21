import { json } from 'react-router-dom';
import { PRIVATE_API } from '../Api';

export async function getCompanies(page, size, order = '', search = '') {
    const response = await PRIVATE_API.get(
        `companies/?page=${page}&page_size=${size}&order=${order}&search=${search}`,
    );

    return {
        data: response.data.results ?? [],
        nextId: response.data.next ? page + 1 : null,
        count: response.data?.count ?? 0,
    };
}

export async function removeCompany(companyName) {
    const data = {
        company: companyName,
    };
    const response = await PRIVATE_API.post('companies/delete/', data);

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

export async function getScrapers() {
    const response = await PRIVATE_API.get('scraper/add/');

    return response.data;
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
