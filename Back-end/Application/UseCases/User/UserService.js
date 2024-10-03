import FactoryUser from "../../../Domain/Domain Service/FactoryUser.js"
import NotFoundException from "../../../Domain/Exception/NotFoundException.js"
import ValidationException from "../../../Domain/Exception/ValidationException.js"
import userRepository from "../../../Infrastructure/database/repositories/userRepository.js"


class UserService {
    constructor(repository, factoryUser) {
        this.repository = repository
        this.factoryUser = factoryUser
    }

    async createUser(input) {
        input.userId = await this.repository.count() + 1

        const user = this.factoryUser.createAdminUser(input)

        const existUserWithSameEmail = await this.repository.getUserByEmail(user.email)
        const existUserWithSameCPF = await this.repository.getUserByCPF(user.cpf)

        if (existUserWithSameEmail) throw new ValidationException("Já existe um usuário cadastrado com esse Email!")
        if (existUserWithSameCPF) throw new ValidationException("Já existe um usuário cadastrado com esse CPF!")

        await this.repository.save(user)
        
        return user
    }

    async getUsers() {
        const users = await this.repository.getUsers()
        return users
    }

    async getUserById(id) {
        const user = await this.repository.getUserById(id)
        if(!user) throw new NotFoundException("Usuário Não Encontrado!")
        return user
    }

    async deleteUser(id) {
        const user = await this.repository.getUserById(id)

        if (!user) throw new Error('Usuário não existe!')

        user.cancel()

        await this.repository.updateUser(user)
    }

    async updateUser(newInfoUser) {
        const existUserWithThisId = this.repository.getUserById(newInfoUser.userID)

        if (!existUserWithThisId) throw new Error('Não existe esse usuário!')

        this.repository.updateUser(newInfoUser)
    }

    async createEvento(userID, eventoData) {
        const newEvento = await this.repositoryEvento.createEvento(userID, eventoData)
        return newEvento
    }
}

export default new UserService(userRepository, new FactoryUser())