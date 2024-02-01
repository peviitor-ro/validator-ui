import { useEffect } from 'react';
import { INITIAL_STATE } from '../contexts/AuthContext';

export const useLocalStorage = (setState, key) => {
    useEffect(() => {
        const localStorageData = JSON.parse(localStorage.getItem(key));

        if (!localStorageData?.refreshToken || !localStorageData?.accessToken) {
            setState(INITIAL_STATE);
        } else {
            setState({
                isAuthenticated: true,
                accessToken: localStorageData.accessToken,
                refreshToken: localStorageData.refreshToken,
            });
        }
    }, []);

    return {
        setItem: (value) => localStorage.setItem(key, JSON.stringify(value)),
        removeItem: () => localStorage.removeItem(key),
    };
};
