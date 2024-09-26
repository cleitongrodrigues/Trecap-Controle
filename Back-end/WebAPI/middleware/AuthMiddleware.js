import Auth from "../../Infrastructure/Auth/Auth"

const userTypes = {
    1 : 'admin'
}

export function getInfoUser(request, response, next) {
    const authHeader = request.headers['authorization']
    let token
    if (!authHeader && !authHeader.startsWith('Bearer ')) next()
    token = authHeader.split(' ')[1]
    request.user = Auth.getTokenInfo(token)
    next()
}

export function isProtected(usersAllowed) {
    return (request, response, next)=>{
        const userInfo = request.user

        if(!userInfo || !usersAllowed.includes(userTypes[userInfo.userTypes])) return response.status(403).send("Você não tem permissão para acessar essa rota")
        
        next()
    }   
}