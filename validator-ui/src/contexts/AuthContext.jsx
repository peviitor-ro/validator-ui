/* eslint-disable no-unused-vars */
import { createContext, useContext } from 'react';

export const INITIAL_STATE = {
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
    is_superuser: false,
    is_staff: false,
};

export const AuthContext = createContext({
    ...INITIAL_STATE,
    setAuthState: (state) => {},
    logout: () => {},
    login: (state) => {},
    updateAccessToken: (accessToken) => {},
});

export const useAuthContext = () => useContext(AuthContext);
