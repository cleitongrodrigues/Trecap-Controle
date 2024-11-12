import UnauthorizedException from '../../Domain/Exception/UnauthorizedException.js'
import ValidationException from '../../Domain/Exception/ValidationException.js'
import userRepository from '../repositories/userRepository.js'
import jwt from 'jsonwebtoken'

class Auth {
    constructor() {

    }

    generateToken(user) {
        const payload = {
            usu_id: user.usu_id,
            usu_nome: user.usu_nome,
            tipo_usuario_id: user.tipo_usuario_id,
            empresa_id: user.empresa_id
        }

        const token = jwt.sign(payload, 'secret', { expiresIn: '24h' })

        return token
    }

    async Login(loginInfo) {
        if (!loginInfo.email) throw new ValidationException("Você não pode fazer login sem email!")
        if (!loginInfo.password) throw new ValidationException("Você não pode fazer login sem senha!")

        const user = await userRepository.getUserByEmail(loginInfo.email)

        if (!user || user.usu_senha !== loginInfo.password) throw new Error("Credenciais inválidas!")

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
