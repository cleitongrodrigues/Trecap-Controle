import User from "../../../Domain/Entities/User.js";

export default function createUserCase(userCreateDTO, repository){
    const existUserWithSameEmail = repository.getUserByEmail(userCreateDTO.email)
    const existUserWithSameCPF = repository.getUserByCPF(userCreateDTO.cpf)

    if(existUserWithSameEmail) throw new Error("Já existe um usuário cadastrado com esse Email!")
    if(existUserWithSameCPF) throw new Error("Já existe um usuário cadastrado com esse CPF!")
    

    
    const user = repository.createUser(userCreateDTO)
  

    return user
}