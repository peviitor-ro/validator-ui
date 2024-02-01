import { useMutation, useQuery } from 'react-query';
import { getAuthState, loginUser, updateExpiredAccessToken } from './auth.service';

export function useLoginMutation() {
    return useMutation((email) => loginUser(email));
}

export function useAuthStateQuery(token) {
    return useQuery(['auth', token], () => getAuthState(token));
}

export function useUpdateExpiredAccessTokenMutation() {
    return useMutation((refreshToken) => updateExpiredAccessToken(refreshToken));
}
