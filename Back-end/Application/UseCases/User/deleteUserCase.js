export default async function deleteUserCase(id, repository){
    const user = await repository.getUserById(id)

    if(!user) throw new Error('Usuário não existe!')

    user.cancel()

    await repository.updateUser(user)
}