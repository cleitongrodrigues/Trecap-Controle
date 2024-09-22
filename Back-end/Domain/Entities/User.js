import userAdress from "../Value Objects/userAdress.js"
import Evento from "./Evento.js"

export default class User{
    constructor(userID, name, cpf, userType, status, email, password, telefone, registerDate, adress = null)
    {
        this.userID = userID
        this.name = name
        this.cpf = cpf
        this.userType = userType
        this.status = status
        this.email = email
        this.password = password
        this.telefone = telefone
        this.registerDate = new Date(registerDate)
        this.adress = adress
    }

    cancel(){
        if(this.status == 0) throw new Error('Usuário inexistente!')
        this.status = 0
    }
}