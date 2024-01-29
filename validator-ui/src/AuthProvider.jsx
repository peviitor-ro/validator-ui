import { useState } from 'react'
import { AuthContext, INITIAL_STATE } from './contexts/AuthContext'
import { useLocalStorage } from './hooks/useLocalStorage'

export function AuthProvider({ children }) {
    const [authState, setAuthState] = useState(INITIAL_STATE)

    const { setItem, removeItem } = useLocalStorage(setAuthState, 'validator')

    function login(state) {
        setAuthState({
            isAuthenticated: true,
            refreshToken: state.refresh,
            accessToken: state.access
        })
        setItem({ refresh_token: state.refresh, access_token: state.access })
    }

    function logout() {
        setAuthState(INITIAL_STATE)
        removeItem()
    }

    return (
        <AuthContext.Provider value={{ ...authState, setAuthState, logout, login }}>
            {children}
        </AuthContext.Provider>
    )
}
