import Colaborador from "../../Domain/Entities/Colaborador.js";
import connection from "../database/connection.js";
import QueryBuilder from "../database/QueryBuilder.js";

class ColaboradorRepository{
    constructor(){
        this.queryBuilder = new QueryBuilder("colaboradores")
    }

    async getUsers(){
        const sql = this.queryBuilder
                                    .whereAnd('colaborador_ativo = 1')
                                    .page()
                                    .limit()
                                    .build()

        const [colaboradores] = await connection.query(sql)

        return colaboradores.map(
            (colaboradorInfo) => new Colaborador(colaboradorInfo.colaboradorId, colaboradorInfo.colaborador_nome, colaboradorInfo.colaborador_cpf, colaboradorInfo.colaborador_biometria, colaboradorInfo.colaborador_ativo, colaboradorInfo.colabora_telefone, colaboradorInfo.colaborador_email, colaboradorInfo.empresa_id, colaboradorInfo.setor_id)
        )
    }
}

export default new ColaboradorRepository()