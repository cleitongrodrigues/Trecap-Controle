'use client'

import { useAuth } from "@/context/userContext"
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import Loading from "../loading";


export default function ProtectedRoute({ children}) {
    const { user } = useAuth()
    const router = useRouter()
    
    if(user === undefined) 
    {
        return <Loading />
    }
        

    if( user === null) 
    {
        router.push('/usuario/login')
        return null
    }

    return children

}
