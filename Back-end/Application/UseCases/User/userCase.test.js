import createUserCase from "./createUser.js"
import InMemoryUserRepository from "../../../database/repositories/InMemoryUserRepository.js"
import User from "../../../Domain/Entities/User.js"
import getUserByIdCase from "./getUserByIdCase.js"
import getUsersCase from "./getUsersCase.js"

describe('Criar um usuario', () => {
    test('Verifica se o usuário foi de fato inserido', () => {
        const user = createUserCase({
            name: "Teste",
            cpf: "98765432189",
            userType: 1,
            status: 1,
            email: "teste.teste@email.com",
            telefone: "11987654341",
            registerDate: "2024-11-12",
        }, InMemoryUserRepository)

        expect(user).toEqual(InMemoryUserRepository.getUserById(user.userID))
    })

    test('Não é para inserir dois usuários com o mesmo email', () => {
        createUserCase({
            name: "userOne",
            cpf: "98765432189",
            userType: 1,
            status: 1,
            email: "sameEmaile@email.com",
            telefone: "11987654341",
            registerDate: "2024-11-12",
        }, InMemoryUserRepository)


        expect(() => {
            createUserCase({
                name: "userTwo",
                cpf: "98765432189",
                userType: 1,
                status: 1,
                email: "sameEmaile@email.com",
                telefone: "11987654341",
                registerDate: "2024-11-12",
            }, InMemoryUserRepository)
        }
        ).toThrow(Error)
    })
})

describe('Burcar por usuários', () => {
    test('Buscar todos usuários',()=>{
        expect(getUsersCase(InMemoryUserRepository)).toBeDefined()
    })

    test('Buscar um usuário por ID existente', ()=>{
        expect(getUserByIdCase(1, InMemoryUserRepository)).toBeDefined()
    })

    test('Lançar erro ao buscar um usuário por ID inexistente', ()=>{
        expect(()=>{getUserByIdCase(100, InMemoryUserRepository)}).toThrow();
    })
})