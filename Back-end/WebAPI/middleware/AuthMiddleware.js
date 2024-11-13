import UnauthorizedException from "../../Domain/Exception/UnauthorizedException.js"
import Auth from "../../Infrastructure/Auth/Auth.js"

const userTypes = {
    1: 'admin'
}

export function isProtected(usersAllowed) {
    return (request, response, next) => {
        const authHeader = request.headers['authorization']
        if (!authHeader && !authHeader?.startsWith('Bearer ')) throw new UnauthorizedException()

        let token = authHeader.split(' ')[1]
        const userInfo = Auth.getTokenInfo(token)
        if (!userInfo) throw new UnauthorizedException()

        request.user = userInfo

        next()
    }
}