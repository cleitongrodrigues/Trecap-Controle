import colaboradorRepository from "../../../Infrastructure/repositories/colaboradorRepository.js"


class ColaboradorService{
    constructor(repository){
    }

    async createColaboradores(input){
        
    }

    async getColaboradores()
    {
        const colaboradores = colaboradorRepository.getUsers()

        return colaboradores
    }
}

export default new ColaboradorService()