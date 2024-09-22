import Evento from "../../../Domain/Entities/Evento.js"
import InMemoryUserRepository from "../../../Infrastructure/database/repositories/InMemoryUserRepository.js"
import InMemoryEventoRepository from "../../../Infrastructure/database/repositories/InMemoryEventoRepository.js"
import User from "../../../Domain/Entities/User.js"

class UserService{
    constructor(repository, repositoryEvento){
        this.repository = repository
        this.repositoryEvento = repositoryEvento
    }

    async createUser(userCreateDTO){
        const existUserWithSameEmail = await this.repository.getUserByEmail(userCreateDTO.email)
        const existUserWithSameCPF = await this.repository.getUserByCPF(userCreateDTO.cpf)
        if(existUserWithSameEmail) throw new Error("Já existe um usuário cadastrado com esse Email!")
        if(existUserWithSameCPF) throw new Error("Já existe um usuário cadastrado com esse CPF!")

        const user = new User(userCreateDTO)

        // const user = await this.repository.createUser(userCreateDTO)
      
        return user
    }

    async getUsers(){
        const users = await this.repository.getUsers()
        return users
    }

    async getUserById(id){
        const user = await this.repository.getUserById(id)
        return user
    }

    async deleteUser(id){
        const user = await this.repository.getUserById(id)
    
        if(!user) throw new Error('Usuário não existe!')
    
        user.cancel()
    
        await this.repository.updateUser(user)
    }

    async updateUser(newInfoUser){
        const existUserWithThisId = this.repository.getUserById(newInfoUser.userID)

        if(!existUserWithThisId) throw new Error('Não existe esse usuário!')

        this.repository.updateUser(newInfoUser)
    }

    async createEvento(userID, eventoData){
        const newEvento = await this.repositoryEvento.createEvento(userID, eventoData)
        return newEvento
    }
}

export default new UserService(InMemoryUserRepository, InMemoryEventoRepository)