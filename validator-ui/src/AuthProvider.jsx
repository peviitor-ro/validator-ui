import { useState } from 'react';
import { AuthContext, INITIAL_STATE } from './contexts/AuthContext';
import { useLocalStorage } from './hooks/useLocalStorage';

export function AuthProvider({ children }) {
    const store = JSON.parse(localStorage.getItem('validator'));
    const [authState, setAuthState] = useState({
        isAuthenticated: store?.accessToken && store?.refreshToken,
        accessToken: store?.accessToken || null,
        refreshToken: store?.refreshToken || null,
        is_superuser: store?.is_superuser || false,
        is_staff: store?.is_staff || false,
    });

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
