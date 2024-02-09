import { useMutation, useQuery } from '@tanstack/react-query';
import { getAuthState, loginUser, updateExpiredAccessToken } from './auth.service';

export function useLoginMutation() {
    return useMutation({ mutationFn: (email) => loginUser(email) });
}

export function useAuthStateQuery(token) {
    return useQuery({ queryKey: ['auth', token], queryFn: () => getAuthState(token) });
}

export function useUpdateExpiredAccessTokenMutation() {
    return useMutation({ mutationFn: (refreshToken) => updateExpiredAccessToken(refreshToken) });
}
