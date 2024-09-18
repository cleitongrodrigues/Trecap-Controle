import createUserCase from "./createUser.js"
import InMemoryUserRepository from "../../../database/repositories/InMemoryUserRepository.js"
import User from "../../../Domain/Entities/User.js"
import getUserByIdCase from "./getUserByIdCase.js"
import getUsersCase from "./getUsersCase.js"
import UserService from "./UserService.js"

describe('Criar um usuario', () => {
    test('Verifica se o usuário foi de fato inserido', async () => {
        const user = await UserService.createUser({
            name: "Teste",
            cpf: "98765432189",
            userType: 1,
            status: 1,
            email: "teste.teste@email.com",
            telefone: "11987654341",
            registerDate: "2024-11-12",
        })

        expect(user).toEqual(await InMemoryUserRepository.getUserById(user.userID))
    })

    test('Não é para inserir dois usuários com o mesmo email', async () => {
        await UserService.createUser({
            name: "userOne",
            cpf: "98165432149",
            userType: 1,
            status: 1,
            email: "sameEmaile@email.com",
            telefone: "11987654341",
            registerDate: "2024-11-12",
        })


        expect(async ()=> await UserService.createUser({
                name: "userTwo",
                cpf: "91763432159",
                userType: 1,
                status: 1,
                email: "sameEmaile@email.com",
                telefone: "11987654341",
                registerDate: "2024-11-12",
            }))
            .toThrow("Já existe um usuário cadastrado com esse Email!")
    })
})

// describe('Burcar por usuários', () => {
//     test('Buscar todos usuários',()=>{
//         expect(getUsersCase(InMemoryUserRepository)).toBeDefined()
//     })

//     test('Buscar um usuário por ID existente', ()=>{
//         expect(getUserByIdCase(1, InMemoryUserRepository)).toBeDefined()
//     })

//     test('Lançar erro ao buscar um usuário por ID inexistente', ()=>{
//         expect(getUserByIdCase(100, InMemoryUserRepository)).toBeNull();
//     })
// })