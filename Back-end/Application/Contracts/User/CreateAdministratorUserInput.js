export default class CreateAdministratorUserInput{
    constructor(userData)
    {
        this.usu_id = userData.usu_id
        this.usu_nome = userData.usu_nome
        this.usu_CPF = userData.usu_CPF
        this.usu_email = userData.usu_email
        this.usu_senha = userData.usu_senha
        this.usu_telefone = userData.usu_telefone
        this.empresa_id = userData.empresa_id
    }
}