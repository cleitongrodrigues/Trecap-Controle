import User from "../Entities/User.js"

export default class FactoryUser{
    constructor(){

    }

    createAdminUser(inputCreateUser){
        return new User(
            inputCreateUser.userId, 
            inputCreateUser.name, 
            inputCreateUser.cpf,
            1, 
            1, 
            inputCreateUser.email, 
            inputCreateUser.password, 
            inputCreateUser.telefone, 
            new Date(inputCreateUser.registerDate), 
            inputCreateUser.companyId
        )
    }
}