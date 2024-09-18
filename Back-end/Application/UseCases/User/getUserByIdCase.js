export default function getUserByIdCase(id, repository){
    const user = repository.getUserById(id)

    if(!user){
        throw new Error("Esse ID usuário não existe!")
    }

    return user
}