import axios from 'axios'

export const API = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}`,
    timeout: 100000,
    headers: {
        'Content-Type': 'application/json'
    }
})

API.interceptors.request.use(async (request) => {
    try {
        const accessToken = JSON.parse(localStorage.getItem('validator')).access_token

        if (!request.headers) {
            request.headers = {}
        }

        if (accessToken) {
            request.headers.Authorization = `Bearer ${accessToken}`
        }
    } catch (err) {
        return request
    }

    return request
})
