import { useEffect } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { PRIVATE_API } from './Api';
import { updateExpiredAccessToken } from './auth/auth.service';

export function AxiosInterceptors({ children }) {
    const { logout, refreshToken, updateAccessToken } = useAuthContext();

    useEffect(() => {
        let isRefreshing = false;
        const refreshAndRetryQueue = [];

        const respInterceptor = PRIVATE_API.interceptors.response.use(
            (response) => response,
            async function unauthorizedResponseInterceptor(error) {
                const originalRequest = error.config;

                if (error?.response?.status === 403) {
                    if (isRefreshing) {
                        isRefreshing = false;
                        logout();
                        return Promise.reject(error);
                    }

                    isRefreshing = true;

                    try {
                        if (!refreshToken) {
                            throw new Error('Invalid token');
                        }

                        // In case a request fails, we need to memoized the originalRequest in order preserve the retry property
                        // and to not cause an infinite loop

                        const response = await updateExpiredAccessToken(refreshToken);

                        if (!response.access) {
                            throw new Error('Invalid token');
                        }

                        updateAccessToken(response.access);
                        error.config.headers['Authorization'] = `Bearer ${response.access}`;

                        refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
                            PRIVATE_API.request(config)
                                .then((response) => resolve(response))
                                .catch((err) => reject(err));
                        });

                        refreshAndRetryQueue.length = 0;

                        return PRIVATE_API(originalRequest);
                    } catch (error) {
                        logout();
                    } finally {
                        isRefreshing = false;
                    }

                    return new Promise((resolve, reject) => {
                        refreshAndRetryQueue.push({ config: originalRequest, resolve, reject });
                    });
                }

                return Promise.reject(error);
            }
        );

        return () => {
            return PRIVATE_API.interceptors.response.eject(respInterceptor);
        };
    }, []);

    return children;
}
