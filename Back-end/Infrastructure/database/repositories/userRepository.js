import User from "../../../Domain/Entities/User.js";
import connection from "../connection.js";


class UserRepository {
    constructor() { }

    async getUserById(Id) {
        const sql = `SELECT usu_id, usu_nome, usu_CPF, tipo_usuario_id, usu_ativo = 1 AS usu_ativo,
            usu_email, usu_senha, usu_telefone, usu_data_cadastro, empresa_id FROM Usuario
            WHERE usu_ativo = 1 and usu_id = ?;`;

        const [queryResult] = await connection.query(sql, Id)

        if (queryResult.length === 0) return null
        const [userInfo] = queryResult

        const newUser = new User(userInfo.usu_id, userInfo.usu_nome, userInfo.usu_CPF, userInfo.tipo_usuario_id, 1, userInfo.usu_email, userInfo.usu_senha, userInfo.usu_telefone, new Date(userInfo.usu_data_cadastro), userInfo.empresa_id)

        return newUser
    }

    async getUserByEmail(email) {
        const sql = `SELECT usu_id, usu_nome, usu_CPF, tipo_usuario_id, usu_ativo = 1 AS usu_ativo,
            usu_email, usu_senha, usu_telefone, usu_data_cadastro, empresa_id FROM Usuario
            WHERE usu_ativo = 1 and usu_email = ?;`;

        const [queryResult] = await connection.query(sql, email)

        if (queryResult.length === 0) return null

        const [userInfo] = queryResult

        const newUser = new User(userInfo.usu_id, userInfo.usu_nome, userInfo.usu_CPF, userInfo.tipo_usuario_id, 1, userInfo.usu_email, userInfo.usu_senha, userInfo.usu_telefone, new Date(userInfo.usu_data_cadastro), userInfo.empresa_id)

        return newUser
    }

    async getUserByName(name) {
        const sql = `SELECT usu_id, usu_nome, usu_CPF, tipo_usuario_id, usu_ativo = 1 AS usu_ativo,
            usu_email, usu_senha, usu_telefone, usu_data_cadastro, empresa_id FROM Usuario
            WHERE usu_ativo = 1 and usu_nome = ?;`;

        const [queryResult] = await connection.query(sql, name)

        if (queryResult.length === 0) return null

        const [userInfo] = queryResult

        const newUser = new User(userInfo.usu_id, userInfo.usu_nome, userInfo.usu_CPF, userInfo.tipo_usuario_id, 1, userInfo.usu_email, userInfo.usu_senha, userInfo.usu_telefone, new Date(userInfo.usu_data_cadastro), userInfo.empresa_id)

        return newUser
    }

    async getUserByCompanyId(companyId) {
        const sql = `SELECT usu_id, usu_nome, usu_CPF, tipo_usuario_id, usu_ativo = 1 AS usu_ativo,
        usu_email, usu_senha, usu_telefone, usu_data_cadastro, empresa_id FROM Usuario
        WHERE usu_ativo = 1 and empresa_id = ?;`;

        const [queryResult] = await connection.query(sql, companyId)

        if (queryResult.length === 0) return null
        const [userInfo] = queryResult

        const newUser = new User(userInfo.usu_id, userInfo.usu_nome, userInfo.usu_CPF, userInfo.tipo_usuario_id, 1, userInfo.usu_email, userInfo.usu_senha, userInfo.usu_telefone, new Date(userInfo.usu_data_cadastro), userInfo.empresa_id)

        return newUser
    }

    async getUserByCPF(cpf) {
        const sql = `SELECT usu_id, usu_nome, usu_CPF, tipo_usuario_id, usu_ativo = 1 AS usu_ativo,
            usu_email, usu_senha, usu_telefone, usu_data_cadastro, empresa_id FROM Usuario
            WHERE usu_ativo = 1 and usu_cpf = ?;`;

        const [queryResult] = await connection.query(sql, cpf)

        if (queryResult.length === 0) return null

        const [userInfo] = queryResult

        const newUser = new User(userInfo.usu_id, userInfo.usu_nome, userInfo.usu_CPF, userInfo.tipo_usuario_id, 1, userInfo.usu_email, userInfo.usu_senha, userInfo.usu_telefone, new Date(userInfo.usu_data_cadastro), userInfo.empresa_id)

        return newUser
    }

    async save(user) {
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

    async getUsers({ page = 1, pageSize = 10, filter = {} } ={}) {
        let paramsQuery = []
        const offset = (page - 1) * pageSize

        const whereClauses = [];

        if (filter.name) {
            whereClauses.push('usu_nome LIKE ?');
            paramsQuery.push(`%${filter.name}%`);
        }
    
        if (filter.cpf) {
            whereClauses.push('usu_CPF LIKE ?');
            paramsQuery.push(`%${filter.cpf}%`);
        }
    

        paramsQuery.push(pageSize, offset)

        const where = `WHERE usu_ativo = 1 ${whereClauses.length !== 0 && "AND " + whereClauses.join(' OR ')}`

        const sql = `SELECT usu_id, usu_nome, usu_CPF, tipo_usuario_id, usu_ativo = 1 AS usu_ativo,
            usu_email, usu_senha, usu_telefone, usu_data_cadastro, empresa_id FROM Usuario
            ${where} LIMIT ? OFFSET ? ;`;

            

        const [users] = await connection.query(sql, paramsQuery)
        return users
    }

    async count() {
        const sql = `SELECT MAX(usu_id) AS last_id FROM Usuario`;

        const [count] = await connection.query(sql)

        return count[0].last_id
    }
}


export default new UserRepository()