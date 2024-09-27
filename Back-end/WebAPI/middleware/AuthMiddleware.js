import Auth from "../../Infrastructure/Auth/Auth"

const userTypes = {
    1: 'admin'
}

export function getInfoUser(request, response, next) {

}

export function isProtected(usersAllowed) {
    return (request, response, next) => {
        const authHeader = request.headers['authorization']
        let token
        if (!authHeader && !authHeader.startsWith('Bearer ')) return response.status(403).send("Você não tem permissão para acessar essa rota")
        
        token = authHeader.split(' ')[1]
        request.user = Auth.getTokenInfo(token)

        const userInfo = request.user

        if (!userInfo || !usersAllowed.includes(userTypes[userInfo.userTypes])) return response.status(403).send("Você não tem permissão para acessar essa rota")

        next()
}
}