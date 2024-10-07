'use client'

import { USER_GET_INFO, USER_GET_TOKEN } from "@/utils/endpointsAPI";
import axios from "axios";
import { useContext, createContext, useState } from "react";

export const UserContext = createContext()

export const UserProvider = ({ children}) => {
    const [isLogged, setIsLogged] = useState(null)
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const getUserInfo = async token => {
        const userInfo = axios.post(USER_GET_INFO, token)
        setUser(userInfo)
        setIsLogged(true)
    }

    const userLogin = async userInfo => {
        try {
            setIsLoading(true)
            setError(false)
            const token = axios.post(USER_GET_TOKEN, userInfo)
            window.localStorage.setItem('token', token)
            getUserInfo(token)
        } catch (e) {
            console.log(e)
        }
        finally {
            isLoading(false)
        }

    }

    return (
        <UserContext.Provider>
            {children}
        </UserContext.Provider>
    )
}
