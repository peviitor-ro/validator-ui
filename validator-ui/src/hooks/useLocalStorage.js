import { useEffect } from 'react'
import { INITIAL_STATE } from '../contexts/AuthContext'

export const useLocalStorage = (setState, key) => {
    useEffect(() => {
        const localStorageData = JSON.parse(localStorage.getItem(key))

        if (!localStorageData?.refresh_token || !localStorageData?.access_token) {
            setState(INITIAL_STATE)
        } else {
            setState({
                isAuthenticated: true,
                accessToken: localStorageData.access_token,
                refreshToken: localStorageData.refresh_token
            })
        }
    })

    return {
        setItem: (value) => localStorage.setItem(key, JSON.stringify(value)),
        removeItem: () => localStorage.removeItem(key)
    }
}
