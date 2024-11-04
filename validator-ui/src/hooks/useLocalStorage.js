import { useEffect } from 'react';
import { INITIAL_STATE } from '../contexts/AuthContext';

/**
 * Custom hook to manage local storage state.
 *
 * @param {Function} setState - Function to update the state.
 * @param {string} key - The key under which the data is stored in local storage.
 * @returns {Object} An object containing methods to set and remove items from local storage.
 */
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
