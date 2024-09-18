export default function getUserByIdCase(id, repository){
    const user = repository.getUserById(id)
    return user
}