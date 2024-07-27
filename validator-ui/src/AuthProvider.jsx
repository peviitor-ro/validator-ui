import { useState, useEffect } from 'react';
import { AuthContext, INITIAL_STATE } from './contexts/AuthContext';
import { useLocalStorage } from './hooks/useLocalStorage';

export function AuthProvider({ children }) {
    const [authState, setAuthState] = useState({});

    useEffect(() => {
        const store = JSON.parse(localStorage.getItem('validator'));
        if (store?.accessToken && store?.refreshToken) {
            setAuthState({
                isAuthenticated: true,
                accessToken: store.accessToken,
                refreshToken: store.refreshToken,
                is_superuser: store.is_superuser,
                is_staff: store.is_staff,
            });
        }
    }, [authState.accessToken, authState.is_staff, authState.is_superuser, authState.refreshToken]);

    const { setItem, removeItem } = useLocalStorage(setAuthState, 'validator');

    function login(state) {
        setAuthState({
            isAuthenticated: true,
            refreshToken: state.refresh,
            accessToken: state.access,
            is_superuser: state.is_superuser,
            is_staff: state.is_staff,
        });

        setItem({
            refreshToken: state.refresh,
            accessToken: state.access,
            is_superuser: state.is_superuser,
            is_staff: state.is_staff,
        });
    }

    function updateAccessToken(accessToken) {
        setAuthState({ ...authState, accessToken });
        setItem({
            refreshToken: authState.refreshToken,
            accessToken,
            is_superuser: authState.is_superuser,
            is_staff: authState.is_staff,
        });
    }

    function logout() {
        setAuthState(INITIAL_STATE);
        removeItem();
    }

    return (
        <AuthContext.Provider
            value={{ ...authState, setAuthState, updateAccessToken, logout, login }}
        >
            {children}
        </AuthContext.Provider>
    );
}
