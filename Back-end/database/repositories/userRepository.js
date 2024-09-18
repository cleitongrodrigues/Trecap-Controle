import connection from "../connection";


class UserRepository{
    constructor(){}

    getUserById(ID) {

    }

    getUserByEmail(email) {

    }

    createUser(userCreateDTO){

    }

    async getUsers(){
        const sql = `SELECT usu_id, usu_nome, usu_CPF, tipo_usuario_id, 
        usu_ativo = 1 AS usu_ativo, usu_email, usu_telefone, usu_data_cadastro, usu_ultimo_login
        FROM Usuario WHERE usu_ativo = 1;`;

        const [users] = await connection.query(sql)
        return users
    }
}


export default new UserRepository()