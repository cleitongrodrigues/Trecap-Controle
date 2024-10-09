'use client'

import { useAuth } from "@/context/userContext"
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";


export default function ProtectedRoute({ children, allowedRoles = [1]}) {
    const { user, isLogged } = useAuth()
    const router = useRouter()
    
    if(!isLogged) {
        router.push('/usuario/login')
        return null
    }
    
    if(!allowedRoles.includes(user.userType)) return <div>Você não tem permissão para acessar essa rota</div>
    return children
}
