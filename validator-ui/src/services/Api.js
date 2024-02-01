import axios from 'axios';

export const PRIVATE_API = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}`,
    timeout: 100000,
    headers: {
        'Content-Type': 'application/json',
    },
});

PRIVATE_API.interceptors.request.use(async (request) => {
    try {
        const accessToken = JSON.parse(localStorage.getItem('validator')).accessToken;

        if (!request.headers) {
            request.headers = {};
        }
        if (accessToken) {
            request.headers.Authorization = `Bearer ${accessToken}`;
        }
    } catch (err) {
        return request;
    }

    return request;
});

export const PUBLIC_API = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}`,
    timeout: 100000,
    headers: {
        'Content-Type': 'application/json',
    },
});
