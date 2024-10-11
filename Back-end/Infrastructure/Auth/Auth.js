import UnauthorizedException from '../../Domain/Exception/UnauthorizedException.js'
import ValidationException from '../../Domain/Exception/ValidationException.js'
import userRepository from '../database/repositories/userRepository.js'
import jwt from 'jsonwebtoken'

class Auth {
    constructor() {

    }

    generateToken(user) {
        const payload = {
            userId: user.userId,
            name: user.name,
            userType: user.userType,
            companyId: user.companyId
        }

        const token = jwt.sign(payload, 'secret', { expiresIn: '24h' })

        return token
    }

    async Login(loginInfo) {
        if (!loginInfo.email) throw new ValidationException("Você não pode fazer login sem email!")
        if (!loginInfo.password) throw new ValidationException("Você não pode fazer login sem senha!")

        const user = await userRepository.getUserByEmail(loginInfo.email)

        if (!user || user.password !== loginInfo.password) throw new Error("Credenciais inválidas!")

        return this.generateToken(user)
    }

    getTokenInfo(token) {
        try {
            const decodeToken = jwt.verify(token, 'secret')
            return decodeToken
        } catch (e){
            throw new UnauthorizedException('Token inválido!')
        }
        
    }
}


export default new Auth()
