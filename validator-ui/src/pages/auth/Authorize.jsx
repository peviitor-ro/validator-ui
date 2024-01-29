import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext'
import { useAuthStateQuery } from '../../services/auth/auth.queries'
import Unautorized from './components/Unautorized'

function Authorize() {
    const { token } = useParams()
    const { login } = useAuthContext()
    const { data, isLoading, isError } = useAuthStateQuery(token)

    useEffect(() => {
        if (data) {
            login(data)
        }
    }, [data])

    if (isLoading) return <>Loading...</>

    // TODO: add option to go back to login from unautorized page
    if (isError || !data) return <Unautorized />

    return <Navigate to="/" replace />
}

export default Authorize
