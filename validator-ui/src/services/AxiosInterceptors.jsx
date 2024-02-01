import { useEffect } from 'react'
import { useAuthContext } from '../contexts/AuthContext'
import { API } from './apiConfig'

export function AxiosInterceptors({ children }) {
    const { logout } = useAuthContext()

    useEffect(() => {
        const respInterceptor = API.interceptors.response.use(
            async (response) => {
                return response
            },
            async (error) => {
                // TODO: Send a refresh token request and update the auth state
                if (error.response.status === 401) {
                    logout()
                }

                if (error.response.status === 403) {
                    console.log('not allowed')
                }

                //TODO: UNITAR ERROR HANDLING
                console.log(error)
                throw error
            }
        )

        return () => {
            return API.interceptors.response.eject(respInterceptor)
        }
    })
    return children
}
