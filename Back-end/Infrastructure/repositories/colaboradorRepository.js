import ColaboradorResult from "../../Application/Contracts/Colaborador/ColaboradorResult.js";
import Colaborador from "../../Domain/Entities/Colaborador.js";
import connection from "../database/connection.js";
import QueryBuilder from "../database/QueryBuilder.js";

class ColaboradorRepository{
    constructor(){
        
    }

    async getColaboradores(input){
        const queryBuilder = new QueryBuilder("colaboradores")
        queryBuilder
                    .whereAnd('colaborador_ativo = 1')
                    .page(input.page)
                    .limit(input.pageSize)
                                
        if(input.filter){
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

    async getColaboradorById(colaboradorId){
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

    async getColaboradorFiltred(filterValue)
    {
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