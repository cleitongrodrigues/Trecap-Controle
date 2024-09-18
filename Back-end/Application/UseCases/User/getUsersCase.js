export default function getUsersCase(repository){
    const users = repository.getUsers()
    return users
}