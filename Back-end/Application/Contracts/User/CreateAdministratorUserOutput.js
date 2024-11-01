export default class CreateAdministratorUserOutput{
    constructor(user)
    {
        this.usu_id = user.userId
        this.usu_nome = user.name
        this.usu_email = user.email
        this.usu_tipo = user.userType
        this.empresa_id = user.companyId
    }
}