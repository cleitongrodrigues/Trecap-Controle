import ColaboradorService from "../../Application/Services/Colaborador/ColaboradorService.js";
import connection from "../../Infrastructure/database/connection.js";


export const ColaboradorController = {
    async ListarColaboradores(request, response, next) {
        try {
            const { page, pageSize, filter } = request.query

            const params = {
                page: page || 1,
                pageSize: pageSize || 10,
                filter: filter,
                usu_id: request.user.usu_id,
                empresa_id: request.user.empresa_id
            }


            const colaboradores = await ColaboradorService.getColaboradores(params)

            return response.status(200).json({
                dados: colaboradores,
            });

        } catch (error) {
            next(error)
        }
    },
    async ListarColaborador(request, response, next) {
        try {
            const { colaborador_id } = request.params

            const colaborador = await ColaboradorService.getColaboradorById(colaborador_id)

            return response.status(200).json({
                dados: colaborador,
            });

        } catch (error) {
            next(error)
        }
    },
    async CadastrarColaborador(request, response, next)
    {
        try {
            const colaborador = await ColaboradorService.createColaboradores(request.body)

            return response.status(200).json({
                dados: colaborador,
            });

        } catch (error) {
            next(error)
        }
    },
    async ApagarColaborador(request, response, next)
    {
        try{
            const { colaborador_id } = request.params
            const sql = `UPDATE colaboradores SET colaborador_ativo = 0
                WHERE colaborador_id = ?;`;

            const values = [colaborador_id];

            const [result] = await connection.query(sql, values);

            console.log(result)

            return response.status(200).json({
                message: "Sucess"
            })
        }
        catch (error)
        {
            next(error)
        }
    }
}