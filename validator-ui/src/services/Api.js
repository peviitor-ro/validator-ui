import axios from 'axios';

export const PRIVATE_API = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}`,
    timeout: 100000,
    headers: {
        'Content-Type': 'application/json',
    },
});

PRIVATE_API.interceptors.request.use(async (request) => {
    const store = localStorage.getItem('validator');

    if (!store) {
        return request;
    }

    const parsedStore = JSON.parse(store);

    if (!parsedStore.accessToken) {
        return request;
    }

    if (!request.headers) {
        request.headers = {};
    }

    request.headers.Authorization = `Bearer ${accessToken}`;

    return request;
});

export const PUBLIC_API = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}`,
    timeout: 100000,
    headers: {
        'Content-Type': 'application/json',
    },
});
