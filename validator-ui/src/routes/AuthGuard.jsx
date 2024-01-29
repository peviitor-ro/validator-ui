import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'
import { routes } from './routes'

export function AuthGuard({ children }) {
    const { isAuthenticated } = useAuthContext()

    if (!isAuthenticated) {
        return <Navigate to={routes.LOGIN} replace />
    }

    return children
}
