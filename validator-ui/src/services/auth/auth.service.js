import { PUBLIC_API } from '../Api';

export function loginUser(email) {
    return PUBLIC_API.post('/', { email }).then((res) => res.data);
}

export function getAuthState(token) {
    if (!token) throw new Error('Invalid token');

    return PUBLIC_API.get(`/authorized/${token}`).then((res) => res.data);
}

export function updateExpiredAccessToken(refreshToken) {
    return PUBLIC_API.post('/refresh', { token: refreshToken }).then((res) => res.data);
}
