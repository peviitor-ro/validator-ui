import { useState } from 'react';
import { AuthContext, INITIAL_STATE } from './contexts/AuthContext';
import { useLocalStorage } from './hooks/useLocalStorage';

export function AuthProvider({ children }) {
    const store = JSON.parse(localStorage.getItem('validator'));

    const [authState, setAuthState] = useState({
        isAuthenticated: store?.accessToken && store?.refreshToken,
        accessToken: store?.accessToken,
        refreshToken: store?.refreshToken,
    });

    const { setItem, removeItem } = useLocalStorage(setAuthState, 'validator');

    function login(state) {
        setAuthState({
            isAuthenticated: true,
            refreshToken: state.refresh,
            accessToken: state.access,
        });

        setItem({ refreshToken: state.refresh, accessToken: state.access });
    }

    function updateAccessToken(accessToken) {
        setAuthState({ ...authState, accessToken });
        setItem({ refreshToken: authState.refreshToken, accessToken });
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
