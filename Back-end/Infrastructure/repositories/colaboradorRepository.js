import ColaboradorResult from "../../Application/Contracts/Colaborador/ColaboradorResult.js";
import Colaborador from "../../Domain/Entities/Colaborador.js";
import connection from "../database/connection.js";
import QueryBuilder from "../database/QueryBuilder.js";

class ColaboradorRepository {
    constructor() {

    }

    async createColaborador(input) {
        const { colaborador_nome, colaborador_CPF, colaborador_biometria, colaborador_ativo, colaborador_telefone, colaborador_email, empresa_id, setor_id } = input

        const values = [ colaborador_nome, colaborador_CPF, colaborador_biometria, colaborador_ativo, colaborador_telefone, colaborador_email, empresa_id, setor_id ]

        const sql = `INSERT INTO Colaboradores (colaborador_nome, colaborador_CPF, colaborador_biometria, colaborador_ativo, colaborador_telefone, colaborador_email, empresa_id, setor_id)
                    VALUES
                    (?, ?, ?, ?, ?, ?, 1, 1)`

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
            .whereAnd(`empresa_id = ${input.usu_id}`)
            .page(input.page)
            .limit(input.pageSize)

        if (input.filter) {
            queryBuilder.whereAnd(`colaborador_nome LIKE \'%${input.filter}%\'`)
            queryBuilder.whereOr(`colaborador_email LIKE \'%${input.filter}%\'`)
            queryBuilder.whereOr(`colaborador_id LIKE \'%${input.filter}%\'`)
        }

        const sql = queryBuilder.build()
        const [colaboradores] = await connection.query(sql)

        return colaboradores.map(
            (colaboradorInfo) => {
                return new ColaboradorResult(colaboradorInfo.colaborador_id, colaboradorInfo.colaborador_nome, colaboradorInfo.colaborador_cpf, colaboradorInfo.colaborador_email, colaboradorInfo.empresa_id, colaboradorInfo.setor_id)
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
}

export default new ColaboradorRepository()