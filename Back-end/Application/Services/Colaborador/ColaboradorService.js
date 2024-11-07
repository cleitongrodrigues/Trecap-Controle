import colaboradorRepository from "../../../Infrastructure/repositories/colaboradorRepository.js"


class ColaboradorService{
    constructor(repository){
    }

    async createColaboradores(input){
        
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