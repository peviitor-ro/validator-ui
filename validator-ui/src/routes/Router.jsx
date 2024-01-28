import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from '../layouts/AppLayout'
import { Homepage } from '../pages/Homepage'
import { Login } from '../pages/Login'
import { Logout } from '../pages/Logout'
import Authorize from '../pages/auth/Authorize'
import Unautorized from '../pages/auth/Unautorized'
import { CapthchaProvider } from './CapthchaProvider'
import { routes } from './routes'

export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path={routes.LOGIN}
                    element={
                        <CapthchaProvider>
                            <Login />
                        </CapthchaProvider>
                    }
                />

                <Route path="/" element={<AppLayout />}>
                    <Route index element={<Homepage />} />
                    <Route path={routes.LOGOUT} element={<Logout />} />
                </Route>
                <Route path={routes.UNAUTHORIZED} element={<Unautorized />} />
                <Route path={routes.AUTHORIZED} element={<Authorize />} />
            </Routes>
        </BrowserRouter>
    )
}
