import FactoryUser from "../../../Domain/Domain Service/FactoryUser.js"
import NotFoundException from "../../../Domain/Exception/NotFoundException.js"
import ValidationException from "../../../Domain/Exception/ValidationException.js"
import UnauthorizedException from "../../../Domain/Exception/UnauthorizedException.js"
import userRepository from "../../../Infrastructure/database/repositories/userRepository.js"
import Setor from "../../../Domain/Entities/Setor.js"


class UserService {
    constructor(repository, factoryUser) {
        this.repository = repository
        this.factoryUser = factoryUser
    }

    async createUser(input) {
        input.userId = await this.repository.count() + 1
        const userDto = new CreateAdministratorUserInput(input)

        const user = this.factoryUser.createAdminUser(userDto)

        await this.repository.save(user)
        
        return user
    }

    async getUsers(input) {
        const users = await this.repository.getUsers(input)
        return users
    }

    async getUserById(id) {
        const user = await this.repository.getUserById(id)
       
        return user
    }
    
    async getUserByName(name) {
        const user = await this.repository.getUserByName(name)
        if(!user) throw new NotFoundException("Usuário Não Encontrado!")
        return user
    }


    async deleteUser(id) {
        const user = await this.repository.getUserById(id)

        user.cancel()

        await this.repository.updateUser(user)
    }

    async updateUser(newInfoUser) {
        const existUserWithThisId = this.repository.getUserById(newInfoUser.userID)


        this.repository.updateUser(newInfoUser)
    }

    async createEvento(userID, eventoData) {
        const newEvento = await this.repositoryEvento.createEvento(userID, eventoData)
        return newEvento
    }

    async createSetor(userId, setorNome){
        const user = this.repository.getUserById(userId)

        const newSetor = user.createSetor(setorNome)
    }
}

export default new UserService(userRepository, new FactoryUser())