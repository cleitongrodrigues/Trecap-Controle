import ColaboradorService from "../../Application/Services/Colaborador/ColaboradorService.js";


export const ColaboradorController = {
    async ListarColaboradores(request, response, next) {
        try {
            const { page, pageSize, filter } = request.query

            const params = {
                page: page || 1,
                pageSize: pageSize || 10,
                filter: filter || {},
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
    }
}