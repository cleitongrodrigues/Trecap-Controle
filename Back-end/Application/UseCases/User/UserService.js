import InMemoryUserRepository from "../../../database/repositories/InMemoryUserRepository"

class UserService{
    constructor(repository){
        this.repository = repository
    }

    async createUser(userCreateDTO){
        const existUserWithSameEmail = await this.repository.getUserByEmail(userCreateDTO.email)
        const existUserWithSameCPF = await this.repository.getUserByCPF(userCreateDTO.cpf)
    
        if(existUserWithSameEmail) throw new Error("Já existe um usuário cadastrado com esse Email!")
        if(existUserWithSameCPF) throw new Error("Já existe um usuário cadastrado com esse CPF!")

        const user = await this.repository.createUser(userCreateDTO)
      
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



}

export default new UserService(InMemoryUserRepository)