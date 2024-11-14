'use client'

import { USER_GET_INFO, USER_GET_TOKEN } from "@/utils/endpointsAPI";
import axios from "axios";
import { useContext, createContext, useState, useLayoutEffect, useEffect } from "react";

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(null)
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [token, setToken] = useState(null)

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
            setToken(token)
            await handleGetUserInfo(token)
            return true
        } catch (e) {
            setError(e.response.data.message)
            return false
        }
        finally {
            setIsLoading(false)
        }

    }

    useEffect(() => {
        async function teste(){
            const token = window.localStorage.getItem('token');
        if (token){
            try {
                setIsLoading(true)
                setToken(token)
                await handleGetUserInfo(token)
                setIsLogged(true)
            } finally {
                setIsLoading(false)
            }
        }
        }
        
        teste()
    }, []);

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
                handleLogout,
                token
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
