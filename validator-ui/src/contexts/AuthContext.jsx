/* eslint-disable no-unused-vars */
import { createContext, useContext } from 'react';

export const INITIAL_STATE = {
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
};

export const AuthContext = createContext({
    ...INITIAL_STATE,
    setAuthState: (state) => {},
    logout: () => {},
    login: (state) => {},
    updateAccessToken: (accessToken) => {},
});

export const useAuthContext = () => useContext(AuthContext);
