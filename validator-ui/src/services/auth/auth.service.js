import { API } from '../apiConfig'

export function loginUser(email) {
    return API.post('/', { email }).then((res) => res.data)
}

export function getAuthState(token) {
    if (!token) throw new Error('Invalid token')

    return API.get(`/authorized/${token}`).then((res) => res.data)
}
