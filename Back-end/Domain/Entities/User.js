export default class User{
    constructor(userId, name, cpf, userType, status, email, password, telefone, registerDate, companyId)
    {
        this.userId = userId
        this.name = name
        this.cpf = cpf
        this.userType = userType
        this.status = status
        this.email = email
        this.password = password
        this.telefone = telefone
        this.registerDate = registerDate
        this.companyId = companyId
    }

    cancel(){
        if(this.status == 0) throw new Error('Usuário inexistente!')
        this.status = 0
    }
}