'use client'

import { useAuth } from "@/context/userContext"
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import Loading from "../loading";


export default function ProtectedRoute({ children}) {
    const { user, isLogged, isLoading, token } = useAuth()
    const router = useRouter()
    
    if(isLoading) return <Loading />
    if(!isLogged) {
        router.push("/usuario/login")
    }
    
    return children
}
