'use client'

import { USER_GET_INFO, USER_GET_TOKEN } from "@/utils/endpointsAPI";
import axios from "axios";
import { useContext, createContext, useState, useEffect, useLayoutEffect } from "react";

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState()
    const [error, setError] = useState(null)
    const [token, setToken] = useState()

    const fetchUserData = async token => {
        const userInfo = await axios.post(USER_GET_INFO, { token: token })
        setUser(userInfo.data.user)
    }

    const handleLogin = async userInfo => {
        setError(false)

        try {
            const responseToken = await axios.post(USER_GET_TOKEN, userInfo)
            const { token } = responseToken.data
            window.localStorage.setItem('token', token)
            setToken(token)
            await fetchUserData(token)
        } catch (e) {
            setError(e.response.data.message)
        }
    }

    useEffect(() => {
        async function fetchUserDataOnFirstRendering() {

            const token = window.localStorage.getItem('token');

            if (token) {
                try{
                    const isValidToken = await fetchVerifyToken(token)
                    if(isValidToken){
                        setToken(token)
                        await fetchUserData(token)
                    } else {
                        setToken(null)
                        setUser(null)
                    }
                } catch (e){
                    setToken(null)
                    setUser(null)
                }
            } else {
                setToken(null)
                setUser(null)
            }
        }

        fetchUserDataOnFirstRendering()

        async function fetchVerifyToken(token){
            try {
                const response = await axios.get('http://localhost:3333/verify-token', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                return response.data.valid_token;
            } catch (error) {
                console.log(error)
            }
        }
    }, []);

    useLayoutEffect(()=>{
        const authInterceptor = axios.interceptors.request.use((config) =>{
            config.headers.Authorization = token ? `Bearer ${token}` : config.headers.Authorization

            return config
        })

        return () => {
            axios.interceptors.request.eject(authInterceptor)
        }
    },[token])

    const handleLogout = () => {
        window.localStorage.removeItem('token')
        setUser(null)
        setToken(null)
    }


    return (
        <UserContext.Provider value={
            {
                user,
                error,
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
