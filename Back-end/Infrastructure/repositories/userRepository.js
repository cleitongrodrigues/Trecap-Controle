import User from "../../Domain/Entities/User.js";
import UserQueryParamys from "../QueryBuilders/UserQueryParams.js";
import connection from '../database/connection.js'
import NotFoundException from "../../Domain/Exception/NotFoundException.js";
import ValidationException from "../../Domain/Exception/ValidationException.js";
import QueryBuilder from "../database/QueryBuilder.js";


class UserRepository {
    constructor() {}
    
    async getUsers(input) {
        const queryBuilder = new QueryBuilder("usuario")
        queryBuilder
                    .whereAnd('usu_ativo = 1')
                    .page(input.page)
                    .limit(input.pageSize)
                                
        if(input.filter){
            queryBuilder.whereAnd(`usu_nome LIKE \'%${input.filter}%\'`)
            queryBuilder.whereOr(`usu_email LIKE \'%${input.filter}%\'`)
            queryBuilder.whereOr(`usu_id LIKE \'%${input.filter}%\'`)
        }

        const sql = queryBuilder.build()

        const [users] = await connection.query(sql)

        return users
    }

    async getUserById(Id) {
        const queryBuilder = new QueryBuilder("usuario")
        queryBuilder
                    .whereAnd('usu_ativo = 1')
                    .whereAnd(`usu_id = ${Id}`)

        const sql = queryBuilder.build()

        const [queryResult] = await connection.query(sql, Id)

       

        if (queryResult.length === 0) throw new NotFoundException("Usuário Não Encontrado!")
        const [userInfo] = queryResult



        const newUser = new User(userInfo.usu_id, userInfo.usu_nome, userInfo.usu_CPF, userInfo.tipo_usuario_id, 1, userInfo.usu_email, userInfo.usu_senha, userInfo.usu_telefone, new Date(userInfo.usu_data_cadastro), userInfo.empresa_id)

        return newUser
    }

    async getUserByEmail(email) {
        const sql = `SELECT usu_id, usu_nome, usu_CPF, tipo_usuario_id, usu_ativo = 1 AS usu_ativo,
            usu_email, usu_senha, usu_telefone, usu_data_cadastro, empresa_id FROM usuario
            WHERE usu_ativo = 1 and usu_email = ?;`;

        const [queryResult] = await connection.query(sql, email)

        if (queryResult.length === 0)  throw new NotFoundException("Usuário Não Encontrado!")

        const [userInfo] = queryResult

        const newUser = new User(userInfo.usu_id, userInfo.usu_nome, userInfo.usu_CPF, userInfo.tipo_usuario_id, 1, userInfo.usu_email, userInfo.usu_senha, userInfo.usu_telefone, new Date(userInfo.usu_data_cadastro), userInfo.empresa_id)

        return newUser
    }
    async getUsersByEmpresaId(companyId) {
        const sql = `SELECT usu_id, usu_nome, usu_CPF, tipo_usuario_id, usu_ativo = 1 AS usu_ativo,
        usu_email, usu_senha, usu_telefone, usu_data_cadastro, empresa_id FROM Usuario
        WHERE usu_ativo = 1 and empresa_id = ?;`;

        const [queryResult] = await connection.query(sql, companyId)

        if (queryResult.length === 0) throw new NotFoundException("Usuário Não Encontrado!")
        const [userInfo] = queryResult

        const newUser = new User(userInfo.usu_id, userInfo.usu_nome, userInfo.usu_CPF, userInfo.tipo_usuario_id, 1, userInfo.usu_email, userInfo.usu_senha, userInfo.usu_telefone, new Date(userInfo.usu_data_cadastro), userInfo.empresa_id)

        return newUser
    }

    async getUserByCPF(cpf) {
        const sql = `SELECT usu_id, usu_nome, usu_CPF, tipo_usuario_id, usu_ativo = 1 AS usu_ativo,
            usu_email, usu_senha, usu_telefone, usu_data_cadastro, empresa_id FROM Usuario
            WHERE usu_ativo = 1 and usu_cpf = ?;`;

        const [queryResult] = await connection.query(sql, cpf)

        if (queryResult.length === 0) throw new NotFoundException("Usuário Não Encontrado!")

        const [userInfo] = queryResult

        const newUser = new User(userInfo.usu_id, userInfo.usu_nome, userInfo.usu_CPF, userInfo.tipo_usuario_id, 1, userInfo.usu_email, userInfo.usu_senha, userInfo.usu_telefone, new Date(userInfo.usu_data_cadastro), userInfo.empresa_id)

        return newUser
    }

    async saveNewUser(user) {
        const values = [
            user.name,
            user.cpf,
            user.userType,
            user.status,
            user.email,
            user.password,
            user.telefone,
            user.registerDate,
            user.companyId
        ]

            const sql = `
                INSERT INTO Usuario 
                    (usu_nome, usu_CPF, tipo_usuario_id, usu_ativo, 
                    usu_email, usu_senha, usu_telefone, usu_data_cadastro, empresa_id) 
                VALUES 
                    (?, ?, ?, ?, ?, ?, ?, ?, ?);
            `

            const [result] = await connection.query(sql, values);

            return result.insertId
     
    }

    async count() {
        const sql = `SELECT MAX(usu_id) AS last_id FROM Usuario`;

        const [count] = await connection.query(sql)

        return count[0].last_id
    }
}




export default new UserRepository()