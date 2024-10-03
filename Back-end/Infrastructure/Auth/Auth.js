import ValidationException from '../../Domain/Exception/ValidationException.js'
import userRepository from '../database/repositories/userRepository.js'
import jwt from 'jsonwebtoken'

class Auth{
    constructor(){

    }

    generateToken(user){
        const payload = {
            userId: user.userId,
            name: user.name,
            userType: user.userType,
            companyId: user.companyId
        }

        const token = jwt.sign(payload, 'secret', { expiresIn: '24h' })

        return token
    }

    async Login(loginInfo){
        if(!loginInfo.email) throw new ValidationException("O email é obrigátorio!") 
        if(!loginInfo.password) throw new ValidationException("A senha é obrigátorio!") 

        const user = await userRepository.getUserByEmail(loginInfo.email)
    
        if(user.password !== loginInfo.password) throw new Error("Email e/ou senha errada!")
        
        return this.generateToken(user)
    }

    getTokenInfo(token){
        try{
            const decodeToken = jwt.decode(token, 'secret')
            return decodeToken
        }catch(error){
            throw new Error("Você precisa estar logado para acessar essa rota!")
        }
        
    }
}


export default new Auth()
