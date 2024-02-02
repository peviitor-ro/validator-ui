import { useEffect } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { PRIVATE_API } from './Api';
import { updateExpiredAccessToken } from './auth/auth.service';

export function AxiosInterceptors({ children }) {
    const authContext = useAuthContext();

    useEffect(() => {
        const store = {
            isRefreshing: false,
        };

        const respInterceptor = PRIVATE_API.interceptors.response.use(
            (response) => response,
            (error) => authResponseInterceptor(error, authContext, store)
        );

        return () => PRIVATE_API.interceptors.response.eject(respInterceptor);
    }, []);

    return children;
}

export const ERROR_MESSAGE = {
    INVALID_TOKEN: 'Invalid token',
    TOKEN_NOT_FOUND: 'Token not found',
};

export async function authResponseInterceptor(error, authContext, store) {
    const originalRequest = error.config;
    const { refreshToken, logout, updateAccessToken } = authContext;

    if (error?.response?.status === 403) {
        if (store.isRefreshing) {
            store.isRefreshing = false;
            logout();
            return Promise.reject(error);
        }

        store.isRefreshing = true;

        try {
            if (!refreshToken) {
                throw new Error(ERROR_MESSAGE.TOKEN_NOT_FOUND);
            }

            const response = await updateExpiredAccessToken(refreshToken);

            if (!response.access) {
                throw new Error(ERROR_MESSAGE.INVALID_TOKEN);
            }

            updateAccessToken(response.access);
            error.config.headers.Authorization = `Bearer ${response.access}`;

            return PRIVATE_API(originalRequest);
        } catch (error) {
            logout();
            return Promise.reject(error);
        } finally {
            store.isRefreshing = false;
        }
    }

    return Promise.reject(error);
}
