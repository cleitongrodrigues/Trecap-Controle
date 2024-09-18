import UserService from "./UserService.js"

describe('Criar um usuario', () => {
    it('Verifica se o usuário foi criado corretamente com todas propriedades', async () => {
        const userInfo = {
            name: "userOne",
            cpf: "98765432189",
            userType: 1,
            status: 1,
            email: "teste.teste@email.com",
            telefone: "11987654341",
            registerDate: "2024-11-12",
        }
        const user = await UserService.createUser(userInfo)

        expect(user).toHaveProperty('userID')
        expect(user).toMatchObject(userInfo)
    })

    it('Verifica que não é possível criar um usuário com mesmo email', async () => {
        const userInfo = {
            name: "userTwo",
            cpf: "91165432189",
            userType: 1,
            status: 1,
            email: "teste.teste@email.com",
            telefone: "11987654341",
            registerDate: "2024-11-12",
        }


        await expect(UserService.createUser(userInfo)).rejects.toThrow();
    })

    it('Verifica que não é possível criar um usuário com mesmo CPF', async () => {
        const userInfo = {
            name: "userThree",
            cpf: "91165432189",
            userType: 1,
            status: 1,
            email: "teste.teste@email.com",
            telefone: "11987654341",
            registerDate: "2024-11-12",
        }


        await expect(UserService.createUser(userInfo)).rejects.toThrow();
    })
})

describe('Busca usuário', () => {
    it('Busca por todos usuários', async () => {
        const users = await UserService.getUsers()

        expect(users.length).toBeGreaterThanOrEqual(0)
    })

    it('Buscar um por ID(1) de um usuário ja cadastrado', async () => {
        const user = await UserService.getUserById(1)

        expect(user).toBeDefined()
    })

    it('Retorna null caso o ID do usuário não seja encontrado', async () => {
        const user = await UserService.getUserById(1000)

        expect(user).toBeNull()
    })
})

describe('Update usuário', () => {
    it('Modificar nome de um usuário', async () => {
        const lastUser = {
            userID: 1,
            name: "Lucas Oliveira da Silva",
            cpf: "98765432100",
            userType: 1,
            status: 1,
            email: "lucas.oliveira@email.com",
            telefone: "11987654321",
            registerDate: "2024-01-15",
        }

        await UserService.updateUser(lastUser)

        const newUser = await UserService.getUserById(lastUser.userID)

        expect(newUser).toMatchObject({name: 'Lucas Oliveira da Silva'}) 
    })
})


describe('Deleta um usuário', () => {
    it('Deleta um usuário ativo', async () => {
        await UserService.deleteUser(1)
        const firstUser = await UserService.getUserById(1)
        expect(firstUser).toBeNull()
    })

    it('Se tentar deletar um usuário inexistente lança um erro', async () => {
        await expect(UserService.deleteUser(100)).rejects.toThrow()
    })
})