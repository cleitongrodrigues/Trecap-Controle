import Colaborador from "../../../Domain/Entities/Colaborador.js"
import colaboradorRepository from "../../../Infrastructure/repositories/colaboradorRepository.js"
import ColaboradorResult from "../../Contracts/Colaborador/ColaboradorResult.js"


class ColaboradorService{
    constructor(repository){
    }

    async createColaboradores(input){
        const newColaborador = new Colaborador(input.colaborador_id, input.colaborador_name, input.colaborador_cpf, input.colaborador_biometria, 1, input.colaborador_telefone, input.colaborador_email, input.empresa_id, input.setor_id)

        const result = colaboradorRepository.createColaborador(input)

        return new ColaboradorResult(result)
    }

    async getColaboradores(input)
    {
        const colaboradores = colaboradorRepository.getColaboradores(input)

        return colaboradores
    }

    async getColaboradorById(input){
        const colaborador = colaboradorRepository.getColaboradorById(input)

        return colaborador
    }
}

export default new ColaboradorService()