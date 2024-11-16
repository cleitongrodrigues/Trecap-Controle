import ColaboradorResult from "../../Application/Contracts/Colaborador/ColaboradorResult.js";
import Colaborador from "../../Domain/Entities/Colaborador.js";
import connection from "../database/connection.js";
import QueryBuilder from "../database/QueryBuilder.js";

class ColaboradorRepository {
    constructor() {

    }

    async createColaborador(input) {
        const { colaborador_nome, colaborador_CPF, colaborador_biometria, colaborador_ativo, colaborador_telefone, colaborador_email, empresa_id, setor_id } = input

        const values = [ colaborador_nome, colaborador_CPF, colaborador_biometria,  colaborador_telefone, colaborador_email, empresa_id, setor_id ]

        const sql = `INSERT INTO Colaboradores (colaborador_nome, colaborador_CPF, colaborador_biometria, colaborador_ativo, colaborador_telefone, colaborador_email, empresa_id, setor_id)
                    VALUES
                    (?, ?, ?, 1, ?, ?, ?, ?)`

        const [result] = await connection.query(sql, values)
        const colaborador_id = result.insertId
        input = { ...input, colaborador_id : colaborador_id}
        const colaborador = new Colaborador(input.colaborador_id, input.colaborador_nome, input.colaborador_CPF, input.colaborador_biometria, input.colaborador_ativo, input.colaborador_telefone, input.colaborador_email, input.empresa_id, input.setor_id)

        console.log(colaborador)
        return colaborador
    }

    async getColaboradores(input) {
        const queryBuilder = new QueryBuilder("colaboradores")
        queryBuilder
            .whereAnd('colaborador_ativo = 1')
            .page(input.page)
            .limit(input.pageSize)

        if (input.filter) {
            queryBuilder.whereAnd(`colaborador_nome LIKE \'%${input.filter}%\'`)
        }

        queryBuilder.whereAnd(`empresa_id = ${input.empresa_id}`)

        const sql = queryBuilder.build()
    
        const [colaboradores] = await connection.query(sql)

        for (const i in colaboradores) {
            const setor_id = colaboradores[i].setor_id

            const sql2 = `SELECT setor_nome FROM setores WHERE setor_id = ?`
            const [[nome]] = await connection.query(sql2, [setor_id])


            colaboradores[i].setor_nome = nome.setor_nome
          }
        return colaboradores.map(
            (colaboradorInfo) => {
                return new ColaboradorResult(colaboradorInfo.colaborador_id, colaboradorInfo.colaborador_nome, colaboradorInfo.colaborador_cpf, colaboradorInfo.colaborador_email, colaboradorInfo.empresa_id, colaboradorInfo.setor_id, colaboradorInfo.setor_nome)
            }
        )
    }

    async getColaboradorById(colaboradorId) {
        const queryBuilder = new QueryBuilder("colaboradores")
        const sql = queryBuilder
            .whereAnd('colaborador_ativo = 1')
            .whereAnd(`colaborador_id = ${colaboradorId}`)
            .page()
            .limit()
            .build()

        const [[colaboradorInfo]] = await connection.query(sql)

        return new Colaborador(colaboradorInfo.colaborador_id, colaboradorInfo.colaborador_nome, colaboradorInfo.colaborador_cpf, colaboradorInfo.colaborador_biometria, 1, colaboradorInfo.colabora_telefone, colaboradorInfo.colaborador_email, colaboradorInfo.empresa_id, colaboradorInfo.setor_id)
    }

    async getColaboradorFiltred(filterValue) {
        const queryBuilder = new QueryBuilder("colaboradores")
        const sql = queryBuilder
            .whereAnd('colaborador_ativo = 1')




        const [colaboradores] = await connection.query(sql)

        return colaboradores.map(
            (colaboradorInfo) => {
                return new ColaboradorResult(colaboradorInfo.colaborador_id, colaboradorInfo.colaborador_nome, colaboradorInfo.colaborador_cpf, colaboradorInfo.colaborador_email, colaboradorInfo.empresa_id, colaboradorInfo.setor_id)
            }
        )
    }

    async length(empresa_id, filter)
    {
        let values;
        let sql
        console.log(filter)
        if(filter)
        {
            sql = `SELECT COUNT(*) AS total_registros FROM colaboradores WHERE empresa_id = ? And colaborador_ativo = 1 And colaborador_nome LIKE ?`
            values = [empresa_id, `%${filter}%`]
        } else {
            sql = "SELECT COUNT(*) AS total_registros FROM colaboradores WHERE empresa_id = ?"
            values = [empresa_id]
        }
            

        const [result] = await connection.query(sql, values)
        return result[0].total_registros
    }
}

export default new ColaboradorRepository()