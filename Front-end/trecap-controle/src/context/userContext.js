'use client'

import { USER_GET_INFO, USER_GET_TOKEN } from "@/utils/endpointsAPI";
import axios from "axios";
import { useContext, createContext, useState, useLayoutEffect } from "react";

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(null)
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleGetUserInfo = async token => {
        const userInfo = await axios.post(USER_GET_INFO, {token: token})
        setUser(userInfo.data.user)
        console.log(userInfo.data.user)
        setIsLogged(true)
    }

    const handleLogin = async userInfo => {
        try {
            setIsLoading(true)
            setError(false)
            const responseToken = await axios.post(USER_GET_TOKEN, userInfo)
            const { token } = responseToken.data
            window.localStorage.setItem('token', token)
            await handleGetUserInfo(token)
        } catch (e) {
            setError('Ocooreu um erro!')
        }
        finally {
            setIsLoading(false)
        }

    }

    const handleLogout = () => {
        window.localStorage.removeItem('token')
        setIsLogged(false)
    }


    return (
        <UserContext.Provider value={
            {
                user,
                isLoading,
                error,
                isLogged,
                handleLogin,
                handleLogout
            }
        }>
            {children}
        </UserContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(UserContext)

    if (context === undefined) throw new Error("useAuth está sendo usanda fora do contexto do usuário!")

    return context
}
