export default class User{
    constructor(userID, name, cpf, userType, status, email, telefone, registerDate){
        this.userID = userID
        this.name = name
        this.cpf = cpf
        this.userType = userType
        this.status = status
        this.email = email
        this.telefone = telefone
        this.registerDate = registerDate
    }

    cancel(){
        if(this.status == 0) throw new Error('Usuário inexistente!')
        this.status = 0
    }
}