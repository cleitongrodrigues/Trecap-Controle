import Evento from "../../../Domain/Entities/Evento.js"
import InMemoryUserRepository from "../../../Infrastructure/database/repositories/InMemoryUserRepository.js"
import InMemoryEventoRepository from "../../../Infrastructure/database/repositories/InMemoryEventoRepository.js"
import User from "../../../Domain/Entities/User.js"
import Adress from "../../../Domain/Entities/Adress.js"
import inMemoryAdressRepository from "../../../Infrastructure/database/repositories/inMemoryAdressRepository.js"

class UserService {
    constructor(repository, repositoryEvento, repositoryAdress) {
        this.repository = repository
        this.repositoryEvento = repositoryEvento
        this.repositoryAdress = repositoryAdress
    }

    async createUser(input) {
        const existUserWithSameEmail = await this.repository.getUserByEmail(input.email)
        const existUserWithSameCPF = await this.repository.getUserByCPF(input.cpf)

        if (existUserWithSameEmail) throw new Error("Já existe um usuário cadastrado com esse Email!")
        if (existUserWithSameCPF) throw new Error("Já existe um usuário cadastrado com esse CPF!")

        const userID = await this.repository.count() + 1

        const adressId = await this.repository.count() + 1

        const adressInfo = input.adress
        const adress = new Adress(adressId, adressInfo.logradouro, adressInfo.numero, adressInfo.complemento, adressInfo.bairro, adressInfo.cidade, adressInfo.estado, adressInfo.cep)
        const user = new User(userID, input.name, input.cpf, input.userType, input.status, input.email, input.password, input.telefone, input.registerDate, adress)
        await this.repository.save(user)

        return user
    }

    async getUsers() {
        const users = await this.repository.getUsers()
        return users
    }

    async getUserById(id) {
        const user = await this.repository.getUserById(id)
        return {...user,adress: {...user.adress}}
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

export default new UserService(InMemoryUserRepository, InMemoryEventoRepository, inMemoryAdressRepository)