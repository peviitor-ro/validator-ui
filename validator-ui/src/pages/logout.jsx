import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export function Logout() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logout_url = process.env.REACT_APP_LOGOUT_URL

    useEffect(() => {
        dispatch({ type: 'LOGOUT_REQUEST' })
        window.location.href = logout_url
    }, [dispatch, navigate, logout_url])

    return null
}
