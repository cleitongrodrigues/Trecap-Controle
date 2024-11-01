class CreateAdministratorUserInput{
    constructor(userData)
    {
        this.userId = userData.userId
        this.name = userData.usu_nome
        this.cpf = userData.usu_cpf
        this.email = userData.usu_email
        this.password = userData.usu_senha
        this.telefone = userData.usu_telefone
        this.companyId = userData.empresaId
    }
}