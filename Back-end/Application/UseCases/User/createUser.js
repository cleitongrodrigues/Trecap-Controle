import User from "../../../Domain/Entities/User.js";

export default function createUserCase(userCreateDTO, repository){
    const existUserWithSameEmail = repository.getUserByEmail(userCreateDTO.email)

    if(existUserWithSameEmail) {
        throw new Error("Já existe um usuário cadastrado com esse Email!")
    }

    
    const user = repository.createUser(userCreateDTO)
  

    return user
}