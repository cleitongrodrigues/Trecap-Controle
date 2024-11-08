import FactoryUser from "../../../Domain/Domain Service/FactoryUser.js"
import NotFoundException from "../../../Domain/Exception/NotFoundException.js"
import ValidationException from "../../../Domain/Exception/ValidationException.js"
import UnauthorizedException from "../../../Domain/Exception/UnauthorizedException.js"
import Setor from "../../../Domain/Entities/Setor.js"
import CreateAdministratorUserOutput from "../../Contracts/User/CreateAdministratorUserOutput.js"
import userRepository from "../../../Infrastructure/repositories/userRepository.js"
import UserValidator from "../../../Domain/Domain Service/Validators/UserValidator.js"

class UserService {
    constructor(repository, factoryUser) {
        this.repository = repository
        this.factoryUser = factoryUser
    }

    async createUser(input) {
        UserValidator.validate(input)

        input.userId = await this.repository.count() + 1

        const user = this.factoryUser.createAdminUser(input)

        await this.repository.saveNewUser(user)

        const createUserOutput = new CreateAdministratorUserOutput(user)
        
        return createUserOutput
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