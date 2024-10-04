import User from "../../../Domain/Entities/User.js";
import UserQueryParamys from "../../UserQueryParams.js";
import connection from "../connection.js";


class UserRepository {
    constructor() {
        this.columnNames = {
            name: 'usu_nome',
            userType: 'tipo_usuario_id'
        }
    }

    async getUsers({ page = 1, pageSize = 10, filter = {} } = {}) {

        // // Constroi a consulta de Where de acordo com o que queremos filtrar
        // const where = this.builStringWhereClauseForUser(filter)

        // //Organiza a ordem que os parametros devem ficar
        // const paramsQuery = this.getParamsQuery({ pageSize: pageSize, offset: offset, filter: filter })

        // const sql = `SELECT usu_id, usu_nome, usu_CPF, tipo_usuario_id, usu_ativo = 1 AS usu_ativo,
        //     usu_email, usu_senha, usu_telefone, usu_data_cadastro, empresa_id FROM Usuario
        //     ${where} LIMIT ? OFFSET ? ;`;

        const queryBuilder = new UserQueryParamys()

        queryBuilder
            .setFilterName(filter.name)
            .setFilterUserType(filter.userType)
            .withPagnation(pageSize, page)

        const {query, params} = queryBuilder.build()

        const [users] = await connection.query(query, params)

        return users
    }

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

    async count() {
        const sql = `SELECT MAX(usu_id) AS last_id FROM Usuario`;

        const [count] = await connection.query(sql)

        return count[0].last_id
    }

    builStringWhereClauseForUser(filter) {
        const whereClauses = []

        for (const [key, value] of Object.entries(filter)) {
            const columnName = this.columnNames[key]
            if (!columnName) return
            whereClauses.push(`${columnName} LIKE ?`)
        }

        const whereClausesIsEmpty = whereClauses.length === 0

        const where = `${!whereClausesIsEmpty ? "WHERE " + whereClauses.join(' AND ') + " AND usu_ativo = 1" : ''}`
        return where
    }

    getParamsQuery({ pageSize, offset, filter }) {
        const paramsQuery = []

        for (const [key, value] of Object.entries(filter)) {
            const columnTableName = this.columnNames[key]
            if (!columnTableName) return
            paramsQuery.push(`%${value || ''}%`)
        }

        paramsQuery.push(pageSize, offset)
        return paramsQuery
    }
}




export default new UserRepository()