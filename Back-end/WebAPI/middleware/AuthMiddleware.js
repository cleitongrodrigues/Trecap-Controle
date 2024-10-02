import Auth from "../../Infrastructure/Auth/Auth.js"

const userTypes = {
    1: 'admin'
}

export function isProtected(usersAllowed) {
    return (request, response, next) => {
        const authHeader = request.headers['authorization']
        if (!authHeader && !authHeader.startsWith('Bearer ')) return response.status(403).send("Você não tem permissão para acessar essa rota")

        let token = authHeader.split(' ')[1]
        const userInfo = Auth.getTokenInfo(token)
        if (!userInfo || !usersAllowed.includes(userTypes[userInfo.userType])) return response.status(403).send("Você não tem permissão para acessar essa rota")

        request.user = userInfo

        next()
    }
}