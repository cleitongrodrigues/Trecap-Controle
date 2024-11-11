export default class ResponseGetUser{
    constructor(user)
    {
        this.usu_id = user.usu_id
        this.usu_nome = user.usu_nome
        this.usu_email = user.usu_email
        this.usu_tipo = user.tipo_usuario_id
        this.empresa_id = user.empresa_id
    }
}