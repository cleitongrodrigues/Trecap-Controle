import ColaboradorService from "../../Application/Services/Colaborador/ColaboradorService.js";


export const ColaboradorController = {
    async ListarColaboradores(request, response, next) {
        try {
            const { page, pageSize, filter } = request.query

            const params = {
                page: page,
                pageSize: pageSize,
                filter: filter,
            }

            const colaboradores = await ColaboradorService.getColaboradores()

            return response.status(200).json({
                mensagem: 'Lista de Usuários',
                dados: colaboradores,
            });

        } catch (error) {
            next(error)
        }
    }
}